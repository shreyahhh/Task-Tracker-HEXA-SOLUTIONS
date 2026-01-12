import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure database directory exists
const dbDir = path.join(__dirname, '../database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'tasks.json');

// Initialize database file if it doesn't exist
if (!fs.existsSync(dbPath)) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify([], null, 2));
  } catch (error) {
    console.error('❌ Error creating database file:', error.message);
    process.exit(1);
  }
}

// Database operations
class Database {
  constructor() {
    this.dbPath = dbPath;
  }

  load() {
    try {
      if (!fs.existsSync(this.dbPath)) {
        fs.writeFileSync(this.dbPath, JSON.stringify([], null, 2));
        return [];
      }
      const content = fs.readFileSync(this.dbPath, 'utf8');
      if (!content.trim()) {
        return [];
      }
      return JSON.parse(content);
    } catch (error) {
      console.error('❌ Error loading database:', error.message);
      // Try to backup corrupted file
      try {
        const backupPath = `${this.dbPath}.backup.${Date.now()}`;
        fs.copyFileSync(this.dbPath, backupPath);
        console.log(`💾 Corrupted file backed up to: ${backupPath}`);
        // Create fresh database
        fs.writeFileSync(this.dbPath, JSON.stringify([], null, 2));
        return [];
      } catch (backupError) {
        console.error('❌ Error creating backup:', backupError.message);
        return [];
      }
    }
  }

  save(data) {
    try {
      // Validate data is an array
      if (!Array.isArray(data)) {
        throw new Error('Data must be an array');
      }
      
      // Create backup before saving
      if (fs.existsSync(this.dbPath)) {
        const backupPath = `${this.dbPath}.backup.${Date.now()}`;
        fs.copyFileSync(this.dbPath, backupPath);
        // Keep only last 5 backups
        this.cleanupBackups();
      }
      
      // Write atomically using temporary file
      const tempPath = `${this.dbPath}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf8');
      fs.renameSync(tempPath, this.dbPath);
      return true;
    } catch (error) {
      console.error('❌ Error saving database:', error.message);
      return false;
    }
  }

  cleanupBackups() {
    try {
      const files = fs.readdirSync(path.dirname(this.dbPath));
      const backups = files
        .filter(f => f.startsWith('tasks.json.backup.'))
        .map(f => ({
          name: f,
          path: path.join(path.dirname(this.dbPath), f),
          time: parseInt(f.split('.').pop()) || 0
        }))
        .sort((a, b) => b.time - a.time);
      
      // Keep only last 5 backups
      if (backups.length > 5) {
        backups.slice(5).forEach(backup => {
          try {
            fs.unlinkSync(backup.path);
          } catch (err) {
            // Ignore errors
          }
        });
      }
    } catch (error) {
      // Ignore cleanup errors
    }
  }

  // Get all tasks
  findAll() {
    try {
      const data = this.load();
      return [...data];
    } catch (error) {
      console.error('❌ Error in findAll:', error.message);
      return [];
    }
  }

  // Get task by ID
  findById(id) {
    try {
      const data = this.load();
      const taskId = parseInt(id);
      if (isNaN(taskId)) {
        return null;
      }
      return data.find(task => task.id === taskId) || null;
    } catch (error) {
      console.error('❌ Error in findById:', error.message);
      return null;
    }
  }

  // Create task
  create(taskData) {
    try {
      const data = this.load();
      const nextId = data.length > 0 ? Math.max(...data.map(t => t.id || 0)) + 1 : 1;
      
      const task = {
        id: nextId,
        title: taskData.title || '',
        description: taskData.description || null,
        priority: taskData.priority || 'medium',
        category: taskData.category || 'personal',
        due_date: taskData.due_date || null,
        is_completed: taskData.is_completed || false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        position: taskData.position || 0
      };
      
      data.push(task);
      if (this.save(data)) {
        return task;
      } else {
        throw new Error('Failed to save task');
      }
    } catch (error) {
      console.error('❌ Error in create:', error.message);
      throw error;
    }
  }

  // Update task
  update(id, updates) {
    try {
      const data = this.load();
      const taskId = parseInt(id);
      if (isNaN(taskId)) {
        return null;
      }
      
      const index = data.findIndex(task => task.id === taskId);
      if (index === -1) {
        return null;
      }

      data[index] = {
        ...data[index],
        ...updates,
        id: taskId, // Ensure ID doesn't change
        updated_at: new Date().toISOString()
      };
      
      if (this.save(data)) {
        return data[index];
      } else {
        throw new Error('Failed to save task');
      }
    } catch (error) {
      console.error('❌ Error in update:', error.message);
      return null;
    }
  }

  // Delete task
  delete(id) {
    try {
      const data = this.load();
      const taskId = parseInt(id);
      if (isNaN(taskId)) {
        return false;
      }
      
      const index = data.findIndex(task => task.id === taskId);
      if (index === -1) {
        return false;
      }
      
      data.splice(index, 1);
      return this.save(data);
    } catch (error) {
      console.error('❌ Error in delete:', error.message);
      return false;
    }
  }
}

// Create singleton instance
const db = new Database();

// Test database connection
try {
  const initialData = db.load();
  console.log('✅ JSON database connected successfully');
  console.log(`   Database: ${dbPath}`);
  console.log(`   Tasks loaded: ${initialData.length}`);
} catch (error) {
  console.error('❌ Failed to initialize database:', error.message);
  process.exit(1);
}

export default db;

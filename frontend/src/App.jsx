import { useState } from 'react';
import { TaskProvider } from './context/TaskContext.jsx';
import Navbar from './components/Navbar.jsx';
import StatsCards from './components/StatsCards.jsx';
import TaskInput from './components/TaskInput.jsx';
import FilterBar from './components/FilterBar.jsx';
import TaskList from './components/TaskList.jsx';
import EditModal from './components/EditModal.jsx';
import DeleteModal from './components/DeleteModal.jsx';
import Documentation from './components/Documentation.jsx';
import ToastContainer, { showToast } from './components/ToastContainer.jsx';
import { useTasks } from './context/TaskContext.jsx';

const AppContent = () => {
  const { deleteTask } = useTasks();
  const [editTask, setEditTask] = useState(null);
  const [deleteTaskData, setDeleteTaskData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showDocumentation, setShowDocumentation] = useState(false);

  const handleEdit = (task) => {
    setEditTask(task);
    setIsEditModalOpen(true);
  };

  const handleDelete = (task) => {
    setDeleteTaskData(task);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteTaskData) {
      const result = await deleteTask(deleteTaskData.id);
      if (result.success) {
        showToast('Task deleted successfully', 'success');
      } else {
        showToast(result.error || 'Failed to delete task', 'error');
      }
    }
  };

  const handleTaskAdded = (message) => {
    showToast(message, 'success');
  };

  const handleTaskUpdated = (message) => {
    showToast(message, 'success');
  };

  // Show documentation page
  if (showDocumentation) {
    return (
      <>
        <Documentation onClose={() => setShowDocumentation(false)} />
        <ToastContainer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-black pb-4">
      <Navbar onDocumentationClick={() => setShowDocumentation(true)} />
      <div className="pt-6">
        {/* Introduction */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <p className="text-center text-gray-400 text-sm">
            Organize your tasks, boost your productivity
          </p>
        </div>
        
        <StatsCards />
        
        {/* Two Column Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-4">
          {/* Left Column - Task Input */}
          <div className="lg:sticky lg:top-14 lg:self-start lg:max-h-[calc(100vh-3.5rem)] lg:overflow-y-auto">
            <TaskInput onSuccess={handleTaskAdded} />
          </div>
          
          {/* Right Column - Filters and Tasks */}
          <div className="min-w-0">
            <FilterBar />
            <TaskList onEdit={handleEdit} onDelete={handleDelete} />
          </div>
        </div>
        </div>
      </div>
      
      <EditModal
        task={editTask}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditTask(null);
        }}
        onSuccess={handleTaskUpdated}
      />
      
      <DeleteModal
        task={deleteTaskData}
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeleteTaskData(null);
        }}
        onConfirm={handleDeleteConfirm}
      />
      
      <ToastContainer />
    </div>
  );
};

const App = () => {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
};

export default App;


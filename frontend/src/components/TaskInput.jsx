import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTasks } from '../context/TaskContext.jsx';
import { PRIORITIES, CATEGORIES } from '../utils/constants.js';

const TaskInput = ({ onSuccess }) => {
  const { addTask } = useTasks();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'Personal',
    due_date: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    setLoading(true);
    setError('');

    const result = await addTask(formData);
    
    if (result.success) {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        category: 'Personal',
        due_date: ''
      });
      if (onSuccess) onSuccess('Task added successfully');
    } else {
      setError(result.error || 'Failed to add task');
    }

    setLoading(false);
  };

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold text-white mb-3">Add New Task</h2>
      <div className="bg-[#111111] border border-[#2A2A2A] rounded-lg p-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Input */}
          <div>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="What needs to be done?"
              className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-vercel-blue focus:border-transparent transition-all duration-300 text-sm"
              required
            />
          </div>

          {/* Description Input */}
          <div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add description... (optional)"
              rows="4"
              className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-vercel-blue focus:border-transparent transition-all duration-300 resize-none text-sm"
            />
          </div>

          {/* Priority and Category Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Priority */}
            <div>
              <label className="block text-xs text-gray-400 mb-2">Priority</label>
              <div className="flex gap-2">
                {PRIORITIES.map(priority => (
                  <button
                    key={priority.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, priority: priority.value }))}
                    className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                      formData.priority === priority.value
                        ? `${priority.color} text-white`
                        : 'bg-[#1A1A1A] border border-[#2A2A2A] text-gray-400 hover:border-[#333333]'
                    }`}
                  >
                    {priority.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs text-gray-400 mb-2">Category</label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 pr-10 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-vercel-blue focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
                >
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-xs text-gray-400 mb-2">Due Date (optional)</label>
            <input
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-vercel-blue focus:border-transparent transition-all duration-300"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-xs">{error}</div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-vercel-blue hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {loading ? (
              'Adding...'
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add Task
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskInput;


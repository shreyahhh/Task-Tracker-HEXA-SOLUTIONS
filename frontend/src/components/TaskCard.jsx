import { Check, Edit2, Trash2, Calendar, Tag } from 'lucide-react';
import { useState } from 'react';
import { useTasks } from '../context/TaskContext.jsx';
import { PRIORITIES } from '../utils/constants.js';
import { formatDate } from '../utils/helpers.js';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const { toggleComplete } = useTasks();
  const [isHovered, setIsHovered] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const priority = PRIORITIES.find(p => p.value === task.priority);
  const dateInfo = formatDate(task.due_date);

  const handleToggleComplete = async () => {
    setIsCompleting(true);
    await toggleComplete(task.id);
    setIsCompleting(false);
  };

  return (
    <div
      className={`bg-[#111111] border rounded-lg p-4 transition-all duration-300 ${
        task.is_completed
          ? 'border-[#2A2A2A] opacity-50'
          : 'border-[#2A2A2A] hover:border-vercel-blue hover:shadow-md'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-4">
        {/* Checkbox */}
        <button
          onClick={handleToggleComplete}
          disabled={isCompleting}
          className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            task.is_completed
              ? 'bg-vercel-blue border-vercel-blue'
              : 'border-gray-500 hover:border-vercel-blue'
          } ${isCompleting ? 'opacity-50 cursor-wait' : 'cursor-pointer'}`}
          aria-label={task.is_completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.is_completed && <Check className="w-3 h-3 text-white" />}
        </button>

        {/* Content - Title and Description */}
        <div className="flex-1 min-w-0">
          <h3
            className={`text-sm font-medium mb-1 ${
              task.is_completed
                ? 'line-through text-gray-500'
                : 'text-white'
            }`}
          >
            {task.title}
          </h3>

          {task.description && (
            <p className="text-xs text-gray-400">
              {task.description}
            </p>
          )}
        </div>

        {/* Tags - Right Side */}
        <div className="flex-shrink-0 flex flex-col items-end gap-2">
          <div className="flex flex-wrap items-center justify-end gap-1.5">
            {/* Priority Badge */}
            <span
              className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-medium ${
                priority?.color || 'bg-gray-500'
              } text-white`}
            >
              {priority?.label || task.priority}
            </span>

            {/* Category Badge */}
            {task.category && (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-medium bg-[#1A1A1A] text-gray-400 border border-[#2A2A2A]">
                <Tag className="w-2.5 h-2.5" />
                {task.category}
              </span>
            )}

            {/* Due Date */}
            {dateInfo && (
              <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-medium ${dateInfo.color}`}>
                <Calendar className="w-2.5 h-2.5" />
                {dateInfo.text}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div
            className={`flex gap-1 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button
              onClick={() => onEdit(task)}
              className="p-1.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-gray-400 hover:text-white hover:border-[#333333] transition-all duration-300"
              aria-label="Edit task"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(task)}
              className="p-1.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded text-gray-400 hover:text-red-500 hover:border-red-500 transition-all duration-300"
              aria-label="Delete task"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;


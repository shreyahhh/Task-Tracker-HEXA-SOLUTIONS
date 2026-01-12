import { CheckSquare2, FileText } from 'lucide-react';
import { useTasks } from '../context/TaskContext.jsx';

const Navbar = ({ onDocumentationClick }) => {
  const { tasks, stats } = useTasks();
  const todayCompleted = tasks?.filter(task => {
    if (!task.is_completed) return false;
    const completedDate = new Date(task.updated_at);
    const today = new Date();
    return completedDate.toDateString() === today.toDateString();
  }).length || 0;

  return (
    <nav className="sticky top-0 z-50 bg-black border-b border-[#2A2A2A] backdrop-blur-sm bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <div className="flex items-center gap-1.5">
            <CheckSquare2 className="w-5 h-5 text-vercel-blue" />
            <span className="text-base font-bold text-white">TaskFlow</span>
          </div>

          {/* Stats */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-xs text-gray-400">
              <span className="text-white font-medium">{todayCompleted}</span> completed today
            </div>
          </div>

          {/* Documentation Icon */}
          <button
            onClick={onDocumentationClick}
            className="p-2 hover:bg-[#111111] rounded-lg transition-colors duration-300"
            aria-label="Open documentation"
            title="View Documentation"
          >
            <FileText className="w-5 h-5 text-gray-400 hover:text-white" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


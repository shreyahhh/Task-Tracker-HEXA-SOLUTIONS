import { useTasks } from '../context/TaskContext.jsx';
import TaskCard from './TaskCard.jsx';
import EmptyState from './EmptyState.jsx';

const TaskList = ({ onEdit, onDelete }) => {
  const { tasks, loading } = useTasks();

  if (loading) {
    return (
      <div>
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5].map(i => (
            <div
              key={i}
              className="bg-[#111111] border border-[#2A2A2A] rounded-lg p-4 animate-pulse"
            >
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 bg-[#1A1A1A] rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-[#1A1A1A] rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-[#1A1A1A] rounded w-full"></div>
                </div>
                <div className="w-24 h-6 bg-[#1A1A1A] rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="pb-4">
      <div className="flex flex-col gap-3">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;


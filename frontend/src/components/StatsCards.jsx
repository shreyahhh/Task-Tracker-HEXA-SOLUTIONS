import { useTasks } from '../context/TaskContext.jsx';

const StatsCards = () => {
  const { stats } = useTasks();

  const statCards = [
    {
      label: 'Total Tasks',
      value: stats.total,
      color: 'text-blue-500'
    },
    {
      label: 'Completed',
      value: stats.completed,
      color: 'text-green-500'
    },
    {
      label: 'Pending',
      value: stats.pending,
      color: 'text-orange-500'
    },
    {
      label: 'Completion Rate',
      value: `${stats.completionRate}%`,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
      <div className="bg-[#111111] border border-[#2A2A2A] rounded-lg p-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-xl md:text-2xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className="text-xs text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsCards;


import { Inbox } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="py-8">
      <div className="text-center">
        <Inbox className="w-12 h-12 text-gray-600 mx-auto mb-3" />
        <h3 className="text-base font-semibold text-white mb-1">No tasks yet</h3>
        <p className="text-sm text-gray-400">Get started by adding your first task</p>
      </div>
    </div>
  );
};

export default EmptyState;


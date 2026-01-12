// Format date for display
export const formatDate = (dateString) => {
  if (!dateString) return null;
  
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const isToday = date.toDateString() === today.toDateString();
  const isTomorrow = date.toDateString() === tomorrow.toDateString();
  const isOverdue = date < today && !isToday;
  
  if (isToday) return { text: 'Today', color: 'text-orange-500' };
  if (isTomorrow) return { text: 'Tomorrow', color: 'text-orange-400' };
  if (isOverdue) return { text: 'Overdue', color: 'text-red-500' };
  
  return {
    text: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined }),
    color: 'text-gray-400'
  };
};

// Check if date is due soon (within 2 days)
export const isDueSoon = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  const today = new Date();
  const diffTime = date - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 0 && diffDays <= 2;
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};


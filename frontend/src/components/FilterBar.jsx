import { Search, X } from 'lucide-react';
import { useTasks } from '../context/TaskContext.jsx';
import { STATUS_OPTIONS, PRIORITIES, CATEGORIES, SORT_OPTIONS } from '../utils/constants.js';
import { debounce } from '../utils/helpers.js';

const FilterBar = () => {
  const { filters, updateFilters, clearFilters, tasks } = useTasks();

  // Get unique categories from tasks
  const availableCategories = [...new Set(tasks.map(task => task.category).filter(Boolean))];
  const allCategories = [...new Set([...CATEGORIES, ...availableCategories])];

  const handleSearchChange = debounce((value) => {
    updateFilters({ search: value });
  }, 300);

  const hasActiveFilters = filters.status !== 'all' || filters.priority || filters.category || filters.search;

  return (
    <div className="mb-3">
      <h2 className="text-lg font-semibold text-white mb-2">Tasks</h2>
      <div className="bg-[#111111] border border-[#2A2A2A] rounded-lg p-2.5">
        <div className="flex flex-col lg:flex-row gap-2">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                defaultValue={filters.search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-vercel-blue focus:border-transparent transition-all duration-300 text-sm"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-1.5">
            {/* Status Filter */}
            <select
              value={filters.status}
              onChange={(e) => updateFilters({ status: e.target.value })}
              className="px-2.5 py-1.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white text-xs focus:outline-none focus:ring-2 focus:ring-vercel-blue focus:border-transparent transition-all duration-300"
            >
              {STATUS_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>

            {/* Priority Filter */}
            <select
              value={filters.priority}
              onChange={(e) => updateFilters({ priority: e.target.value })}
              className="px-2.5 py-1.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white text-xs focus:outline-none focus:ring-2 focus:ring-vercel-blue focus:border-transparent transition-all duration-300"
            >
              <option value="">All Priorities</option>
              {PRIORITIES.map(priority => (
                <option key={priority.value} value={priority.value}>{priority.label}</option>
              ))}
            </select>

            {/* Category Filter */}
            <select
              value={filters.category}
              onChange={(e) => updateFilters({ category: e.target.value })}
              className="px-2.5 py-1.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white text-xs focus:outline-none focus:ring-2 focus:ring-vercel-blue focus:border-transparent transition-all duration-300"
            >
              <option value="">All Categories</option>
              {allCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={filters.sort}
              onChange={(e) => updateFilters({ sort: e.target.value })}
              className="px-2.5 py-1.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white text-xs focus:outline-none focus:ring-2 focus:ring-vercel-blue focus:border-transparent transition-all duration-300"
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-2.5 py-1.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-gray-400 hover:text-white hover:border-[#333333] text-xs transition-all duration-300 flex items-center gap-1.5"
              >
                <X className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;


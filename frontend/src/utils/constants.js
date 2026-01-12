export const PRIORITIES = [
  { value: 'high', label: 'High', color: 'bg-red-500' },
  { value: 'medium', label: 'Medium', color: 'bg-orange-500' },
  { value: 'low', label: 'Low', color: 'bg-green-500' }
];

export const CATEGORIES = [
  'Work',
  'Personal',
  'Shopping',
  'Health',
  'Education',
  'Other'
];

export const SORT_OPTIONS = [
  { value: 'date_newest', label: 'Date (Newest)' },
  { value: 'date_oldest', label: 'Date (Oldest)' },
  { value: 'priority', label: 'Priority' },
  { value: 'alphabetical', label: 'Alphabetical' }
];

export const STATUS_OPTIONS = [
  { value: 'all', label: 'All Tasks' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' }
];

// API Base URL - uses environment variable in production, localhost in development
// If VITE_API_URL is not set in production, it will try to use /api (same domain)
// This requires the environment variable to be set in Vercel for cross-domain backend
export const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');


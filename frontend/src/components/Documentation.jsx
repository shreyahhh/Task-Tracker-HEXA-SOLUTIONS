import { X, Code, Database, Palette, Zap } from 'lucide-react';

const Documentation = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Project Documentation</h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#111111] rounded-lg transition-colors duration-300"
            aria-label="Close documentation"
          >
            <X className="w-6 h-6 text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Overview */}
          <section className="bg-[#111111] border border-[#2A2A2A] rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Overview</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              TaskFlow is a modern, full-stack task management application designed to help you organize 
              your tasks and boost productivity. Built with cutting-edge technologies, it offers a sleek 
              dark theme interface with powerful features for task management.
            </p>
          </section>

          {/* Tech Stack */}
          <section className="bg-[#111111] border border-[#2A2A2A] rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Code className="w-6 h-6 text-vercel-blue" />
              <h2 className="text-2xl font-semibold text-white">Tech Stack</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Frontend */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Frontend</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-vercel-blue rounded-full"></span>
                    <span><strong className="text-white">React 18</strong> - UI Library</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-vercel-blue rounded-full"></span>
                    <span><strong className="text-white">Tailwind CSS</strong> - Styling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-vercel-blue rounded-full"></span>
                    <span><strong className="text-white">Lucide React</strong> - Icons</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-vercel-blue rounded-full"></span>
                    <span><strong className="text-white">Vite</strong> - Build Tool</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-vercel-blue rounded-full"></span>
                    <span><strong className="text-white">Axios</strong> - HTTP Client</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-vercel-blue rounded-full"></span>
                    <span><strong className="text-white">Context API</strong> - State Management</span>
                  </li>
                </ul>
              </div>

              {/* Backend */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Backend</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span><strong className="text-white">Node.js</strong> - Runtime</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span><strong className="text-white">Express.js</strong> - Web Framework</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span><strong className="text-white">JSON File Storage</strong> - Database</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span><strong className="text-white">REST API</strong> - Architecture</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span><strong className="text-white">CORS</strong> - Cross-Origin Support</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="bg-[#111111] border border-[#2A2A2A] rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-semibold text-white">Features</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-white font-semibold">Core Features</h3>
                <ul className="space-y-1 text-gray-400 text-sm">
                  <li>✓ Create, Edit, Delete Tasks</li>
                  <li>✓ Mark Tasks as Complete</li>
                  <li>✓ Priority Levels (High, Medium, Low)</li>
                  <li>✓ Categories & Tags</li>
                  <li>✓ Due Dates with Overdue Indicators</li>
                  <li>✓ Search & Filter Tasks</li>
                  <li>✓ Sort by Date, Priority, Alphabetical</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="text-white font-semibold">Advanced Features</h3>
                <ul className="space-y-1 text-gray-400 text-sm">
                  <li>✓ Real-time Statistics Dashboard</li>
                  <li>✓ Toast Notifications</li>
                  <li>✓ Confirmation Modals</li>
                  <li>✓ Responsive Design</li>
                  <li>✓ Dark Theme UI</li>
                  <li>✓ Smooth Animations</li>
                  <li>✓ Keyboard Shortcuts</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Architecture */}
          <section className="bg-[#111111] border border-[#2A2A2A] rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-6 h-6 text-purple-500" />
              <h2 className="text-2xl font-semibold text-white">Architecture</h2>
            </div>
            
            <div className="space-y-4 text-gray-400 text-sm">
              <div>
                <h3 className="text-white font-semibold mb-2">Frontend Structure</h3>
                <ul className="space-y-1 ml-4">
                  <li>• Component-based architecture with React</li>
                  <li>• Context API for global state management</li>
                  <li>• Custom hooks for reusable logic</li>
                  <li>• Utility functions for helpers and API calls</li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Backend Structure</h3>
                <ul className="space-y-1 ml-4">
                  <li>• RESTful API with Express.js</li>
                  <li>• MVC pattern (Models, Controllers, Routes)</li>
                  <li>• Middleware for validation and error handling</li>
                  <li>• JSON file-based storage (no database setup needed)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Design System */}
          <section className="bg-[#111111] border border-[#2A2A2A] rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="w-6 h-6 text-pink-500" />
              <h2 className="text-2xl font-semibold text-white">Design System</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <h3 className="text-white font-semibold mb-2 text-sm">Colors</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-black border border-[#2A2A2A] rounded"></div>
                    <span className="text-sm text-gray-400">Background</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#111111] border border-[#2A2A2A] rounded"></div>
                    <span className="text-sm text-gray-400">Surface</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-vercel-blue rounded"></div>
                    <span className="text-sm text-gray-400">Primary</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2 text-sm">Typography</h3>
                <div className="space-y-1 text-sm text-gray-400">
                  <p>Font: Inter</p>
                  <p>Headings: Bold</p>
                  <p>Body: Regular</p>
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2 text-sm">Spacing</h3>
                <div className="space-y-1 text-sm text-gray-400">
                  <p>Compact Design</p>
                  <p>Consistent Padding</p>
                  <p>Responsive Gaps</p>
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2 text-sm">Theme</h3>
                <div className="space-y-1 text-sm text-gray-400">
                  <p>Dark Mode</p>
                  <p>Vercel-inspired</p>
                  <p>Modern UI</p>
                </div>
              </div>
            </div>
          </section>

          {/* API Endpoints */}
          <section className="bg-[#111111] border border-[#2A2A2A] rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">API Endpoints</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <code className="px-2 py-1 bg-[#1A1A1A] text-green-400 rounded text-xs">GET</code>
                <code className="text-gray-300 text-sm">/api/tasks</code>
                <span className="text-gray-400">- Get all tasks</span>
              </div>
              <div className="flex items-start gap-3">
                <code className="px-2 py-1 bg-[#1A1A1A] text-blue-400 rounded text-xs">POST</code>
                <code className="text-gray-300 text-sm">/api/tasks</code>
                <span className="text-gray-400">- Create task</span>
              </div>
              <div className="flex items-start gap-3">
                <code className="px-2 py-1 bg-[#1A1A1A] text-yellow-400 rounded text-xs">PUT</code>
                <code className="text-gray-300 text-sm">/api/tasks/:id</code>
                <span className="text-gray-400">- Update task</span>
              </div>
              <div className="flex items-start gap-3">
                <code className="px-2 py-1 bg-[#1A1A1A] text-red-400 rounded text-xs">DELETE</code>
                <code className="text-gray-300 text-sm">/api/tasks/:id</code>
                <span className="text-gray-400">- Delete task</span>
              </div>
              <div className="flex items-start gap-3">
                <code className="px-2 py-1 bg-[#1A1A1A] text-purple-400 rounded text-xs">PATCH</code>
                <code className="text-gray-300 text-sm">/api/tasks/:id/complete</code>
                <span className="text-gray-400">- Toggle completion</span>
              </div>
              <div className="flex items-start gap-3">
                <code className="px-2 py-1 bg-[#1A1A1A] text-cyan-400 rounded text-xs">GET</code>
                <code className="text-gray-300 text-sm">/api/tasks/stats</code>
                <span className="text-gray-400">- Get statistics</span>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-[#2A2A2A] text-center text-gray-400 text-sm">
          <p>TaskFlow - Built with modern web technologies</p>
        </div>
      </div>
    </div>
  );
};

export default Documentation;


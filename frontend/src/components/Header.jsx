import { Moon, Sun, Brain } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header = () => {
  const { darkMode, toggleDarkMode } = useApp();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40 transition-colors animate-slide-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 animate-slide-in">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-2 hover:scale-110 transition-smooth">
              <Brain className="w-8 h-8 text-white animate-pulse-soft" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Smart Study Planner
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Smart productivity for students
              </p>
            </div>
          </div>

          <button
            onClick={toggleDarkMode}
            className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-smooth hover:scale-110 hover:rotate-12"
          >
            {darkMode ? (
              <Sun className="w-6 h-6 text-yellow-500 animate-bounce-gentle" />
            ) : (
              <Moon className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

import React from 'react';
import { Moon, Sun, Plus } from 'lucide-react';
import { usePropertyContext } from '../context/PropertyContext';

interface HeaderProps {
  onAddPropertyClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddPropertyClick }) => {
  const { darkMode, toggleDarkMode } = usePropertyContext();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-lime-400 dark:text-white">
              Real Estate Dashboard
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 transform hover:scale-105"
              aria-label="Toggle dark mode"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <button
              onClick={onAddPropertyClick}
              className="inline-flex items-center px-4 py-2 bg-lime-400 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
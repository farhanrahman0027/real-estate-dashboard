import React from 'react';
import { Search } from 'lucide-react';
import { usePropertyContext } from '../context/PropertyContext';
import { PropertyType } from '../types/property';

const FilterBar: React.FC = () => {
  const { filters, updateFilters } = usePropertyContext();

  const propertyTypes: (PropertyType | 'All')[] = [
    'All',
    'Plot',
    'Shed', 
    'Retail Store',
    'Apartment',
    'House',
    'Commercial'
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search properties by name or location..."
              value={filters.searchQuery}
              onChange={(e) => updateFilters({ searchQuery: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            />
          </div>
        </div>
        
        <div className="sm:w-48">
          <select
            value={filters.type}
            onChange={(e) => updateFilters({ type: e.target.value as PropertyType | 'All' })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          >
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                Filter by Type: {type}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
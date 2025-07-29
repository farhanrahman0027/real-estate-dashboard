import React from 'react';
import { MapPin, Eye } from 'lucide-react';
import { Property } from '../types/property';

interface PropertyCardProps {
  property: Property;
  onViewClick: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onViewClick }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 overflow-hidden group">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            {property.name}
          </h3>
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
            {property.type}
          </span>
        </div>
        
        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {property.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            ₹{property.price.toLocaleString()}
          </div>
          <button
            onClick={() => onViewClick(property)}
            className="inline-flex items-center px-3 py-2 bg-lime-400 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
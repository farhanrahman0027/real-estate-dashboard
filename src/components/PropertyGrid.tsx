import React from 'react';
import { usePropertyContext } from '../context/PropertyContext';
import PropertyCard from './PropertyCard';
import { Property } from '../types/property';

interface PropertyGridProps {
  onPropertyView: (property: Property) => void;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({ onPropertyView }) => {
  const { properties, filters } = usePropertyContext();

  const filteredProperties = properties.filter(property => {
    const matchesType = filters.type === 'All' || property.type === filters.type;
    const matchesSearch = filters.searchQuery === '' || 
      property.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(filters.searchQuery.toLowerCase());
    
    return matchesType && matchesSearch;
  });

  if (filteredProperties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 dark:text-gray-400 text-lg mb-2">
          No properties found
        </div>
        <div className="text-gray-400 dark:text-gray-500 text-sm">
          Try adjusting your filters or search criteria
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProperties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onViewClick={onPropertyView}
        />
      ))}
    </div>
  );
};

export default PropertyGrid;
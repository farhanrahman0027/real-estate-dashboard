import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Property, PropertyFilters, PropertyContextType, PropertyType } from '../types/property';
import { mockProperties } from '../data/mockProperties';

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const usePropertyContext = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('usePropertyContext must be used within a PropertyProvider');
  }
  return context;
};

interface PropertyProviderProps {
  children: ReactNode;
}

export const PropertyProvider: React.FC<PropertyProviderProps> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [filters, setFilters] = useState<PropertyFilters>({
    type: 'All',
    searchQuery: '',
  });
  const [darkMode, setDarkMode] = useState(() => {
    // Always start in light mode
    return false;
  });

  useEffect(() => {
    // Save dark mode preference to localStorage
    if (darkMode) {
      localStorage.setItem('darkMode', 'true');
    } else {
      localStorage.setItem('darkMode', 'false');
    }
    
    // Apply or remove dark class to html element
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Initialize theme on component mount
  useEffect(() => {
    // Ensure we start in light mode
    document.documentElement.classList.remove('dark');
  }, []);

  const addProperty = (propertyData: Omit<Property, 'id' | 'createdAt'>) => {
    const newProperty: Property = {
      ...propertyData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };
    setProperties(prev => [newProperty, ...prev]);
  };

  const updateFilters = (newFilters: Partial<PropertyFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const value: PropertyContextType = {
    properties,
    filters,
    darkMode,
    addProperty,
    updateFilters,
    toggleDarkMode,
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};
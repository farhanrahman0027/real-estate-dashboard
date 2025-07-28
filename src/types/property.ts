export interface Property {
  id: string;
  name: string;
  type: PropertyType;
  location: string;
  price: number;
  description: string;
  fullDescription?: string;
  image?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  createdAt: Date;
}

export type PropertyType = 'Plot' | 'Shed' | 'Retail Store' | 'Apartment' | 'House' | 'Commercial';

export interface PropertyFilters {
  type: PropertyType | 'All';
  searchQuery: string;
}

export interface PropertyContextType {
  properties: Property[];
  filters: PropertyFilters;
  darkMode: boolean;
  addProperty: (property: Omit<Property, 'id' | 'createdAt'>) => void;
  updateFilters: (filters: Partial<PropertyFilters>) => void;
  toggleDarkMode: () => void;
}
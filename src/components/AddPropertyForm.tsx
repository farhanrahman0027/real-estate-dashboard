import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { usePropertyContext } from '../context/PropertyContext';
import { PropertyType } from '../types/property';

interface AddPropertyFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPropertyForm: React.FC<AddPropertyFormProps> = ({ isOpen, onClose }) => {
  const { addProperty } = usePropertyContext();
  const [formData, setFormData] = useState({
    name: '',
    type: 'Plot' as PropertyType,
    location: '',
    price: '',
    description: '',
    fullDescription: '',
    image: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const propertyTypes: PropertyType[] = ['Plot', 'Shed', 'Retail Store', 'Apartment', 'House', 'Commercial'];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Property name is required';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    addProperty({
      name: formData.name,
      type: formData.type,
      location: formData.location,
      price: Number(formData.price),
      description: formData.description,
      fullDescription: formData.fullDescription || formData.description,
      image: formData.image || 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800',
    });

    // Reset form
    setFormData({
      name: '',
      type: 'Plot',
      location: '',
      price: '',
      description: '',
      fullDescription: '',
      image: '',
    });
    setErrors({});
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto transition-colors duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Add Property</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Property Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="Enter property name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Type *
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            >
              {propertyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                errors.location ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="Enter location"
            />
            {errors.location && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.location}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Price (₹) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                errors.price ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="Enter price"
              min="1"
            />
            {errors.price && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="Enter property description"
            />
            {errors.description && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Detailed Description (Optional)
            </label>
            <textarea
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              placeholder="Enter detailed description for modal view"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Image URL (Optional)
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              placeholder="Enter image URL"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyForm;
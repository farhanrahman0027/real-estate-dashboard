import React from 'react';
import { X, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { Property } from '../types/property';

interface PropertyModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

const PropertyModal: React.FC<PropertyModalProps> = ({ property, isOpen, onClose }) => {
  if (!isOpen || !property) return null;

  const openInGoogleMaps = () => {
    if (property.coordinates) {
      const { lat, lng } = property.coordinates;
      window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
    } else {
      window.open(`https://www.google.com/maps/search/${encodeURIComponent(property.location)}`, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transition-colors duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">View Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              {property.image && (
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800';
                    }}
                  />
                </div>
              )}
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-900 dark:text-white">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{property.location}</span>
                  </div>
                  <button
                    onClick={openInGoogleMaps}
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200"
                  >
                    View on Maps
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {property.name}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                    {property.type}
                  </span>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {property.createdAt.toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price</h4>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  ₹{property.price.toLocaleString()}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</h4>
                <p className="text-gray-900 dark:text-white text-sm leading-relaxed">
                  {property.fullDescription || property.description}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;
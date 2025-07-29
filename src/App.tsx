import  { useState } from 'react';
import { PropertyProvider } from './context/PropertyContext';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import PropertyGrid from './components/PropertyGrid';
import AddPropertyForm from './components/AddPropertyForm';
import PropertyModal from './components/PropertyModal';
import { Property } from './types/property';

function App() {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddPropertyClick = () => {
    setIsAddFormOpen(true);
  };

  const handlePropertyView = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  return (
    <PropertyProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Header onAddPropertyClick={handleAddPropertyClick} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Property Listings
              </h2>
              <FilterBar />
            </div>
            
            <PropertyGrid onPropertyView={handlePropertyView} />
          </div>
        </main>

        <AddPropertyForm
          isOpen={isAddFormOpen}
          onClose={() => setIsAddFormOpen(false)}
        />

        <PropertyModal
          property={selectedProperty}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </PropertyProvider>
  );
}

export default App;
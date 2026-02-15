import React from 'react';
import { TripProvider } from './context/TripContext';
import Header from './components/Header';
import CityItinerary from './components/CityItinerary';
import RestaurantList from './components/RestaurantList';
import ShoppingList from './components/ShoppingList';
import PhotoGallery from './components/PhotoGallery';

function AppContent() {
  return (
    <div className="pb-24">
      <Header />
      <main className="max-w-md mx-auto px-5 py-6 space-y-10">
        <CityItinerary />
        <RestaurantList />
        <ShoppingList />
        <PhotoGallery />
      </main>
    </div>
  );
}

function App() {
  return (
    <TripProvider>
      <AppContent />
    </TripProvider>
  );
}

export default App;

import React, { useState } from 'react';
import { TripProvider } from './context/TripContext';
import Header from './components/Header';
import FlightSchedule from './components/FlightSchedule';
import DailyPlans from './components/DailyPlans';
import Wishlist from './components/Wishlist';
import Tips from './components/Tips';
import { TabType } from './types';
import './App.css';

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabType>('plans');

  const renderTab = () => {
    switch (activeTab) {
      case 'flights':
        return <FlightSchedule />;
      case 'plans':
        return <DailyPlans />;
      case 'wishlist':
        return <Wishlist />;
      case 'tips':
        return <Tips />;
    }
  };

  return (
    <div className="app">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="main-content">{renderTab()}</main>
      <footer className="app-footer">
        <p>Andiamo 2026 - Built with love for your Italian honeymoon</p>
      </footer>
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

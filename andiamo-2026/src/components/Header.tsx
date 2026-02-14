import React from 'react';
import { useTrip } from '../context/TripContext';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  const { state } = useTrip();
  const { tripInfo } = state;

  const tabs: { key: TabType; label: string; icon: string }[] = [
    { key: 'flights', label: 'Flights', icon: 'flight' },
    { key: 'plans', label: 'Plans', icon: 'calendar_today' },
    { key: 'wishlist', label: 'Wishlist', icon: 'bookmark' },
    { key: 'tips', label: 'Tips', icon: 'lightbulb' },
  ];

  const daysUntil = Math.ceil(
    (new Date(tripInfo.startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <header className="header">
      <div className="header-top">
        <h1 className="app-title">{tripInfo.title}</h1>
        <div className="trip-meta">
          <span className="travelers">
            {tripInfo.travelers.join(' & ')}
          </span>
          <span className="date-range">
            {tripInfo.startDate} ~ {tripInfo.endDate}
          </span>
          {daysUntil > 0 && (
            <span className="dday">D-{daysUntil}</span>
          )}
        </div>
      </div>
      <nav className="tab-nav">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => onTabChange(tab.key)}
          >
            <span className="material-icons">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </nav>
    </header>
  );
}

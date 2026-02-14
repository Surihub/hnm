import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';

const CATEGORY_CONFIG: Record<string, { label: string; icon: string; color: string }> = {
  reservation: { label: 'Reservations', icon: 'event_available', color: '#E74C3C' },
  safety: { label: 'Safety', icon: 'shield', color: '#F39C12' },
  shopping: { label: 'Shopping', icon: 'shopping_cart', color: '#9B59B6' },
  update: { label: '2026 Updates', icon: 'new_releases', color: '#3498DB' },
};

export default function Tips() {
  const { state, dispatch } = useTrip();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = Object.keys(CATEGORY_CONFIG);
  const filtered =
    activeCategory === 'all'
      ? state.tips
      : state.tips.filter((t) => t.category === activeCategory);

  const checkedCount = state.tips.filter((t) => t.checked).length;
  const progress = Math.round((checkedCount / state.tips.length) * 100);

  return (
    <div className="tips-section">
      <div className="section-header">
        <span className="material-icons">lightbulb</span>
        <h2>Tips & Checklist</h2>
      </div>
      <p className="section-desc">
        Essential tips for your Italy trip. Check off items as you prepare.
      </p>

      <div className="progress-bar-container">
        <div className="progress-info">
          <span>Preparation Progress</span>
          <span>{checkedCount}/{state.tips.length} ({progress}%)</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="tips-categories">
        <button
          className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          All
        </button>
        {categories.map((cat) => {
          const config = CATEGORY_CONFIG[cat];
          return (
            <button
              key={cat}
              className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              style={activeCategory === cat ? { borderColor: config.color, color: config.color } : {}}
            >
              <span className="material-icons" style={{ fontSize: '16px' }}>{config.icon}</span>
              {config.label}
            </button>
          );
        })}
      </div>

      <div className="tips-list">
        {filtered.map((tip) => {
          const config = CATEGORY_CONFIG[tip.category];
          return (
            <div
              key={tip.id}
              className={`tip-card ${tip.checked ? 'checked' : ''}`}
              onClick={() => dispatch({ type: 'TOGGLE_TIP', payload: tip.id })}
            >
              <div className="tip-check" style={{ borderColor: config.color }}>
                {tip.checked && (
                  <span className="material-icons" style={{ color: config.color }}>check</span>
                )}
              </div>
              <div className="tip-content">
                <div className="tip-header">
                  <span className="tip-title">{tip.title}</span>
                  <span
                    className="tip-category-badge"
                    style={{ backgroundColor: config.color + '20', color: config.color }}
                  >
                    {config.label}
                  </span>
                </div>
                <p className="tip-text">{tip.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

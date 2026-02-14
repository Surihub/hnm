import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { WishlistItem } from '../types';

const CATEGORY_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  hotel: { label: '숙소', icon: 'hotel', color: '#4A90D9' },
  restaurant: { label: '식당', icon: 'restaurant', color: '#E67E22' },
  tour: { label: '투어', icon: 'tour', color: '#27AE60' },
  shopping: { label: '쇼핑', icon: 'shopping_bag', color: '#9B59B6' },
  transport: { label: '교통', icon: 'directions_bus', color: '#7F8C8D' },
  other: { label: '기타', icon: 'bookmark', color: '#95A5A6' },
};

function WishlistCard({ item }: { item: WishlistItem }) {
  const { dispatch } = useTrip();
  const [editing, setEditing] = useState(false);
  const [url, setUrl] = useState(item.url);
  const [note, setNote] = useState(item.note);
  const [category, setCategory] = useState(item.category);

  const cat = CATEGORY_LABELS[item.category];

  const handleSave = () => {
    dispatch({
      type: 'UPDATE_WISHLIST',
      payload: { id: item.id, item: { url, note, category: category as WishlistItem['category'] } },
    });
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="wishlist-card editing">
        <input
          type="url"
          placeholder="URL (https://...)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="메모"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value as WishlistItem['category'])}>
          {Object.entries(CATEGORY_LABELS).map(([key, val]) => (
            <option key={key} value={key}>{val.label}</option>
          ))}
        </select>
        <div className="form-actions">
          <button className="btn-primary" onClick={handleSave}>Save</button>
          <button className="btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`wishlist-card ${item.confirmed ? 'confirmed' : ''}`}>
      <div className="wishlist-left">
        <span className="material-icons cat-icon" style={{ color: cat.color }}>
          {cat.icon}
        </span>
        <div className="wishlist-info">
          <span className="wishlist-note">{item.note}</span>
          {item.url && (
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="wishlist-url">
              {item.url.length > 40 ? item.url.substring(0, 40) + '...' : item.url}
            </a>
          )}
          <span className="wishlist-added">Added by {item.addedBy}</span>
        </div>
      </div>
      <div className="wishlist-actions">
        <button
          className={`confirm-btn ${item.confirmed ? 'active' : ''}`}
          onClick={() => dispatch({ type: 'CONFIRM_WISHLIST', payload: item.id })}
          title={item.confirmed ? 'Unconfirm' : 'Confirm'}
        >
          <span className="material-icons">
            {item.confirmed ? 'check_circle' : 'radio_button_unchecked'}
          </span>
          <span>{item.confirmed ? '확정' : '미정'}</span>
        </button>
        <button className="icon-btn" onClick={() => setEditing(true)} title="Edit">
          <span className="material-icons">edit</span>
        </button>
        <button
          className="icon-btn delete"
          onClick={() => dispatch({ type: 'DELETE_WISHLIST', payload: item.id })}
          title="Delete"
        >
          <span className="material-icons">delete_outline</span>
        </button>
      </div>
    </div>
  );
}

function AddWishlistForm({ onClose }: { onClose: () => void }) {
  const { dispatch } = useTrip();
  const [url, setUrl] = useState('');
  const [note, setNote] = useState('');
  const [category, setCategory] = useState<WishlistItem['category']>('other');
  const [addedBy, setAddedBy] = useState('UserA');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;
    dispatch({
      type: 'ADD_WISHLIST',
      payload: { url, note, category: category as WishlistItem['category'], addedBy, targetDate: '' },
    });
    onClose();
  };

  return (
    <form className="add-wishlist-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="메모/설명"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        autoFocus
      />
      <input
        type="url"
        placeholder="URL (선택)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <div className="form-row">
        <select value={category} onChange={(e) => setCategory(e.target.value as WishlistItem['category'])}>
          {Object.entries(CATEGORY_LABELS).map(([key, val]) => (
            <option key={key} value={key}>{val.label}</option>
          ))}
        </select>
        <select value={addedBy} onChange={(e) => setAddedBy(e.target.value)}>
          <option value="UserA">UserA</option>
          <option value="UserB">UserB</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn-primary">Add</button>
        <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
}

export default function Wishlist() {
  const { state } = useTrip();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all'
    ? state.wishlist
    : filter === 'confirmed'
    ? state.wishlist.filter((w) => w.confirmed)
    : filter === 'pending'
    ? state.wishlist.filter((w) => !w.confirmed)
    : state.wishlist.filter((w) => w.category === filter);

  const confirmedCount = state.wishlist.filter((w) => w.confirmed).length;

  return (
    <div className="wishlist-section">
      <div className="section-header">
        <span className="material-icons">bookmark</span>
        <h2>Shared Wishlist</h2>
        <span className="let-badge">let</span>
      </div>
      <p className="section-desc">
        Save hotel, restaurant, and tour links. Confirm items to move them to your plan.
      </p>

      <div className="wishlist-stats">
        <span>{state.wishlist.length} items</span>
        <span className="divider">|</span>
        <span className="confirmed-stat">{confirmedCount} confirmed</span>
      </div>

      <div className="filter-bar">
        {['all', 'confirmed', 'pending', ...Object.keys(CATEGORY_LABELS)].map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All' : f === 'confirmed' ? 'Confirmed' : f === 'pending' ? 'Pending' :
             CATEGORY_LABELS[f]?.label || f}
          </button>
        ))}
      </div>

      <div className="wishlist-list">
        {filtered.map((item) => (
          <WishlistCard key={item.id} item={item} />
        ))}
        {filtered.length === 0 && (
          <p className="empty-message">No items in this category.</p>
        )}
      </div>

      {showForm ? (
        <AddWishlistForm onClose={() => setShowForm(false)} />
      ) : (
        <button className="add-spot-btn" onClick={() => setShowForm(true)}>
          <span className="material-icons">add</span>
          <span>Add to Wishlist</span>
        </button>
      )}
    </div>
  );
}

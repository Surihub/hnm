import React, { useState } from 'react';
import { useTrip } from '../context/TripContext';
import { DailyPlan, Spot } from '../types';

const CATEGORY_ICONS: Record<string, string> = {
  sightseeing: 'museum',
  restaurant: 'restaurant',
  shopping: 'shopping_bag',
  photo: 'photo_camera',
  activity: 'directions_run',
  transport: 'directions_bus',
};

const CATEGORY_COLORS: Record<string, string> = {
  sightseeing: '#4A90D9',
  restaurant: '#E67E22',
  shopping: '#9B59B6',
  photo: '#E91E63',
  activity: '#27AE60',
  transport: '#7F8C8D',
};

const CITY_EMOJI: Record<string, string> = {
  Rome: '🏛️',
  Verona: '🏰',
  Florence: '🌸',
  'Rome → ICN': '✈️',
};

function SpotItem({
  spot,
  planId,
  onEdit,
}: {
  spot: Spot;
  planId: string;
  onEdit: (spot: Spot) => void;
}) {
  const { dispatch } = useTrip();

  return (
    <div className={`spot-item ${spot.completed ? 'completed' : ''}`}>
      <button
        className="spot-check"
        onClick={() => dispatch({ type: 'TOGGLE_SPOT', payload: { planId, spotId: spot.id } })}
        style={{ borderColor: CATEGORY_COLORS[spot.category] }}
      >
        {spot.completed && <span className="material-icons">check</span>}
      </button>
      <div className="spot-content">
        <div className="spot-name">
          <span
            className="material-icons spot-icon"
            style={{ color: CATEGORY_COLORS[spot.category] }}
          >
            {CATEGORY_ICONS[spot.category]}
          </span>
          <span className={spot.completed ? 'line-through' : ''}>{spot.name}</span>
        </div>
        {spot.note && <p className="spot-note">{spot.note}</p>}
        {spot.time && <span className="spot-time">{spot.time}</span>}
      </div>
      <div className="spot-actions">
        <button className="icon-btn" onClick={() => onEdit(spot)} title="Edit">
          <span className="material-icons">edit</span>
        </button>
        <button
          className="icon-btn delete"
          onClick={() => dispatch({ type: 'DELETE_SPOT', payload: { planId, spotId: spot.id } })}
          title="Delete"
        >
          <span className="material-icons">delete_outline</span>
        </button>
      </div>
    </div>
  );
}

function AddSpotForm({ planId, onClose, editSpot }: { planId: string; onClose: () => void; editSpot?: Spot }) {
  const { dispatch } = useTrip();
  const [name, setName] = useState(editSpot?.name || '');
  const [category, setCategory] = useState<Spot['category']>(editSpot?.category || 'sightseeing');
  const [note, setNote] = useState(editSpot?.note || '');
  const [time, setTime] = useState(editSpot?.time || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editSpot) {
      dispatch({
        type: 'UPDATE_SPOT',
        payload: { planId, spotId: editSpot.id, spot: { name, category: category as Spot['category'], note, time } },
      });
    } else {
      dispatch({
        type: 'ADD_SPOT',
        payload: { planId, spot: { name, category: category as Spot['category'], note, time } },
      });
    }
    onClose();
  };

  return (
    <form className="add-spot-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="장소/활동 이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
      />
      <select value={category} onChange={(e) => setCategory(e.target.value as Spot['category'])}>
        <option value="sightseeing">관광</option>
        <option value="restaurant">식당</option>
        <option value="shopping">쇼핑</option>
        <option value="photo">포토</option>
        <option value="activity">액티비티</option>
        <option value="transport">이동</option>
      </select>
      <input
        type="text"
        placeholder="메모 (선택)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <input
        type="text"
        placeholder="시간 (선택, 예: 10:00)"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {editSpot ? '수정' : '추가'}
        </button>
        <button type="button" className="btn-secondary" onClick={onClose}>
          취소
        </button>
      </div>
    </form>
  );
}

function DayCard({ plan }: { plan: DailyPlan }) {
  const { dispatch } = useTrip();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editSpot, setEditSpot] = useState<Spot | undefined>(undefined);
  const [expanded, setExpanded] = useState(true);

  const date = new Date(plan.date);
  const dayOfWeek = date.toLocaleDateString('ko-KR', { weekday: 'short' });
  const dayNum = Math.ceil(
    (date.getTime() - new Date('2026-03-01').getTime()) / (1000 * 60 * 60 * 24) + 1
  );
  const completedCount = plan.spots.filter((s) => s.completed).length;

  const handleEditSpot = (spot: Spot) => {
    setEditSpot(spot);
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditSpot(undefined);
  };

  const moveSpot = (index: number, direction: 'up' | 'down') => {
    const newSpots = [...plan.spots];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= newSpots.length) return;
    [newSpots[index], newSpots[newIndex]] = [newSpots[newIndex], newSpots[index]];
    dispatch({ type: 'REORDER_SPOTS', payload: { planId: plan.id, spots: newSpots } });
  };

  return (
    <div className="day-card">
      <div className="day-header" onClick={() => setExpanded(!expanded)}>
        <div className="day-info">
          <span className="day-number">Day {dayNum}</span>
          <span className="day-date">
            {date.getMonth() + 1}/{date.getDate()} ({dayOfWeek})
          </span>
          <span className="day-city">
            {CITY_EMOJI[plan.city] || '📍'} {plan.city}
          </span>
        </div>
        <div className="day-meta">
          <span className="spot-count">
            {completedCount}/{plan.spots.length}
          </span>
          <span className="material-icons expand-icon">
            {expanded ? 'expand_less' : 'expand_more'}
          </span>
        </div>
      </div>

      {expanded && (
        <div className="day-body">
          {plan.transport && (
            <div className="transport-info">
              <span className="material-icons">train</span>
              <span>{plan.transport}</span>
            </div>
          )}

          {plan.accommodation && (
            <div className={`accommodation-info status-${plan.accommodation.status}`}>
              <span className="material-icons">hotel</span>
              <div className="accom-details">
                <span className="accom-name">{plan.accommodation.name}</span>
                <span className={`status-badge ${plan.accommodation.status}`}>
                  {plan.accommodation.status === 'pending' ? '미정' :
                   plan.accommodation.status === 'confirmed' ? '확정' : '취소'}
                </span>
              </div>
            </div>
          )}

          <div className="spots-list">
            {plan.spots.map((spot, index) => (
              <div key={spot.id} className="spot-wrapper">
                <div className="reorder-btns">
                  <button
                    className="reorder-btn"
                    onClick={() => moveSpot(index, 'up')}
                    disabled={index === 0}
                  >
                    <span className="material-icons">keyboard_arrow_up</span>
                  </button>
                  <button
                    className="reorder-btn"
                    onClick={() => moveSpot(index, 'down')}
                    disabled={index === plan.spots.length - 1}
                  >
                    <span className="material-icons">keyboard_arrow_down</span>
                  </button>
                </div>
                <SpotItem spot={spot} planId={plan.id} onEdit={handleEditSpot} />
              </div>
            ))}
          </div>

          {plan.notes && (
            <div className="plan-notes">
              <span className="material-icons">info_outline</span>
              <span>{plan.notes}</span>
            </div>
          )}

          {showAddForm ? (
            <AddSpotForm planId={plan.id} onClose={handleCloseForm} editSpot={editSpot} />
          ) : (
            <button className="add-spot-btn" onClick={() => setShowAddForm(true)}>
              <span className="material-icons">add</span>
              <span>Add Spot</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function DailyPlans() {
  return (
    <div className="daily-plans">
      <div className="section-header">
        <span className="material-icons">calendar_today</span>
        <h2>Daily Plans</h2>
        <span className="let-badge">let</span>
      </div>
      <p className="section-desc">
        Tap a spot to mark as complete. Use arrows to reorder. Add new spots freely.
      </p>
      <PlansList />
    </div>
  );
}

function PlansList() {
  const { state } = useTrip();
  return (
    <div className="plans-list">
      {state.dailyPlans.map((plan) => (
        <DayCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
}

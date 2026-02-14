import React from 'react';
import { useTrip } from '../context/TripContext';
import { FixedTransport } from '../types';

function FlightCard({ flight }: { flight: FixedTransport }) {
  const depDate = new Date(flight.depTime);
  const arrDate = new Date(flight.arrTime);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });
  const formatDate = (d: Date) =>
    d.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric', weekday: 'short' });

  const durationMs = arrDate.getTime() - depDate.getTime();
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <div className={`flight-card ${flight.direction === 'IN' ? 'inbound' : 'outbound'}`}>
      <div className="flight-badge">
        <span className="material-icons">
          {flight.direction === 'IN' ? 'flight_takeoff' : 'flight_land'}
        </span>
        <span>{flight.direction === 'IN' ? '출국' : '귀국'}</span>
      </div>

      <div className="flight-header">
        <span className="flight-no">{flight.flightNo}</span>
        <span className="flight-date">{formatDate(depDate)}</span>
        {flight.seat && <span className="seat-badge">Seat {flight.seat}</span>}
      </div>

      <div className="flight-route">
        <div className="airport departure">
          <span className="time">{formatTime(depDate)}</span>
          <span className="code">{flight.depAirport}</span>
        </div>

        <div className="flight-line">
          <div className="duration">
            {hours > 0 ? `${hours}h ` : ''}{minutes}m
          </div>
          <div className="line">
            <span className="dot"></span>
            <span className="dash"></span>
            <span className="material-icons plane-icon">flight</span>
            <span className="dash"></span>
            <span className="dot"></span>
          </div>
        </div>

        <div className="airport arrival">
          <span className="time">{formatTime(arrDate)}</span>
          <span className="code">{flight.arrAirport}</span>
          {formatDate(arrDate) !== formatDate(depDate) && (
            <span className="next-day">+1</span>
          )}
        </div>
      </div>

      <div className="flight-footer">
        <span className="material-icons lock-icon">lock</span>
        <span className="readonly-label">Fixed Schedule (Read Only)</span>
      </div>
    </div>
  );
}

export default function FlightSchedule() {
  const { state } = useTrip();

  return (
    <div className="flight-schedule">
      <div className="section-header">
        <span className="material-icons">flight</span>
        <h2>Flight Schedule</h2>
        <span className="const-badge">const</span>
      </div>
      <p className="section-desc">
        Flight schedules are fixed and cannot be modified.
      </p>
      <div className="flight-list">
        {state.fixedTransport.map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
      </div>
    </div>
  );
}

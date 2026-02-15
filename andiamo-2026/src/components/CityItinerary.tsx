import React, { useState, useEffect, useCallback } from 'react';
import { useTrip } from '../context/TripContext';
import { cityGroups } from '../data/seedData';
import { ItineraryDay } from '../types';

declare const lucide: { createIcons: () => void };

function EditModal({
  day,
  onClose,
  onSave,
}: {
  day: ItineraryDay;
  onClose: () => void;
  onSave: (data: { morning: string; afternoon: string; evening: string; note: string }) => void;
}) {
  const [morning, setMorning] = useState(day.morning);
  const [afternoon, setAfternoon] = useState(day.afternoon);
  const [evening, setEvening] = useState(day.evening);
  const [note, setNote] = useState(day.note);

  const handleSave = () => {
    onSave({ morning, afternoon, evening, note });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-11/12 max-w-sm rounded-[2rem] shadow-2xl overflow-hidden p-6">
        <h3 className="text-xl font-bold mb-4">{day.date} 일정</h3>
        <div className="space-y-4">
          <div className="grid gap-2">
            <label className="text-[11px] font-bold text-gray-400 uppercase">오전/오후/저녁</label>
            <input
              type="text"
              placeholder="오전 일정"
              value={morning}
              onChange={(e) => setMorning(e.target.value)}
              className="bg-gray-50 border-none rounded-xl p-3 text-sm w-full outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="text"
              placeholder="오후 일정"
              value={afternoon}
              onChange={(e) => setAfternoon(e.target.value)}
              className="bg-gray-50 border-none rounded-xl p-3 text-sm w-full outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="text"
              placeholder="저녁 일정"
              value={evening}
              onChange={(e) => setEvening(e.target.value)}
              className="bg-gray-50 border-none rounded-xl p-3 text-sm w-full outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-[11px] font-bold text-gray-400 uppercase">숙소/지도/메모</label>
            <textarea
              rows={3}
              placeholder="구글 지도 링크 등을 붙여넣으세요"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="bg-gray-50 border-none rounded-xl p-3 text-sm w-full outline-none focus:ring-2 focus:ring-blue-300 resize-none"
            />
          </div>
          <button
            onClick={handleSave}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-colors"
          >
            일정 저장하기
          </button>
        </div>
      </div>
    </div>
  );
}

function DayCard({ day, onEdit }: { day: ItineraryDay; onEdit: (dayId: string) => void }) {
  const noteWithLink = day.note.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1" target="_blank" class="text-blue-500 underline" onclick="event.stopPropagation()">지도보기</a>'
  );

  return (
    <div
      className="city-card rounded-3xl p-5 shadow-sm border border-slate-200 cursor-pointer active:scale-95 transition-all"
      onClick={() => onEdit(day.id)}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase">{day.date}</p>
          <h4 className="text-md font-bold text-slate-800">{day.title}</h4>
        </div>
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
          <i data-lucide="edit-3" className="w-3.5 h-3.5 text-slate-400"></i>
        </div>
      </div>
      <div className="space-y-2 text-xs text-slate-600">
        <div className="flex gap-2">
          <b>🌅</b> <span className="truncate">{day.morning || '-'}</span>
        </div>
        <div className="flex gap-2">
          <b>☀️</b> <span className="truncate">{day.afternoon || '-'}</span>
        </div>
        <div className="flex gap-2">
          <b>🌙</b> <span className="truncate">{day.evening || '-'}</span>
        </div>
      </div>
      {day.note && (
        <div
          className="mt-4 pt-3 border-t border-slate-100 text-[10px] text-slate-400 italic"
          dangerouslySetInnerHTML={{ __html: noteWithLink }}
        />
      )}
    </div>
  );
}

export default function CityItinerary() {
  const { state, dispatch } = useTrip();
  const [editDayId, setEditDayId] = useState<string | null>(null);

  const refreshIcons = useCallback(() => {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }, []);

  useEffect(() => {
    refreshIcons();
  }, [state.itinerary, refreshIcons]);

  const handleSave = (data: { morning: string; afternoon: string; evening: string; note: string }) => {
    if (!editDayId) return;
    dispatch({
      type: 'UPDATE_ITINERARY_DAY',
      payload: { dayId: editDayId, data },
    });
  };

  const editDay = editDayId ? state.itinerary[editDayId] : null;

  return (
    <section id="section-itinerary" className="space-y-6">
      <h2 className="text-lg font-bold flex items-center gap-2 px-1">
        <i data-lucide="map" className="w-5 h-5 text-blue-600"></i>
        도시별 상세 일정
      </h2>

      <div className="space-y-8">
        {cityGroups.map((group) => (
          <div key={group.name} className="space-y-3">
            <div className="flex items-end gap-2 px-1">
              <span className="text-2xl font-black text-gray-900">{group.name}</span>
              <span className="text-xs text-gray-400 font-medium mb-1 uppercase tracking-widest">
                {group.eng}
              </span>
            </div>
            <div className="grid gap-4">
              {group.days.map((dayId) => {
                const day = state.itinerary[dayId];
                if (!day) return null;
                return <DayCard key={dayId} day={day} onEdit={setEditDayId} />;
              })}
            </div>
          </div>
        ))}
      </div>

      {editDay && (
        <EditModal
          day={editDay}
          onClose={() => setEditDayId(null)}
          onSave={handleSave}
        />
      )}
    </section>
  );
}

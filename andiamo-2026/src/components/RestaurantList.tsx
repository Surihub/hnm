import React, { useState, useEffect, useCallback } from 'react';
import { useTrip } from '../context/TripContext';
import { v4 as uuidv4 } from 'uuid';

declare const lucide: { createIcons: () => void };

function AddItemModal({ onClose }: { onClose: () => void }) {
  const { dispatch } = useTrip();
  const [name, setName] = useState('');
  const [city, setCity] = useState('로마');
  const [link, setLink] = useState('');

  const handleSave = () => {
    if (!name.trim()) return;
    dispatch({
      type: 'ADD_RESTAURANT',
      payload: { id: uuidv4(), name, city, link, createdAt: Date.now() },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-11/12 max-w-sm rounded-[2rem] shadow-2xl overflow-hidden p-6">
        <h3 className="text-xl font-bold mb-4">맛집 추가하기</h3>
        <div className="space-y-4">
          <div>
            <label className="text-[11px] font-bold text-gray-400 uppercase">도시 선택</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="bg-gray-50 border-none rounded-xl p-3 text-sm w-full mt-1 outline-none"
            >
              <option value="로마">로마 (Rome)</option>
              <option value="베로나">베로나/베네치아 (Verona)</option>
              <option value="피렌체">피렌체 (Florence)</option>
            </select>
          </div>
          <div>
            <label className="text-[11px] font-bold text-gray-400 uppercase">이름</label>
            <input
              type="text"
              placeholder="맛집 이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-50 border-none rounded-xl p-3 text-sm w-full mt-1 outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-gray-400 uppercase">구글 맵/상세 링크</label>
            <input
              type="text"
              placeholder="구글 맵에서 복사한 링크"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="bg-gray-50 border-none rounded-xl p-3 text-sm w-full mt-1 outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>
          <button
            onClick={handleSave}
            className="w-full bg-black text-white font-bold py-4 rounded-2xl hover:bg-gray-800 transition-colors"
          >
            기록하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RestaurantList() {
  const { state, dispatch } = useTrip();
  const [showModal, setShowModal] = useState(false);

  const refreshIcons = useCallback(() => {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }, []);

  useEffect(() => {
    refreshIcons();
  }, [state.restaurants, refreshIcons]);

  const handleDelete = (id: string) => {
    if (window.confirm('삭제하시겠습니까?')) {
      dispatch({ type: 'DELETE_RESTAURANT', payload: id });
    }
  };

  return (
    <section id="section-food" className="space-y-4 pt-4 border-t border-gray-100">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold flex items-center gap-2 text-orange-600">
          <i data-lucide="utensils-crossed" className="w-5 h-5"></i>
          도시별 맛집 저장
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="text-xs bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full font-bold hover:bg-orange-100 transition-colors"
        >
          + 맛집 추가
        </button>
      </div>
      <div className="grid gap-3">
        {state.restaurants.length === 0 ? (
          <p className="text-center py-4 text-xs text-gray-400">
            우리만 아는 맛집을 등록하세요!
          </p>
        ) : (
          state.restaurants.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-bold">
                    {item.city}
                  </span>
                  <span className="text-sm font-bold text-gray-800">{item.name}</span>
                </div>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-blue-500 flex items-center gap-1 mt-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <i data-lucide="map-pin" className="w-3 h-3"></i> 구글지도
                  </a>
                )}
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-gray-300 hover:text-red-400 transition-colors"
              >
                <i data-lucide="x" className="w-4 h-4"></i>
              </button>
            </div>
          ))
        )}
      </div>

      {showModal && <AddItemModal onClose={() => setShowModal(false)} />}
    </section>
  );
}

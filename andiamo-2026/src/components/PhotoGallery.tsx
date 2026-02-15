import React, { useEffect, useCallback, useRef } from 'react';
import { useTrip } from '../context/TripContext';
import { v4 as uuidv4 } from 'uuid';

declare const lucide: { createIcons: () => void };

export default function PhotoGallery() {
  const { state, dispatch } = useTrip();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const refreshIcons = useCallback(() => {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }, []);

  useEffect(() => {
    refreshIcons();
  }, [state.photos, refreshIcons]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target?.result as string;
      if (url) {
        try {
          dispatch({
            type: 'ADD_PHOTO',
            payload: { id: uuidv4(), url, createdAt: Date.now() },
          });
        } catch {
          alert('사진이 너무 큽니다.');
        }
      }
    };
    reader.readAsDataURL(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('사진을 삭제할까요?')) {
      dispatch({ type: 'DELETE_PHOTO', payload: id });
    }
  };

  return (
    <section id="section-photos" className="space-y-4 pt-4 border-t border-gray-100">
      <div className="flex justify-between items-end">
        <h2 className="text-lg font-bold flex items-center gap-2 text-pink-600">
          <i data-lucide="camera" className="w-5 h-5"></i>
          우리의 순간들
        </h2>
        <label className="cursor-pointer bg-pink-50 text-pink-600 text-[11px] px-3 py-1.5 rounded-full font-bold flex items-center gap-1 hover:bg-pink-100 transition-colors">
          <i data-lucide="plus" className="w-3 h-3"></i> 사진 업로드
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {state.photos.length === 0 ? (
          <p className="col-span-2 text-center py-8 text-xs text-gray-400">
            여행 사진을 업로드하세요!
          </p>
        ) : (
          state.photos.map((photo) => (
            <div
              key={photo.id}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gray-100 group"
            >
              <img src={photo.url} alt="" className="w-full h-full object-cover" />
              <button
                onClick={() => handleDelete(photo.id)}
                className="absolute top-3 right-3 bg-black/30 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <i data-lucide="trash-2" className="w-3 h-3"></i>
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

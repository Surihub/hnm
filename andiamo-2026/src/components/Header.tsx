import React, { useEffect } from 'react';

declare const lucide: { createIcons: () => void };

export default function Header() {
  useEffect(() => {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-gray-100">
      <div className="max-w-md mx-auto px-5 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <i data-lucide="palmtree" className="text-emerald-500"></i>
            이탈리아 허니문
          </h1>
          <p className="text-[10px] text-blue-500 font-medium">
            로컬 저장 활성
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scrollToSection('section-shopping')}
            className="p-2 bg-gray-50 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <i data-lucide="shopping-bag" className="w-5 h-5"></i>
          </button>
          <button
            onClick={() => scrollToSection('section-food')}
            className="p-2 bg-gray-50 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <i data-lucide="utensils" className="w-5 h-5"></i>
          </button>
        </div>
      </div>
    </header>
  );
}

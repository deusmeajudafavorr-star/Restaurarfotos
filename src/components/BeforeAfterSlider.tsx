import React, { useState } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.touches[0].clientX, rect);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging && e.buttons !== 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, rect);
  };

  // High quality sample image pair (Vintage B&W vs Restored Color)
  const beforeImg = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop&sat=-100&sepia=80&brightness=-10";
  const afterImg = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop&sat=20";

  return (
    <div className="w-full max-w-lg mx-auto my-6 p-1 rounded-3xl bg-gradient-to-b from-indigo-500/20 via-purple-500/10 to-transparent border border-white/10 backdrop-blur-md shadow-2xl">
      <div className="p-3 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Exemplo de Restauração em Tempo Real</span>
        </div>
      </div>

      <div
        className="relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-ew-resize select-none border border-slate-800 shadow-inner group"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* Restored (After) Image */}
        <img
          src={afterImg}
          alt="Foto Restaurada"
          className="absolute inset-0 w-full h-full object-cover filter contrast-105"
        />
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-[11px] font-bold shadow-md z-10">
          ✨ Restaurada & Colorida
        </div>

        {/* Original (Before) Image with Clip Path */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImg}
            alt="Foto Antiga Original"
            className="absolute inset-0 w-full h-full object-cover max-w-none filter sepia contrast-125 brightness-90"
            style={{ width: '100%', height: '100%' }}
          />
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-700 text-amber-200/90 text-[11px] font-bold shadow-md">
            📜 Foto Antiga (Original)
          </div>
        </div>

        {/* Slider Handle Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border-2 border-white text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
            <MoveHorizontal className="w-4 h-4 text-indigo-300" />
          </div>
        </div>
      </div>

      <div className="p-2.5 text-center text-[11px] text-slate-400 flex items-center justify-between px-4">
        <span>👈 Arraste para comparar</span>
        <span className="text-amber-400 font-semibold">Resolução 4K HD</span>
      </div>
    </div>
  );
};

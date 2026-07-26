import React from 'react';
import { Sparkles } from 'lucide-react';

interface HeaderProps {
  whatsappNumber?: string;
  onOpenSettings?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/70 border-b border-white/10 px-4 py-3 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 text-white shadow-md shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
              RestauraFoto<span className="text-amber-400">IA</span>
            </h1>
            <p className="text-[10px] sm:text-xs text-slate-400 font-medium hidden sm:block">
              Restauração & Animação em Vídeo
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
        </div>
      </div>
    </header>
  );
};


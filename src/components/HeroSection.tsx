import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, ShieldCheck, Sparkles, ArrowRight, Cloud } from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface HeroSectionProps {
  onPhotoSelected: (file: File) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onPhotoSelected,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
  };

  const validateAndProcessFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setErrorMsg('Por favor, selecione apenas imagens no formato JPG, JPEG ou PNG.');
      return;
    }
    setErrorMsg(null);
    onPhotoSelected(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
  };

  return (
    <section className="relative px-4 py-8 sm:py-12 max-w-4xl mx-auto text-center">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Glassmorphism Container */}
      <div className="p-4 sm:p-10 rounded-3xl bg-slate-900/60 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-indigo-950/50">
        
        {/* Promotional Tagline */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-rose-500/10 to-indigo-500/20 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-bold mb-6 shadow-lg shadow-amber-500/5">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
          <span>Inteligência Artificial de Restauração & Vídeo</span>
        </div>

        {/* 1. REQUIRED TITLE */}
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-4 leading-relaxed">
          Veja o resultado primeiro.{' '}
          <span className="bg-emerald-500/25 text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-400/40 shadow-[0_0_15px_rgba(16,185,129,0.25)] font-black inline-block mx-0.5">
            Pague Se gostar
          </span>
          , desbloqueie a versão completa por apenas{' '}
          <span className="text-xs sm:text-sm font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-lg inline-block align-middle ml-1">
            R$ 4,99
          </span>
        </h1>

        {/* 1. REQUIRED SUBTITLE */}
        <p className="text-sm sm:text-base text-slate-300 font-medium max-w-xl mx-auto mb-8 leading-relaxed">
          Envie sua foto abaixo e veja a prévia restaurada em segundos sem compromisso.
        </p>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg, image/jpg, image/png"
          className="hidden"
        />

        {/* Error message if invalid file */}
        {errorMsg && (
          <div className="mb-6 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-sm font-medium animate-bounce">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* 1. UPLOAD DROPZONE / BUTTON AREA */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative group cursor-pointer px-3 sm:px-10 py-6 sm:py-10 rounded-2xl border-2 border-dashed transition-all duration-300 text-center ${
            isDragging
              ? 'border-amber-400 bg-amber-500/10 scale-[1.02]'
              : 'border-indigo-500/30 hover:border-amber-400/80 bg-slate-950/40 hover:bg-slate-900/80 shadow-inner'
          }`}
        >
          {/* Subtle hover laser ring */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

          <div className="flex flex-col items-center justify-center gap-4 relative z-10 w-full">
            {/* Animated Icon Circle */}
            <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-600 p-0.5 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center">
                <Upload className="w-7 h-7 sm:w-10 sm:h-10 text-amber-400 group-hover:text-white transition-colors animate-bounce" />
              </div>
            </div>

            {/* Upload CTA Button - Bouncing / Animated & Mobile Optimized */}
            <button
              type="button"
              className="w-full max-w-sm px-4 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 sm:gap-3 animate-bounce cursor-pointer"
            >
              <ImageIcon className="w-5 h-5 shrink-0" />
              <span className="leading-tight text-center">Clique aqui pra enviar foto agora</span>
              <ArrowRight className="w-5 h-5 shrink-0" />
            </button>

            <p className="text-xs sm:text-sm text-slate-400 font-medium px-2">
              Arraste e solte ou clique para selecionar (Suporta <strong className="text-slate-200">JPG, JPEG, PNG</strong>)
            </p>
          </div>
        </div>

        {/* Guarantees Badges */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="text-xs">
              <strong className="block text-white">Sem Risco</strong>
              <span className="text-slate-400">Veja o teste grátis primeiro</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800 flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />
            <div className="text-xs">
              <strong className="block text-white">Foto + Vídeo HD</strong>
              <span className="text-slate-400">Colorização e movimento IA</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800 flex items-center gap-3">
            <Cloud className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="text-xs">
              <strong className="block text-white">Salvo no ImageKit CDN</strong>
              <span className="text-slate-400">Hospedagem rápida de alta qualidade</span>
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Demonstration Slider */}
      <BeforeAfterSlider />
    </section>
  );
};


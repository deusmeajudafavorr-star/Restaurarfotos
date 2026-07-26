import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { MessageSquare, CheckCircle2, RotateCcw, Copy, Check, ShieldCheck } from 'lucide-react';
import { buildWhatsAppUrl } from '../utils/orderGenerator';
import { ImageKitStatus } from '../types';

interface SuccessViewProps {
  imagePreviewUrl: string;
  whatsappNumber: string;
  imageKitStatus?: ImageKitStatus;
  orderCode: string;
  onReset: () => void;
}

export const SuccessView: React.FC<SuccessViewProps> = ({
  imagePreviewUrl,
  whatsappNumber,
  imageKitStatus,
  orderCode,
  onReset,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#f59e0b', '#6366f1', '#e11d48'],
      });
    } catch (e) {
      console.log('Confetti effect executed');
    }
  }, []);

  const handleWhatsAppClick = () => {
    const url = buildWhatsAppUrl(whatsappNumber, orderCode, imageKitStatus?.uploadedUrl);
    window.open(url, '_blank');
  };

  const handleCopyOrder = () => {
    navigator.clipboard.writeText(orderCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative px-4 py-8 sm:py-12 max-w-2xl mx-auto text-center">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Glassmorphism Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/85 backdrop-blur-2xl border border-emerald-500/30 shadow-2xl shadow-emerald-950/40">
        
        {/* Celebration Badge Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-xl shadow-emerald-500/30 animate-bounce" style={{ animationDuration: '2.5s' }}>
          <div className="w-full h-full rounded-[22px] bg-slate-950 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-400" />
          </div>
        </div>

        {/* 4. REQUIRED HEADING */}
        <h2 className="text-2xl sm:text-4xl font-black text-white mb-3 tracking-tight">
          🎉 Seu vídeo foi gerado com sucesso!
        </h2>

        {/* 4. REQUIRED TEXT */}
        <p className="text-slate-200 text-base sm:text-lg font-medium max-w-lg mx-auto mb-3 leading-relaxed">
          Para receber sua foto restaurada e o vídeo em alta qualidade, clique no botão abaixo.
        </p>

        {/* Circled requested text callout */}
        <div className="mb-6">
          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-300 hover:text-emerald-200 font-extrabold text-sm sm:text-base transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-emerald-950/50 animate-pulse"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400 fill-emerald-400" />
            <span>Clique aqui Receber no whatsapp</span>
          </button>
        </div>

        {/* Dynamic Order Number Display */}
        <div className="mb-8 p-4 rounded-2xl bg-slate-950/70 border border-slate-800 max-w-sm mx-auto flex items-center justify-between gap-3">
          <div className="text-left">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
              Número do Pedido Gerado
            </span>
            <span className="text-xl font-mono font-black text-amber-400 tracking-wider">
              {orderCode}
            </span>
          </div>

          <button
            onClick={handleCopyOrder}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-xs flex items-center gap-1.5"
            title="Copiar código do pedido"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Copiado</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>

        {/* Restored Photo Thumbnail Confirmation (No Video Displayed as requested) */}
        <div className="mb-8 max-w-xs mx-auto relative group">
          <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-xl">
            <img
              src={imagePreviewUrl}
              alt="Foto restaurada"
              className="w-full h-48 object-cover filter brightness-105 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end justify-center p-3">
              <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/40">
                ✨ Foto Restaurada & Vídeo HD Prontos
              </span>
            </div>
          </div>
        </div>

        {/* 4. & 5. REQUIRED GREEN WHATSAPP BUTTON */}
        <div className="space-y-4 max-w-md mx-auto">
          <button
            onClick={handleWhatsAppClick}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-extrabold text-lg sm:text-xl shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
          >
            <MessageSquare className="w-6 h-6 fill-slate-950" />
            <span>Receber no WhatsApp</span>
          </button>

          {/* Guarantee Subtext */}
          <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Garantia de Satisfação: Só pague R$ 4,99 se aprovar o resultado</span>
          </p>
        </div>

        {/* Reset / New Photo Action */}
        <div className="mt-10 pt-6 border-t border-slate-800">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all border border-slate-700"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restaurar outra foto</span>
          </button>
        </div>

      </div>
    </section>
  );
};

import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { MessageSquare, CheckCircle2, RotateCcw, Copy, Check, ShieldCheck } from 'lucide-react';
import { buildWhatsAppUrl } from '../utils/orderGenerator';
import { ImageKitStatus } from '../types';

interface SuccessViewProps {
  imagePreviewUrl: string;
  whatsappNumber: string;
  clientPhone?: string;
  imageKitStatus?: ImageKitStatus;
  orderCode: string;
  onReset: () => void;
}

export const SuccessView: React.FC<SuccessViewProps> = ({
  imagePreviewUrl,
  whatsappNumber,
  clientPhone,
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
    const url = buildWhatsAppUrl(whatsappNumber, orderCode, imageKitStatus?.uploadedUrl, clientPhone);
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

        {/* Success Announcement */}
        <h2 className="text-2xl sm:text-4xl font-black text-white mb-3 tracking-tight">
          🎉 Pedido Confirmado!
        </h2>

        {/* User requested primary message */}
        <div className="p-4 sm:p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 max-w-lg mx-auto mb-6">
          <p className="text-emerald-300 text-lg sm:text-xl font-black leading-relaxed">
            Você receberá o vídeo em instantes no seu WhatsApp, fique ligado!
          </p>
          {clientPhone && (
            <p className="text-xs text-slate-300 mt-2 font-mono">
              📱 Telefone cadastrado: <strong className="text-emerald-400 font-bold">{clientPhone}</strong>
            </p>
          )}
        </div>

        {/* Optional direct WhatsApp button fallback */}
        <div className="mb-6">
          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black text-base sm:text-lg shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-95 cursor-pointer transition-all duration-200"
          >
            <MessageSquare className="w-5 h-5 fill-slate-950 text-slate-950 shrink-0" />
            <span>Falar com Atendimento no WhatsApp</span>
          </button>
        </div>

        {/* Dynamic Order Number Display */}
        <div className="mb-6 p-4 rounded-2xl bg-slate-950/70 border border-slate-800 max-w-sm mx-auto flex items-center justify-between gap-3 text-left">
          <div className="space-y-1">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                Número do Pedido Gerado
              </span>
              <span className="text-xl font-mono font-black text-amber-400 tracking-wider">
                {orderCode}
              </span>
            </div>
          </div>

          <button
            onClick={handleCopyOrder}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-xs flex items-center gap-1.5 cursor-pointer shrink-0"
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

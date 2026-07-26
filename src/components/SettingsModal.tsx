import React, { useState } from 'react';
import { X, PhoneCall, Check, Info } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentNumber: string;
  onSaveNumber: (num: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentNumber,
  onSaveNumber,
}) => {
  const [numInput, setNumInput] = useState(currentNumber);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = numInput.replace(/\D/g, '');
    if (clean) {
      onSaveNumber(clean);
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        onClose();
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Configuração do WhatsApp</h3>
            <p className="text-xs text-slate-400">Número de destino para recebimento dos vídeos</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mb-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Número do WhatsApp (com DDD):
            </label>
            <input
              type="text"
              value={numInput}
              onChange={(e) => setNumInput(e.target.value)}
              placeholder="5599999999999"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
            />
            <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>O número padrão configurado conforme o fluxo é 5599999999999.</span>
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Salvo com sucesso!</span>
              </>
            ) : (
              <span>Salvar Número</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

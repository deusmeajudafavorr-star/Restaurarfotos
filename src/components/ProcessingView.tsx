import React, { useEffect, useState } from 'react';
import { Sparkles, Heart, MessageSquare, Check, Phone } from 'lucide-react';
import { formatPhoneNumber } from '../utils/orderGenerator';

interface ProcessingViewProps {
  imagePreviewUrl: string;
  clientPhone: string;
  onClientPhoneChange: (phone: string) => void;
  onComplete: () => void;
}

export const ProcessingView: React.FC<ProcessingViewProps> = ({
  imagePreviewUrl,
  clientPhone,
  onClientPhoneChange,
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  const isPhoneValid = clientPhone.replace(/\D/g, '').length >= 10;

  // 10 seconds total duration = 10,000ms
  useEffect(() => {
    const totalTimeMs = 10000;
    const intervalMs = 50;
    const stepIncrement = 100 / (totalTimeMs / intervalMs);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + stepIncrement;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, []);

  // When progress reaches 100% AND phone is valid, complete automatically
  useEffect(() => {
    if (progress >= 100 && isPhoneValid) {
      const timer = setTimeout(() => {
        onComplete();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [progress, isPhoneValid, onComplete]);

  // Sync currentStep based on progress (5 steps, 20% each)
  useEffect(() => {
    if (progress < 20) {
      setCurrentStep(1);
    } else if (progress < 40) {
      setCurrentStep(2);
    } else if (progress < 60) {
      setCurrentStep(3);
    } else if (progress < 80) {
      setCurrentStep(4);
    } else {
      setCurrentStep(5);
    }
  }, [progress]);

  // Image filter styles based on stage progression
  const getImageStyle = () => {
    if (currentStep === 1) {
      return 'blur(3px) sepia(25%) brightness(85%) contrast(90%)';
    } else if (currentStep === 2) {
      return 'blur(1.5px) sepia(10%) brightness(95%) contrast(100%)';
    } else if (currentStep === 3) {
      return 'blur(0px) sepia(0%) saturate(115%) brightness(100%)';
    } else {
      return 'blur(0px) saturate(125%) contrast(105%) brightness(102%)';
    }
  };

  return (
    <section className="relative min-h-[520px] flex items-center justify-center px-4 py-8 max-w-2xl mx-auto text-center selection:bg-amber-500 selection:text-slate-950">
      {/* Background Decorative Ambient Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '4s' }} />

      {/* Floating Golden Light Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-amber-300 rounded-full blur-[0.5px] opacity-70 animate-ping"
            style={{
              top: `${(i * 19 + 7) % 90}%`,
              left: `${(i * 23 + 12) % 92}%`,
              animationDuration: `${2.5 + (i % 4)}s`,
              animationDelay: `${(i * 0.4) % 3}s`,
              boxShadow: '0 0 8px #f59e0b',
            }}
          />
        ))}
      </div>

      {/* Main Glass Card */}
      <div className="w-full p-6 sm:p-10 rounded-3xl bg-slate-900/90 backdrop-blur-2xl border border-amber-500/20 shadow-2xl shadow-slate-950/80 relative overflow-hidden">
        
        {/* Subtle Top Accent Line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60" />

        {/* Photo Container with Ken Burns Zoom & Glow Sheen */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-4 rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-[0_0_25px_rgba(245,158,11,0.2)] group transition-all duration-700">
          
          {/* Centered Photo with Ken Burns slow zoom & progressive filter */}
          <img
            src={imagePreviewUrl}
            alt="Lembrança em restauração"
            className="w-full h-full object-cover transition-all duration-1000 ease-out transform"
            style={{
              transform: `scale(${1 + (progress / 100) * 0.12})`, // Ken Burns effect (1.0 -> 1.12)
              filter: getImageStyle(),
            }}
          />

          {/* Light Sheen / Shimmer Overlay Effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-150%] animate-[shimmer_3s_infinite]"
              style={{
                animation: 'shimmer 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }}
            />
          </div>

          {/* Golden Glow Aura Border overlay */}
          <div className="absolute inset-0 ring-1 ring-inset ring-amber-400/20 rounded-2xl pointer-events-none" />

          {/* Floating Subtle Sparkle Badge */}
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-500/30 text-[10px] font-medium text-amber-300 flex items-center gap-1 shadow-lg">
            <Sparkles className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>IA Ativa</span>
          </div>
        </div>

        {/* Emotional Step Text Area with Smooth Fade/Scale */}
        <div className="min-h-[70px] flex flex-col items-center justify-center mb-3 px-2">
          {currentStep === 1 && (
            <div className="animate-fade-in-scale">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-1 flex items-center justify-center gap-2">
                <Heart className="w-4 h-4 text-rose-400 fill-rose-500/30 animate-pulse" />
                <span>Preparando uma lembrança especial...</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-tight">
                Nossa Inteligência Artificial começou a recuperar cada detalhe da sua fotografia.
              </p>
            </div>
          )}

          {currentStep === 2 && (
            <div className="animate-fade-in-scale">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-1 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Revelando nitidez e história...</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-tight">
                Algumas lembranças merecem uma segunda chance.
              </p>
            </div>
          )}

          {currentStep === 3 && (
            <div className="animate-fade-in-scale">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-1 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Cores e emoções ganhando vida...</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-tight">
                Imagine a emoção de quem vai receber essa homenagem.
              </p>
            </div>
          )}

          {currentStep === 4 && (
            <div className="animate-fade-in-scale">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-1 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 animate-bounce" />
                <span>Um toque mágico na sua foto...</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-tight">
                Em instantes, uma memória poderá voltar à vida.
              </p>
            </div>
          )}

          {currentStep === 5 && (
            <div className="animate-fade-in-scale">
              <h2 className="text-lg sm:text-xl font-bold text-amber-300 mb-1 flex items-center justify-center gap-2">
                <span>✨ Estamos finalizando os últimos detalhes...</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-tight font-medium">
                Em poucos instantes você verá uma prévia da transformação.
              </p>
            </div>
          )}
        </div>

        {/* Elegant Progress Bar Container */}
        <div className="max-w-md mx-auto mb-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-1.5 px-1">
            <span className="text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              Transformando memória
            </span>
            <span className="font-mono text-amber-300 font-bold text-sm">
              {Math.round(progress)}%
            </span>
          </div>

          {/* Progress Bar Track */}
          <div className="w-full h-2.5 rounded-full bg-slate-950 p-0.5 border border-amber-500/30 shadow-inner overflow-hidden relative">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-300 transition-all duration-100 ease-out shadow-[0_0_15px_rgba(245,158,11,0.7)] relative"
              style={{ width: `${progress}%` }}
            >
              {/* Glowing leading edge */}
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full shadow-[0_0_10px_#fff]" />
            </div>
          </div>
        </div>

        {/* Client WhatsApp Number Input Card - Appears after 2nd animation phase (currentStep >= 2) */}
        {currentStep >= 2 && (
          <div className={`mt-4 p-3.5 sm:p-4 rounded-2xl bg-slate-950/90 border transition-all text-left max-w-md mx-auto relative z-20 animate-fade-in-scale ${
            progress >= 100 && !isPhoneValid
              ? 'border-amber-500 shadow-2xl shadow-amber-500/20 ring-2 ring-amber-500/50 animate-pulse'
              : 'border-emerald-500/40 shadow-xl'
          }`}>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-white leading-tight flex items-center gap-1.5">
                  <span>Para qual número de WhatsApp podemos enviar seu vídeo?</span>
                  <span className="text-[9px] text-amber-400 font-bold bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-500/30">Obrigatório</span>
                </h4>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Digite seu número com DDD para salvarmos no seu pedido
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <div className="relative flex-1">
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => onClientPhoneChange(formatPhoneNumber(e.target.value))}
                  placeholder="(11) 99999-9999"
                  required
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border text-white font-mono text-sm placeholder:text-slate-500 transition-all outline-none ${
                    progress >= 100 && !isPhoneValid
                      ? 'border-amber-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40'
                      : 'border-slate-700 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30'
                  }`}
                />
              </div>
              {isPhoneValid && (
                <div className="px-3 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-1 shrink-0 animate-fade-in-scale">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Salvo</span>
                </div>
              )}
            </div>

            {progress >= 100 && !isPhoneValid && (
              <p className="text-xs text-amber-300 font-bold mt-2 flex items-center gap-1 animate-bounce">
                <span>⚠️ Digite seu WhatsApp acima para visualizar o resultado.</span>
              </p>
            )}

            {progress >= 100 && isPhoneValid && (
              <button
                type="button"
                onClick={onComplete}
                className="w-full mt-2.5 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/30 cursor-pointer transition-all flex items-center justify-center gap-2 animate-bounce"
              >
                <span>Ver Resultado no WhatsApp</span>
                <Check className="w-4 h-4" />
              </button>
            )}

            <p className="text-[10px] text-slate-400 mt-1.5 flex items-center gap-1">
              <span>🔒 O vídeo será associado ao seu número de telefone para envio seguro no WhatsApp.</span>
            </p>
          </div>
        )}

      </div>

      {/* Shimmer Keyframe CSS injection */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%) rotate(0deg); }
          50% { transform: translateX(150%) rotate(0deg); }
          100% { transform: translateX(150%) rotate(0deg); }
        }
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
          animation: fadeInScale 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

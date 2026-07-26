import React, { useEffect, useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface ProcessingViewProps {
  imagePreviewUrl: string;
  onComplete: () => void;
}

export const ProcessingView: React.FC<ProcessingViewProps> = ({
  imagePreviewUrl,
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  // 10 seconds total duration = 10,000ms
  // Smooth update every 50ms (200 ticks total)
  useEffect(() => {
    const totalTimeMs = 10000;
    const intervalMs = 50;
    const stepIncrement = 100 / (totalTimeMs / intervalMs);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + stepIncrement;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 500);
          return 100;
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [onComplete]);

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
        <div className="relative w-52 h-52 sm:w-64 sm:h-64 mx-auto mb-8 rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-[0_0_35px_rgba(245,158,11,0.2)] group transition-all duration-700">
          
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
          <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-500/30 text-[11px] font-medium text-amber-300 flex items-center gap-1 shadow-lg">
            <Sparkles className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>IA Ativa</span>
          </div>
        </div>

        {/* Emotional Step Text Area with Smooth Fade/Scale */}
        <div className="min-h-[110px] flex flex-col items-center justify-center mb-6 px-2">
          {currentStep === 1 && (
            <div className="animate-fade-in-scale">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                <Heart className="w-5 h-5 text-rose-400 fill-rose-500/30 animate-pulse" />
                <span>Preparando uma lembrança especial...</span>
              </h2>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Nossa Inteligência Artificial começou a recuperar cada detalhe da sua fotografia.
              </p>
            </div>
          )}

          {currentStep === 2 && (
            <div className="animate-fade-in-scale">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Revelando nitidez e história...</span>
              </h2>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Algumas lembranças merecem uma segunda chance.
              </p>
            </div>
          )}

          {currentStep === 3 && (
            <div className="animate-fade-in-scale">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Cores e emoções ganhando vida...</span>
              </h2>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Imagine a emoção de quem vai receber essa homenagem.
              </p>
            </div>
          )}

          {currentStep === 4 && (
            <div className="animate-fade-in-scale">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400 animate-bounce" />
                <span>Um toque mágico na sua foto...</span>
              </h2>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Em instantes, uma memória poderá voltar à vida.
              </p>
            </div>
          )}

          {currentStep === 5 && (
            <div className="animate-fade-in-scale">
              <h2 className="text-xl sm:text-2xl font-bold text-amber-300 mb-2 flex items-center justify-center gap-2">
                <span>✨ Estamos finalizando os últimos detalhes...</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed font-medium">
                Em poucos instantes você verá uma prévia da transformação.
              </p>
            </div>
          )}
        </div>

        {/* Elegant Progress Bar Container */}
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-2 px-1">
            <span className="text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              Transformando memória
            </span>
            <span className="font-mono text-amber-300 font-bold text-sm">
              {Math.round(progress)}%
            </span>
          </div>

          {/* Progress Bar Track */}
          <div className="w-full h-3 rounded-full bg-slate-950 p-0.5 border border-amber-500/30 shadow-inner overflow-hidden relative">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-300 transition-all duration-100 ease-out shadow-[0_0_15px_rgba(245,158,11,0.7)] relative"
              style={{ width: `${progress}%` }}
            >
              {/* Glowing leading edge */}
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full shadow-[0_0_10px_#fff]" />
            </div>
          </div>
        </div>

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

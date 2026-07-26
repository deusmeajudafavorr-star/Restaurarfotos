import React, { useRef, useState, useEffect } from 'react';
import { Upload, Image as ImageIcon, ShieldCheck, Sparkles, ArrowRight, Cloud, MessageSquare, ArrowDown, Camera, X, RefreshCw, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onPhotoSelected: (file: File) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onPhotoSelected,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Live Camera Modal states
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [capturedPhotoUrl, setCapturedPhotoUrl] = useState<string | null>(null);
  const [capturedFile, setCapturedFile] = useState<File | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Modal selection state
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndProcessFile(file);
    }
  };

  const validateAndProcessFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic'];
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Por favor, selecione uma imagem válida (JPG, JPEG, PNG).');
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

  // Start Live Web Camera
  const startCamera = async (facing: 'environment' | 'user' = 'environment') => {
    stopCamera();
    setCameraError(null);
    setCapturedPhotoUrl(null);
    setCapturedFile(null);
    setIsCameraModalOpen(true);

    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: facing },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: any) {
      console.warn('Câmera via getUserMedia indisponível, abrindo suporte nativo:', err);
      // Fallback: use native camera file input
      stopCamera();
      setIsCameraModalOpen(false);
      cameraInputRef.current?.click();
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Capture Photo from Video Stream
  const takeSnap = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          const timestamp = new Date().getTime();
          const file = new File([blob], `foto_camera_${timestamp}.jpg`, { type: 'image/jpeg' });
          setCapturedFile(file);
          setCapturedPhotoUrl(URL.createObjectURL(blob));
        }
      }, 'image/jpeg', 0.95);
    }
  };

  const confirmCapturedPhoto = () => {
    if (capturedFile) {
      stopCamera();
      setIsCameraModalOpen(false);
      validateAndProcessFile(capturedFile);
    }
  };

  const toggleFacingMode = () => {
    const nextFacing = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextFacing);
    startCamera(nextFacing);
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
        <p className="text-sm sm:text-base text-slate-300 font-medium max-w-xl mx-auto mb-4 leading-relaxed">
          Envie sua foto abaixo e veja a prévia restaurada em segundos sem compromisso.
        </p>

        {/* Ver Depoimentos Button */}
        <div className="mb-8 flex justify-center">
          <button
            type="button"
            onClick={() => {
              document.getElementById('depoimentos')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/90 hover:bg-slate-700/90 border border-amber-500/30 text-amber-300 hover:text-amber-200 text-xs sm:text-sm font-semibold transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
          >
            <MessageSquare className="w-4 h-4 text-amber-400" />
            <span>Ver depoimentos</span>
            <ArrowDown className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
          </button>
        </div>

        {/* Hidden File Input for Gallery */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {/* Hidden Camera Input for direct mobile device camera */}
        <input
          type="file"
          ref={cameraInputRef}
          onChange={handleFileChange}
          accept="image/*"
          capture="environment"
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
          onClick={() => setIsOptionModalOpen(true)}
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
              onClick={(e) => {
                e.stopPropagation();
                setIsOptionModalOpen(true);
              }}
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

      {/* SELECT PHOTO SOURCE MODAL (CAMERA VS GALLERY) */}
      {isOptionModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl relative text-center flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOptionModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-600 p-0.5 mx-auto mb-3">
                <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-amber-400" />
                </div>
              </div>
              <h3 className="text-white font-extrabold text-lg sm:text-xl">
                Como deseja enviar sua foto?
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Escolha uma das opções abaixo para continuar
              </p>
            </div>

            {/* OPTIONS (TOP: CAMERA, BOTTOM: GALLERY) */}
            <div className="flex flex-col gap-3">
              
              {/* Option 1 (TOP): Tirar Foto com Câmera */}
              <button
                type="button"
                onClick={() => {
                  setIsOptionModalOpen(false);
                  startCamera('environment');
                }}
                className="w-full px-5 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-base shadow-lg shadow-emerald-500/25 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                <Camera className="w-5 h-5 shrink-0" />
                <span>Tirar Foto com Câmera</span>
              </button>

              {/* Option 2 (BOTTOM): Escolher da Galeria */}
              <button
                type="button"
                onClick={() => {
                  setIsOptionModalOpen(false);
                  fileInputRef.current?.click();
                }}
                className="w-full px-5 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-base shadow-lg shadow-amber-500/25 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                <ImageIcon className="w-5 h-5 shrink-0" />
                <span>Escolher da Galeria</span>
              </button>

            </div>

          </div>
        </div>
      )}

      {/* LIVE CAMERA MODAL */}
      {isCameraModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 max-w-md w-full shadow-2xl relative text-left flex flex-col gap-4">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-emerald-400" />
                <h3 className="text-white font-bold text-base">Câmera ao Vivo</h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  stopCamera();
                  setIsCameraModalOpen(false);
                }}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Camera View / Captured Preview Area */}
            <div className="relative rounded-2xl overflow-hidden bg-black aspect-[3/4] border border-slate-800 flex items-center justify-center">
              {capturedPhotoUrl ? (
                <img
                  src={capturedPhotoUrl}
                  alt="Foto tirada"
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              )}

              {/* Flip camera switch */}
              {!capturedPhotoUrl && (
                <button
                  type="button"
                  onClick={toggleFacingMode}
                  className="absolute top-3 right-3 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 backdrop-blur-md transition-all active:scale-90 cursor-pointer"
                  title="Inverter câmera"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Controls */}
            {capturedPhotoUrl ? (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setCapturedPhotoUrl(null);
                    setCapturedFile(null);
                    startCamera(facingMode);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Tirar Outra</span>
                </button>
                <button
                  type="button"
                  onClick={confirmCapturedPhoto}
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Usar Esta Foto</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={takeSnap}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-base transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25"
                >
                  <Camera className="w-5 h-5" />
                  <span>Capturar Foto</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    stopCamera();
                    setIsCameraModalOpen(false);
                    cameraInputRef.current?.click();
                  }}
                  className="text-xs text-center text-slate-400 hover:text-amber-300 underline py-1"
                >
                  Usar Câmera Nativa do Dispositivo
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import { Star, MessageSquare, CheckCircle2, Heart, ShieldCheck, Volume2, VolumeX } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const videoRef3 = useRef<HTMLVideoElement>(null);

  const [isMuted1, setIsMuted1] = useState(true);
  const [isMuted2, setIsMuted2] = useState(true);
  const [isMuted3, setIsMuted3] = useState(true);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2, // trigger when 20% visible
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const video = entry.target as HTMLVideoElement;
          video.play().catch((err) => console.log('Autoplay prevented:', err));
        } else {
          const video = entry.target as HTMLVideoElement;
          video.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (videoRef1.current) observer.observe(videoRef1.current);
    if (videoRef2.current) observer.observe(videoRef2.current);
    if (videoRef3.current) observer.observe(videoRef3.current);

    return () => {
      if (videoRef1.current) observer.unobserve(videoRef1.current);
      if (videoRef2.current) observer.unobserve(videoRef2.current);
      if (videoRef3.current) observer.unobserve(videoRef3.current);
    };
  }, []);

  const toggleMute1 = () => {
    if (videoRef1.current) {
      videoRef1.current.muted = !videoRef1.current.muted;
      setIsMuted1(videoRef1.current.muted);
    }
  };

  const toggleMute2 = () => {
    if (videoRef2.current) {
      videoRef2.current.muted = !videoRef2.current.muted;
      setIsMuted2(videoRef2.current.muted);
    }
  };

  const toggleMute3 = () => {
    if (videoRef3.current) {
      videoRef3.current.muted = !videoRef3.current.muted;
      setIsMuted3(videoRef3.current.muted);
    }
  };

  return (
    <section id="depoimentos" className="py-16 px-4 max-w-5xl mx-auto w-full scroll-mt-20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold mb-4">
          <MessageSquare className="w-4 h-4 text-amber-400" />
          <span>Depoimentos Reais</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          O que nossos clientes dizem
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Veja a emoção de quem já recuperou fotos históricas de família com a nossa inteligência artificial.
        </p>
      </div>

      {/* Featured Video Testimonials List */}
      <div className="space-y-8 mb-10">
        
        {/* Video Testimonial 1 */}
        <div className="rounded-3xl bg-slate-900/80 border border-amber-500/30 p-6 sm:p-8 shadow-2xl shadow-amber-500/10 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Video Player Column */}
            <div className="lg:col-span-6 w-full">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 shadow-xl group">
                <video
                  ref={videoRef1}
                  autoPlay
                  muted={isMuted1}
                  loop
                  playsInline
                  controls
                  preload="metadata"
                  className="w-full aspect-[9/16] sm:aspect-[4/3] max-h-[420px] object-cover mx-auto bg-black rounded-2xl"
                  src="https://ik.imagekit.io/qujefgkmk/restaurador-pedidos/202602060938.mp4?updatedAt=1785078082347"
                >
                  <source src="https://ik.imagekit.io/qujefgkmk/restaurador-pedidos/202602060938.mp4?updatedAt=1785078082347" type="video/mp4" />
                  Seu navegador não suporta a exibição deste vídeo.
                </video>

                {/* Quick Sound Toggle Button */}
                <button
                  type="button"
                  onClick={toggleMute1}
                  className="absolute bottom-12 right-3 z-20 px-3 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white text-xs font-bold border border-amber-500/40 shadow-lg flex items-center gap-1.5 backdrop-blur-md transition-transform active:scale-95 cursor-pointer"
                >
                  {isMuted1 ? (
                    <>
                      <VolumeX className="w-4 h-4 text-rose-400" />
                      <span>Ativar som</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-emerald-400" />
                      <span>Som ativado</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Comment Details Column */}
            <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-4">
              
              {/* Rating Stars */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
                <span className="ml-2 text-xs font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded">
                  5.0 / 5.0
                </span>
              </div>

              {/* Quote Header */}
              <h3 className="text-lg sm:text-xl font-bold text-white leading-snug flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500/20 shrink-0" />
                <span>"Ficou maravilhoso na reunião de família!"</span>
              </h3>

              {/* Comment Text */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed bg-slate-950/50 p-4 rounded-2xl border border-slate-800/80 italic">
                "Eu esperava fazer uma pequena homenagem e ficou maravilhoso! Paguei R$ 4,99 mas quando vi que poderia estender mais ainda o vídeo valeu a pena criar mais cenas e ter esse resultado com música, e ainda apresentei na reunião de família."
              </p>

              {/* Author Info */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="font-bold text-white text-sm">Depoimento Verificado</p>
                  <p className="text-xs text-slate-400">Restaurado em Alta Definição + Animação</p>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Compra Confirmada</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Video Testimonial 2 */}
        <div className="rounded-3xl bg-slate-900/80 border border-amber-500/30 p-6 sm:p-8 shadow-2xl shadow-amber-500/10 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Video Player Column */}
            <div className="lg:col-span-6 w-full">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 shadow-xl group">
                <video
                  ref={videoRef2}
                  autoPlay
                  muted={isMuted2}
                  loop
                  playsInline
                  controls
                  preload="metadata"
                  className="w-full aspect-[9/16] sm:aspect-[4/3] max-h-[420px] object-cover mx-auto bg-black rounded-2xl"
                  src="https://ik.imagekit.io/qujefgkmk/restaurador-pedidos/PixVerse%20AI%20Video%20Generator%20(4).mp4"
                >
                  <source src="https://ik.imagekit.io/qujefgkmk/restaurador-pedidos/PixVerse%20AI%20Video%20Generator%20(4).mp4" type="video/mp4" />
                  Seu navegador não suporta a exibição deste vídeo.
                </video>

                {/* Quick Sound Toggle Button */}
                <button
                  type="button"
                  onClick={toggleMute2}
                  className="absolute bottom-12 right-3 z-20 px-3 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white text-xs font-bold border border-amber-500/40 shadow-lg flex items-center gap-1.5 backdrop-blur-md transition-transform active:scale-95 cursor-pointer"
                >
                  {isMuted2 ? (
                    <>
                      <VolumeX className="w-4 h-4 text-rose-400" />
                      <span>Ativar som</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-emerald-400" />
                      <span>Som ativado</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Comment Details Column */}
            <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-4">
              
              {/* Rating Stars */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
                <span className="ml-2 text-xs font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded">
                  5.0 / 5.0
                </span>
              </div>

              {/* Quote Header */}
              <h3 className="text-lg sm:text-xl font-bold text-white leading-snug flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500/20 shrink-0" />
                <span>"Extremamente feliz e emocionado com o resultado"</span>
              </h3>

              {/* Comment Text */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed bg-slate-950/50 p-4 rounded-2xl border border-slate-800/80 italic">
                "Emocionado, essa foto já não tinha como lembrar dele em vídeo e quando recebi essa foto em movimento fiquei extremamente feliz e também emocionado com isso"
              </p>

              {/* Author Info */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="font-bold text-white text-sm">Depoimento Verificado</p>
                  <p className="text-xs text-slate-400">Foto Antiga em Movimento + IA</p>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Compra Confirmada</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Video Testimonial 3 */}
        <div className="rounded-3xl bg-slate-900/80 border border-amber-500/30 p-6 sm:p-8 shadow-2xl shadow-amber-500/10 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Video Player Column */}
            <div className="lg:col-span-6 w-full">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 shadow-xl group">
                <video
                  ref={videoRef3}
                  autoPlay
                  muted={isMuted3}
                  loop
                  playsInline
                  controls
                  preload="metadata"
                  className="w-full aspect-[9/16] sm:aspect-[4/3] max-h-[420px] object-cover mx-auto bg-black rounded-2xl"
                  src="https://ik.imagekit.io/qujefgkmk/restaurador-pedidos/202602171337.mp4"
                >
                  <source src="https://ik.imagekit.io/qujefgkmk/restaurador-pedidos/202602171337.mp4" type="video/mp4" />
                  Seu navegador não suporta a exibição deste vídeo.
                </video>

                {/* Quick Sound Toggle Button */}
                <button
                  type="button"
                  onClick={toggleMute3}
                  className="absolute bottom-12 right-3 z-20 px-3 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white text-xs font-bold border border-amber-500/40 shadow-lg flex items-center gap-1.5 backdrop-blur-md transition-transform active:scale-95 cursor-pointer"
                >
                  {isMuted3 ? (
                    <>
                      <VolumeX className="w-4 h-4 text-rose-400" />
                      <span>Ativar som</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-emerald-400" />
                      <span>Som ativado</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Comment Details Column */}
            <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-4">
              
              {/* Rating Stars */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
                <span className="ml-2 text-xs font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded">
                  5.0 / 5.0
                </span>
              </div>

              {/* Quote Header */}
              <h3 className="text-lg sm:text-xl font-bold text-white leading-snug flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500/20 shrink-0" />
                <span>"Valeu a pena criar mais cenas e apresentar na reunião!"</span>
              </h3>

              {/* Comment Text */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed bg-slate-950/50 p-4 rounded-2xl border border-slate-800/80 italic">
                "Eu esperava fazer uma pequena homenagem e ficou maravilhoso! Paguei R$ 4,99 mas quando vi que poderia estender mais ainda o vídeo valeu a pena criar mais cenas e ter esse resultado com música, e ainda apresentei na reunião de família."
              </p>

              {/* Author Info */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="font-bold text-white text-sm">Depoimento Verificado</p>
                  <p className="text-xs text-slate-400">Vídeo Estendido com Música + Homenagem</p>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Compra Confirmada</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Grid of Additional Customer Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            "Enviei uma foto antiga dos meus avós que estava desbotada. O resultado ficou nítido em 4K e ver o movimento nos olhos fez minha mãe chorar de emoção!"
          </p>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-slate-200">Maria Clara S.</span>
            <span className="text-emerald-400 font-medium">✓ R$ 4,99 pago</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
            ))}
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            "Processo rápido demais e você só paga depois que gosta do resultado. Valeu cada centavo para criar o presente de aniversário."
          </p>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-slate-200">João Pedro M.</span>
            <span className="text-emerald-400 font-medium">✓ R$ 4,99 pago</span>
          </div>
        </div>
      </div>

      {/* Trust Guarantee Note */}
      <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>Garantia de Satisfação: Veja o resultado primeiro, pague apenas R$ 4,99 se aprovar.</span>
      </div>
    </section>
  );
};

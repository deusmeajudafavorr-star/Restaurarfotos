import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProcessingView } from './components/ProcessingView';
import { SuccessView } from './components/SuccessView';
import { TestimonialsSection } from './components/TestimonialsSection';
import { SettingsModal } from './components/SettingsModal';
import { uploadToImageKit } from './utils/imagekit';
import { generateOrderCode } from './utils/orderGenerator';
import { AppStep, ImageKitStatus } from './types';
import { Sparkles, Shield, HelpCircle, Cloud } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState<AppStep>('upload');
  const [, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [currentOrderCode, setCurrentOrderCode] = useState<string>('');

  // Default WhatsApp phone number
  const [whatsappNumber, setWhatsappNumber] = useState<string>('5588996056407');

  // ImageKit state
  const [imageKitStatus, setImageKitStatus] = useState<ImageKitStatus>({});

  // Modals state
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Helper for performing upload to ImageKit
  const performImageKitUpload = async (file: File, orderCode: string) => {
    setImageKitStatus({ isUploading: true });
    try {
      const result = await uploadToImageKit(file, file.name, orderCode);
      if (result.success) {
        setImageKitStatus({
          isUploading: false,
          uploadedUrl: result.url,
          fileId: result.fileId,
        });
      } else {
        setImageKitStatus({
          isUploading: false,
          error: result.error,
        });
      }
    } catch (err: any) {
      console.error('Erro no upload para ImageKit:', err);
      setImageKitStatus({
        isUploading: false,
        error: err.message || 'Erro ao enviar para o ImageKit',
      });
    }
  };

  // 1. Photo Selection Handler
  const handlePhotoSelected = async (file: File) => {
    setSelectedFile(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreviewUrl(previewUrl);

    const newOrderCode = generateOrderCode();
    setCurrentOrderCode(newOrderCode);

    // 2. Start processing flow automatically
    setStep('processing');

    // Automatically upload to ImageKit CDN
    performImageKitUpload(file, newOrderCode);
  };

  // 3. Complete 6-second Processing -> Success Transition
  const handleProcessingComplete = () => {
    setStep('success');
  };

  // Reset to initial state
  const handleReset = () => {
    setStep('upload');
    setSelectedFile(null);
    setCurrentOrderCode('');
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
      setImagePreviewUrl(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950 overflow-x-hidden">
      {/* Top Bar Header */}
      <Header
        whatsappNumber={whatsappNumber}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center relative">
        {step === 'upload' && (
          <HeroSection
            onPhotoSelected={handlePhotoSelected}
          />
        )}

        {step === 'processing' && imagePreviewUrl && (
          <ProcessingView
            imagePreviewUrl={imagePreviewUrl}
            onComplete={handleProcessingComplete}
          />
        )}

        {step === 'success' && imagePreviewUrl && (
          <SuccessView
            imagePreviewUrl={imagePreviewUrl}
            whatsappNumber={whatsappNumber}
            imageKitStatus={imageKitStatus}
            orderCode={currentOrderCode}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Testimonials & FAQ Section */}
      {step === 'upload' && (
        <>
          <TestimonialsSection />

          <section className="py-12 px-4 max-w-4xl mx-auto border-t border-slate-900 w-full text-center">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-400" />
              <span>Perguntas Frequentes</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
                <h4 className="font-bold text-sm text-amber-300 mb-1">Como funciona o pagamento de R$ 4,99?</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Você envia sua foto, a IA gera a restauração e o vídeo em movimento. Você visualiza a confirmação e só efetua o pagamento ao receber via WhatsApp.
                </p>
              </div>

            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h4 className="font-bold text-sm text-indigo-300 mb-1">O que vem no resultado?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Você recebe a foto restaurada em alta definição 4K, totalmente colorida e limpa, mais um vídeo MP4 animado com movimento realista do rosto.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h4 className="font-bold text-sm text-emerald-300 mb-1">Onde minhas fotos ficam salvas?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Suas fotos são salvas de forma segura na infraestrutura ImageKit CDN de alta velocidade para entregas rápidas.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h4 className="font-bold text-sm text-orange-300 mb-1">Quais formatos de arquivo posso enviar?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Aceitamos imagens nos formatos JPG, JPEG e PNG, de qualquer resolução ou tamanho.
              </p>
            </div>
          </div>
        </section>
      </>
    )}

      {/* Footer */}
      <footer className="py-6 px-4 bg-slate-950 border-t border-slate-900 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-medium">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400">RestauraFoto IA &copy; 2026. Todos os direitos reservados.</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-400" /> Criptografia Segura
            </span>
            <span className="flex items-center gap-1">
              <Cloud className="w-3.5 h-3.5 text-indigo-400" /> ImageKit CDN
            </span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        currentNumber={whatsappNumber}
        onSaveNumber={(num) => setWhatsappNumber(num)}
      />
    </div>
  );
}


import React, { useState, useRef } from 'react';
import { Plus, Trash2, Copy, ChevronRight, ChevronLeft } from 'lucide-react';
import { CarouselState, Slide } from './types';
import EditorCanvas from './components/EditorCanvas';
import Sidebar from './components/Sidebar';
import * as htmlToImage from 'html-to-image';

const THEMES = {
  light: {
    '--bg-app': '#F8FAFC',
    '--bg-panel': '#FFFFFF',
    '--bg-element': '#F1F5F9',
    '--text-primary': '#0F172A',
    '--text-secondary': '#4B5563',
    '--border': '#E2E8F0',
    '--accent-primary': '#2563EB',
    '--accent-text': '#FFFFFF',
    '--highlight': '#10B981',
    '--button-hover': '#E0E7FF'
  },
  dark: {
    '--bg-app': '#0F172A',
    '--bg-panel': '#1E293B',
    '--bg-element': '#334155',
    '--text-primary': '#F8FAFC',
    '--text-secondary': '#94A3B8',
    '--border': '#334155',
    '--accent-primary': '#3B82F6',
    '--accent-text': '#0F172A',
    '--highlight': '#10B981',
    '--button-hover': '#334155'
  },
  mint: {
    '--bg-app': '#ECFDF5',
    '--bg-panel': '#FFFFFF',
    '--bg-element': '#F0FDF4',
    '--text-primary': '#064E3B',
    '--text-secondary': '#059669',
    '--border': '#A7F3D0',
    '--accent-primary': '#10B981',
    '--accent-text': '#FFFFFF',
    '--highlight': '#2563EB',
    '--button-hover': '#D1FAE5'
  },
  purple: {
    '--bg-app': '#F5F3FF',
    '--bg-panel': '#FFFFFF',
    '--bg-element': '#F3E8FF',
    '--text-primary': '#5B21B6',
    '--text-secondary': '#7C3AED',
    '--border': '#DDD6FE',
    '--accent-primary': '#8B5CF6',
    '--accent-text': '#FFFFFF',
    '--highlight': '#2563EB',
    '--button-hover': '#EDE9FE'
  }
};

const createNewSlide = (id: string): Slide => ({
  id,
  headline: "شريحة جديدة",
  subheadline: "أضف تفاصيل مكملة لقصتك هنا",
  highlightText: "التاجر",
  subjectImageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
  logoUrl: "",
  backgroundColor: "#FFFFFF",
  accentColor: "#2563EB",
  layout: 'center',
  showSwipeIndicator: true,
  showSlideNumber: true,
  showProgressBar: true,
  showGridOverlay: false,
  customCss: ""
});

export default function App() {
  const [carousel, setCarousel] = useState<CarouselState>({
    slides: [
      {
        id: '1',
        headline: "كيف تبدأ الاستثمار؟",
        subheadline: "دليلك الشامل لتعلم أساسيات المال في 2024",
        highlightText: "الاستثمار",
        subjectImageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
        logoUrl: "",
        backgroundColor: "#FFFFFF",
        accentColor: "#2563EB",
        layout: 'center',
        showSwipeIndicator: true,
        showSlideNumber: true,
        showProgressBar: true,
        showGridOverlay: false,
        customCss: ""
      }
    ],
    activeIndex: 0
  });

  const [currentTheme, setCurrentTheme] = useState<keyof typeof THEMES>('light');
  const [isExporting, setIsExporting] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const activeSlide = carousel.slides[carousel.activeIndex];

  const updateActiveSlide = (updated: Partial<Slide>) => {
    setCarousel(prev => ({
      ...prev,
      slides: prev.slides.map((s, i) => i === prev.activeIndex ? { ...s, ...updated } : s)
    }));
  };

  const addSlide = () => {
    const newSlide = createNewSlide(Date.now().toString());
    setCarousel(prev => ({
      ...prev,
      slides: [...prev.slides, newSlide],
      activeIndex: prev.slides.length
    }));
  };

  const removeSlide = (index: number) => {
    if (carousel.slides.length <= 1) return;
    setCarousel(prev => {
      const newSlides = prev.slides.filter((_, i) => i !== index);
      return {
        ...prev,
        slides: newSlides,
        activeIndex: Math.min(prev.activeIndex, newSlides.length - 1)
      };
    });
  };

  const duplicateSlide = (index: number) => {
    const slideToCopy = carousel.slides[index];
    const newSlide = { ...slideToCopy, id: Date.now().toString() };
    setCarousel(prev => {
      const newSlides = [...prev.slides];
      newSlides.splice(index + 1, 0, newSlide);
      return { ...prev, slides: newSlides, activeIndex: index + 1 };
    });
  };

  const handleDownload = async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await htmlToImage.toPng(canvasRef.current, {
        pixelRatio: 3,
        quality: 1,
      });
      const link = document.createElement('a');
      link.download = `slide-${carousel.activeIndex + 1}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      alert('خطأ في التصدير');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div
      className="flex h-screen w-full overflow-hidden font-['Cairo'] transition-colors duration-300"
      style={{
        ...THEMES[currentTheme],
        backgroundColor: 'var(--bg-app)',
        color: 'var(--text-primary)'
      } as React.CSSProperties}
    >
      {/* Sidebar */}
      <Sidebar 
        state={activeSlide} 
        setState={(updater) => {
            if (typeof updater === 'function') {
                setCarousel(prev => ({
                    ...prev,
                    slides: prev.slides.map((s, i) => i === prev.activeIndex ? (updater as any)(s) : s)
                }));
            } else {
                updateActiveSlide(updater as any);
            }
        }} 
        onDownload={handleDownload} 
        isExporting={isExporting} 
        currentTheme={currentTheme}
        setTheme={setCurrentTheme}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[var(--bg-app)] relative shadow-inner transition-colors duration-300">
        {/* Top Navigation Bar */}
        <div className="h-16 border-b border-[var(--border)] bg-[var(--bg-panel)] flex items-center justify-between px-6 z-10 shadow-sm transition-colors duration-300">
           <div className="flex items-center gap-6">
              <span className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Workspace</span>
              <div className="flex items-center bg-[var(--bg-element)] rounded-full p-1.5 border border-[var(--border)] gap-1">
                 {carousel.slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCarousel(p => ({ ...p, activeIndex: i }))}
                      className={`w-8 h-8 rounded-full text-[12px] font-bold transition-all flex items-center justify-center ${
                        carousel.activeIndex === i
                          ? 'bg-[var(--accent-primary)] text-[var(--accent-text)] shadow-md'
                          : 'hover:bg-[var(--button-hover)] text-[var(--text-secondary)]'
                      }`}
                    >
                      {i + 1}
                    </button>
                 ))}
                 <div className="w-[1px] h-4 bg-[var(--border)] mx-1"></div>
                 <button
                  onClick={addSlide}
                  className="w-8 h-8 rounded-full hover:bg-[var(--button-hover)] flex items-center justify-center text-[var(--accent-primary)] transition-colors"
                 >
                    <Plus className="w-4 h-4" />
                 </button>
              </div>
           </div>

           <div className="flex items-center gap-2 bg-[var(--bg-element)] p-1.5 rounded-full border border-[var(--border)]">
              <button
                onClick={() => setCarousel(p => ({ ...p, activeIndex: Math.max(0, p.activeIndex - 1) }))}
                disabled={carousel.activeIndex === 0}
                className="p-2 hover:bg-[var(--bg-panel)] hover:shadow-sm rounded-full disabled:opacity-30 transition-all text-[var(--text-secondary)]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="text-[12px] font-bold w-20 text-center text-[var(--text-primary)] font-mono tracking-tight">
                {String(carousel.activeIndex + 1).padStart(2, '0')} / {String(carousel.slides.length).padStart(2, '0')}
              </span>
              <button
                onClick={() => setCarousel(p => ({ ...p, activeIndex: Math.min(carousel.slides.length - 1, p.activeIndex + 1) }))}
                disabled={carousel.activeIndex === carousel.slides.length - 1}
                className="p-2 hover:bg-[var(--bg-panel)] hover:shadow-sm rounded-full disabled:opacity-30 transition-all text-[var(--text-secondary)]"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
           </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex items-center justify-center p-8 overflow-hidden relative">
           {/* Grid Background */}
           <div className="absolute inset-0 pointer-events-none opacity-[0.4]" 
                style={{ 
                    backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', 
                    backgroundSize: '24px 24px' 
                }}>
           </div>

           <div className="relative group z-10">
              <div
                ref={canvasRef}
                className="shadow-[0_25px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden ring-1 ring-slate-900/5 bg-white rounded-3xl"
                style={{ width: '420px', aspectRatio: '4/5' }}
              >
                <EditorCanvas
                  slide={activeSlide}
                  index={carousel.activeIndex}
                  total={carousel.slides.length}
                />
              </div>

              {/* Floating Slide Controls (Precise Style) */}
              <div className="absolute -left-14 top-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                 <button onClick={() => duplicateSlide(carousel.activeIndex)} className="p-2.5 bg-[var(--bg-panel)] hover:bg-[var(--bg-element)] border border-[var(--border)] shadow-md text-[var(--text-secondary)] rounded-xl transition-colors" title="Duplicate">
                    <Copy className="w-4 h-4" />
                 </button>
                 <button onClick={() => removeSlide(carousel.activeIndex)} className="p-2.5 bg-[var(--bg-panel)] hover:bg-red-50 border border-[var(--border)] hover:border-red-200 text-[var(--text-secondary)] hover:text-red-600 shadow-md rounded-xl transition-colors" title="Delete">
                    <Trash2 className="w-4 h-4" />
                 </button>
              </div>
           </div>
        </div>

        {/* Bottom Carousel Reel */}
        <div className="h-32 border-t border-[var(--border)] bg-[var(--bg-panel)] p-4 flex items-center gap-4 overflow-x-auto z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] transition-colors duration-300">
           {carousel.slides.map((s, i) => (
              <div
                key={s.id}
                onClick={() => setCarousel(p => ({ ...p, activeIndex: i }))}
                className={`flex-shrink-0 h-24 aspect-[4/5] border transition-all cursor-pointer overflow-hidden relative group rounded-2xl ${
                  carousel.activeIndex === i ? 'border-[var(--highlight)] ring-2 ring-[var(--highlight)]/20 translate-y-[-2px] shadow-lg' : 'border-[var(--border)] hover:border-[var(--text-secondary)] hover:shadow-md'
                }`}
              >
                 <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${s.subjectImageUrl})` }}></div>
                 <div className="absolute inset-0 bg-[#0F172A]/80 flex items-center justify-center backdrop-blur-[1px]">
                    <span className={`text-xl font-bold text-white ${carousel.activeIndex === i ? 'text-[var(--highlight)]' : ''}`}>{i + 1}</span>
                 </div>
              </div>
           ))}
           <button
            onClick={addSlide}
            className="flex-shrink-0 h-24 aspect-[4/5] border-2 border-dashed border-[var(--border)] hover:border-[var(--highlight)] hover:bg-[var(--highlight)]/5 flex flex-col items-center justify-center gap-2 transition-all group rounded-2xl"
           >
              <Plus className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--highlight)]" />
              <span className="text-[10px] font-bold text-[var(--text-secondary)] group-hover:text-[var(--highlight)]">Add Slide</span>
           </button>
        </div>
      </div>
    </div>
  );
}
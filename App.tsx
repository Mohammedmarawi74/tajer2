import React, { useState, useRef } from 'react';
import { Plus, Trash2, Copy, ChevronRight, ChevronLeft } from 'lucide-react';
import { CarouselState, Slide } from './types';
import EditorCanvas from './components/EditorCanvas';
import Sidebar from './components/Sidebar';
import * as htmlToImage from 'html-to-image';

const THEMES = {
  light: {
    '--bg-app': '#f1f5f9',
    '--bg-panel': '#ffffff',
    '--bg-element': '#f8fafc',
    '--text-primary': '#1e293b',
    '--text-secondary': '#64748b',
    '--border': '#e2e8f0',
    '--accent-primary': '#0D1137',
    '--accent-text': '#ffffff',
    '--highlight': '#00E1C1',
    '--button-hover': '#e2e8f0'
  },
  dark: {
    '--bg-app': '#0f172a',
    '--bg-panel': '#1e293b',
    '--bg-element': '#334155',
    '--text-primary': '#f8fafc',
    '--text-secondary': '#94a3b8',
    '--border': '#334155',
    '--accent-primary': '#60a5fa',
    '--accent-text': '#0f172a',
    '--highlight': '#2dd4bf',
    '--button-hover': '#334155'
  },
  purple: {
    '--bg-app': '#f3e8ff',
    '--bg-panel': '#ffffff',
    '--bg-element': '#faf5ff',
    '--text-primary': '#581c87',
    '--text-secondary': '#7e22ce',
    '--border': '#e9d5ff',
    '--accent-primary': '#7e22ce',
    '--accent-text': '#ffffff',
    '--highlight': '#d8b4fe',
    '--button-hover': '#f3e8ff'
  },
  gray: {
    '--bg-app': '#e5e5e5',
    '--bg-panel': '#f5f5f5',
    '--bg-element': '#e5e5e5',
    '--text-primary': '#171717',
    '--text-secondary': '#525252',
    '--border': '#d4d4d4',
    '--accent-primary': '#262626',
    '--accent-text': '#ffffff',
    '--highlight': '#a3a3a3',
    '--button-hover': '#e5e5e5'
  }
};

const createNewSlide = (id: string): Slide => ({
  id,
  headline: "شريحة جديدة",
  subheadline: "أضف تفاصيل مكملة لقصتك هنا",
  highlightText: "قصتك",
  subjectImageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
  logoUrl: "",
  backgroundColor: "#0D1137",
  accentColor: "#00E1C1",
  layout: 'center',
  showSwipeIndicator: true,
  showSlideNumber: true,
  showProgressBar: true,
  showGridOverlay: true,
  customCss: ""
});

export default function App() {
  const [carousel, setCarousel] = useState<CarouselState>({
    slides: [
      {
        id: '1',
        headline: "كيف تبدأ الاستثمار؟",
        subheadline: "دليلك الشامل لتعلم أساسيات المال في 2024",
        highlightText: "المال",
        subjectImageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
        logoUrl: "",
        backgroundColor: "#0D1137",
        accentColor: "#00E1C1",
        layout: 'center',
        showSwipeIndicator: true,
        showSlideNumber: true,
        showProgressBar: true,
        showGridOverlay: true,
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
      className="flex h-screen w-full overflow-hidden font-['IBM_Plex_Sans_Arabic'] transition-colors duration-300"
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
              <div className="flex items-center bg-[var(--bg-element)] rounded-md p-1 border border-[var(--border)] gap-1">
                 {carousel.slides.map((_, i) => (
                    <button 
                      key={i}
                      onClick={() => setCarousel(p => ({ ...p, activeIndex: i }))}
                      className={`w-7 h-7 rounded text-[12px] font-bold transition-all flex items-center justify-center ${
                        carousel.activeIndex === i 
                          ? 'bg-[var(--accent-primary)] text-[var(--accent-text)] shadow-sm' 
                          : 'hover:bg-[var(--button-hover)] text-[var(--text-secondary)]'
                      }`}
                    >
                      {i + 1}
                    </button>
                 ))}
                 <div className="w-[1px] h-4 bg-[var(--border)] mx-1"></div>
                 <button 
                  onClick={addSlide}
                  className="w-7 h-7 rounded hover:bg-[var(--button-hover)] flex items-center justify-center text-[var(--accent-primary)] transition-colors"
                 >
                    <Plus className="w-4 h-4" />
                 </button>
              </div>
           </div>
           
           <div className="flex items-center gap-2 bg-[var(--bg-element)] p-1 rounded-md border border-[var(--border)]">
              <button 
                onClick={() => setCarousel(p => ({ ...p, activeIndex: Math.max(0, p.activeIndex - 1) }))}
                disabled={carousel.activeIndex === 0}
                className="p-1.5 hover:bg-[var(--bg-panel)] hover:shadow-sm rounded disabled:opacity-30 transition-all text-[var(--text-secondary)]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="text-[12px] font-bold w-16 text-center text-[var(--text-primary)] font-mono tracking-tight">
                {String(carousel.activeIndex + 1).padStart(2, '0')} / {String(carousel.slides.length).padStart(2, '0')}
              </span>
              <button 
                onClick={() => setCarousel(p => ({ ...p, activeIndex: Math.min(carousel.slides.length - 1, p.activeIndex + 1) }))}
                disabled={carousel.activeIndex === carousel.slides.length - 1}
                className="p-1.5 hover:bg-[var(--bg-panel)] hover:shadow-sm rounded disabled:opacity-30 transition-all text-[var(--text-secondary)]"
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
                className="shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] overflow-hidden ring-1 ring-slate-900/5 bg-white"
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
                 <button onClick={() => duplicateSlide(carousel.activeIndex)} className="p-2.5 bg-[var(--bg-panel)] hover:bg-[var(--bg-element)] border border-[var(--border)] shadow-sm text-[var(--text-secondary)] rounded-md transition-colors" title="Duplicate">
                    <Copy className="w-4 h-4" />
                 </button>
                 <button onClick={() => removeSlide(carousel.activeIndex)} className="p-2.5 bg-[var(--bg-panel)] hover:bg-red-50 border border-[var(--border)] hover:border-red-200 text-[var(--text-secondary)] hover:text-red-600 shadow-sm rounded-md transition-colors" title="Delete">
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
                className={`flex-shrink-0 h-24 aspect-[4/5] border transition-all cursor-pointer overflow-hidden relative group rounded-sm ${
                  carousel.activeIndex === i ? 'border-[var(--highlight)] ring-2 ring-[var(--highlight)]/20 translate-y-[-2px] shadow-md' : 'border-[var(--border)] hover:border-[var(--text-secondary)] hover:shadow-sm'
                }`}
              >
                 <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${s.subjectImageUrl})` }}></div>
                 <div className="absolute inset-0 bg-[#0D1137]/80 flex items-center justify-center backdrop-blur-[1px]">
                    <span className={`text-xl font-bold text-white ${carousel.activeIndex === i ? 'text-[var(--highlight)]' : ''}`}>{i + 1}</span>
                 </div>
              </div>
           ))}
           <button 
            onClick={addSlide}
            className="flex-shrink-0 h-24 aspect-[4/5] border border-dashed border-[var(--border)] hover:border-[var(--highlight)] hover:bg-[var(--highlight)]/5 flex flex-col items-center justify-center gap-2 transition-all group rounded-sm"
           >
              <Plus className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--highlight)]" />
              <span className="text-[10px] font-bold text-[var(--text-secondary)] group-hover:text-[var(--highlight)]">Add Slide</span>
           </button>
        </div>
      </div>
    </div>
  );
}
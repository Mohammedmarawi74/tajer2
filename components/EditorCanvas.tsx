import React from 'react';
import { Slide } from '../types';

interface Props {
  slide: Slide;
  index: number;
  total: number;
}

const EditorCanvas: React.FC<Props> = ({ slide, index, total }) => {
  const renderSubheadline = () => {
    if (!slide.highlightText || !slide.subheadline.includes(slide.highlightText)) {
      return slide.subheadline;
    }
    const parts = slide.subheadline.split(slide.highlightText);
    return (
      <>
        {parts[0]}
        <span className="relative inline-block px-2 mx-1 poster-highlight">
           {/* Medium (500) for highlighted text. Removed italic for precise Arabic rendering. */}
           <span className="relative z-20 text-[#0D1137] font-medium leading-tight">{slide.highlightText}</span>
           <div 
            className="absolute inset-0 -skew-x-12 z-10 scale-105 shadow-sm mix-blend-hard-light"
            style={{ backgroundColor: slide.accentColor }}
           ></div>
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className="w-full h-full relative overflow-hidden select-none bg-[#0D1137] font-['IBM_Plex_Sans_Arabic'] poster-root" dir="rtl">
      {/* Dynamic CSS Style Injection */}
      <style>{slide.customCss}</style>

      {/* 1. Dynamic Background */}
      <div 
        className="absolute inset-0 transition-all duration-1000 poster-bg"
        style={{ 
          background: `radial-gradient(circle at ${index % 2 === 0 ? '20%' : '80%'} 30%, ${slide.backgroundColor} 0%, #090b24 120%)` 
        }}
      ></div>

      {/* 2. Technical Overlays */}
      {slide.showGridOverlay && (
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      )}
      
      {/* 3. Carousel Progress Bar (Top) */}
      {slide.showProgressBar && (
        <div className="absolute top-0 left-0 right-0 h-1 flex gap-0.5 z-50 px-0 opacity-80 poster-progress-bar">
          {Array.from({ length: total }).map((_, i) => (
            <div 
              key={i} 
              className="flex-1 h-full transition-all duration-300"
              style={{ 
                backgroundColor: i <= index ? slide.accentColor : 'rgba(255,255,255,0.1)'
              }}
            ></div>
          ))}
        </div>
      )}

      {/* 4. Slide Number Indicator */}
      {slide.showSlideNumber && (
        <div className="absolute top-10 left-8 z-50 poster-number">
          <div className="flex flex-col items-start">
            <span className="text-4xl font-black leading-none" style={{ color: slide.accentColor }}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="h-[1px] w-8 my-2 bg-white/20"></div>
            <span className="text-[10px] font-medium tracking-widest text-white/50 uppercase font-sans">
              Slide {String(index + 1).padStart(2, '0')} of {String(total).padStart(2, '0')}
            </span>
          </div>
        </div>
      )}

      {/* 5. Branding */}
      <div className="absolute top-10 right-8 flex items-center gap-3 z-50 poster-logo-container">
        {slide.logoUrl ? (
          <img src={slide.logoUrl} alt="Logo" className="h-12 w-auto max-w-[120px] object-contain drop-shadow-xl poster-logo" />
        ) : (
          <div className="poster-default-logo">
            <div className="text-right">
              <div className="text-[12px] font-black tracking-widest leading-none text-white uppercase mb-1 font-sans">Al-Investor</div>
              <div className="text-[9px] text-[#00E1C1] tracking-widest leading-none font-medium uppercase opacity-90 font-sans">Pro Studio</div>
            </div>
            
            {/* Logo Container */}
            <div className="w-10 h-10 bg-[#0D1137] rounded-lg flex items-center justify-center border border-[#00E1C1] shadow-[0_0_15px_rgba(0,225,193,0.2)] text-[#00E1C1]">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                 <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                 <polyline points="17 6 23 6 23 12"></polyline>
               </svg>
            </div>
          </div>
        )}
      </div>

      {/* 6. Main Content Area */}
      <div className={`absolute inset-0 flex flex-col z-40 p-10 pt-20 justify-start ${
        slide.layout === 'center' ? 'items-center text-center' : 
        slide.layout === 'right' ? 'items-start text-right' : 'items-end text-left'
      }`}>
        <div className="max-w-[90%] mt-8">
           <div className="inline-flex items-center gap-2 mb-6 opacity-80">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: slide.accentColor }}></span>
              <span className="text-[10px] font-bold text-white uppercase tracking-widest font-sans">Financial Insights</span>
           </div>
           
           {/* HEADLINE: Black (900), 36px, Line-height 1.2. Removed tracking-tight for Arabic. */}
           <h2 className="text-white text-[36px] font-black mb-5 leading-[1.2] drop-shadow-2xl poster-headline">
            {slide.headline}
           </h2>
           
           {/* BODY: Regular (400), 18px, Line-height 1.6. */}
           <div className="text-slate-200 text-[18px] font-normal leading-[1.6] max-w-md drop-shadow-md opacity-90 poster-subheadline">
            {renderSubheadline()}
           </div>
        </div>
      </div>

      {/* 7. Subject Image with Depth Effect */}
      <div className="absolute bottom-0 w-full h-[50%] flex justify-center items-end z-20 pointer-events-none poster-image-container">
        <div 
          className="absolute top-[-30%] left-0 right-0 h-[30%] bg-gradient-to-b from-transparent to-black/20 z-10"
        ></div>
        <div 
          className="absolute bottom-[-10%] w-[120%] h-[80%] blur-[100px] opacity-20 rounded-full mix-blend-screen"
          style={{ backgroundColor: slide.accentColor }}
        ></div>
        <img 
          src={slide.subjectImageUrl} 
          alt="Subject" 
          className="h-full object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] grayscale-[10%] contrast-110 poster-image"
        />
      </div>

      {/* 8. Swipe Indicator */}
      {slide.showSwipeIndicator && index < total - 1 && (
        <div className="absolute bottom-8 right-8 z-50 flex items-center gap-2 opacity-80 animate-pulse text-white poster-swipe">
           <span className="text-[9px] font-bold tracking-[0.2em] uppercase font-sans">Swipe</span>
           <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center bg-white/5 backdrop-blur-sm">
              <svg className="w-3 h-3 rotate-180 text-[#00E1C1]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
           </div>
        </div>
      )}

      {/* 9. Final Aesthetics */}
      <div className="absolute inset-0 pointer-events-none border-[12px] border-black/10"></div>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_120%)]"></div>
    </div>
  );
};

export default EditorCanvas;
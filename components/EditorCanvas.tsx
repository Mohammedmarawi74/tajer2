import React from "react";
import { Slide } from "../types";

interface Props {
  slide: Slide;
  index: number;
  total: number;
}

const EditorCanvas: React.FC<Props> = ({ slide, index, total }) => {
  const renderSubheadline = () => {
    if (
      !slide.highlightText ||
      !slide.subheadline.includes(slide.highlightText)
    ) {
      return slide.subheadline;
    }
    const parts = slide.subheadline.split(slide.highlightText);
    return (
      <>
        {parts[0]}
        <span className="relative inline-block px-3 py-1 mx-1 poster-highlight rounded-full">
          {/* Highlighted text with pill-shaped background */}
          <span className="relative z-20 text-white font-bold leading-tight">
            {slide.highlightText}
          </span>
          <div
            className="absolute inset-0 z-10 rounded-full shadow-lg"
            style={{ backgroundColor: slide.accentColor }}
          ></div>
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <div
      className="w-full h-full relative overflow-hidden select-none font-[family-name:var(--font-primary)] poster-root"
      dir="rtl"
      style={{ backgroundColor: slide.backgroundColor }}
    >
      {/* Dynamic CSS Style Injection */}
      <style>{slide.customCss}</style>

      {/* 1. Dynamic Background with Soft Gradient */}
      <div
        className="absolute inset-0 transition-all duration-1000 poster-bg"
        style={{
          background: `linear-gradient(135deg, ${slide.backgroundColor} 0%, ${slide.backgroundColor}EE 50%, ${slide.accentColor}15 100%)`,
        }}
      ></div>

      {/* 1.5. Decorative Background Elements - Flowing Blue Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Overlay - Diagonal Electric Blue */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                135deg,
                transparent 0%,
                transparent 40%,
                ${slide.accentColor}08 60%,
                ${slide.accentColor}15 80%,
                ${slide.accentColor}25 100%
              )
            `
          }}
        ></div>

        {/* Gradient Overlay - Bottom to Top */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                to top,
                ${slide.accentColor}10 0%,
                transparent 30%,
                transparent 70%,
                ${slide.accentColor}08 100%
              )
            `
          }}
        ></div>

        {/* Geometric Triangle Pattern - Top Right */}
        <div 
          className="absolute top-0 right-0 w-[60%] h-[60%] opacity-[0.15]"
          style={{
            background: `linear-gradient(225deg, ${slide.accentColor} 0%, transparent 60%)`,
            clipPath: 'polygon(100% 0, 100% 100%, 0 0)'
          }}
        ></div>

        {/* Geometric Triangle Pattern - Bottom Left */}
        <div 
          className="absolute bottom-0 left-0 w-[50%] h-[50%] opacity-[0.12]"
          style={{
            background: `linear-gradient(45deg, ${slide.accentColor} 0%, transparent 60%)`,
            clipPath: 'polygon(0 100%, 100% 100%, 0 0)'
          }}
        ></div>

        {/* Large Gradient Circles */}
        <div 
          className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full opacity-[0.08]"
          style={{
            background: `radial-gradient(circle, ${slide.accentColor} 0%, transparent 60%)`,
            filter: 'blur(1px)'
          }}
        ></div>
        
        <div 
          className="absolute -bottom-20 -left-20 w-[350px] h-[350px] rounded-full opacity-[0.1]"
          style={{
            background: `radial-gradient(circle, ${slide.accentColor} 0%, transparent 60%)`,
            filter: 'blur(1px)'
          }}
        ></div>

        {/* Angular Stripe Pattern */}
        <div className="absolute inset-0 opacity-[0.04]">
          <svg viewBox="0 0 400 400" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <pattern id="stripe-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="40" x2="80" y2="40" stroke={slide.accentColor} strokeWidth="20" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#stripe-pattern)" />
          </svg>
        </div>

        {/* Curved Line 1 - Top Right */}
        <div 
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${slide.accentColor}30 0%, transparent 70%)`,
            filter: 'blur(40px)'
          }}
        ></div>
        
        {/* Curved Line 2 - Bottom Left */}
        <div 
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-15"
          style={{
            background: `radial-gradient(circle, ${slide.accentColor}40 0%, transparent 70%)`,
            filter: 'blur(50px)'
          }}
        ></div>

        {/* Bokeh Effect - Soft Glowing Circles */}
        {/* Large Circles */}
        <div 
          className="absolute top-[10%] left-[5%] w-32 h-32 rounded-full opacity-[0.08]"
          style={{
            background: `radial-gradient(circle, ${slide.accentColor} 0%, transparent 70%)`,
            filter: 'blur(20px)'
          }}
        ></div>
        <div 
          className="absolute top-[60%] right-[10%] w-40 h-40 rounded-full opacity-[0.07]"
          style={{
            background: `radial-gradient(circle, ${slide.accentColor} 0%, transparent 70%)`,
            filter: 'blur(25px)'
          }}
        ></div>
        <div 
          className="absolute bottom-[15%] left-[15%] w-28 h-28 rounded-full opacity-[0.09]"
          style={{
            background: `radial-gradient(circle, ${slide.accentColor} 0%, transparent 70%)`,
            filter: 'blur(18px)'
          }}
        ></div>
        
        {/* Medium Circles */}
        <div 
          className="absolute top-[35%] right-[20%] w-20 h-20 rounded-full opacity-[0.1]"
          style={{
            background: `radial-gradient(circle, ${slide.accentColor} 0%, transparent 70%)`,
            filter: 'blur(15px)'
          }}
        ></div>
        <div 
          className="absolute top-[70%] right-[35%] w-24 h-24 rounded-full opacity-[0.08]"
          style={{
            background: `radial-gradient(circle, ${slide.accentColor} 0%, transparent 70%)`,
            filter: 'blur(16px)'
          }}
        ></div>
        <div 
          className="absolute bottom-[30%] left-[40%] w-16 h-16 rounded-full opacity-[0.11]"
          style={{
            background: `radial-gradient(circle, ${slide.accentColor} 0%, transparent 70%)`,
            filter: 'blur(12px)'
          }}
        ></div>
        
        {/* Small Circles */}
        <div 
          className="absolute top-[25%] left-[25%] w-12 h-12 rounded-full opacity-[0.12]"
          style={{
            background: `radial-gradient(circle, ${slide.accentColor} 0%, transparent 70%)`,
            filter: 'blur(10px)'
          }}
        ></div>
        <div 
          className="absolute top-[50%] left-[60%] w-10 h-10 rounded-full opacity-[0.12]"
          style={{
            background: `radial-gradient(circle, ${slide.accentColor} 0%, transparent 70%)`,
            filter: 'blur(8px)'
          }}
        ></div>
        <div 
          className="absolute bottom-[45%] right-[5%] w-14 h-14 rounded-full opacity-[0.1]"
          style={{
            background: `radial-gradient(circle, ${slide.accentColor} 0%, transparent 70%)`,
            filter: 'blur(11px)'
          }}
        ></div>
        <div 
          className="absolute top-[80%] left-[70%] w-8 h-8 rounded-full opacity-[0.12]"
          style={{
            background: `radial-gradient(circle, ${slide.accentColor} 0%, transparent 70%)`,
            filter: 'blur(6px)'
          }}
        ></div>

        {/* Horizontal Flowing Lines - Top Section */}
        <div className="absolute top-[15%] left-0 right-0 h-32 overflow-hidden opacity-[0.08]">
          <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="none">
            <path 
              d="M0 50 Q100 30 200 50 T400 50" 
              fill="none" 
              stroke={slide.accentColor} 
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path 
              d="M0 60 Q100 40 200 60 T400 60" 
              fill="none" 
              stroke={slide.accentColor} 
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path 
              d="M0 70 Q100 50 200 70 T400 70" 
              fill="none" 
              stroke={slide.accentColor} 
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.5"
            />
          </svg>
        </div>

        {/* Horizontal Flowing Lines - Bottom Section */}
        <div className="absolute bottom-[20%] left-0 right-0 h-24 overflow-hidden opacity-[0.07]">
          <svg viewBox="0 0 400 80" className="w-full h-full" preserveAspectRatio="none">
            <path 
              d="M0 40 Q100 20 200 40 T400 40" 
              fill="none" 
              stroke={slide.accentColor} 
              strokeWidth="1.75"
              strokeLinecap="round"
            />
            <path 
              d="M0 50 Q100 30 200 50 T400 50" 
              fill="none" 
              stroke={slide.accentColor} 
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* Diagonal Accent Lines - Top Right Corner */}
        <div className="absolute top-0 right-0 w-48 h-48 opacity-[0.06]">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <line x1="0" y1="200" x2="200" y2="0" stroke={slide.accentColor} strokeWidth="8" strokeLinecap="round" />
            <line x1="15" y1="200" x2="200" y2="15" stroke={slide.accentColor} strokeWidth="5" strokeLinecap="round" opacity="0.7" />
            <line x1="30" y1="200" x2="200" y2="30" stroke={slide.accentColor} strokeWidth="4" strokeLinecap="round" opacity="0.5" />
          </svg>
        </div>

        {/* Diagonal Lines - Bottom Left Corner */}
        <div className="absolute bottom-0 left-0 w-40 h-40 opacity-[0.05] rotate-180">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <line x1="0" y1="200" x2="200" y2="0" stroke={slide.accentColor} strokeWidth="6" strokeLinecap="round" />
            <line x1="20" y1="200" x2="200" y2="20" stroke={slide.accentColor} strokeWidth="4" strokeLinecap="round" opacity="0.6" />
          </svg>
        </div>

        {/* Subtle Mesh Gradient */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-[0.04]"
          style={{
            background: `
              radial-gradient(at 0% 0%, ${slide.accentColor} 0px, transparent 50%),
              radial-gradient(at 100% 0%, ${slide.accentColor} 0px, transparent 50%),
              radial-gradient(at 100% 100%, ${slide.accentColor} 0px, transparent 50%),
              radial-gradient(at 0% 100%, ${slide.accentColor} 0px, transparent 50%)
            `,
            filter: 'blur(60px)'
          }}
        ></div>
      </div>

      {/* 2. Technical Overlays - Subtle grid */}
      {slide.showGridOverlay && (
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      )}

      {/* 3. Carousel Progress Bar (Top) - Pill shaped segments */}
      {slide.showProgressBar && (
        <div className="absolute top-4 left-4 right-4 h-1.5 flex gap-1 z-50 px-2 opacity-90 poster-progress-bar">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className="flex-1 h-full rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  i <= index ? slide.accentColor : "rgba(0,0,0,0.1)",
              }}
            ></div>
          ))}
        </div>
      )}

      {/* 4. Slide Number Indicator - Modern pill design */}
      {slide.showSlideNumber && (
        <div className="absolute top-4 right-4 z-50 poster-number">
          {/* Slide numbering indicator removed as per user request */}
        </div>
      )}

      {/* 5. Branding - Modern Logo */}
      <div className="absolute top-4 left-4 flex items-center gap-2 z-50 poster-logo-container">
        {slide.logoUrl ? (
          <img
            src={slide.logoUrl}
            alt="Logo"
            className="h-10 w-auto max-w-[100px] object-contain drop-shadow-md poster-logo"
          />
        ) : null}
      </div>

      {/* 6. Subject Image with Soft Shadow - Bottom area */}
      <div className="absolute bottom-12 w-full h-[45%] flex justify-center items-end z-10 pointer-events-none poster-image-container">
        <img
          src={slide.subjectImageUrl}
          alt="Subject"
          className="h-full w-auto max-w-[85%] object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] contrast-105 poster-image"
        />
      </div>

      {/* 7. Main Content Area - Modern card design */}
      <div
        className={`absolute inset-x-0 top-0 flex flex-col z-30 p-6 pt-20 justify-center ${
          slide.layout === "center"
            ? "items-center text-center"
            : slide.layout === "right"
              ? "items-start text-right"
              : "items-end text-left"
        }`}
      >
        <div className="max-w-[85%]">
          {/* Tag/Pill - Category indicator */}
          <div className="inline-flex items-center gap-2 mb-4 opacity-90">
            <span
              className="w-2 h-2 rounded-full shadow-md"
              style={{ backgroundColor: slide.accentColor }}
            ></span>
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[9px] font-bold text-slate-600 uppercase tracking-wide shadow-lg border border-slate-100">
              رؤى مالية
            </span>
          </div>

          {/* HEADLINE - Bold, Modern Arabic typography */}
          <h2 className="text-slate-800 text-[28px] font-black mb-3 leading-[1.35] poster-headline">
            {slide.headline}
          </h2>

          {/* BODY - Clean, readable text */}
          <div className="text-slate-600 text-[15px] font-normal leading-[1.8] max-w-md opacity-95 poster-subheadline">
            {renderSubheadline()}
          </div>
        </div>
      </div>

      {/* 8. Swipe Indicator - Modern pill design */}
      {slide.showSwipeIndicator && index < total - 1 && (
        <div className="absolute bottom-6 left-6 z-50 flex items-center gap-2 opacity-70 animate-pulse poster-swipe">
          <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-slate-500">
            التالي
          </span>
          <div className="w-8 h-8 rounded-full border-2 border-slate-300 flex items-center justify-center bg-white/80 backdrop-blur-sm shadow-lg">
            <svg
              className="w-3.5 h-3.5 rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ color: slide.accentColor }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </div>
        </div>
      )}

      {/* 9. Footer Branding */}
      <div className="absolute bottom-0 left-0 right-0 px-8 py-6 flex justify-between items-center z-50 poster-footer">
        <div className="flex items-center gap-2">
          <div style={{ backgroundColor: slide.accentColor }}></div>
          <span className="text-[11px] font-black tracking-tight text-slate-800">
            منصة التاجر
          </span>
        </div>
        <span className="text-[11px] font-bold tracking-widest text-slate-900 uppercase font-sans">
          dtajer.com
        </span>
      </div>

      {/* 10. Final Aesthetics - Soft vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.03)_100%)]"></div>
    </div>
  );
};

export default EditorCanvas;

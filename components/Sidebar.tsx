import React from 'react';
import { Slide } from '../types';
import { Download, Type, ImageIcon, Palette, Layout, TrendingUp, AlignCenter, AlignRight, AlignLeft, Upload, Settings, Code, Monitor, Grid } from 'lucide-react';

interface Props {
  state: Slide;
  setState: React.Dispatch<React.SetStateAction<Slide>>;
  onDownload: () => void;
  isExporting: boolean;
  currentTheme: string;
  setTheme: (theme: any) => void;
}

const SLIDE_THEMES = [
  { id: 'investor', label: 'المستثمر', bg: '#0D1137', accent: '#00E1C1' },
  { id: 'luxury', label: 'فخامة', bg: '#000000', accent: '#D4AF37' },
  { id: 'growth', label: 'النمو', bg: '#064e3b', accent: '#84cc16' },
  { id: 'trust', label: 'الثقة', bg: '#0f172a', accent: '#38bdf8' },
  { id: 'vision', label: 'الرؤية', bg: '#4c1d95', accent: '#a78bfa' },
  { id: 'energy', label: 'الطاقة', bg: '#881337', accent: '#fb7185' },
  { id: 'formal', label: 'رسمي', bg: '#18181b', accent: '#9ca3af' },
  { id: 'modern', label: 'حداثة', bg: '#1a1a1a', accent: '#f97316' },
];

const Sidebar: React.FC<Props> = ({ state, setState, onDownload, isExporting, currentTheme, setTheme }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === 'checkbox') {
      setState(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setState(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setState(prev => ({ ...prev, subjectImageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setState(prev => ({ ...prev, logoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const applySlideTheme = (bg: string, accent: string) => {
    setState(prev => ({ ...prev, backgroundColor: bg, accentColor: accent }));
  };

  // Removed tracking-widest to prevent disconnected Arabic letters
  const SectionHeader = ({ icon: Icon, label }: { icon: any, label: string }) => (
    <h3 className="text-[12px] font-bold text-[var(--text-secondary)] flex items-center gap-2 mb-4">
      <Icon className="w-4 h-4 text-[var(--accent-primary)]" /> {label}
    </h3>
  );

  return (
    <aside className="w-full lg:w-[360px] bg-[var(--bg-panel)] border-l border-[var(--border)] overflow-y-auto flex flex-col z-50 transition-colors duration-300">
      {/* Header */}
      <div className="p-6 border-b border-[var(--border)] bg-[var(--bg-element)]/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded bg-[var(--accent-primary)] flex items-center justify-center shadow-md border border-[var(--highlight)]/20">
            <TrendingUp className="w-5 h-5 text-[var(--highlight)]" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[var(--accent-primary)] tracking-tight leading-none font-sans">Al-Investor Pro</h1>
            <p className="text-[10px] text-[var(--text-secondary)] font-medium tracking-wide mt-1 font-sans">Social Content Studio</p>
          </div>
        </div>
        
        <button 
          onClick={onDownload}
          disabled={isExporting}
          className="w-full bg-[var(--accent-primary)] text-[var(--accent-text)] hover:opacity-90 px-4 py-3 rounded-md font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-[var(--accent-primary)]/10 active:translate-y-[1px] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isExporting ? 'جاري التحضير...' : <><Download className="w-4 h-4 text-[var(--highlight)]" /> تصدير الشريحة</>}
        </button>
      </div>

      <div className="p-6 space-y-8">
        {/* Theme Selection */}
        <section>
          <SectionHeader icon={Monitor} label="واجهة التطبيق" />
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'light', label: 'فاتح', color: '#f1f5f9' },
              { id: 'dark', label: 'داكن', color: '#0f172a' },
              { id: 'purple', label: 'بنفسجي', color: '#f3e8ff' },
              { id: 'gray', label: 'رمادي', color: '#e5e5e5' }
            ].map((theme) => (
              <button
                key={theme.id}
                onClick={() => setTheme(theme.id)}
                className={`p-2 rounded border transition-all flex flex-col items-center gap-1 ${
                  currentTheme === theme.id 
                  ? 'border-[var(--accent-primary)] bg-[var(--bg-element)] shadow-sm ring-1 ring-[var(--accent-primary)]/20' 
                  : 'border-[var(--border)] hover:border-[var(--text-secondary)] hover:bg-[var(--bg-element)]'
                }`}
                title={theme.label}
              >
                <div className="w-4 h-4 rounded-full border border-[var(--border)]" style={{ backgroundColor: theme.color }}></div>
                <span className="text-[10px] font-bold text-[var(--text-secondary)]">{theme.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Theming Section (Slide Colors) */}
        <section>
          <SectionHeader icon={Palette} label="تيمات الألوان" />
          
          {/* Preset Themes Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
             {SLIDE_THEMES.map((theme) => {
               const isActive = state.backgroundColor === theme.bg && state.accentColor === theme.accent;
               return (
                 <button
                   key={theme.id}
                   onClick={() => applySlideTheme(theme.bg, theme.accent)}
                   className={`flex items-center justify-between p-3 rounded-xl border transition-all hover:shadow-md ${
                     isActive 
                     ? 'bg-[var(--bg-element)] border-[var(--accent-primary)] ring-1 ring-[var(--accent-primary)]/20 shadow-sm' 
                     : 'bg-[var(--bg-element)]/50 border-[var(--border)] hover:border-[var(--text-secondary)]'
                   }`}
                 >
                    <span className={`text-[11px] font-bold ${isActive ? 'text-[var(--accent-primary)]' : 'text-[var(--text-secondary)]'}`}>
                      {theme.label}
                    </span>
                    <div className="w-8 h-8 rounded-full shadow-sm overflow-hidden flex relative ring-1 ring-black/5">
                       <div className="w-1/2 h-full" style={{ backgroundColor: theme.accent }}></div>
                       <div className="w-1/2 h-full" style={{ backgroundColor: theme.bg }}></div>
                    </div>
                 </button>
               );
             })}
          </div>

          {/* Manual Fine Tuning */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[var(--bg-panel)] p-3 rounded border border-[var(--border)] hover:border-[var(--text-secondary)] transition-all">
              <label className="block text-[10px] font-bold text-[var(--text-secondary)] mb-2 uppercase">تخصيص التمييز</label>
              <div className="flex items-center gap-2">
                 <div className="relative w-8 h-8 rounded border border-[var(--border)] overflow-hidden shadow-sm">
                    <input type="color" name="accentColor" value={state.accentColor} onChange={handleChange} className="absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%] cursor-pointer p-0 border-0" />
                 </div>
                 <span className="text-[11px] font-mono font-medium text-[var(--text-secondary)] uppercase">{state.accentColor}</span>
              </div>
            </div>
            <div className="bg-[var(--bg-panel)] p-3 rounded border border-[var(--border)] hover:border-[var(--text-secondary)] transition-all">
              <label className="block text-[10px] font-bold text-[var(--text-secondary)] mb-2 uppercase">تخصيص الخلفية</label>
              <div className="flex items-center gap-2">
                 <div className="relative w-8 h-8 rounded border border-[var(--border)] overflow-hidden shadow-sm">
                    <input type="color" name="backgroundColor" value={state.backgroundColor} onChange={handleChange} className="absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%] cursor-pointer p-0 border-0" />
                 </div>
                 <span className="text-[11px] font-mono font-medium text-[var(--text-secondary)] uppercase">{state.backgroundColor}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Layout Selection */}
        <section>
          <SectionHeader icon={Layout} label="التخطيط" />
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'right', icon: AlignRight },
              { id: 'center', icon: AlignCenter },
              { id: 'left', icon: AlignLeft }
            ].map((l) => (
              <button
                key={l.id}
                onClick={() => setState(prev => ({ ...prev, layout: l.id as any }))}
                className={`p-2.5 rounded border transition-all flex items-center justify-center ${
                  state.layout === l.id 
                  ? 'bg-[var(--accent-primary)] border-[var(--accent-primary)] text-[var(--accent-text)] shadow-md' 
                  : 'bg-[var(--bg-panel)] border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-primary)] hover:bg-[var(--bg-element)]'
                }`}
              >
                <l.icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </section>

        {/* Text Section */}
        <section>
          <SectionHeader icon={Type} label="المحتوى النصي" />
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-2">العنوان الرئيسي</label>
              <textarea 
                name="headline"
                value={state.headline}
                onChange={handleChange}
                className="w-full bg-[var(--bg-element)] border border-[var(--border)] rounded-md p-3 text-sm text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] outline-none h-20 resize-none transition-all placeholder:text-[var(--text-secondary)] font-normal"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-2">النص الثانوي</label>
              <textarea 
                name="subheadline"
                value={state.subheadline}
                onChange={handleChange}
                className="w-full bg-[var(--bg-element)] border border-[var(--border)] rounded-md p-3 text-sm text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] outline-none h-20 resize-none transition-all placeholder:text-[var(--text-secondary)] font-normal"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[var(--text-secondary)] mb-2">تمييز النص (Highlight)</label>
              <input 
                name="highlightText"
                type="text"
                value={state.highlightText}
                onChange={handleChange}
                className="w-full bg-[var(--bg-element)] border border-[var(--border)] rounded-md p-3 text-sm text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] outline-none placeholder:text-[var(--text-secondary)] font-normal"
              />
            </div>
          </div>
        </section>

        {/* Media Assets */}
        <section>
          <SectionHeader icon={ImageIcon} label="الوسائط" />
          <div className="space-y-3">
            <div>
               <label className="block text-[10px] font-bold text-[var(--text-secondary)] mb-2">الصورة الأساسية</label>
               <label className="block relative group">
                <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                <div className="w-full bg-[var(--bg-panel)] border border-dashed border-[var(--border)] rounded-md p-3 cursor-pointer group-hover:border-[var(--accent-primary)] group-hover:bg-[var(--bg-element)] transition-all flex items-center justify-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors" />
                  <span className="text-[11px] font-bold text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors">تحديث الصورة</span>
                </div>
               </label>
            </div>
            
            <div>
               <label className="block text-[10px] font-bold text-[var(--text-secondary)] mb-2">شعار الشركة (Logo)</label>
               <label className="block relative group">
                <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                <div className="w-full bg-[var(--bg-panel)] border border-dashed border-[var(--border)] rounded-md p-3 cursor-pointer group-hover:border-[var(--accent-primary)] group-hover:bg-[var(--bg-element)] transition-all flex items-center justify-center gap-2">
                   {state.logoUrl ? (
                      <div className="h-4 w-4 overflow-hidden rounded-sm border border-[var(--border)]">
                         <img src={state.logoUrl} className="w-full h-full object-cover" />
                      </div>
                   ) : (
                      <Upload className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)]" />
                   )}
                  <span className="text-[11px] font-bold text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors">
                    {state.logoUrl ? 'تغيير اللوغو' : 'رفع اللوغو'}
                  </span>
                </div>
               </label>
            </div>
          </div>
        </section>

        {/* Customization Section */}
        <section>
          <SectionHeader icon={Settings} label="تخصيص العرض" />
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'showGridOverlay', label: 'تأثير الشبكة' },
              { name: 'showProgressBar', label: 'شريط التقدم' },
              { name: 'showSlideNumber', label: 'رقم الشريحة' },
              { name: 'showSwipeIndicator', label: 'أيقونة السحب' }
            ].map((item) => (
              <label key={item.name} className="flex items-center gap-2 p-2 border border-[var(--border)] rounded bg-[var(--bg-element)] cursor-pointer hover:border-[var(--text-secondary)] transition-colors">
                <input 
                  type="checkbox" 
                  name={item.name}
                  checked={(state as any)[item.name]}
                  onChange={handleChange}
                  className="accent-[var(--accent-primary)]"
                />
                <span className="text-[10px] font-bold text-[var(--text-secondary)]">{item.label}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Advanced CSS Editor */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
               <Code className="w-4 h-4 text-[var(--highlight)]" />
               <h3 className="text-[12px] font-bold text-[var(--highlight)]">محرر CSS المتقدم</h3>
            </div>
          </div>
          <div className="bg-[#0f172a] p-3 rounded-lg border border-slate-800 shadow-inner group transition-all hover:border-[var(--highlight)]/50">
              <div className="mb-2 font-mono text-[10px] text-slate-500 overflow-x-auto whitespace-nowrap scrollbar-hide">
                classes: <span className="text-[var(--highlight)]">.poster-root</span>, <span className="text-purple-400">.poster-headline</span>...
              </div>
              <textarea 
                name="customCss"
                value={state.customCss || ''}
                onChange={handleChange}
                placeholder="...هنا لتخصيص التصميم CSS اكتب كود"
                className="w-full h-40 bg-[#0B0F19] border border-[var(--highlight)] rounded-md p-3 text-[11px] font-mono text-[var(--highlight)] focus:outline-none focus:ring-1 focus:ring-[var(--highlight)] resize-y placeholder:text-slate-600 placeholder:font-sans placeholder:text-right"
                dir="ltr"
                spellCheck={false}
              />
          </div>
        </section>

      </div>
    </aside>
  );
};

export default Sidebar;
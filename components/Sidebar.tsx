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
  { id: 'investor', label: 'المستثمر', bg: '#FFFFFF', accent: '#2563EB' },
  { id: 'luxury', label: 'فخامة', bg: '#F8FAFC', accent: '#D4AF37' },
  { id: 'growth', label: 'النمو', bg: '#ECFDF5', accent: '#10B981' },
  { id: 'trust', label: 'الثقة', bg: '#EFF6FF', accent: '#3B82F6' },
  { id: 'vision', label: 'الرؤية', bg: '#F5F3FF', accent: '#8B5CF6' },
  { id: 'energy', label: 'الطاقة', bg: '#FFF7ED', accent: '#F97316' },
  { id: 'formal', label: 'رسمي', bg: '#F1F5F9', accent: '#475569' },
  { id: 'modern', label: 'حداثة', bg: '#FFFFFF', accent: '#F97316' },
];

const PRESET_LOGOS = [
  { id: 'logo-1', src: '/logooo/logo-1.png', label: 'لوغو 1' },
  { id: 'logo-2', src: '/logooo/logo-2.png', label: 'لوغو 2' },
  { id: 'logo-3', src: '/logooo/logo-3.png', label: 'لوغو 3' },
  { id: 'logo-4', src: '/logooo/logo-4.png', label: 'لوغو 4' },
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
    <aside className="w-full lg:w-[360px] bg-[var(--bg-panel)] border-l border-[var(--border)] overflow-y-auto flex flex-col z-50 transition-colors duration-300 font-['Cairo']">
      {/* Header */}
      <div className="p-6 border-b border-[var(--border)] bg-[var(--bg-element)]/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--highlight)] flex items-center justify-center shadow-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-black text-[var(--headline)] leading-none">التاجر ديجيتال</h1>
            <p className="text-[9px] text-[var(--text-secondary)] font-bold mt-1.5">استوديو التصميم</p>
          </div>
        </div>

        <button
          onClick={onDownload}
          disabled={isExporting}
          className="w-full bg-gradient-to-r from-[var(--accent-primary)] to-blue-600 text-white hover:opacity-90 px-4 py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-blue-500/25 active:translate-y-[1px] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isExporting ? 'جاري التحضير...' : <><Download className="w-4 h-4" /> تصدير الشريحة</>}
        </button>
      </div>

      <div className="p-6 space-y-8">
        {/* Theme Selection */}
        <section>
          <SectionHeader icon={Monitor} label="واجهة التطبيق" />
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'light', label: 'فاتح', color: '#F8FAFC' },
              { id: 'dark', label: 'داكن', color: '#0F172A' },
              { id: 'mint', label: 'نعناع', color: '#ECFDF5' },
              { id: 'purple', label: 'بنفسجي', color: '#F5F3FF' }
            ].map((theme) => (
              <button
                key={theme.id}
                onClick={() => setTheme(theme.id)}
                className={`p-2.5 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                  currentTheme === theme.id
                  ? 'border-[var(--accent-primary)] bg-[var(--bg-element)] shadow-md ring-2 ring-[var(--accent-primary)]/20'
                  : 'border-[var(--border)] hover:border-[var(--text-secondary)] hover:bg-[var(--bg-element)]'
                }`}
                title={theme.label}
              >
                <div className="w-5 h-5 rounded-full border border-[var(--border)] shadow-sm" style={{ backgroundColor: theme.color }}></div>
                <span className="text-[9px] font-bold text-[var(--text-secondary)]">{theme.label}</span>
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
                   className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all hover:shadow-md ${
                     isActive
                     ? 'bg-[var(--bg-element)] border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]/20 shadow-sm'
                     : 'bg-[var(--bg-element)]/50 border-[var(--border)] hover:border-[var(--text-secondary)]'
                   }`}
                 >
                    <span className={`text-[11px] font-bold ${isActive ? 'text-[var(--accent-primary)]' : 'text-[var(--text-secondary)]'}`}>
                      {theme.label}
                    </span>
                    <div className="w-9 h-9 rounded-full shadow-md overflow-hidden flex relative ring-2 ring-black/5">
                       <div className="w-1/2 h-full" style={{ backgroundColor: theme.accent }}></div>
                       <div className="w-1/2 h-full" style={{ backgroundColor: theme.bg }}></div>
                    </div>
                 </button>
               );
             })}
          </div>

          {/* Manual Fine Tuning */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[var(--bg-panel)] p-3.5 rounded-2xl border border-[var(--border)] hover:border-[var(--text-secondary)] hover:shadow-md transition-all">
              <label className="block text-[9px] font-bold text-[var(--text-secondary)] mb-2.5 uppercase">لون التمييز</label>
              <div className="flex items-center gap-2.5">
                 <div className="relative w-9 h-9 rounded-xl border border-[var(--border)] overflow-hidden shadow-sm">
                    <input type="color" name="accentColor" value={state.accentColor} onChange={handleChange} className="absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%] cursor-pointer p-0 border-0" />
                 </div>
                 <span className="text-[10px] font-mono font-medium text-[var(--text-secondary)] uppercase">{state.accentColor}</span>
              </div>
            </div>
            <div className="bg-[var(--bg-panel)] p-3.5 rounded-2xl border border-[var(--border)] hover:border-[var(--text-secondary)] hover:shadow-md transition-all">
              <label className="block text-[9px] font-bold text-[var(--text-secondary)] mb-2.5 uppercase">لون الخلفية</label>
              <div className="flex items-center gap-2.5">
                 <div className="relative w-9 h-9 rounded-xl border border-[var(--border)] overflow-hidden shadow-sm">
                    <input type="color" name="backgroundColor" value={state.backgroundColor} onChange={handleChange} className="absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%] cursor-pointer p-0 border-0" />
                 </div>
                 <span className="text-[10px] font-mono font-medium text-[var(--text-secondary)] uppercase">{state.backgroundColor}</span>
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
                className={`p-3 rounded-xl border transition-all flex items-center justify-center ${
                  state.layout === l.id
                  ? 'bg-[var(--accent-primary)] border-[var(--accent-primary)] text-white shadow-lg'
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
              <label className="block text-[10px] font-bold text-[var(--text-secondary)] mb-2">العنوان الرئيسي</label>
              <textarea
                name="headline"
                value={state.headline}
                onChange={handleChange}
                className="w-full bg-[var(--bg-element)] border border-[var(--border)] rounded-xl p-3.5 text-sm text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 outline-none h-20 resize-none transition-all placeholder:text-[var(--text-secondary)] font-normal"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[var(--text-secondary)] mb-2">النص الثانوي</label>
              <textarea
                name="subheadline"
                value={state.subheadline}
                onChange={handleChange}
                className="w-full bg-[var(--bg-element)] border border-[var(--border)] rounded-xl p-3.5 text-sm text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 outline-none h-20 resize-none transition-all placeholder:text-[var(--text-secondary)] font-normal"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[var(--text-secondary)] mb-2">تمييز النص (Highlight)</label>
              <input
                name="highlightText"
                type="text"
                value={state.highlightText}
                onChange={handleChange}
                className="w-full bg-[var(--bg-element)] border border-[var(--border)] rounded-xl p-3.5 text-sm text-[var(--text-primary)] focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 outline-none placeholder:text-[var(--text-secondary)] font-normal"
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
                <div className="w-full bg-[var(--bg-panel)] border-2 border-dashed border-[var(--border)] rounded-xl p-3.5 cursor-pointer group-hover:border-[var(--accent-primary)] group-hover:bg-[var(--bg-element)] transition-all flex items-center justify-center gap-2.5">
                  <ImageIcon className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors" />
                  <span className="text-[11px] font-bold text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors">تحديث الصورة</span>
                </div>
               </label>
            </div>

            <div>
               <label className="block text-[10px] font-bold text-[var(--text-secondary)] mb-2">شعار الشركة (Logo)</label>
               <label className="block relative group mb-3">
                <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                <div className="w-full bg-[var(--bg-panel)] border-2 border-dashed border-[var(--border)] rounded-xl p-3.5 cursor-pointer group-hover:border-[var(--accent-primary)] group-hover:bg-[var(--bg-element)] transition-all flex items-center justify-center gap-2.5">
                   {state.logoUrl ? (
                      <div className="h-5 w-5 overflow-hidden rounded-lg border border-[var(--border)]">
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

               {/* Preset Logos Selector */}
               <div className="grid grid-cols-4 gap-2 mt-3">
                 {PRESET_LOGOS.map((logo) => {
                   const isActive = state.logoUrl === logo.src;
                   return (
                     <button
                       key={logo.id}
                       onClick={() => setState(prev => ({ ...prev, logoUrl: logo.src }))}
                       className={`aspect-square rounded-xl transition-all flex items-center justify-center p-3 ${
                         isActive
                           ? 'bg-[var(--accent-primary)]/20 shadow-md ring-2 ring-[var(--accent-primary)]/30'
                           : 'bg-[var(--bg-element)] hover:bg-[var(--accent-primary)]/10'
                       }`}
                       title={logo.label}
                     >
                       <img src={logo.src} alt={logo.label} className="w-full h-full object-contain" />
                     </button>
                   );
                 })}
               </div>
               {state.logoUrl && (
                 <button
                   onClick={() => setState(prev => ({ ...prev, logoUrl: '' }))}
                   className="w-full mt-3 py-2.5 text-[11px] font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all"
                 >
                   إزالة اللوغو
                 </button>
               )}
            </div>
          </div>
        </section>

        {/* Customization Section */}
        <section>
          <SectionHeader icon={Settings} label="تخصيص العرض" />
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { name: 'showGridOverlay', label: 'تأثير الشبكة' },
              { name: 'showProgressBar', label: 'شريط التقدم' },
              { name: 'showSlideNumber', label: 'رقم الشريحة' },
              { name: 'showSwipeIndicator', label: 'أيقونة السحب' }
            ].map((item) => (
              <label key={item.name} className="flex items-center gap-2.5 p-2.5 border border-[var(--border)] rounded-xl bg-[var(--bg-element)] cursor-pointer hover:border-[var(--text-secondary)] hover:shadow-sm transition-all">
                <input
                  type="checkbox"
                  name={item.name}
                  checked={(state as any)[item.name]}
                  onChange={handleChange}
                  className="w-4 h-4 accent-[var(--accent-primary)] rounded"
                />
                <span className="text-[10px] font-bold text-[var(--text-secondary)]">{item.label}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Advanced CSS Editor */}
        <section>
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
               <Code className="w-4 h-4 text-[var(--highlight)]" />
               <h3 className="text-[11px] font-bold text-[var(--highlight)]">محرر CSS المتقدم</h3>
            </div>
          </div>
          <div className="bg-[#0f172a] p-3.5 rounded-xl border border-slate-800 shadow-inner group transition-all hover:border-[var(--highlight)]/50">
              <div className="mb-2.5 font-mono text-[10px] text-slate-500 overflow-x-auto whitespace-nowrap scrollbar-hide">
                classes: <span className="text-[var(--highlight)]">.poster-root</span>, <span className="text-purple-400">.poster-headline</span>...
              </div>
              <textarea
                name="customCss"
                value={state.customCss || ''}
                onChange={handleChange}
                placeholder="...هنا لتخصيص التصميم CSS اكتب كود"
                className="w-full h-40 bg-[#0B0F19] border border-[var(--highlight)] rounded-xl p-3 text-[11px] font-mono text-[var(--highlight)] focus:outline-none focus:ring-2 focus:ring-[var(--highlight)]/30 resize-y placeholder:text-slate-600 placeholder:font-sans placeholder:text-right"
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
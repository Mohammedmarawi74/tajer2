
export interface Slide {
  id: string;
  headline: string;
  subheadline: string;
  highlightText: string;
  subjectImageUrl: string;
  logoUrl?: string;
  backgroundColor: string;
  accentColor: string;
  layout: 'center' | 'right' | 'left';
  showSwipeIndicator: boolean;
  showSlideNumber: boolean;
  showProgressBar: boolean;
  showGridOverlay: boolean;
  customCss?: string;
}

export interface CarouselState {
  slides: Slide[];
  activeIndex: number;
}
export interface ImageAdjustments {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  opacity: number;
}

export interface ImageDimensions {
  width: number;
  height: number;
}

export type AspectRatioPreset = '1:1' | '4:3' | '16:9' | '9:16' | 'custom';
export type TemplateCategory = 'social' | 'business' | 'custom';
export type EditorTab = 'adjust' | 'layout' | 'templates';
export interface Theme {
  name: string;
  bg: string;
  arena: string;
  playerAccent: string;
  playerGlow: string;
  aiAccent: string;
  aiGlow: string;
  success: string;
  text: string;
  textMuted: string;
  button: string;
  buttonText: string;
  handBg: string;
  handBorder: string;
  handActiveBorder: string;
  overlay: string;
  modal: string;
}

export const themes = {
  arcadeNeon: {
    name: 'Arcade Neon',
    bg: 'bg-slate-900',
    arena: 'bg-slate-800',
    playerAccent: 'text-cyan-400',
    playerGlow: 'shadow-cyan-400/50',
    aiAccent: 'text-pink-400',
    aiGlow: 'shadow-pink-400/50',
    success: 'text-green-400',
    text: 'text-slate-50',
    textMuted: 'text-slate-400',
    button: 'bg-cyan-500 hover:bg-cyan-400',
    buttonText: 'text-slate-900',
    handBg: 'bg-slate-700',
    handBorder: 'border-slate-600',
    handActiveBorder: 'border-cyan-400',
    overlay: 'bg-black/60',
    modal: 'bg-slate-800',
  },
  retroJapanese: {
    name: 'Retro Japanese',
    bg: 'bg-amber-50',
    arena: 'bg-stone-100',
    playerAccent: 'text-red-600',
    playerGlow: 'shadow-red-400/30',
    aiAccent: 'text-indigo-700',
    aiGlow: 'shadow-indigo-400/30',
    success: 'text-emerald-600',
    text: 'text-stone-800',
    textMuted: 'text-stone-500',
    button: 'bg-red-500 hover:bg-red-400',
    buttonText: 'text-white',
    handBg: 'bg-white',
    handBorder: 'border-stone-300',
    handActiveBorder: 'border-red-500',
    overlay: 'bg-stone-900/50',
    modal: 'bg-stone-50',
  },
} as const;

export type ThemeName = keyof typeof themes;

export const getTheme = (name: ThemeName): Theme => themes[name];

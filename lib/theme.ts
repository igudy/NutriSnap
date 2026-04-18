export const lightColors = {
  brand: '#FF7A2E',
  brandDark: '#E34F00',
  brandLight: '#FFB885',
  brandDeep: '#B83A00',

  espresso: '#1C0F07',
  ink: '#0F0A06',
  charcoal: '#2A1F16',

  cream: '#FBF7F1',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  surfaceWarm: '#FFF8F1',
  surfaceMuted: '#F5EFE6',

  border: '#EFE7DA',
  borderSoft: '#F6F1E8',

  text: '#1C1917',
  textMuted: '#78716C',
  textSubtle: '#A8A29E',
  textInverse: '#FFFFFF',

  gold: '#C9A959',
  goldLight: '#E8D8A8',

  protein: '#2D6A4F',
  carbs: '#E8A23B',
  fats: '#D94A3D',

  success: '#059669',
  successSoft: '#D1FAE5',
  warning: '#D97706',
  info: '#2563EB',
};

export const darkColors: typeof lightColors = {
  brand: '#FF9557',
  brandDark: '#FF7A2E',
  brandLight: '#FFC89E',
  brandDeep: '#E34F00',

  // Hero / tab bar / dark accent surfaces — visibly elevated above pure-black body
  espresso: '#140D08',
  ink: '#000000',
  charcoal: '#221810',

  // Body = OLED-true black for that premium feel
  cream: '#000000',
  surface: '#1A120C',
  surfaceElevated: '#241A12',
  surfaceWarm: '#2A1E14',
  surfaceMuted: '#1F1610',

  border: '#2E241B',
  borderSoft: '#221810',

  text: '#F5EFE6',
  textMuted: '#A89F92',
  textSubtle: '#6B6356',
  textInverse: '#000000',

  gold: '#E8D8A8',
  goldLight: '#F5E8BC',

  protein: '#52B788',
  carbs: '#F5B757',
  fats: '#F17369',

  success: '#10B981',
  successSoft: 'rgba(16,185,129,0.18)',
  warning: '#F59E0B',
  info: '#60A5FA',
};

// Default export stays as light for static uses (animations, chart data seeding).
// Components that should react to theme should call useThemeColors().
export const colors = lightColors;

export const gradients = {
  brand: ['#FFB885', '#FF7A2E', '#E34F00'] as const,
  brandSoft: ['#FFD4B0', '#FFB885', '#FF7A2E'] as const,
  dark: ['#2A1F16', '#1C0F07'] as const,
  gold: ['#E8D8A8', '#C9A959'] as const,
  espressoBrand: ['#FF7A2E', '#E34F00', '#B83A00'] as const,
  surfaceTop: ['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.6)'] as const,
};

export const radii = {
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
};

export const shadow = {
  card: {
    shadowColor: '#1C0F07',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 4,
  },
  soft: {
    shadowColor: '#1C0F07',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  brand: {
    shadowColor: '#FF7A2E',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.32,
    shadowRadius: 18,
    elevation: 10,
  },
  deep: {
    shadowColor: '#1C0F07',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.12,
    shadowRadius: 28,
    elevation: 12,
  },
};

export const font = {
  regular: 'GoogleSans-Regular',
  medium: 'GoogleSans-Medium',
  semibold: 'GoogleSans-SemiBold',
  bold: 'GoogleSans-Bold',
};

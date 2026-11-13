export const THEME = {
  colors: {
    // Pitch Black OLED & Deep Graphites (Inspo Aesthetic)
    bgVoid: '#08080a',
    bgVoidAlt: '#0e0e13',
    bgSurface: '#14141c',
    bgElevated: '#1a1a24',
    bgCard: 'rgba(22, 22, 32, 0.72)',
    bgCardHigh: 'rgba(30, 30, 44, 0.88)',
    bgGlass: 'rgba(255, 255, 255, 0.05)',
    bgGlassHigh: 'rgba(255, 255, 255, 0.09)',
    bgGlassOverlay: 'rgba(10, 10, 14, 0.75)',

    // Glass Borders & Outlines
    borderSubtle: 'rgba(255, 255, 255, 0.06)',
    borderLight: 'rgba(255, 255, 255, 0.12)',
    borderBright: 'rgba(255, 255, 255, 0.22)',
    borderGlow: 'rgba(255, 94, 58, 0.35)',

    // Adverse Vibrant Gradient Accents
    accentFlame: '#ff5e3a',      // Inspo LIVE orange/red
    accentFlameEnd: '#ff2a6d',
    accentPink: '#ff3b81',
    accentPurple: '#a855f7',
    accentViolet: '#8b5cf6',
    accentCyan: '#06b6d4',
    accentEmerald: '#10b981',    // Inspo online indicator green
    accentAmber: '#f59e0b',
    accentBlue: '#3b82f6',

    // Text Hierarchy
    textPrimary: '#ffffff',
    textSecondary: '#9ca3af',
    textMuted: '#6b7280',
    textSubtle: '#4b5563',
    textHighlight: '#f3f4f6',

    // Status & Utility
    onlineGreen: '#22c55e',
    dangerRed: '#ef4444',
    warningYellow: '#eab308',
    burntAsh: '#451a03',
  },
  typography: {
    hero: { fontSize: 26, fontWeight: '800' as const, letterSpacing: -0.5 },
    titleLarge: { fontSize: 20, fontWeight: '700' as const, letterSpacing: -0.3 },
    titleMedium: { fontSize: 16, fontWeight: '700' as const },
    body: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
    caption: { fontSize: 12, fontWeight: '500' as const },
    tiny: { fontSize: 10, fontWeight: '600' as const, letterSpacing: 0.5 },
  },
  radius: {
    xs: 6,
    sm: 10,
    md: 14,
    lg: 20,
    xl: 26,
    squircle: 22,
    full: 9999,
  },
};

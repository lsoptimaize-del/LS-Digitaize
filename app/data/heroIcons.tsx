/* Small line-icon set used inside hero node diagrams. 24x24, stroke-based. */

export const HERO_ICONS: Record<string, (props: { size?: number }) => React.ReactNode> = {
  target: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="1.3" fill="currentColor" />
    </svg>
  ),
  layers: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3L21 8L12 13L3 8L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M3 12.5L12 17.5L21 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M3 16.5L12 21.5L21 16.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  chat: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 5h16v11H9l-4 3.5V16H4V5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 9.5h8M8 12.5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  grid: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.3" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.3" stroke="currentColor" strokeWidth="1.6" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.3" stroke="currentColor" strokeWidth="1.6" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  camera: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 8h3l1.5-2h7L17 8h3v11H4V8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="13.5" r="3.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  scissors: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="6.5" cy="6.5" r="2.3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="6.5" cy="17.5" r="2.3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8.3 8L20 19M20 5L8.3 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  calendar: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="5.5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 10h17M8 3.5v4M16 3.5v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  megaphone: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 10v4h3l9 4V6l-9 4H3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M18 9.5a4 4 0 010 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8 14.2V19a1.6 1.6 0 003.1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  funnel: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 4.5h16L14 13v6l-4 1.5V13L4 4.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  share: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="6" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18" cy="5.5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18" cy="18.5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8.1 10.8L15.9 6.7M8.1 13.2L15.9 17.3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  chart: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 20V4M4 20h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M7.5 16.5v-4M12 16.5v-7M16.5 16.5v-2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  handshake: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M2.5 11.5L7 8l4 3-2 2 3 3-2.2 2.1L2.5 11.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M21.5 11.5L17 8l-2.2 1.8" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M11 11l2.5 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  users: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="17.5" cy="9" r="2.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M15.3 13.2c2.3.2 4.2 2 4.2 4.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  pin: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 21s7-6.6 7-11.5a7 7 0 10-14 0C5 14.4 12 21 12 21Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  video: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6.5" width="12" height="11" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M15 10.5l6-3v9l-6-3v-3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  compass: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M15 9l-2 6-4-2 2-6 4 2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
};

export type HeroIconKey = keyof typeof HERO_ICONS;

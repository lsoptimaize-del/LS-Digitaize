/* One bespoke, full-scene hero illustration per service — each expressing that
   service's own idea (not a reused template). viewBox 0 0 600 440 throughout
   so every scene drops into the same hero frame. */

type Art = (accent: string, accent2: string, metric?: string) => React.ReactNode;

const fillBox = { transformBox: 'fill-box' as const, transformOrigin: 'center' as const };

/* 1 — Branding & Digital Identity: a faceted mark assembling from three
   shards, a signature stroke drawing itself, a palette locking into place. */
const BrandingArt: Art = (accent, accent2) => (
  <svg viewBox="0 0 600 440" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <linearGradient id="brandArtGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={accent} stopOpacity="0.85" />
        <stop offset="100%" stopColor={accent2} stopOpacity="0.45" />
      </linearGradient>
    </defs>
    {/* alignment grid */}
    {[0, 1, 2, 3, 4, 5].map(i => (
      <line key={`v${i}`} x1={i * 110} y1="0" x2={i * 110} y2="440" stroke={accent} strokeOpacity="0.05" strokeWidth="1" />
    ))}
    {[0, 1, 2, 3].map(i => (
      <line key={`h${i}`} x1="0" y1={i * 110 + 30} x2="600" y2={i * 110 + 30} stroke={accent} strokeOpacity="0.05" strokeWidth="1" />
    ))}

    {/* faceted emblem — three shards sliding together */}
    <g style={{ ...fillBox, animation: 'shardInTL 1.1s cubic-bezier(0.22,1,0.36,1) both' }}>
      <polygon points="300,120 240,210 300,210" fill={accent} fillOpacity="0.22" stroke={accent} strokeOpacity="0.7" strokeWidth="1.5" />
    </g>
    <g style={{ ...fillBox, animation: 'shardInTR 1.1s 0.12s cubic-bezier(0.22,1,0.36,1) both' }}>
      <polygon points="300,120 360,210 300,210" fill="url(#brandArtGrad)" stroke={accent2} strokeOpacity="0.7" strokeWidth="1.5" />
    </g>
    <g style={{ ...fillBox, animation: 'shardInB 1.1s 0.24s cubic-bezier(0.22,1,0.36,1) both' }}>
      <polygon points="240,210 360,210 300,300" fill={accent2} fillOpacity="0.18" stroke={accent} strokeOpacity="0.55" strokeWidth="1.5" />
    </g>
    <circle cx="300" cy="205" r="3" fill={accent} style={{ animation: 'pulseGlow 2.4s ease-in-out infinite' }} />

    {/* signature stroke */}
    <path
      d="M170 340 C 220 320, 250 365, 300 345 S 380 315, 430 340"
      stroke={accent}
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
      strokeDasharray="320"
      style={{ animation: 'brandDraw 2.4s 0.8s ease-out both' }}
    />

    {/* palette locking into place */}
    {[accent, accent2, '#1a3a8a', '#0a1c50', '#2a5caa'].map((c, i) => (
      <rect
        key={c + i}
        x={230 + i * 30}
        y="378"
        width="20"
        height="20"
        rx="5"
        fill={c}
        fillOpacity="0.9"
        style={{ animation: `swatchPop 0.5s ${1.1 + i * 0.1}s both ease-out` }}
      />
    ))}

    {/* corner brackets */}
    <path d="M60 60L60 40L80 40" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4" fill="none" />
    <path d="M540 60L540 40L520 40" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4" fill="none" />
  </svg>
);

/* 2 — Organic Marketing: a vine growing from a seed, content-card leaves
   sprouting and getting bigger as it climbs. Literal to "organic". */
const OrganicArt: Art = (accent, accent2) => {
  const leaves = [
    { t: 0.16, x: 118, y: 350, side: -1, s: 0.65 },
    { t: 0.32, x: 178, y: 300, side: 1, s: 0.78 },
    { t: 0.48, x: 240, y: 255, side: -1, s: 0.9 },
    { t: 0.64, x: 305, y: 205, side: 1, s: 1.0 },
    { t: 0.8, x: 370, y: 155, side: -1, s: 1.12 },
    { t: 0.94, x: 430, y: 110, side: 1, s: 1.25 },
  ];
  return (
    <svg viewBox="0 0 600 440" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="seedGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <ellipse cx="90" cy="380" rx="90" ry="60" fill="url(#seedGlow)" />

      {/* roots */}
      <path d="M90 385 L60 410 M90 385 L75 420 M90 385 L110 415" stroke={accent2} strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" />

      {/* stem */}
      <path
        d="M90 380 C 140 340, 150 300, 190 270 C 240 235, 260 220, 300 190 C 350 155, 370 140, 440 90"
        stroke={accent}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="700"
        style={{ animation: 'brandDraw 2.6s ease-out both' }}
      />

      {/* seed */}
      <circle cx="90" cy="380" r="10" fill={accent} style={{ animation: 'pulseGlow 2.2s ease-in-out infinite' }} />

      {/* leaves = content cards */}
      {leaves.map((l, i) => (
        <g
          key={i}
          style={{
            ...fillBox,
            animation: `milestoneIn 0.5s ${0.6 + i * 0.18}s both ease-out, leafSway ${3 + i * 0.3}s ${1.4 + i * 0.15}s ease-in-out infinite alternate`,
          }}
        >
          <rect
            x={l.x - 20 * l.s}
            y={l.y - 14 * l.s}
            width={40 * l.s}
            height={28 * l.s}
            rx={6 * l.s}
            fill={i % 2 === 0 ? accent : accent2}
            fillOpacity={0.16 + i * 0.06}
            stroke={i % 2 === 0 ? accent : accent2}
            strokeOpacity="0.55"
            strokeWidth="1.3"
            transform={`rotate(${l.side * 8} ${l.x} ${l.y})`}
          />
        </g>
      ))}

      {/* target flourish near top */}
      <circle cx="440" cy="90" r="5" fill={accent2} style={{ animation: 'pulseOpacity 2s ease-in-out infinite alternate' }} />
    </svg>
  );
};

/* 3 — Performance Marketing: scattered traffic funnels into one bright
   trajectory that pierces a target. */
const PerformanceArt: Art = (accent, accent2, metric?: string) => (
  <svg viewBox="0 0 600 440" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <defs>
      <radialGradient id="perfArtGlow" cx="80%" cy="20%" r="45%">
        <stop offset="0%" stopColor={accent} stopOpacity="0.22" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
    </defs>
    <ellipse cx="470" cy="110" rx="160" ry="120" fill="url(#perfArtGlow)" />

    {/* funnel */}
    <path
      d="M70 70 L330 70 L235 230 L235 300 L165 330 L165 230 Z"
      fill="rgba(74,158,255,0.05)"
      stroke={accent}
      strokeOpacity="0.35"
      strokeWidth="1.5"
    />
    {[100, 150, 200, 250, 300].map((x, i) => (
      <line
        key={i}
        x1={x}
        y1="72"
        x2="200"
        y2="225"
        stroke={accent2}
        strokeOpacity="0.18"
        strokeWidth="1"
        strokeDasharray="3 4"
        style={{ animation: `dashAnim ${2.4 + i * 0.3}s linear infinite` }}
      />
    ))}

    {/* trajectory piercing upward to the target */}
    <path
      d="M200 330 C 230 260, 260 200, 320 165 C 380 130, 430 120, 470 100"
      stroke={accent}
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
      strokeDasharray="0 1000"
      style={{ animation: 'lineDrawRight 1.8s 0.5s ease-out both' }}
    />
    {/* speed ticks trailing the trajectory */}
    {[0, 1, 2].map(i => (
      <line
        key={i}
        x1={215 + i * 14}
        y1={315 - i * 14}
        x2={228 + i * 14}
        y2={300 - i * 14}
        stroke={accent}
        strokeOpacity={0.5 - i * 0.12}
        strokeWidth="2"
        strokeLinecap="round"
      />
    ))}

    {/* target */}
    <circle cx="470" cy="100" r="34" stroke={accent} strokeOpacity="0.3" strokeWidth="1.5" fill="none" />
    <circle cx="470" cy="100" r="20" stroke={accent} strokeOpacity="0.5" strokeWidth="1.5" fill="none" />
    <circle cx="470" cy="100" r="7" fill={accent} style={{ animation: 'pulseGlow 1.8s ease-in-out infinite' }} />

    {metric && (
      <text x="410" y="52" fontSize="11" fill={accent} fontFamily="monospace" fontWeight="bold" letterSpacing="0.5">
        {metric.toUpperCase()}
      </text>
    )}
  </svg>
);

/* 4 — End-to-End Social + Scaling: a pulsing core with orbits expanding
   outward, satellites travelling each ring, periodic outward pulses. */
const SocialArt: Art = (accent, accent2) => {
  const orbits = [70, 116, 164];
  const circlePath = (r: number) => `M ${300 + r},220 A ${r},${r} 0 1,1 ${300 - r},220 A ${r},${r} 0 1,1 ${300 + r},220`;
  return (
    <svg viewBox="0 0 600 440" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="socialArtGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.22" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <ellipse cx="300" cy="220" rx="220" ry="180" fill="url(#socialArtGlow)" />

      {orbits.map((r, i) => (
        <circle key={r} cx="300" cy="220" r={r} stroke={i % 2 === 0 ? accent : accent2} strokeOpacity="0.28" strokeWidth="1.3" strokeDasharray="4 7" fill="none" />
      ))}

      {/* outward scaling pulses */}
      {[0, 1].map(i => (
        <circle
          key={i}
          cx="300"
          cy="220"
          r="36"
          stroke={accent}
          strokeWidth="1.5"
          fill="none"
          style={{ ...fillBox, animation: `ringPulse 3.2s ${i * 1.6}s ease-out infinite` }}
        />
      ))}

      {/* core */}
      <circle cx="300" cy="220" r="26" fill="rgba(8,15,40,0.95)" stroke={accent} strokeWidth="2" />
      <circle cx="300" cy="220" r="13" fill={accent} fillOpacity="0.5" style={{ animation: 'pulseGlow 2s ease-in-out infinite' }} />

      {/* satellites travelling each ring */}
      {orbits.map((r, i) => (
        <circle key={`s${r}`} r={5 - i * 0.6} fill={i % 2 === 0 ? accent : accent2}>
          <animateMotion dur={`${8 + i * 3}s`} repeatCount="indefinite" path={circlePath(r)} />
        </circle>
      ))}
    </svg>
  );
};

/* 5 — Influencer & Offline: a broadcasting phone on one side, a storefront on
   the other, one signal arcing between them. */
const InfluencerArt: Art = (accent, accent2) => (
  <svg viewBox="0 0 600 440" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* ground line */}
    <line x1="40" y1="370" x2="560" y2="370" stroke="white" strokeOpacity="0.08" strokeWidth="1" />

    {/* phone, broadcasting */}
    <rect x="95" y="255" width="70" height="120" rx="12" fill="rgba(8,15,40,0.9)" stroke={accent} strokeWidth="1.5" strokeOpacity="0.7" />
    <rect x="106" y="270" width="48" height="80" rx="3" fill={accent} fillOpacity="0.08" />
    <circle cx="130" cy="360" r="3" fill={accent} fillOpacity="0.6" />
    {[34, 54, 76].map((r, i) => (
      <path
        key={r}
        d={`M 165,${315 - r * 0.3} A ${r} ${r} 0 0 1 165,${315 + r * 0.3}`}
        stroke={accent}
        strokeOpacity={0.5 - i * 0.13}
        strokeWidth="1.6"
        fill="none"
        style={{ animation: `pulseOpacity ${2 + i * 0.4}s ease-in-out infinite alternate` }}
      />
    ))}

    {/* storefront / skyline, offline presence */}
    {[
      { x: 430, w: 42, h: 90 },
      { x: 478, w: 34, h: 130 },
      { x: 518, w: 46, h: 70 },
    ].map((b, i) => (
      <rect key={i} x={b.x} y={370 - b.h} width={b.w} height={b.h} fill={accent2} fillOpacity="0.14" stroke={accent2} strokeOpacity="0.4" strokeWidth="1.3" />
    ))}
    {/* location pin above the tallest building */}
    <path
      d="M478 195 C478 178 493 168 495 168 C497 168 512 178 512 195 C512 212 495 232 495 232 C495 232 478 212 478 195 Z"
      fill="rgba(8,15,40,0.9)"
      stroke={accent2}
      strokeWidth="1.6"
    />
    <circle cx="495" cy="196" r="7" fill={accent2} fillOpacity="0.65" />

    {/* signal arcing from phone to storefront, one story travelling both ways */}
    <path
      id="influArc"
      d="M 180 270 C 280 150, 380 150, 470 190"
      stroke={accent}
      strokeOpacity="0.35"
      strokeWidth="1.5"
      strokeDasharray="4 6"
      fill="none"
    />
    <circle r="4.5" fill={accent}>
      <animateMotion dur="4.5s" repeatCount="indefinite" path="M 180 270 C 280 150, 380 150, 470 190" />
    </circle>
  </svg>
);

/* 6 — Events / Photography / Videography: an aperture opening into a
   spotlight hitting a stage, film-strip sprockets along the edge. */
const EventsArt: Art = (accent, accent2) => {
  const blades = 8;
  const cx = 300;
  const cy = 150;
  const rOuter = 62;
  const rInner = 24;
  return (
    <svg viewBox="0 0 600 440" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* film strip along the left edge */}
      {[0, 1, 2, 3, 4].map(i => (
        <g key={i} style={{ animation: `pulseOpacity 2.4s ${i * 0.2}s ease-in-out infinite alternate` }}>
          <rect x="30" y={40 + i * 70} width="34" height="52" rx="3" fill="rgba(255,255,255,0.04)" stroke={accent2} strokeOpacity="0.3" strokeWidth="1" />
          <circle cx="47" cy={48 + i * 70} r="2" fill={accent2} fillOpacity="0.5" />
          <circle cx="47" cy={84 + i * 70} r="2" fill={accent2} fillOpacity="0.5" />
        </g>
      ))}

      {/* aperture blades */}
      {Array.from({ length: blades }).map((_, i) => {
        const a0 = (i / blades) * Math.PI * 2;
        const a1 = ((i + 0.62) / blades) * Math.PI * 2;
        const p1 = [cx + rInner * Math.cos(a0), cy + rInner * Math.sin(a0)];
        const p2 = [cx + rOuter * Math.cos((a0 + a1) / 2), cy + rOuter * Math.sin((a0 + a1) / 2)];
        const p3 = [cx + rInner * Math.cos(a1), cy + rInner * Math.sin(a1)];
        return (
          <polygon
            key={i}
            points={`${p1.join(',')} ${p2.join(',')} ${p3.join(',')}`}
            fill={i % 2 === 0 ? accent : accent2}
            fillOpacity="0.22"
            stroke={i % 2 === 0 ? accent : accent2}
            strokeOpacity="0.55"
            strokeWidth="1.2"
          />
        );
      })}
      <circle cx={cx} cy={cy} r={rInner - 6} fill={accent} style={{ animation: 'apertureGlow 2.2s ease-in-out infinite' }} />

      {/* spotlight cone onto the stage */}
      <path d={`M ${cx - 14},${cy + rInner} L ${cx - 120},370 L ${cx + 120},370 L ${cx + 14},${cy + rInner} Z`} fill={accent} fillOpacity="0.06" />
      <ellipse cx={cx} cy="372" rx="150" ry="16" stroke={accent} strokeOpacity="0.3" strokeWidth="1.3" fill="rgba(8,15,40,0.5)" />
    </svg>
  );
};

/* 7 — Consultation & Business Development: a compass with many faint
   possible paths, one accent-lit path traced from the centre. */
const ConsultationArt: Art = (accent, accent2) => {
  const cx = 300;
  const cy = 230;
  const rFaint = 150;
  const chosenAngle = -48;
  const rad = (chosenAngle * Math.PI) / 180;
  const chosenX = cx + rFaint * Math.cos(rad);
  const chosenY = cy + rFaint * Math.sin(rad);
  return (
    <svg viewBox="0 0 600 440" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx={cx} cy={cy} r={rFaint + 20} stroke={accent} strokeOpacity="0.15" strokeWidth="1" strokeDasharray="3 5" fill="none" />

      {/* faint unchosen paths */}
      {Array.from({ length: 12 }).map((_, i) => {
        const deg = (i / 12) * 360;
        if (Math.abs(deg - (chosenAngle + 360)) < 1 || Math.abs(deg - chosenAngle) < 1) return null;
        const r = (deg * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx + rFaint * Math.cos(r)}
            y2={cy + rFaint * Math.sin(r)}
            stroke={accent2}
            strokeOpacity="0.12"
            strokeWidth="1"
          />
        );
      })}

      {/* the chosen path */}
      <line
        x1={cx}
        y1={cy}
        x2={chosenX}
        y2={chosenY}
        stroke={accent}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="230"
        style={{ animation: 'brandDraw 2s 0.3s ease-out both' }}
      />
      {[0.32, 0.6, 0.85].map((t, i) => (
        <circle
          key={i}
          cx={cx + (chosenX - cx) * t}
          cy={cy + (chosenY - cy) * t}
          r="4.5"
          fill={accent}
          style={{ ...fillBox, animation: `milestoneIn 0.4s ${1 + i * 0.25}s both ease-out` }}
        />
      ))}
      <path
        d={`M ${chosenX},${chosenY} l -10,-4 l 3,10 z`}
        fill={accent}
        style={{ ...fillBox, animation: 'milestoneIn 0.4s 1.9s both ease-out' }}
      />

      {/* compass core */}
      <circle cx={cx} cy={cy} r="22" fill="rgba(8,15,40,0.95)" stroke={accent} strokeWidth="1.8" />
      <circle cx={cx} cy={cy} r="10" fill={accent} fillOpacity="0.4" style={{ animation: 'pulseGlow 2.4s ease-in-out infinite' }} />
      {['N', 'E', 'S', 'W'].map((label, i) => {
        const deg = i * 90 - 90;
        const r = (deg * Math.PI) / 180;
        const x = cx + (rFaint + 32) * Math.cos(r);
        const y = cy + (rFaint + 32) * Math.sin(r);
        return (
          <text key={label} x={x} y={y} fontSize="10" fill="rgba(242,246,252,0.3)" fontFamily="monospace" textAnchor="middle">
            {label}
          </text>
        );
      })}
    </svg>
  );
};

export const HERO_ART: Record<string, Art> = {
  'branding-identity': BrandingArt,
  'organic-marketing': OrganicArt,
  'performance-marketing': PerformanceArt,
  'social-media-management': SocialArt,
  'influencer-offline-marketing': InfluencerArt,
  'events-photography-videography': EventsArt,
  'consultation-business-development': ConsultationArt,
};

import type { CSSProperties } from 'react';

/* Light-theme illustration set: white objects, soft shadows, blue-only palette. */
const C = {
  ink: '#2B3A67',
  line: '#DCE6F7',
  blue: '#4A8BFF',
  sky: '#8EC5FF',
  violet: '#6E8BFF',
  coral: '#2A7DE1',
  amber: '#5BC9E8',
  mint: '#4A9EFF',
  mintDeep: '#1F5FBF',
};

/* Blue-tinted panel behind each illustration, indexed like SERVICES. */
export const SERVICE_PANEL_TINTS = [
  'linear-gradient(135deg,#EEF4FF 0%,#E4ECFF 100%)',
  'linear-gradient(135deg,#E6F4FB 0%,#EAF3FF 100%)',
  'linear-gradient(135deg,#E5F0FF 0%,#E1F5FC 100%)',
  'linear-gradient(160deg,#EAF2FF 0%,#E7ECFF 100%)',
  'linear-gradient(135deg,#E8F1FF 0%,#EDEFFF 100%)',
  'linear-gradient(135deg,#E2F3FB 0%,#E8F0FF 100%)',
  'linear-gradient(135deg,#E8F2FF 0%,#E2F5FA 100%)',
];

const box = (origin: string): CSSProperties => ({ transformBox: 'fill-box', transformOrigin: origin });

function Shadow({ id }: { id: string }) {
  return (
    <filter id={id} x="-25%" y="-25%" width="150%" height="160%">
      <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor={C.ink} floodOpacity="0.14" />
    </filter>
  );
}

function Sparkle({ x, y, s = 1, c = C.amber, d = 3 }: { x: number; y: number; s?: number; c?: string; d?: number }) {
  return (
    <path
      d="M0 -7 L2 -2 L7 0 L2 2 L0 7 L-2 2 L-7 0 L-2 -2 Z"
      transform={`translate(${x} ${y}) scale(${s})`}
      fill={c}
      style={{ animation: `pulseOpacity ${d}s ease-in-out infinite alternate` }}
    />
  );
}

/* 01 — Branding & identity: logo card, swatch fan, type specimen, bezier handles */
export function BrandingArt() {
  return (
    <svg viewBox="0 0 320 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <Shadow id="brSh" />
        <linearGradient id="brMark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.blue} />
          <stop offset="1" stopColor={C.violet} />
        </linearGradient>
      </defs>
      <g transform="translate(70 142)">
        {[
          { c: C.coral, r: -32 },
          { c: C.amber, r: -11 },
          { c: C.mint, r: 11 },
          { c: C.sky, r: 32 },
        ].map((s, i) => (
          <g key={i} transform={`rotate(${s.r})`}>
            <rect
              x="-13" y="-70" width="26" height="70" rx="9" fill={s.c} filter="url(#brSh)"
              style={{ ...box('50% 100%'), animation: `swatchPop 0.5s ${0.12 * i}s both ease-out` }}
            />
            <rect x="-13" y="-22" width="26" height="22" rx="9" fill="#fff" fillOpacity="0.55" />
          </g>
        ))}
      </g>
      <rect x="112" y="22" width="96" height="116" rx="16" fill="#fff" filter="url(#brSh)" />
      <circle cx="160" cy="62" r="25" fill="url(#brMark)" />
      <path d="M160 46 L166 58 L178 62 L166 66 L160 78 L154 66 L142 62 L154 58 Z" fill="#fff" />
      <rect x="132" y="100" width="56" height="7" rx="3.5" fill={C.ink} fillOpacity="0.75" />
      <rect x="142" y="114" width="36" height="5" rx="2.5" fill={C.sky} />
      <rect x="228" y="26" width="70" height="56" rx="12" fill="#fff" filter="url(#brSh)" />
      <text x="263" y="64" textAnchor="middle" fontSize="30" fontWeight="700" fill={C.ink} fontFamily="Georgia, 'Times New Roman', serif">Aa</text>
      {[C.blue, C.violet, C.coral].map((c, i) => (
        <circle key={i} cx={243 + i * 12} cy="74" r="2.6" fill={c} />
      ))}
      <path d="M232 132 C 250 100, 274 150, 294 112" stroke={C.blue} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M232 132 L244 108 M294 112 L282 132" stroke={C.blue} strokeOpacity="0.4" strokeWidth="1.2" />
      {[[232, 132], [294, 112]].map(([x, y], i) => (
        <rect key={i} x={x - 4} y={y - 4} width="8" height="8" rx="2" fill="#fff" stroke={C.blue} strokeWidth="1.8" />
      ))}
      <circle cx="244" cy="108" r="3" fill={C.blue} />
      <circle cx="282" cy="132" r="3" fill={C.blue} />
      <Sparkle x={104} y={26} s={1.1} />
      <Sparkle x={302} y={98} s={0.8} c={C.violet} d={4} />
      <circle cx="20" cy="60" r="4" fill={C.violet} fillOpacity="0.5" style={{ animation: 'floatDot 3s ease-in-out infinite alternate' }} />
    </svg>
  );
}

/* 02 — Organic marketing: growing plant surrounded by content, search and rank */
export function OrganicArt() {
  return (
    <svg viewBox="0 0 320 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <Shadow id="orSh" />
        <linearGradient id="orImg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9CD3FF" />
          <stop offset="1" stopColor={C.sky} />
        </linearGradient>
      </defs>
      <rect x="20" y="30" width="86" height="100" rx="13" fill="#fff" filter="url(#orSh)" />
      <rect x="28" y="38" width="70" height="42" rx="8" fill="url(#orImg)" />
      <circle cx="84" cy="52" r="6" fill={C.amber} />
      <path d="M28 80 L50 58 L64 72 L76 62 L98 80 Z" fill="#fff" fillOpacity="0.6" />
      <rect x="28" y="90" width="58" height="6" rx="3" fill={C.line} />
      <rect x="28" y="102" width="42" height="5" rx="2.5" fill={C.line} />
      <rect x="28" y="113" width="26" height="8" rx="4" fill={C.mint} fillOpacity="0.35" />
      <path d="M142 138 H178 L174 116 H146 Z" fill={C.coral} />
      <rect x="139" y="110" width="42" height="9" rx="4.5" fill="#6BA6FF" />
      <path d="M160 110 C160 92 160 80 160 60" stroke={C.mintDeep} strokeWidth="4" strokeLinecap="round" />
      <g style={{ ...box('100% 100%'), animation: 'leafSway 3.2s ease-in-out infinite alternate' }}>
        <path d="M160 96 C140 96 130 80 132 68 C150 68 160 80 160 96 Z" fill={C.mint} />
      </g>
      <g style={{ ...box('0% 100%'), animation: 'leafSway 3.8s ease-in-out infinite alternate-reverse' }}>
        <path d="M160 84 C180 84 190 66 188 54 C170 54 160 66 160 84 Z" fill="#8EC5FF" />
      </g>
      <g style={{ ...box('50% 100%'), animation: 'leafSway 4.2s ease-in-out infinite alternate' }}>
        <path d="M160 62 C149 54 151 42 160 32 C169 42 171 54 160 62 Z" fill={C.mintDeep} />
      </g>
      <rect x="214" y="30" width="92" height="28" rx="14" fill="#fff" filter="url(#orSh)" />
      <circle cx="231" cy="44" r="6" stroke={C.blue} strokeWidth="2.2" />
      <path d="M235.5 48.5 L240 53" stroke={C.blue} strokeWidth="2.2" strokeLinecap="round" />
      <rect x="247" y="41" width="48" height="6" rx="3" fill={C.line} />
      <rect x="228" y="68" width="64" height="28" rx="14" fill={C.amber} filter="url(#orSh)" />
      <text x="260" y="88" textAnchor="middle" fontSize="15" fontWeight="800" fill="#0F3A7A" fontFamily="system-ui, sans-serif">#1</text>
      <rect x="214" y="106" width="92" height="38" rx="11" fill="#fff" filter="url(#orSh)" />
      <path d="M224 134 L240 126 L256 130 L272 118 L294 112" stroke={C.mint} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="294" cy="112" r="4" fill={C.mint} style={{ animation: 'pulseGlow 2s ease-in-out infinite', ...box('50% 50%') }} />
      <path
        d="M196 66 C190 60 184 66 190 72 L196 78 L202 72 C208 66 202 60 196 66 Z"
        fill={C.coral}
        style={{ animation: 'floatDot 2.6s ease-in-out infinite alternate' }}
      />
      <Sparkle x={124} y={28} s={0.9} c={C.mint} />
    </svg>
  );
}

/* 03 — Performance marketing: funnel to revenue, bar chart, ROAS */
export function PerformanceArt() {
  return (
    <svg viewBox="0 0 320 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <Shadow id="pfSh" />
        <linearGradient id="pfBar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.sky} />
          <stop offset="1" stopColor={C.blue} />
        </linearGradient>
      </defs>
      {[46, 84, 122, 160, 198].map((x, i) => (
        <circle key={i} cx={x - 6 + (i % 2) * 8} cy={12 + (i % 3) * 3} r="4" fill={[C.coral, C.amber, C.violet, C.mint, C.sky][i]} fillOpacity="0.85"
          style={{ animation: `floatDot ${2.4 + i * 0.4}s ease-in-out infinite alternate` }} />
      ))}
      <path d="M32 26 H208 L194 58 H46 Z" fill="#D5E6FF" filter="url(#pfSh)" />
      <path d="M50 62 H190 L178 90 H62 Z" fill="#96C0FF" filter="url(#pfSh)" />
      <path d="M66 94 H174 L164 118 H76 Z" fill={C.blue} filter="url(#pfSh)" />
      <text x="120" y="47" textAnchor="middle" fontSize="11" fontWeight="700" fill={C.ink} fontFamily="system-ui, sans-serif">Reach</text>
      <text x="120" y="81" textAnchor="middle" fontSize="11" fontWeight="700" fill={C.ink} fontFamily="system-ui, sans-serif">Clicks</text>
      <text x="120" y="111" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" fontFamily="system-ui, sans-serif">Sales</text>
      <circle cx="120" cy="140" r="13" fill={C.amber} filter="url(#pfSh)" style={{ animation: 'floatDot 2s ease-in-out infinite alternate' }} />
      <text x="120" y="145" textAnchor="middle" fontSize="14" fontWeight="800" fill="#0F3A7A" fontFamily="system-ui, sans-serif">$</text>
      <rect x="222" y="18" width="86" height="80" rx="13" fill="#fff" filter="url(#pfSh)" />
      {[18, 30, 26, 42, 56].map((h, i) => (
        <rect
          key={i} x={232 + i * 14} y={86 - h} width="9" height={h} rx="3"
          fill={i === 4 ? C.mint : 'url(#pfBar)'}
          style={{ ...box('50% 100%'), animation: `barRise 0.7s ${0.12 * i}s both ease-out` }}
        />
      ))}
      <rect x="226" y="108" width="78" height="30" rx="15" fill="#DDEBFF" stroke={C.mint} strokeOpacity="0.5" />
      <text x="265" y="127" textAnchor="middle" fontSize="12" fontWeight="800" fill="#1F5FBF" fontFamily="system-ui, sans-serif">ROAS 3.4×</text>
    </svg>
  );
}

/* 04 — Social media management (tall card): phone feed + calendar + engagement */
export function SocialArt() {
  return (
    <svg viewBox="0 0 300 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <Shadow id="scSh" />
        <linearGradient id="scPost" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#A9D0FF" />
          <stop offset="1" stopColor="#8FA9FF" />
        </linearGradient>
        <linearGradient id="scAv" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.coral} />
          <stop offset="1" stopColor={C.violet} />
        </linearGradient>
      </defs>
      <path d="M100 100 L80 84 M200 60 L220 52 M200 120 L214 108 M100 190 L74 190 M200 190 L206 180" stroke="#B9C8E6" strokeWidth="1.5" strokeDasharray="3 5" style={{ animation: 'dashAnim 1.6s linear infinite' }} />
      <rect x="100" y="18" width="100" height="214" rx="22" fill="#fff" stroke={C.line} strokeWidth="2" filter="url(#scSh)" />
      <rect x="136" y="27" width="28" height="6" rx="3" fill={C.line} />
      <circle cx="118" cy="52" r="8" fill="url(#scAv)" />
      <rect x="132" y="46" width="42" height="5" rx="2.5" fill={C.line} />
      <rect x="132" y="55" width="26" height="4" rx="2" fill={C.line} fillOpacity="0.6" />
      <rect x="110" y="68" width="80" height="80" rx="10" fill="url(#scPost)" />
      <circle cx="150" cy="108" r="14" fill="#fff" fillOpacity="0.9" />
      <path d="M146 100 L158 108 L146 116 Z" fill={C.coral} />
      <path d="M118 164 C112 158 106 165 112 171 L118 177 L124 171 C130 165 124 158 118 164 Z" fill={C.coral} />
      <circle cx="140" cy="166" r="6" stroke={C.ink} strokeOpacity="0.35" strokeWidth="1.8" />
      <path d="M158 172 L168 162 L166 172 M168 162 L158 164" stroke={C.ink} strokeOpacity="0.35" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="110" y="184" width="72" height="5" rx="2.5" fill={C.line} />
      <rect x="110" y="195" width="48" height="5" rx="2.5" fill={C.line} />
      <rect x="110" y="208" width="80" height="14" rx="6" fill="#F1F4FB" />
      <g>
        <rect x="12" y="52" width="74" height="70" rx="12" fill="#fff" filter="url(#scSh)" />
        <rect x="12" y="52" width="74" height="20" rx="12" fill="#4A8BFF" />
        <rect x="12" y="62" width="74" height="10" fill="#4A8BFF" />
        <circle cx="26" cy="62" r="2.5" fill="#fff" />
        <circle cx="36" cy="62" r="2.5" fill="#fff" fillOpacity="0.6" />
        {Array.from({ length: 12 }).map((_, i) => {
          const hot = [1, 5, 10].includes(i);
          return (
            <circle
              key={i}
              cx={25 + (i % 4) * 16}
              cy={85 + Math.floor(i / 4) * 13}
              r="3.6"
              fill={hot ? [C.mint, C.violet, C.amber][[1, 5, 10].indexOf(i)] : '#E3E9F5'}
              style={hot ? { animation: `pulseOpacity ${2 + i * 0.1}s ease-in-out infinite alternate` } : undefined}
            />
          );
        })}
      </g>
      <g style={{ animation: 'floatDot 3s ease-in-out infinite alternate' }}>
        <rect x="208" y="32" width="72" height="30" rx="15" fill="#fff" filter="url(#scSh)" />
        <path d="M226 46 C220 40 214 47 220 52 L226 58 L232 52 C238 47 232 40 226 46 Z" fill={C.coral} />
        <text x="242" y="52" fontSize="13" fontWeight="800" fill={C.ink} fontFamily="system-ui, sans-serif">+99</text>
      </g>
      <g style={{ animation: 'floatDot 3.6s ease-in-out infinite alternate-reverse' }}>
        <rect x="212" y="84" width="76" height="36" rx="14" fill="#fff" filter="url(#scSh)" />
        <path d="M222 120 L216 130 L232 120 Z" fill="#fff" />
        <rect x="222" y="94" width="50" height="5" rx="2.5" fill={C.line} />
        <rect x="222" y="105" width="32" height="5" rx="2.5" fill={C.sky} />
      </g>
      <rect x="206" y="146" width="80" height="30" rx="15" fill="#DDEBFF" stroke={C.mint} strokeOpacity="0.5" />
      <path d="M220 165 L228 156 L233 161 L242 152 M236 152 H242 V158" stroke="#1F5FBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="247" y="165" fontSize="12" fontWeight="800" fill="#1F5FBF" fontFamily="system-ui, sans-serif">+38%</text>
      <circle cx="50" cy="170" r="21" fill="#fff" filter="url(#scSh)" />
      <circle cx="50" cy="170" r="14" stroke={C.line} strokeWidth="2" />
      <path d="M50 162 V170 L56 174" stroke={C.blue} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <Sparkle x={30} y={30} s={0.9} c={C.coral} />
      <Sparkle x={272} y={214} s={0.9} c={C.violet} d={4} />
    </svg>
  );
}

/* 05 — Influencer & offline: megaphone, creators, billboard */
export function InfluencerArt() {
  return (
    <svg viewBox="0 0 320 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <Shadow id="inSh" />
        <linearGradient id="inMega" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6BA6FF" />
          <stop offset="1" stopColor="#2A7DE1" />
        </linearGradient>
        <linearGradient id="inBoard" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#BFD8FF" />
          <stop offset="1" stopColor="#8EC5FF" />
        </linearGradient>
      </defs>
      <rect x="44" y="94" width="14" height="30" rx="6" fill="#1F5FBF" />
      <path d="M32 64 L74 46 V114 L32 98 Z" fill="url(#inMega)" filter="url(#inSh)" />
      <path d="M74 46 L112 28 V132 L74 114 Z" fill="#CFE3FF" filter="url(#inSh)" />
      <path d="M112 28 V132" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      {[22, 38, 54].map((r, i) => (
        <path
          key={i}
          d={`M120 ${80 - r * 0.9} A ${r} ${r} 0 0 1 120 ${80 + r * 0.9}`}
          stroke={C.coral}
          strokeOpacity={0.75 - i * 0.2}
          strokeWidth="3"
          strokeLinecap="round"
          style={{ animation: `pulseOpacity ${1.8 + i * 0.5}s ease-in-out infinite alternate` }}
        />
      ))}
      {[
        { x: 178, y: 32, c: C.violet, bg: '#E3ECFF', t: '+12K', tx: 198, ty: 22 },
        { x: 232, y: 74, c: C.amber, bg: '#DDF1FA', t: '+8K', tx: 254, ty: 58 },
        { x: 178, y: 128, c: C.mint, bg: '#DDEBFF', t: '+21K', tx: 198, ty: 118 },
      ].map((a, i) => (
        <g key={i} style={{ animation: `floatDot ${2.8 + i * 0.6}s ease-in-out infinite alternate` }}>
          <circle cx={a.x} cy={a.y} r="18" fill={a.bg} stroke="#fff" strokeWidth="3" filter="url(#inSh)" />
          <circle cx={a.x} cy={a.y - 3} r="6" fill={a.c} />
          <path d={`M${a.x - 10} ${a.y + 12} A 10 9 0 0 1 ${a.x + 10} ${a.y + 12} Z`} fill={a.c} />
          <rect x={a.tx - 3} y={a.ty - 2} width="48" height="22" rx="11" fill="#fff" filter="url(#inSh)" />
          <text x={a.tx + 21} y={a.ty + 14} textAnchor="middle" fontSize="13" fontWeight="800" fill={C.ink} fontFamily="system-ui, sans-serif">{a.t}</text>
        </g>
      ))}
      <rect x="264" y="112" width="5" height="34" rx="2" fill="#C9D3E6" />
      <rect x="290" y="112" width="5" height="34" rx="2" fill="#C9D3E6" />
      <rect x="246" y="86" width="66" height="36" rx="8" fill="#fff" filter="url(#inSh)" />
      <rect x="251" y="91" width="56" height="26" rx="5" fill="url(#inBoard)" />
      <path d="M279 96 C273 96 270 100 270 103 C270 108 279 114 279 114 C279 114 288 108 288 103 C288 100 285 96 279 96 Z" fill="#fff" />
      <circle cx="279" cy="103" r="2.8" fill={C.coral} />
    </svg>
  );
}

/* 06 — Events, photo & video: camera under spotlights */
export function EventsArt() {
  return (
    <svg viewBox="0 0 320 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <Shadow id="evSh" />
        <linearGradient id="evBeam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.amber} stopOpacity="0.5" />
          <stop offset="1" stopColor={C.amber} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="evLens" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.blue} />
          <stop offset="1" stopColor={C.violet} />
        </linearGradient>
      </defs>
      <path d="M84 0 H108 L172 156 H42 Z" fill="url(#evBeam)" style={{ animation: 'pulseOpacity 3s ease-in-out infinite alternate' }} />
      <path d="M212 0 H236 L286 156 H166 Z" fill="url(#evBeam)" style={{ animation: 'pulseOpacity 3.6s ease-in-out infinite alternate-reverse' }} />
      <g transform="rotate(-8 60 130)">
        <rect x="14" y="112" width="92" height="30" rx="5" fill="#fff" filter="url(#evSh)" />
        {[0, 1, 2, 3, 4, 5].map(i => (
          <g key={i}>
            <rect x={20 + i * 14.5} y="115" width="7" height="4" rx="1" fill={C.line} />
            <rect x={20 + i * 14.5} y="135" width="7" height="4" rx="1" fill={C.line} />
          </g>
        ))}
        {[C.coral, C.sky, C.amber].map((c, i) => (
          <rect key={i} x={22 + i * 27} y="122" width="22" height="12" rx="3" fill={c} fillOpacity="0.85" />
        ))}
      </g>
      <rect x="128" y="46" width="38" height="18" rx="6" fill="#fff" filter="url(#evSh)" />
      <rect x="192" y="48" width="22" height="12" rx="4" fill={C.amber} />
      <rect x="100" y="58" width="122" height="78" rx="15" fill="#fff" filter="url(#evSh)" />
      <rect x="100" y="76" width="122" height="7" fill={C.coral} fillOpacity="0.8" />
      <circle cx="161" cy="104" r="27" fill="#E8F1FF" stroke="#C6DAF7" strokeWidth="4" />
      <circle cx="161" cy="104" r="27" stroke={C.sky} strokeWidth="2" style={{ ...box('50% 50%'), animation: 'ringPulse 2.6s ease-out infinite' }} />
      <circle cx="161" cy="104" r="17" fill="url(#evLens)" />
      <circle cx="154" cy="97" r="4.5" fill="#fff" fillOpacity="0.85" />
      <circle cx="270" cy="46" r="21" fill="#fff" filter="url(#evSh)" />
      <path d="M264 36 L282 46 L264 56 Z" fill={C.blue} />
      <rect x="236" y="112" width="72" height="8" rx="4" fill="#fff" fillOpacity="0.85" />
      <rect x="236" y="112" width="44" height="8" rx="4" fill={C.blue} />
      <circle cx="280" cy="116" r="6" fill="#fff" stroke={C.blue} strokeWidth="2.4" />
      {[
        { x: 36, y: 34, c: C.coral, s: 6 },
        { x: 70, y: 62, c: C.mint, s: 5 },
        { x: 228, y: 84, c: C.violet, s: 6 },
        { x: 300, y: 88, c: C.amber, s: 5 },
        { x: 22, y: 92, c: C.sky, s: 5 },
      ].map((p, i) => (
        <rect key={i} x={p.x} y={p.y} width={p.s} height={p.s * 1.6} rx="1.5" fill={p.c} transform={`rotate(${20 + i * 25} ${p.x} ${p.y})`}
          style={{ animation: `floatDot ${2.4 + i * 0.5}s ease-in-out infinite alternate` }} />
      ))}
      <Sparkle x={120} y={26} s={0.8} c={C.amber} />
    </svg>
  );
}

/* 07 — 1:1 consultation & business development: conversation to roadmap to goal */
export function ConsultationArt() {
  return (
    <svg viewBox="0 0 320 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <Shadow id="coSh" />
        <linearGradient id="coBlue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.sky} />
          <stop offset="1" stopColor={C.blue} />
        </linearGradient>
      </defs>
      <path
        d="M30 140 C 100 140, 100 112, 160 108 S 230 58, 270 54"
        stroke={C.blue} strokeOpacity="0.55" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 8"
        style={{ animation: 'dashAnim 2s linear infinite' }}
      />
      <rect x="16" y="12" width="90" height="40" rx="14" fill="#fff" filter="url(#coSh)" />
      <path d="M32 52 L28 64 L46 52 Z" fill="#fff" />
      <rect x="28" y="23" width="62" height="5" rx="2.5" fill={C.line} />
      <rect x="28" y="34" width="40" height="5" rx="2.5" fill={C.line} />
      <rect x="62" y="58" width="82" height="36" rx="14" fill="url(#coBlue)" filter="url(#coSh)" />
      <path d="M126 94 L134 104 L114 94 Z" fill={C.blue} />
      <rect x="74" y="68" width="58" height="5" rx="2.5" fill="#fff" fillOpacity="0.9" />
      <rect x="74" y="79" width="36" height="5" rx="2.5" fill="#fff" fillOpacity="0.6" />
      {[[30, 140], [160, 108]].map(([x, y], i) => (
        <g key={i} style={{ ...box('50% 50%'), animation: `milestoneIn 0.5s ${0.2 + i * 0.3}s both ease-out` }}>
          <circle cx={x} cy={y} r="10" fill="#fff" stroke={C.sky} strokeWidth="3" filter="url(#coSh)" />
          <circle cx={x} cy={y} r="3.5" fill={C.blue} />
        </g>
      ))}
      <path d="M270 62 V26" stroke="#9AA8C4" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M270 26 L296 34 L270 44 Z" fill={C.mint} style={{ ...box('0% 50%'), animation: 'leafSway 2.4s ease-in-out infinite alternate' }} />
      <circle cx="270" cy="62" r="7" fill="#fff" stroke={C.mint} strokeWidth="3" />
      <g>
        <circle cx="196" cy="30" r="13" fill="#D6ECFF" stroke={C.amber} strokeWidth="2" filter="url(#coSh)" />
        <rect x="190" y="42" width="12" height="7" rx="2.5" fill="#D9DEEA" />
        <path d="M196 24 V32 M192 32 H200" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        {[[-26, -4], [26, -4], [-18, -20], [18, -20]].map(([dx, dy], i) => (
          <path key={i} d={`M${196 + dx} ${30 + dy} l${dx > 0 ? 5 : -5} ${dy < -10 ? -4 : 0}`} stroke={C.amber} strokeWidth="2" strokeLinecap="round"
            style={{ animation: `pulseOpacity ${1.6 + i * 0.3}s ease-in-out infinite alternate` }} />
        ))}
      </g>
      <rect x="204" y="116" width="92" height="28" rx="14" fill="#DDEBFF" stroke={C.mint} strokeOpacity="0.5" />
      <path d="M218 134 L226 125 L231 130 L240 121 M235 121 H240 V126" stroke="#1F5FBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="248" y="135" fontSize="12" fontWeight="800" fill="#1F5FBF" fontFamily="system-ui, sans-serif">+240%</text>
    </svg>
  );
}

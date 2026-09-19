'use client';

import { useEffect, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

/* One bespoke, animated hero scene per service. viewBox 0 0 600 440, light + blue only. */
const P = {
  ink: '#0B2A66', b800: '#12388A', b700: '#1F5FBF', b600: '#2A7DE1', b500: '#4A9EFF',
  b400: '#6BB0FF', b300: '#9CCBFF', b200: '#C9E0FF', b100: '#E3EEFF', cy: '#3CC8F0',
};
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const DISPLAY = 'var(--font-sevone), Georgia, serif';

const v = (o: Record<string, string | number>) => o as CSSProperties;

export const HS_CSS = `
.hs-draw{stroke-dasharray:1;stroke-dashoffset:1;animation:hs-draw var(--d,7s) ease-in-out var(--dl,0s) infinite}
@keyframes hs-draw{0%{stroke-dashoffset:1}42%,84%{stroke-dashoffset:0}100%{stroke-dashoffset:-1}}
.hs-pop{transform-box:fill-box;transform-origin:center;animation:hs-pop var(--d,7s) cubic-bezier(.34,1.56,.64,1) var(--dl,0s) infinite both}
@keyframes hs-pop{0%,8%{transform:scale(0);opacity:0}20%,84%{transform:scale(1);opacity:1}94%,100%{transform:scale(.85);opacity:0}}
.hs-fade{animation:hs-fade var(--d,7s) ease-in-out var(--dl,0s) infinite both}
@keyframes hs-fade{0%,8%{opacity:0}20%,84%{opacity:1}94%,100%{opacity:0}}
.hs-float{animation:hs-float var(--d,6s) ease-in-out var(--dl,0s) infinite}
@keyframes hs-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
.hs-spin{animation:hs-spin var(--d,40s) linear infinite}
@keyframes hs-spin{to{transform:rotate(360deg)}}
.hs-ring{transform-box:fill-box;transform-origin:center;animation:hs-ring var(--d,2.6s) ease-out var(--dl,0s) infinite}
@keyframes hs-ring{0%{transform:scale(.4);opacity:.7}100%{transform:scale(1.9);opacity:0}}
.hs-blink{animation:hs-blink 1s steps(1) infinite}
@keyframes hs-blink{50%{opacity:0}}
.hs-scroll{animation:hs-scroll var(--d,20s) linear infinite}
@keyframes hs-scroll{from{transform:translateY(0)}to{transform:translateY(var(--sy,-240px))}}
.hs-rise{transform-box:fill-box;transform-origin:50% 100%;animation:hs-rise var(--d,3s) ease-in-out var(--dl,0s) infinite alternate}
@keyframes hs-rise{from{transform:scaleY(.25)}to{transform:scaleY(1)}}
.hs-dash{animation:hs-dashm 1.4s linear infinite}
@keyframes hs-dashm{to{stroke-dashoffset:-24}}
.hs-wipe{transform-box:fill-box;transform-origin:0 50%;animation:hs-wipe 10s cubic-bezier(.65,0,.35,1) infinite}
@keyframes hs-wipe{0%,30%{transform:scaleX(0)}48%,86%{transform:scaleX(1)}96%,100%{transform:scaleX(0)}}
.hs-shard{transform-box:fill-box;transform-origin:center;animation:hs-shard 10s cubic-bezier(.22,1,.36,1) var(--dl,0s) infinite both}
@keyframes hs-shard{0%{transform:translate(var(--fx),var(--fy)) scale(.5);opacity:0}20%,86%{transform:translate(0,0) scale(1);opacity:1}96%,100%{transform:translate(0,0) scale(1);opacity:0}}
.hs-cursor{animation:hs-cursor var(--d,10s) ease-in-out var(--dl,0s) infinite}
@keyframes hs-cursor{0%,100%{transform:translate(0,0)}25%{transform:translate(var(--x1),var(--y1))}50%{transform:translate(var(--x2),var(--y2))}75%{transform:translate(var(--x3),var(--y3))}}
.hs-notif{transform-box:fill-box;transform-origin:center;animation:hs-notif 10s ease-in-out var(--dl,0s) infinite both}
@keyframes hs-notif{0%{opacity:0;transform:translateY(16px) scale(.9)}6%{opacity:1;transform:translateY(0) scale(1)}26%{opacity:1;transform:translateY(0) scale(1)}34%,100%{opacity:0;transform:translateY(-12px) scale(.96)}}
.hs-drop{transform-box:fill-box;transform-origin:50% 100%;animation:hs-drop 6s cubic-bezier(.34,1.56,.64,1) var(--dl,0s) infinite both}
@keyframes hs-drop{0%,4%{transform:translateY(-70px);opacity:0}16%,88%{transform:translateY(0);opacity:1}98%,100%{transform:translateY(0);opacity:0}}
.hs-sway{animation:hs-sway var(--d,6s) ease-in-out var(--dl,0s) infinite alternate}
@keyframes hs-sway{from{transform:rotate(-14deg)}to{transform:rotate(14deg)}}
.hs-focus{transform-box:fill-box;transform-origin:center;animation:hs-focus 8s cubic-bezier(.22,1,.36,1) infinite both}
@keyframes hs-focus{0%{transform:scale(2.6) translate(30px,-14px);opacity:.25}26%,100%{transform:scale(1) translate(0,0);opacity:1}}
.hs-flash{animation:hs-flash 8s linear infinite}
@keyframes hs-flash{0%,55%{opacity:0}57%{opacity:.9}64%,100%{opacity:0}}
.hs-thumb{animation:hs-thumb 8s ease-out infinite both}
@keyframes hs-thumb{0%,60%{opacity:0;transform:translateY(24px) scale(.9)}68%,90%{opacity:1;transform:translateY(0) scale(1)}98%,100%{opacity:0;transform:translateY(0) scale(1)}}
.hs-lockfade{animation:hs-lockfade 8s ease-out infinite both}
@keyframes hs-lockfade{0%,28%{opacity:0}34%,92%{opacity:1}100%{opacity:0}}
.hs-bar{transform-box:fill-box;transform-origin:50% 50%;animation:hs-bar var(--d,.9s) ease-in-out var(--dl,0s) infinite alternate}
@keyframes hs-bar{from{transform:scaleY(.25)}to{transform:scaleY(1)}}
.hs-type{transform-box:fill-box;transform-origin:center;animation:hs-type 1.1s ease-in-out var(--dl,0s) infinite}
@keyframes hs-type{0%,100%{transform:translateY(0);opacity:.4}50%{transform:translateY(-4px);opacity:1}}
.hs-m1{animation:hs-m1 14s ease-out infinite both}.hs-m2{animation:hs-m2 14s ease-out infinite both}
.hs-m3{animation:hs-m3 14s ease-out infinite both}.hs-m4{animation:hs-m4 14s ease-out infinite both}
.hs-typing{animation:hs-typing 14s linear infinite both}
@keyframes hs-m1{0%,3%{opacity:0;transform:translateY(10px)}8%,90%{opacity:1;transform:translateY(0)}97%,100%{opacity:0}}
@keyframes hs-m2{0%,24%{opacity:0;transform:translateY(10px)}30%,90%{opacity:1;transform:translateY(0)}97%,100%{opacity:0}}
@keyframes hs-m3{0%,48%{opacity:0;transform:translateY(10px)}54%,90%{opacity:1;transform:translateY(0)}97%,100%{opacity:0}}
@keyframes hs-m4{0%,68%{opacity:0;transform:translateY(10px)}74%,90%{opacity:1;transform:translateY(0)}97%,100%{opacity:0}}
@keyframes hs-typing{0%,10%{opacity:0}12%,22%{opacity:1}24%,40%{opacity:0}42%,50%{opacity:1}52%,66%{opacity:0}68%,72%{opacity:1}74%,100%{opacity:0}}
@media (prefers-reduced-motion: reduce){[class^="hs-"],[class*=" hs-"]{animation:none !important}}
`;

function Defs({ p }: { p: string }) {
  return (
    <defs>
      <linearGradient id={`${p}Bg`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#F3F8FF" /><stop offset="1" stopColor="#E2ECFF" />
      </linearGradient>
      <pattern id={`${p}Grid`} width="24" height="24" patternUnits="userSpaceOnUse">
        <path d="M24 0H0V24" stroke={P.b300} strokeOpacity="0.35" strokeWidth="0.6" fill="none" />
      </pattern>
      <pattern id={`${p}Dots`} width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="8" cy="8" r="1.3" fill={P.b400} fillOpacity="0.55" />
      </pattern>
      <filter id={`${p}Sh`} x="-25%" y="-25%" width="150%" height="160%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor={P.b700} floodOpacity="0.16" />
      </filter>
      <linearGradient id={`${p}G`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={P.b500} /><stop offset="1" stopColor={P.b800} />
      </linearGradient>
      <linearGradient id={`${p}C`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={P.cy} /><stop offset="1" stopColor={P.b600} />
      </linearGradient>
      <linearGradient id={`${p}Area`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={P.b500} stopOpacity="0.4" /><stop offset="1" stopColor={P.b500} stopOpacity="0" />
      </linearGradient>
    </defs>
  );
}

function Bg({ p }: { p: string }) {
  return (
    <>
      <rect width="600" height="440" fill={`url(#${p}Bg)`} />
      <rect width="600" height="440" fill={`url(#${p}Grid)`} />
    </>
  );
}

function T({ x, y, children, s = 10, f = P.ink, w = 600, a = 'start', ls = 0, ff = MONO }: { x: number; y: number; children: ReactNode; s?: number; f?: string; w?: number; a?: 'start' | 'middle' | 'end'; ls?: number; ff?: string }) {
  return <text x={x} y={y} fontSize={s} fill={f} fontWeight={w} textAnchor={a} letterSpacing={ls} fontFamily={ff}>{children}</text>;
}

function Brackets({ x, y, w, h, s = 18, c = P.b700 }: { x: number; y: number; w: number; h: number; s?: number; c?: string }) {
  return <path d={`M${x} ${y + s}V${y}H${x + s}M${x + w - s} ${y}H${x + w}V${y + s}M${x + w} ${y + h - s}V${y + h}H${x + w - s}M${x + s} ${y + h}H${x}V${y + h - s}`} stroke={c} strokeWidth="2" strokeLinecap="square" fill="none" />;
}

function CursorArrow({ x, y, label, c = P.b600 }: { x: number; y: number; label: string; c?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 0L0 17L4.6 13L7.8 19.5L10.6 18L7.6 11.8L13.6 11.6Z" fill={c} stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
      <rect x="10" y="16" width={label.length * 6.4 + 14} height="18" rx="9" fill={c} />
      <T x={17} y={28.5} s={10} f="#fff" w={600}>{label}</T>
    </g>
  );
}

/* 01 ─ Branding: a mark assembles from shards, gets measured, named and given a palette */
function BrandingScene() {
  const p = 'bf';
  return (
    <svg viewBox="0 0 600 440" fill="none" className="w-full h-full">
      <Defs p={p} />
      <Bg p={p} />
      <clipPath id="bfClip"><rect className="hs-wipe" x="150" y="336" width="300" height="52" /></clipPath>
      <g style={{ transformOrigin: '300px 210px', transformBox: 'view-box' } as CSSProperties} className="hs-spin"><circle cx="300" cy="210" r="168" stroke={P.b400} strokeWidth="1" strokeDasharray="3 8" style={v({ '--d': '70s' })} /></g>
      <circle cx="300" cy="210" r="122" stroke={P.b300} strokeWidth="1" />
      <circle cx="300" cy="210" r="122" stroke={P.b500} strokeWidth="1.6" pathLength={1} className="hs-draw" style={v({ '--d': '10s' })} />
      <path d="M110 210H490M300 22V398" stroke={P.b300} strokeWidth="0.8" strokeDasharray="2 5" />

      <g>
        <polygon className="hs-shard" points="300,210 232.5,171 300,132" fill={P.b400} style={v({ '--fx': '-90px', '--fy': '-60px' })} />
        <polygon className="hs-shard" points="300,210 300,132 367.5,171 367.5,249" fill={P.b600} style={v({ '--fx': '100px', '--fy': '-30px', '--dl': '.12s' })} />
        <polygon className="hs-shard" points="300,210 367.5,249 300,288 232.5,249 232.5,171" fill={P.b700} style={v({ '--fx': '-30px', '--fy': '100px', '--dl': '.24s' })} />
        <polygon className="hs-pop" points="300,168 328,210 300,252 272,210" fill="#fff" fillOpacity="0.95" style={v({ '--d': '10s', '--dl': '.4s' })} />
      </g>
      <g className="hs-fade" style={v({ '--d': '10s', '--dl': '.6s' })}>
        <rect x="220" y="122" width="160" height="176" stroke={P.b500} strokeWidth="1" strokeDasharray="4 4" />
        {[[220, 122], [380, 122], [220, 298], [380, 298], [300, 122], [300, 298]].map(([x, y], i) => (
          <rect key={i} x={x - 4} y={y - 4} width="8" height="8" rx="1.5" fill="#fff" stroke={P.b600} strokeWidth="1.6" />
        ))}
        <path d="M220 312H380M220 308V316M380 308V316" stroke={P.b600} strokeWidth="1" />
        <T x={300} y={306} a="middle" s={9} f={P.b700}>156 PX</T>
      </g>
      <g clipPath="url(#bfClip)">
        <T x={300} y={372} a="middle" s={38} f={P.ink} w={400} ff={DISPLAY} ls={1}>LS Digitaize</T>
      </g>
      {[P.b800, P.b600, P.b500, P.b300, P.b200].map((c, i) => (
        <circle key={i} className="hs-pop" cx={230 + i * 35} cy="412" r="10" fill={c} stroke="#fff" strokeWidth="2" style={v({ '--d': '10s', '--dl': `${1.5 + i * 0.15}s` })} />
      ))}

      <g className="hs-fade" style={v({ '--d': '10s', '--dl': '.8s' })}>
        <rect x="36" y="50" width="122" height="94" rx="12" fill="#fff" filter={`url(#${p}Sh)`} />
        <text x="97" y="112" textAnchor="middle" fontSize="50" fontWeight="700" fill={P.ink} fontFamily="Georgia, 'Times New Roman', serif">Aa</text>
        <T x={97} y={132} a="middle" s={8.5} f={P.b600} ls={1}>SEVONE · INTER</T>
      </g>
      <g className="hs-fade" style={v({ '--d': '10s', '--dl': '1s' })}>
        <rect x="440" y="52" width="124" height="94" rx="12" fill="#fff" filter={`url(#${p}Sh)`} />
        <path d="M456 122C474 66 520 138 548 76" stroke={P.b600} strokeWidth="2.4" strokeLinecap="round" pathLength={1} className="hs-draw" style={v({ '--d': '10s', '--dl': '1s' })} />
        <path d="M456 122L470 84M548 76L536 118" stroke={P.b400} strokeWidth="1" />
        {[[456, 122], [548, 76]].map(([x, y], i) => <rect key={i} x={x - 4} y={y - 4} width="8" height="8" rx="2" fill="#fff" stroke={P.b600} strokeWidth="1.6" />)}
        <circle cx="470" cy="84" r="3" fill={P.b600} /><circle cx="536" cy="118" r="3" fill={P.b600} />
      </g>
      <T x={36} y={34} s={10} f={P.b600} ls={2}>BRAND.SYS</T>
      <T x={564} y={34} s={10} f={P.b400} a="end" ls={1}>V 1.0</T>
      <g className="hs-cursor" style={v({ '--d': '12s', '--x1': '60px', '--y1': '-40px', '--x2': '-80px', '--y2': '-90px', '--x3': '-30px', '--y3': '-10px' })}>
        <CursorArrow x={392} y={262} label="Brand" c={P.b700} />
      </g>
    </svg>
  );
}

/* 02 ─ Organic: content cards ride a conveyor from the calendar into a growth chart */
function OrganicScene() {
  const p = 'og';
  const path = 'M236 322 C 300 322, 330 290, 372 250 S 470 196, 528 116';
  const cell = [1, 4, 6, 9, 12, 16, 19, 23, 25];
  return (
    <svg viewBox="0 0 600 440" fill="none" className="w-full h-full">
      <Defs p={p} />
      <Bg p={p} />
      <rect x="32" y="52" width="206" height="196" rx="14" fill="#fff" filter={`url(#${p}Sh)`} />
      <T x={46} y={74} s={9.5} f={P.b700} ls={1.2}>CONTENT.CAL</T>
      {[0, 1, 2].map(i => <circle key={i} cx={216 - i * 9} cy="70" r="2.4" fill={i ? P.b300 : P.b500} />)}
      <line x1="32" y1="86" x2="238" y2="86" stroke={P.b200} />
      {Array.from({ length: 28 }).map((_, i) => {
        const c = i % 7, r = Math.floor(i / 7);
        const x = 46 + c * 26, y = 100 + r * 36;
        const lit = cell.indexOf(i);
        return (
          <g key={i}>
            <rect x={x} y={y} width="20" height="26" rx="5" fill={P.b100} />
            {lit >= 0 && <rect className="hs-fade" x={x} y={y} width="20" height="26" rx="5" fill={i % 3 ? P.b500 : P.b700} style={v({ '--d': '9s', '--dl': `${lit * 0.55}s` })} />}
          </g>
        );
      })}
      <path d={path} stroke={P.b400} strokeWidth="2" strokeDasharray="4 8" className="hs-dash" />
      {[0, 1, 2].map(i => (
        <g key={i}>
          <animateMotion dur="8s" begin={`${-i * 2.67}s`} repeatCount="indefinite" path={path} />
          <rect x="-22" y="-28" width="44" height="56" rx="8" fill="#fff" filter={`url(#${p}Sh)`} />
          {i === 0 && (<><rect x="-17" y="-23" width="34" height="30" rx="5" fill={`url(#${p}G)`} /><path d="M-4 -14L8 -8L-4 -2Z" fill="#fff" /><rect x="-17" y="12" width="26" height="4" rx="2" fill={P.b200} /></>)}
          {i === 1 && (<><rect x="-11" y="-23" width="28" height="30" rx="5" fill={P.b300} /><rect x="-17" y="-19" width="28" height="30" rx="5" fill={`url(#${p}C)`} /><rect x="-17" y="16" width="22" height="4" rx="2" fill={P.b200} /></>)}
          {i === 2 && (<><rect x="-17" y="-22" width="34" height="5" rx="2.5" fill={P.ink} fillOpacity="0.7" /><rect x="-17" y="-10" width="34" height="3.5" rx="1.7" fill={P.b300} /><rect x="-17" y="-2" width="28" height="3.5" rx="1.7" fill={P.b300} /><rect x="-17" y="6" width="34" height="3.5" rx="1.7" fill={P.b300} /><rect x="-17" y="14" width="20" height="4" rx="2" fill={P.b500} /></>)}
        </g>
      ))}
      <rect x="318" y="40" width="252" height="186" rx="14" fill="#fff" filter={`url(#${p}Sh)`} />
      <T x={334} y={64} s={9.5} f={P.b700} ls={1.2}>ORGANIC.REACH</T>
      <T x={334} y={104} s={34} f={P.b600} ff={DISPLAY} w={400}>+184%</T>
      <T x={334} y={120} s={8.5} f={P.ink} w={500} ls={1}>VS PREVIOUS 90 DAYS</T>
      {[150, 172, 194].map(y => <line key={y} x1="334" y1={y} x2="554" y2={y} stroke={P.b200} strokeDasharray="2 4" />)}
      <path d="M338 204L372 190L406 196L440 166L474 156L508 130L534 112L554 96V208H338Z" fill={`url(#${p}Area)`} className="hs-fade" style={v({ '--d': '8s', '--dl': '.4s' })} />
      <path d="M338 204L372 190L406 196L440 166L474 156L508 130L534 112L554 96" stroke={P.b600} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" pathLength={1} className="hs-draw" style={v({ '--d': '8s' })} />
      <circle cx="554" cy="96" r="9" fill={P.b500} fillOpacity="0.35" className="hs-ring" />
      <circle cx="554" cy="96" r="4" fill="#fff" stroke={P.b700} strokeWidth="2" />
      <T x={334} y={266} s={9} f={P.ink} ls={1.2}>NEW FOLLOWERS</T>
      {[0, 1, 2, 3, 4].map(i => (
        <g key={i} className="hs-pop" style={v({ '--d': '8s', '--dl': `${1 + i * 0.35}s` })}>
          <circle cx={344 + i * 30} cy="292" r="12" fill={[P.b200, P.b300, P.b400, P.b500, P.b300][i]} stroke="#fff" strokeWidth="2" />
          <circle cx={344 + i * 30} cy="289" r="3.6" fill="#fff" fillOpacity="0.9" /><path d={`M${337 + i * 30} 301A7 6 0 0 1 ${351 + i * 30} 301Z`} fill="#fff" fillOpacity="0.9" />
        </g>
      ))}
      <T x={498} y={296} s={11} f={P.b700} w={700}>+2.4K</T>
      <g transform="translate(32 288)">
        {[['REELS', '12'], ['POSTS', '24'], ['STORIES', '48']].map(([a, b], i) => (
          <g key={a} transform={`translate(${i * 70} 0)`}>
            <rect width="62" height="46" rx="10" fill="#fff" filter={`url(#${p}Sh)`} />
            <T x={31} y={19} a="middle" s={8} f={P.b600} ls={1}>{a}</T>
            <T x={31} y={38} a="middle" s={17} f={P.ink} ff={DISPLAY} w={400}>{b}</T>
          </g>
        ))}
      </g>
      <T x={32} y={38} s={10} f={P.b600} ls={2}>CONTENT.ENGINE</T>
    </svg>
  );
}

/* 03 ─ Performance: audiences funnel into sales while ROAS climbs */
function PerformanceScene() {
  const p = 'pm';
  const [sales, setSales] = useState(1284);
  useEffect(() => {
    const t = setInterval(() => setSales(s => s + 1 + Math.floor(Math.random() * 3)), 1100);
    return () => clearInterval(t);
  }, []);
  const stages = [
    { d: 'M64 68H372L344 136H92Z', f: P.b100, l: 'REACH', n: '2.4M', y: 108 },
    { d: 'M98 142H338L316 204H120Z', f: P.b200, l: 'CLICKS', n: '86K', y: 178 },
    { d: 'M124 210H312L294 268H142Z', f: P.b400, l: 'LEADS', n: '9.1K', y: 244 },
  ];
  return (
    <svg viewBox="0 0 600 440" fill="none" className="w-full h-full">
      <Defs p={p} />
      <Bg p={p} />
      {stages.map(s => (
        <path key={s.l} d={s.d} fill={s.f} stroke={P.b400} strokeWidth="1.2" filter={`url(#${p}Sh)`} />
      ))}
      <path d="M170 274H266L254 300H182Z" fill={P.b600} />
      {Array.from({ length: 18 }).map((_, i) => {
        const x0 = 70 + ((i * 47) % 300);
        return (
          <circle key={i} r="4.5" fill={[P.b500, P.b300, P.b700, P.cy][i % 4]}>
            <animateMotion dur="4.4s" begin={`${-i * 0.25}s`} repeatCount="indefinite" path={`M${x0} 40 L218 300`} />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="4.4s" begin={`${-i * 0.25}s`} repeatCount="indefinite" />
            <animate attributeName="r" values="5;5;2.5" dur="4.4s" begin={`${-i * 0.25}s`} repeatCount="indefinite" />
          </circle>
        );
      })}
      {stages.map(s => (
        <g key={s.l + 't'}>
          <T x={218} y={s.y - 4} a="middle" s={9} f={P.b700} ls={1.4}>{s.l}</T>
          <T x={218} y={s.y + 14} a="middle" s={17} f={P.ink} ff={DISPLAY} w={400}>{s.n}</T>
        </g>
      ))}
      <g className="hs-float" style={v({ '--d': '2.4s' })}>
        <circle cx="218" cy="326" r="20" fill={`url(#${p}C)`} filter={`url(#${p}Sh)`} />
        <path d="M209 326L215 332L228 318" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <T x={218} y={368} a="middle" s={9} f={P.b700} ls={1.4}>SALES TODAY</T>
      <T x={218} y={392} a="middle" s={26} f={P.ink} ff={DISPLAY} w={400}>{sales.toLocaleString('en-US')}</T>

      <rect x="396" y="40" width="176" height="128" rx="14" fill="#fff" filter={`url(#${p}Sh)`} />
      <T x={410} y={62} s={9.5} f={P.b700} ls={1.2}>ROAS</T>
      <path d="M424 142A52 52 0 0 1 544 142" stroke={P.b100} strokeWidth="12" strokeLinecap="round" />
      <path d="M424 142A52 52 0 0 1 544 142" stroke={`url(#${p}G)`} strokeWidth="12" strokeLinecap="round" pathLength={1} className="hs-draw" style={v({ '--d': '5s' })} />
      <T x={484} y={132} a="middle" s={24} f={P.ink} ff={DISPLAY} w={400}>4.2x</T>
      <rect x="396" y="180" width="176" height="128" rx="14" fill="#fff" filter={`url(#${p}Sh)`} />
      <T x={410} y={202} s={9.5} f={P.b700} ls={1.2}>CONVERSIONS</T>
      {[38, 52, 44, 66, 56, 78, 68, 88].map((h, i) => (
        <rect key={i} className="hs-rise" x={412 + i * 19} y={292 - h} width="11" height={h} rx="3" fill={i === 7 ? P.b700 : P.b400} style={v({ '--d': `${1.6 + (i % 4) * 0.5}s`, '--dl': `${i * 0.12}s` })} />
      ))}
      <rect x="396" y="320" width="176" height="76" rx="14" fill="#fff" filter={`url(#${p}Sh)`} />
      <T x={410} y={342} s={9.5} f={P.b700} ls={1.2}>A/B TEST</T>
      {[0, 1].map(i => (
        <g key={i} transform={`translate(${412 + i * 78} 350)`}>
          <rect width="66" height="36" rx="6" fill={P.b100} stroke={P.b300} />
          <rect x="6" y="6" width="54" height="14" rx="3" fill={i ? P.b300 : P.b500} />
          <rect x="6" y="25" width="30" height="4" rx="2" fill={P.b300} />
          <g className="hs-fade" style={v({ '--d': '6s', '--dl': `${i * 3}s` })}>
            <rect x="20" y="22" width="44" height="12" rx="6" fill={P.b700} />
            <T x={42} y={31} a="middle" s={7.5} f="#fff" ls={0.6}>WINNER</T>
          </g>
        </g>
      ))}
      <T x={32} y={34} s={10} f={P.b600} ls={2}>FUNNEL.LIVE</T>
      <circle cx="132" cy="31" r="3.4" fill={P.b600} className="hs-blink" />
    </svg>
  );
}

/* 04 ─ Social: a feed scrolls inside a phone while engagement pings around it */
function SocialScene() {
  const p = 'so';
  const cards = [
    ['#A9D0FF', '#6E8BFF'], ['#9CD3FF', '#2A7DE1'], ['#C9E0FF', '#4A9EFF'], ['#8EC5FF', '#1F5FBF'],
  ];
  return (
    <svg viewBox="0 0 600 440" fill="none" className="w-full h-full">
      <Defs p={p} />
      <Bg p={p} />
      <clipPath id="soScreen"><rect x="230" y="64" width="140" height="312" rx="16" /></clipPath>
      <circle cx="300" cy="220" r="196" stroke={P.b300} strokeWidth="1" strokeDasharray="2 7" />
      <g style={{ transformOrigin: '300px 220px', transformBox: 'view-box' } as CSSProperties} className="hs-spin">
        {[0, 90, 180, 270].map((a, i) => (
          <g key={a} transform={`rotate(${a} 300 220) translate(300 24)`}>
            <circle r="15" fill="#fff" stroke={P.b400} strokeWidth="1.4" filter={`url(#${p}Sh)`} />
            <circle r="5" fill={[P.b700, P.b500, P.cy, P.b400][i]} />
          </g>
        ))}
      </g>
      <rect x="216" y="34" width="168" height="372" rx="30" fill="#fff" stroke={P.b300} strokeWidth="2" filter={`url(#${p}Sh)`} />
      <rect x="276" y="44" width="48" height="8" rx="4" fill={P.b200} />
      <g clipPath="url(#soScreen)">
        <rect x="230" y="64" width="140" height="312" fill={P.b100} fillOpacity="0.5" />
        <g className="hs-scroll" style={v({ '--d': '22s', '--sy': '-704px' })}>
          {[...cards, ...cards].map(([a, b], i) => (
            <g key={i} transform={`translate(236 ${70 + i * 176})`}>
              <rect width="128" height="168" rx="10" fill="#fff" />
              <circle cx="16" cy="16" r="8" fill={P.b500} /><rect x="30" y="10" width="46" height="5" rx="2.5" fill={P.b200} /><rect x="30" y="19" width="28" height="4" rx="2" fill={P.b100} />
              <defs><linearGradient id={`sc${i}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient></defs>
              <rect x="6" y="32" width="116" height="102" rx="8" fill={`url(#sc${i})`} />
              <circle cx={40 + (i % 3) * 20} cy="76" r={16 + (i % 2) * 6} fill="#fff" fillOpacity="0.28" />
              <path d="M22 132L48 98L68 118L88 92L118 132Z" fill="#fff" fillOpacity="0.4" />
              <path d="M14 148C10 144 6 149 10 153L14 157L18 153C22 149 18 144 14 148Z" fill={P.b600} />
              <circle cx="36" cy="150" r="5" stroke={P.b400} strokeWidth="1.5" /><path d="M54 154L62 146" stroke={P.b400} strokeWidth="1.5" strokeLinecap="round" />
            </g>
          ))}
        </g>
      </g>

      {[
        { x: 40, y: 78, t: '+128 likes', d: 0, ic: 'h' },
        { x: 20, y: 300, t: 'New comment', d: 2, ic: 'c' },
        { x: 408, y: 74, t: '+1 follower', d: 4, ic: 'f' },
        { x: 424, y: 196, t: 'Shared', d: 6, ic: 's' },
        { x: 404, y: 310, t: 'Posts 18:00', d: 8, ic: 't' },
      ].map(n => (
        <g key={n.t} className="hs-notif" style={v({ '--dl': `${n.d}s` })}>
          <rect x={n.x} y={n.y} width={n.t.length * 7.2 + 50} height="36" rx="18" fill="#fff" stroke={P.b300} filter={`url(#${p}Sh)`} />
          <circle cx={n.x + 19} cy={n.y + 18} r="11" fill={`url(#${p}G)`} />
          {n.ic === 'h' && <path d={`M${n.x + 19} ${n.y + 24}C${n.x + 19} ${n.y + 24} ${n.x + 12} ${n.y + 19.5} ${n.x + 12} ${n.y + 15.5}C${n.x + 12} ${n.y + 13.3} ${n.x + 13.6} ${n.y + 12} ${n.x + 15.3} ${n.y + 12}C${n.x + 17} ${n.y + 12} ${n.x + 18.3} ${n.y + 13} ${n.x + 19} ${n.y + 14.4}C${n.x + 19.7} ${n.y + 13} ${n.x + 21} ${n.y + 12} ${n.x + 22.7} ${n.y + 12}C${n.x + 24.4} ${n.y + 12} ${n.x + 26} ${n.y + 13.3} ${n.x + 26} ${n.y + 15.5}C${n.x + 26} ${n.y + 19.5} ${n.x + 19} ${n.y + 24} ${n.x + 19} ${n.y + 24}Z`} fill="#fff" />}
          {n.ic === 'c' && <rect x={n.x + 13} y={n.y + 13} width="12" height="9" rx="2.5" fill="#fff" />}
          {n.ic === 'f' && <g fill="#fff"><circle cx={n.x + 19} cy={n.y + 15} r="3.2" /><path d={`M${n.x + 13} ${n.y + 25}A6 5.5 0 0 1 ${n.x + 25} ${n.y + 25}Z`} /></g>}
          {n.ic === 's' && <path d={`M${n.x + 13} ${n.y + 21}L${n.x + 25} ${n.y + 15}L${n.x + 21} ${n.y + 26}L${n.x + 19} ${n.y + 21}Z`} fill="#fff" />}
          {n.ic === 't' && <g stroke="#fff" strokeWidth="1.8" strokeLinecap="round"><circle cx={n.x + 19} cy={n.y + 18} r="6" /><path d={`M${n.x + 19} ${n.y + 15}V${n.y + 18}L${n.x + 21.5} ${n.y + 19.5}`} /></g>}
          <T x={n.x + 38} y={n.y + 22} s={10.5} f={P.ink} w={700}>{n.t}</T>
        </g>
      ))}
      <rect x="28" y="196" width="160" height="72" rx="14" fill="#fff" filter={`url(#${p}Sh)`} />
      <T x={42} y={218} s={9} f={P.b700} ls={1.2}>REACH</T>
      <T x={174} y={218} a="end" s={16} f={P.b600} ff={DISPLAY} w={400}>+38%</T>
      <path d="M42 254L68 244L90 248L114 232L138 236L162 222" stroke={P.b600} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" pathLength={1} className="hs-draw" style={v({ '--d': '6s' })} />
      <T x={28} y={28} s={10} f={P.b600} ls={2}>SOCIAL.HUB</T>
    </svg>
  );
}

/* 05 ─ Influencer & offline: creators and places wired into one brand signal */
function InfluencerScene() {
  const p = 'if';
  const creators = [
    { x: 96, y: 112, t: '@nova', n: '+12K', c: P.b500 },
    { x: 502, y: 100, t: '@kite', n: '+8K', c: P.cy },
    { x: 80, y: 292, t: '@pixel', n: '+21K', c: P.b700 },
    { x: 516, y: 288, t: '@jo', n: '+5K', c: P.b400 },
    { x: 300, y: 62, t: '@lens', n: '+16K', c: P.b600 },
  ];
  const cx = 300, cy = 218;
  return (
    <svg viewBox="0 0 600 440" fill="none" className="w-full h-full">
      <Defs p={p} />
      <Bg p={p} />
      <clipPath id="ifMap"><path d="M40 140C80 90 160 100 200 130C240 110 300 130 330 120C380 100 440 120 470 150C520 170 560 220 540 270C520 320 470 330 430 320C380 340 330 320 290 340C240 350 180 330 150 300C100 300 40 260 60 210C40 190 30 160 40 140Z" /></clipPath>
      <rect width="600" height="440" fill={`url(#${p}Dots)`} clipPath="url(#ifMap)" />
      {creators.map((c, i) => {
        const mx = (c.x + cx) / 2 + (i % 2 ? 30 : -30), my = (c.y + cy) / 2 + (i % 2 ? -34 : 34);
        const d = `M${c.x} ${c.y} Q${mx} ${my} ${cx} ${cy}`;
        return (
          <g key={c.t}>
            <path d={d} stroke={P.b400} strokeWidth="1.5" strokeDasharray="3 6" className="hs-dash" />
            {[0, 1].map(k => (
              <circle key={k} r="4" fill={c.c}>
                <animateMotion dur="3.6s" begin={`${-(i * 0.7 + k * 1.8)}s`} repeatCount="indefinite" path={d} />
              </circle>
            ))}
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r="30" fill={P.b500} fillOpacity="0.25" className="hs-ring" />
      <circle cx={cx} cy={cy} r="30" fill={P.b500} fillOpacity="0.25" className="hs-ring" style={v({ '--dl': '1.3s' })} />
      <circle cx={cx} cy={cy} r="38" fill={`url(#${p}G)`} filter={`url(#${p}Sh)`} />
      <T x={cx} y={cy - 2} a="middle" s={9.5} f="#fff" ls={1.6}>YOUR</T>
      <T x={cx} y={cy + 12} a="middle" s={11} f="#fff" ls={1.6} w={800}>BRAND</T>
      {creators.map((c, i) => (
        <g key={c.t} className="hs-float" style={v({ '--d': `${4 + i * 0.7}s`, '--dl': `${-i}s` })}>
          <circle cx={c.x} cy={c.y} r="24" fill="#fff" stroke={c.c} strokeWidth="2.4" filter={`url(#${p}Sh)`} />
          <circle cx={c.x} cy={c.y - 4} r="7.5" fill={c.c} />
          <path d={`M${c.x - 13} ${c.y + 15}A13 11 0 0 1 ${c.x + 13} ${c.y + 15}Z`} fill={c.c} />
          <rect x={c.x - 34} y={c.y + 28} width="68" height="24" rx="12" fill="#fff" filter={`url(#${p}Sh)`} />
          <T x={c.x} y={c.y + 43} a="middle" s={9.5} f={P.ink} w={700}>{c.t} {c.n}</T>
        </g>
      ))}
      {[{ x: 214, y: 376, d: 0 }, { x: 292, y: 392, d: 1.2 }, { x: 372, y: 372, d: 2.4 }].map(pin => (
        <g key={pin.x}>
          <ellipse cx={pin.x} cy={pin.y + 4} rx="14" ry="5" fill={P.b500} fillOpacity="0.3" className="hs-ring" style={v({ '--dl': `${pin.d + 0.6}s` })} />
          <g className="hs-drop" style={v({ '--dl': `${pin.d}s` })}>
            <path d={`M${pin.x} ${pin.y}C${pin.x - 14} ${pin.y - 16} ${pin.x - 14} ${pin.y - 34} ${pin.x} ${pin.y - 34}C${pin.x + 14} ${pin.y - 34} ${pin.x + 14} ${pin.y - 16} ${pin.x} ${pin.y}Z`} fill={P.b700} />
            <circle cx={pin.x} cy={pin.y - 22} r="5" fill="#fff" />
          </g>
        </g>
      ))}
      <g transform="translate(456 344)">
        <rect x="18" y="34" width="5" height="34" fill={P.b300} /><rect x="86" y="34" width="5" height="34" fill={P.b300} />
        <rect width="108" height="44" rx="6" fill="#fff" filter={`url(#${p}Sh)`} />
        <rect x="6" y="6" width="96" height="32" rx="3" fill={`url(#${p}C)`} />
        <T x={54} y={27} a="middle" s={11} f="#fff" w={800} ls={2}>OUT NOW</T>
      </g>
      <g transform="translate(36 352)">
        <rect width="64" height="76" rx="6" fill="#fff" filter={`url(#${p}Sh)`} />
        <rect x="6" y="6" width="52" height="46" rx="3" fill={P.b200} />
        <path d="M6 52L22 32L34 44L44 34L58 52Z" fill={P.b400} fillOpacity="0.7" />
        <rect x="8" y="58" width="38" height="4" rx="2" fill={P.b300} /><rect x="8" y="66" width="26" height="4" rx="2" fill={P.b200} />
      </g>
      <T x={32} y={30} s={10} f={P.b600} ls={2}>REACH.MAP</T>
      <T x={568} y={30} s={10} f={P.b400} a="end" ls={1}>ON + OFFLINE</T>
    </svg>
  );
}

/* 06 ─ Events, photo & video: a camera viewfinder locks focus on the stage, then flashes */
function EventsScene() {
  const p = 'ev';
  const [sec, setSec] = useState(12);
  useEffect(() => {
    const t = setInterval(() => setSec(s => (s + 1) % 60), 1000);
    return () => clearInterval(t);
  }, []);
  const tc = `00:00:${String(sec).padStart(2, '0')}:08`;
  return (
    <svg viewBox="0 0 600 440" fill="none" className="w-full h-full">
      <Defs p={p} />
      <defs>
        <linearGradient id="evBeam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={P.cy} stopOpacity="0.55" /><stop offset="1" stopColor={P.cy} stopOpacity="0" /></linearGradient>
        <linearGradient id="evFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={P.b200} /><stop offset="1" stopColor={P.b100} /></linearGradient>
      </defs>
      <rect width="600" height="440" fill={`url(#${p}Bg)`} />
      <rect y="300" width="600" height="140" fill="url(#evFloor)" />
      <line x1="60" y1="84" x2="540" y2="84" stroke={P.b500} strokeWidth="4" strokeLinecap="round" />
      {[150, 300, 450].map((x, i) => (
        <g key={x}>
          <g className="hs-sway" style={{ transformOrigin: `${x}px 86px`, transformBox: 'view-box', ...v({ '--d': `${5 + i}s`, '--dl': `${-i * 1.7}s` }) } as CSSProperties}>
            <path d={`M${x - 16} 86L${x + 16} 86L${x + 84} 330L${x - 84} 330Z`} fill="url(#evBeam)" />
          </g>
          <circle cx={x} cy="86" r="9" fill="#fff" stroke={P.b500} strokeWidth="2.4" />
          <circle cx={x} cy="86" r="4" fill={P.cy} />
        </g>
      ))}
      <rect x="130" y="300" width="340" height="18" rx="4" fill="#fff" filter={`url(#${p}Sh)`} />
      <g className="hs-float" style={v({ '--d': '2.4s' })}>
        <circle cx="300" cy="236" r="17" fill={P.b700} /><path d="M270 300C270 266 284 254 300 254C316 254 330 266 330 300Z" fill={P.b700} />
        <path d="M330 268L352 244" stroke={P.b700} strokeWidth="6" strokeLinecap="round" />
      </g>
      {Array.from({ length: 15 }).map((_, i) => (
        <g key={i} className="hs-float" style={v({ '--d': `${1.6 + (i % 4) * 0.35}s`, '--dl': `${-i * 0.2}s` })}>
          <circle cx={26 + i * 40} cy={370 + (i % 3) * 8} r="13" fill={[P.b500, P.b700, P.b400][i % 3]} fillOpacity="0.85" />
          <path d={`M${8 + i * 40} ${420 + (i % 3) * 8}A18 22 0 0 1 ${44 + i * 40} ${420 + (i % 3) * 8}Z`} fill={[P.b500, P.b700, P.b400][i % 3]} fillOpacity="0.85" />
        </g>
      ))}
      {[[200, 150], [400, 150], [200, 300], [400, 300]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y}m-6 0h12m-6 -6v12`} stroke={P.b500} strokeOpacity="0.5" strokeWidth="1" />
      ))}
      <path d="M200 20V420M400 20V420M20 147H580M20 293H580" stroke={P.b500} strokeOpacity="0.22" strokeWidth="0.8" strokeDasharray="3 5" />
      <Brackets x={20} y={20} w={560} h={400} s={26} />
      <g className="hs-focus">
        <path d="M232 160V134H258M342 134H368V160M368 224V250H342M258 250H232V224" stroke={P.b700} strokeWidth="2.6" strokeLinecap="square" />
        <path d="M300 186V194M300 206V214M286 200H294M306 200H314" stroke={P.b700} strokeWidth="1.6" />
      </g>
      <g className="hs-lockfade"><rect x="258" y="106" width="84" height="20" rx="10" fill={P.b700} /><T x={300} y={120} a="middle" s={9.5} f="#fff" w={800} ls={1.2}>AF LOCK</T></g>
      <circle cx="48" cy="46" r="5" fill={P.b700} className="hs-blink" />
      <T x={60} y={50} s={12} f={P.b800} w={800} ls={1.5}>REC</T>
      <T x={104} y={50} s={12} f={P.b800} w={500}>{tc}</T>
      <T x={552} y={50} s={12} f={P.b800} w={800} a="end" ls={1}>4K · 60</T>
      <T x={48} y={340} s={11} f={P.b800} w={600}>ISO 400  f/2.8  1/125</T>
      <g transform="translate(430 318)">
        {Array.from({ length: 14 }).map((_, i) => (
          <rect key={i} className="hs-bar" x={i * 9} y="0" width="5" height={12 + ((i * 7) % 16)} rx="2" fill={i % 5 === 4 ? P.b700 : P.b500} style={v({ '--d': `${0.5 + (i % 5) * 0.18}s`, '--dl': `${-i * 0.11}s` })} />
        ))}
      </g>
      <rect width="600" height="440" fill="#fff" className="hs-flash" />
      <g className="hs-thumb" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
        <rect x="448" y="96" width="112" height="84" rx="8" fill="#fff" filter={`url(#${p}Sh)`} />
        <rect x="454" y="102" width="100" height="62" rx="4" fill={P.b200} />
        <path d="M454 156L478 128L494 144L512 124L554 156Z" fill={P.b500} fillOpacity="0.7" />
        <circle cx="530" cy="120" r="7" fill="#fff" />
        <T x={454} y={174} s={8} f={P.b700} ls={1} w={700}>IMG_0412 SAVED</T>
      </g>
    </svg>
  );
}

/* 07 ─ Consultation: a conversation turns into a roadmap with a goal at the end */
function ConsultationScene() {
  const p = 'cs';
  const road = 'M330 296 C 380 296, 386 240, 430 226 S 500 168, 546 96';
  return (
    <svg viewBox="0 0 600 440" fill="none" className="w-full h-full">
      <Defs p={p} />
      <Bg p={p} />
      <rect x="28" y="44" width="268" height="278" rx="16" fill="#fff" filter={`url(#${p}Sh)`} />
      <T x={44} y={68} s={9.5} f={P.b700} ls={1.2}>SESSION.01</T>
      <circle cx="252" cy="64" r="9" fill={P.b300} /><circle cx="270" cy="64" r="9" fill={P.b600} />
      <line x1="28" y1="80" x2="296" y2="80" stroke={P.b200} />
      <g className="hs-m1">
        <rect x="44" y="94" width="176" height="42" rx="14" fill={P.b100} /><rect x="56" y="106" width="116" height="5" rx="2.5" fill={P.b300} /><rect x="56" y="118" width="80" height="5" rx="2.5" fill={P.b200} />
      </g>
      <g className="hs-m2">
        <rect x="76" y="148" width="204" height="54" rx="14" fill={`url(#${p}G)`} /><rect x="90" y="162" width="150" height="5" rx="2.5" fill="#fff" fillOpacity="0.9" /><rect x="90" y="174" width="176" height="5" rx="2.5" fill="#fff" fillOpacity="0.7" /><rect x="90" y="186" width="96" height="5" rx="2.5" fill="#fff" fillOpacity="0.55" />
      </g>
      <g className="hs-m3">
        <rect x="44" y="214" width="150" height="34" rx="14" fill={P.b100} /><rect x="56" y="226" width="96" height="5" rx="2.5" fill={P.b300} />
      </g>
      <g className="hs-m4">
        <rect x="118" y="260" width="162" height="42" rx="14" fill={`url(#${p}G)`} /><rect x="132" y="272" width="120" height="5" rx="2.5" fill="#fff" fillOpacity="0.9" /><rect x="132" y="284" width="80" height="5" rx="2.5" fill="#fff" fillOpacity="0.6" />
      </g>
      <g className="hs-typing">
        <rect x="44" y="140" width="52" height="26" rx="13" fill={P.b100} />
        {[0, 1, 2].map(i => <circle key={i} className="hs-type" cx={60 + i * 12} cy="153" r="3.2" fill={P.b500} style={v({ '--dl': `${i * 0.18}s` })} />)}
      </g>

      <rect x="318" y="44" width="254" height="278" rx="16" fill="#fff" filter={`url(#${p}Sh)`} />
      <T x={334} y={68} s={9.5} f={P.b700} ls={1.2}>ROADMAP.Q4</T>
      <line x1="318" y1="80" x2="572" y2="80" stroke={P.b200} />
      {[110, 150, 190, 230, 270].map(y => <line key={y} x1="334" y1={y} x2="556" y2={y} stroke={P.b100} />)}
      <path d={road} stroke={P.b200} strokeWidth="4" strokeLinecap="round" strokeDasharray="1 8" />
      <path d={road} stroke={P.b600} strokeWidth="4.5" strokeLinecap="round" pathLength={1} className="hs-draw" style={v({ '--d': '14s' })} />
      {[
        { x: 330, y: 296, l: 'AUDIT', a: 0.5 },
        { x: 430, y: 226, l: 'PLAN', a: 3.4 },
        { x: 500, y: 172, l: 'BUILD', a: 6.4 },
      ].map(m => (
        <g key={m.l} className="hs-pop" style={v({ '--d': '14s', '--dl': `${m.a}s` })}>
          <circle cx={m.x} cy={m.y} r="12" fill="#fff" stroke={P.b600} strokeWidth="3" />
          <circle cx={m.x} cy={m.y} r="4.4" fill={P.b600} />
          <T x={m.x} y={m.y + 28} a="middle" s={8.5} f={P.b700} ls={1} w={700}>{m.l}</T>
        </g>
      ))}
      <g className="hs-pop" style={v({ '--d': '14s', '--dl': '9s' })}>
        <path d="M546 108V70" stroke={P.b700} strokeWidth="3" strokeLinecap="round" />
        <path d="M546 70L574 80L546 92Z" fill={P.cy} />
        <circle cx="546" cy="108" r="8" fill="#fff" stroke={P.b700} strokeWidth="3" />
      </g>
      <g transform="translate(28 344)">
        <g transform="rotate(-4 60 40)">
          <rect width="128" height="76" rx="6" fill="#FFFFFF" filter={`url(#${p}Sh)`} />
          <rect width="128" height="14" rx="6" fill={P.b300} />
          <T x={12} y={36} s={11} f={P.ink} w={700}>Q4 GOALS</T>
          <rect x="12" y="46" width="88" height="4" rx="2" fill={P.b200} /><rect x="12" y="56" width="62" height="4" rx="2" fill={P.b200} />
        </g>
        <g transform="translate(150 6) rotate(3 60 40)">
          <rect width="128" height="70" rx="6" fill="#fff" filter={`url(#${p}Sh)`} />
          <rect width="128" height="14" rx="6" fill={P.b500} />
          <T x={12} y={36} s={11} f={P.ink} w={700}>PRIORITIES</T>
          <rect x="12" y="46" width="70" height="4" rx="2" fill={P.b200} />
        </g>
      </g>
      <g>
        <rect x="336" y="344" width="236" height="76" rx="16" fill="#fff" filter={`url(#${p}Sh)`} />
        <T x={352} y={368} s={9.5} f={P.b700} ls={1.2}>PROJECTED GROWTH</T>
        <T x={352} y={402} s={28} f={P.b600} ff={DISPLAY} w={400}>+240%</T>
        <path d="M456 402L482 390L504 396L530 376L556 362" stroke={P.b600} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" pathLength={1} className="hs-draw" style={v({ '--d': '14s', '--dl': '1s' })} />
      </g>
      <g className="hs-cursor" style={v({ '--d': '11s', '--x1': '150px', '--y1': '20px', '--x2': '260px', '--y2': '-70px', '--x3': '70px', '--y3': '-10px' })}>
        <CursorArrow x={110} y={300} label="You" c={P.b500} />
      </g>
      <g className="hs-cursor" style={v({ '--d': '13s', '--dl': '-4s', '--x1': '-60px', '--y1': '-30px', '--x2': '-150px', '--y2': '30px', '--x3': '-40px', '--y3': '50px' })}>
        <CursorArrow x={520} y={230} label="Us" c={P.b800} />
      </g>
      <T x={28} y={30} s={10} f={P.b600} ls={2}>STRATEGY.ROOM</T>
    </svg>
  );
}

export const HERO_SCENES: Record<string, () => ReactNode> = {
  'branding-identity': BrandingScene,
  'organic-marketing': OrganicScene,
  'performance-marketing': PerformanceScene,
  'social-media-management': SocialScene,
  'influencer-offline-marketing': InfluencerScene,
  'events-photography-videography': EventsScene,
  'consultation-business-development': ConsultationScene,
};

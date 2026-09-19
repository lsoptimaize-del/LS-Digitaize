'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const EASE = 'cubic-bezier(0.16,1,0.3,1)';
const MONO = 'var(--font-geist-mono), ui-monospace, monospace';
const DISPLAY = 'var(--font-sevone), serif';

const LINE_1 = ['We', 'make', 'brands'];
const LINE_2 = ['impossible', 'to', 'scroll', 'past.'];
const TICKER = ['Brand Identity', 'Content', 'Campaigns', 'Social', 'Influencers', 'Film & Photo', 'Events', 'Growth', 'Strategy'];

function Cursor({ label, style, delay = 0 }: { label: string; style: React.CSSProperties; delay?: number }) {
  return (
    <div className="sv-cursor" aria-hidden style={{ ...style, animationDelay: `${delay}s` }}>
      <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
        <path d="M2 2L2 17.5L6.4 13.6L9.6 20L12.6 18.6L9.5 12.3L15.5 12.1L2 2Z" fill="#2A7DE1" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <span>{label}</span>
    </div>
  );
}

export default function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [headlineDone, setHeadlineDone] = useState(false);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    const a = setTimeout(() => setMounted(true), 50);
    const b = setTimeout(() => setHeadlineDone(true), 2000);
    const c = setTimeout(() => setSelected(true), 1900);
    return () => { clearTimeout(a); clearTimeout(b); clearTimeout(c); };
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', String(((e.clientX - r.left) / r.width - 0.5) * 2));
    el.style.setProperty('--my', String(((e.clientY - r.top) / r.height - 0.5) * 2));
  };

  const reveal = (delay: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(18px)',
    transition: `opacity 0.8s ease ${delay}s, transform 0.8s ${EASE} ${delay}s`,
  });

  const word = (w: string, i: number, base: number, hot?: boolean) => (
    <span key={w + i} style={{ display: 'inline-block', overflow: headlineDone ? 'visible' : 'hidden', marginRight: '0.24em', verticalAlign: 'top', paddingBottom: '0.12em' }}>
      <span
        style={{
          display: 'inline-block',
          background: hot ? 'linear-gradient(120deg, #2A7DE1 0%, #4A9EFF 55%, #5BC9E8 100%)' : undefined,
          WebkitBackgroundClip: hot ? 'text' : undefined,
          backgroundClip: hot ? 'text' : undefined,
          WebkitTextFillColor: hot ? 'transparent' : undefined,
          transform: mounted ? 'translateY(0)' : 'translateY(112%)',
          transition: `transform 0.95s ${EASE} ${base + i * 0.08}s`,
        }}
      >
        {w}
      </span>
    </span>
  );

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMove}
      style={{ position: 'relative', width: '100%', minHeight: '100dvh', background: '#FAFAF7', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      <style>{`
        @keyframes sv-aurora-a { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(6%, 8%) scale(1.15); } }
        @keyframes sv-aurora-b { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-8%, -6%) scale(1.2); } }
        @keyframes sv-float { 0%,100% { transform: translateY(0) rotate(var(--r, 0deg)); } 50% { transform: translateY(-14px) rotate(calc(var(--r, 0deg) + 1.5deg)); } }
        @keyframes sv-drift { 0%,100% { transform: translate(0,0); } 25% { transform: translate(26px,-14px); } 50% { transform: translate(6px,20px); } 75% { transform: translate(-22px,4px); } }
        @keyframes sv-ticker { to { transform: translateX(-50%); } }
        @keyframes sv-pulse { 0% { transform: scale(0.8); opacity: 0.7; } 100% { transform: scale(1.9); opacity: 0; } }

        .sv-par { position: absolute; transform: translate3d(calc(var(--mx, 0) * var(--d, 20) * 1px), calc(var(--my, 0) * var(--d, 20) * 1px), 0); transition: transform 0.35s ease-out; z-index: 2; }
        .sv-flt { animation: sv-float var(--t, 7s) ease-in-out infinite; animation-delay: var(--dl, 0s); will-change: transform; }
        .sv-card { border-radius: 16px; box-shadow: 0 24px 60px rgba(31,95,191,0.25), 0 2px 0 rgba(255,255,255,0.7) inset; }
        .sv-glass { background: rgba(255,255,255,0.82); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(74,158,255,0.28); box-shadow: 0 18px 44px rgba(42,125,225,0.18); }
        .sv-cursor { position: absolute; z-index: 5; display: flex; align-items: flex-start; pointer-events: none; animation: sv-drift 11s ease-in-out infinite; }
        .sv-cursor span { margin: 16px 0 0 -2px; padding: 3px 9px; border-radius: 4px 999px 999px 999px; background: #2A7DE1; color: #fff; font-family: ${MONO}; font-size: 11px; letter-spacing: 0.04em; white-space: nowrap; box-shadow: 0 6px 16px rgba(42,125,225,0.4); }
        .sv-handle { position: absolute; width: 9px; height: 9px; background: #fff; border: 1.5px solid #2A7DE1; border-radius: 2px; transition: transform 0.4s ${EASE}; }
        .sv-btns-wrap { display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; }
        .sv-btn { display: inline-flex; align-items: center; gap: 10px; padding: 15px 28px; border-radius: 999px; text-decoration: none; font-family: ${MONO}; font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease, color 0.3s ease, border-color 0.3s ease; }
        .sv-btn.pri { background: #2A7DE1; color: #fff; box-shadow: 0 10px 28px rgba(42,125,225,0.38); }
        .sv-btn.pri:hover { background: #1F5FBF; transform: translateY(-2px); box-shadow: 0 16px 36px rgba(42,125,225,0.48); }
        .sv-btn.sec { color: #0A0A0A; border: 1px solid rgba(10,10,10,0.2); background: rgba(255,255,255,0.5); }
        .sv-btn.sec:hover { border-color: #2A7DE1; color: #2A7DE1; transform: translateY(-2px); }
        @media (max-width: 1099px) { .sv-deco { display: none !important; } }
        @media (prefers-reduced-motion: reduce) { .sv-flt, .sv-cursor { animation: none !important; } }
      `}</style>

      {/* aurora + dot grid */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-18%', left: '-8%', width: '62%', height: '80%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(74,158,255,0.34), transparent 65%)', filter: 'blur(60px)', animation: 'sv-aurora-a 16s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '-25%', right: '-10%', width: '58%', height: '85%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(91,201,232,0.32), transparent 65%)', filter: 'blur(64px)', animation: 'sv-aurora-b 19s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '30%', left: '38%', width: '34%', height: '50%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(110,139,255,0.20), transparent 65%)', filter: 'blur(60px)', animation: 'sv-aurora-a 22s ease-in-out infinite reverse' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(42,125,225,0.22) 1px, transparent 1.2px)', backgroundSize: '28px 28px', maskImage: 'radial-gradient(ellipse at 50% 50%, black 0%, transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 0%, transparent 75%)' }} />
      </div>

      {/* ── Floating media (desktop) ── */}
      <div className="sv-deco" aria-hidden>
        {/* reel */}
        <div className="sv-par" style={{ left: '5%', top: '17%', ['--d' as string]: 26 }}>
          <div className="sv-flt" style={{ ['--r' as string]: '-7deg', ['--t' as string]: '8s' } as React.CSSProperties}>
            <div className="sv-card" style={{ width: 138, height: 190, position: 'relative', overflow: 'hidden', background: 'linear-gradient(160deg,#8EC5FF 0%,#2A7DE1 58%,#1F5FBF 100%)' }}>
              <div style={{ position: 'absolute', top: -30, right: -26, width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,0.22)' }} />
              <div style={{ position: 'absolute', bottom: 34, left: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(91,201,232,0.5)' }} />
              <span style={{ position: 'absolute', top: 10, left: 10, padding: '2px 8px', borderRadius: 999, background: 'rgba(255,255,255,0.28)', color: '#fff', fontFamily: MONO, fontSize: 11, letterSpacing: '0.14em' }}>REEL</span>
              <div style={{ position: 'absolute', top: '50%', left: '50%', width: 48, height: 48, marginLeft: -24, marginTop: -30, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 22px rgba(10,30,90,0.3)' }}>
                <svg width="18" height="18" viewBox="0 0 18 18"><path d="M5 2.5L15 9L5 15.5Z" fill="#2A7DE1" /></svg>
              </div>
              <div style={{ position: 'absolute', left: 10, right: 10, bottom: 14 }}>
                <div style={{ height: 3, borderRadius: 3, background: 'rgba(255,255,255,0.35)' }}>
                  <div style={{ width: '46%', height: '100%', borderRadius: 3, background: '#fff' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontFamily: MONO, fontSize: 11, color: '#fff', opacity: 0.9 }}>
                  <span>0:11</span><span>0:24</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* likes */}
        <div className="sv-par" style={{ right: '22%', top: '15%', ['--d' as string]: 40 }}>
          <div className="sv-flt" style={{ ['--r' as string]: '3deg', ['--t' as string]: '6s', ['--dl' as string]: '-2s' } as React.CSSProperties}>
            <div className="sv-glass" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 16px 9px 10px', borderRadius: 999 }}>
              <span style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg,#4A9EFF,#2A7DE1)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="15" height="14" viewBox="0 0 15 14"><path d="M7.5 13C7.5 13 1 8.8 1 4.6C1 2.6 2.5 1.2 4.3 1.2C5.7 1.2 6.9 2 7.5 3.2C8.1 2 9.3 1.2 10.7 1.2C12.5 1.2 14 2.6 14 4.6C14 8.8 7.5 13 7.5 13Z" fill="#fff" /></svg>
              </span>
              <span style={{ fontFamily: DISPLAY, fontSize: 17, color: '#0A0A0A', lineHeight: 1 }}>+2.4K</span>
              <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.12em', color: 'rgba(10,10,10,0.45)', textTransform: 'uppercase' }}>this week</span>
            </div>
          </div>
        </div>

        {/* live pill */}
        <div className="sv-par" style={{ right: '7%', top: '30%', ['--d' as string]: 18 }}>
          <div className="sv-flt" style={{ ['--r' as string]: '0deg', ['--t' as string]: '9s', ['--dl' as string]: '-4s' } as React.CSSProperties}>
            <div className="sv-glass" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 14px', borderRadius: 999, fontFamily: MONO, fontSize: 11, letterSpacing: '0.16em', color: '#1F5FBF' }}>
              <span style={{ position: 'relative', width: 8, height: 8 }}>
                <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#2A7DE1' }} />
                <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#2A7DE1', animation: 'sv-pulse 1.8s ease-out infinite' }} />
              </span>
              LIVE
            </div>
          </div>
        </div>

        {/* reach */}
        <div className="sv-par" style={{ left: '7%', bottom: '19%', ['--d' as string]: 34 }}>
          <div className="sv-flt" style={{ ['--r' as string]: '-3deg', ['--t' as string]: '7.5s', ['--dl' as string]: '-1s' } as React.CSSProperties}>
            <div className="sv-glass" style={{ width: 188, padding: '12px 14px', borderRadius: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.16em', color: 'rgba(10,10,10,0.5)' }}>REACH</span>
                <span style={{ fontFamily: DISPLAY, fontSize: 20, color: '#2A7DE1' }}>+184%</span>
              </div>
              <svg viewBox="0 0 160 46" width="100%" height="46" style={{ marginTop: 6, display: 'block' }}>
                <defs>
                  <linearGradient id="svArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#4A9EFF" stopOpacity="0.4" />
                    <stop offset="1" stopColor="#4A9EFF" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 40 L20 34 L40 37 L60 26 L84 28 L108 14 L132 18 L160 4 V46 H0 Z" fill="url(#svArea)" />
                <path d="M0 40 L20 34 L40 37 L60 26 L84 28 L108 14 L132 18 L160 4" fill="none" stroke="#2A7DE1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="160" cy="4" r="3.4" fill="#fff" stroke="#2A7DE1" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>

        {/* campaign image */}
        <div className="sv-par" style={{ right: '6%', bottom: '17%', ['--d' as string]: 22 }}>
          <div className="sv-flt" style={{ ['--r' as string]: '6deg', ['--t' as string]: '9s', ['--dl' as string]: '-3s' } as React.CSSProperties}>
            <div className="sv-card" style={{ width: 156, background: '#fff', padding: 8 }}>
              <div style={{ position: 'relative', height: 138, borderRadius: 10, overflow: 'hidden', background: 'linear-gradient(150deg,#E3EEFF,#BFD8FF)' }}>
                <div style={{ position: 'absolute', left: '50%', top: 18, width: 74, height: 74, marginLeft: -37, borderRadius: '50%', background: 'linear-gradient(135deg,#5BC9E8,#2A7DE1)' }} />
                <svg viewBox="0 0 140 138" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} preserveAspectRatio="none">
                  <path d="M0 96 C30 74 52 112 84 92 C108 78 124 84 140 78 V138 H0Z" fill="#fff" fillOpacity="0.85" />
                  <path d="M0 112 C34 96 60 126 92 110 C114 100 128 104 140 100 V138 H0Z" fill="#4A9EFF" fillOpacity="0.75" />
                </svg>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 4px 2px' }}>
                <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.14em', color: 'rgba(10,10,10,0.55)' }}>CAMPAIGN 04</span>
                <svg width="13" height="12" viewBox="0 0 15 14"><path d="M7.5 13C7.5 13 1 8.8 1 4.6C1 2.6 2.5 1.2 4.3 1.2C5.7 1.2 6.9 2 7.5 3.2C8.1 2 9.3 1.2 10.7 1.2C12.5 1.2 14 2.6 14 4.6C14 8.8 7.5 13 7.5 13Z" fill="#2A7DE1" /></svg>
              </div>
            </div>
          </div>
        </div>

        {/* loose cursors */}
        <Cursor label="Content" style={{ left: '13%', top: '44%' }} delay={-3} />
        <Cursor label="Strategy" style={{ right: '17%', top: '58%' }} delay={-7} />
      </div>

      {/* ── Centre copy ── */}
      <div style={{ position: 'relative', zIndex: 3, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '132px 24px 96px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: MONO, fontSize: 11, color: '#2A7DE1', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 26, ...reveal(0.1) }}>
          <span style={{ width: 7, height: 7, borderRadius: 999, background: '#4A9EFF', boxShadow: '0 0 12px rgba(74,158,255,0.9)' }} />
          Creative digital agency
        </div>

        <h1 style={{ fontFamily: DISPLAY, fontWeight: 400, margin: 0, color: '#0A0A0A', lineHeight: 1.04, letterSpacing: '-0.012em', fontSize: 'clamp(38px, 6.4vw, 108px)' }}>
          <span style={{ display: 'block' }}>{LINE_1.map((w, i) => word(w, i, 0.3))}</span>
          <span style={{ display: 'block', marginTop: '0.08em' }}>
            <span style={{ position: 'relative', display: 'inline-block', padding: '0.02em 0.2em 0.02em 0.22em' }}>
              {/* design-tool selection */}
              <span
                aria-hidden
                style={{
                  position: 'absolute', inset: 0, border: '1.5px solid #2A7DE1', background: 'rgba(74,158,255,0.07)', pointerEvents: 'none',
                  opacity: selected ? 1 : 0, transform: selected ? 'scale(1)' : 'scale(0.97)', transition: `opacity 0.5s ease, transform 0.7s ${EASE}`,
                }}
              >
                {[{ left: -5, top: -5 }, { right: -5, top: -5 }, { left: -5, bottom: -5 }, { right: -5, bottom: -5 }].map((p, i) => (
                  <span key={i} className="sv-handle" style={{ ...p, transform: selected ? 'scale(1)' : 'scale(0)', transitionDelay: `${0.15 + i * 0.07}s` }} />
                ))}
                <span style={{ position: 'absolute', left: '50%', bottom: -30, transform: 'translateX(-50%)', padding: '3px 10px', borderRadius: 4, background: '#2A7DE1', color: '#fff', fontFamily: MONO, fontSize: 11, letterSpacing: '0.04em', whiteSpace: 'nowrap', lineHeight: 1.5 }}>
                  Fill · Attention
                </span>
              </span>
              <span style={{ position: 'relative' }}>{LINE_2.map((w, i) => word(w, i, 0.55, true))}</span>
              <span className="hidden sm:block" style={{ position: 'absolute', right: -16, bottom: -30, opacity: selected ? 1 : 0, transition: 'opacity 0.6s ease 0.5s', pointerEvents: 'none' }}>
                <span className="sv-cursor" style={{ position: 'relative', animation: 'none' }}>
                  <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
                    <path d="M2 2L2 17.5L6.4 13.6L9.6 20L12.6 18.6L9.5 12.3L15.5 12.1L2 2Z" fill="#1F5FBF" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                  <span style={{ background: '#1F5FBF', fontSize: 11 }}>Design</span>
                </span>
              </span>
            </span>
          </span>
        </h1>

        <p style={{ fontSize: 'clamp(16px, 1.4vw, 20px)', lineHeight: 1.65, color: 'rgba(10,10,10,0.62)', maxWidth: 520, margin: '56px 0 0', ...reveal(1.3) }}>
          Strategy, story and design under one roof. From the first idea to the last impression.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14, marginTop: 32, ...reveal(1.5) }}>
          <Link href="/contact" className="sv-btn pri">Start a project <span>&rarr;</span></Link>
          <a href="#services-grid" className="sv-btn sec">See what we do <span>&darr;</span></a>
        </div>
      </div>

      {/* ── Ticker ── */}
      <div aria-hidden style={{ position: 'relative', zIndex: 3, borderTop: '1px solid rgba(74,158,255,0.22)', background: 'rgba(250,250,247,0.7)', backdropFilter: 'blur(8px)', overflow: 'hidden', ...reveal(1.7) }}>
        <div style={{ display: 'flex', width: 'max-content', animation: 'sv-ticker 40s linear infinite', padding: '15px 0' }}>
          {[0, 1].map(k => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              {TICKER.map(t => (
                <span key={t + k} style={{ display: 'inline-flex', alignItems: 'center', fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.5)', whiteSpace: 'nowrap' }}>
                  {t}
                  <svg width="12" height="12" viewBox="0 0 14 14" style={{ margin: '0 28px' }}><path d="M7 0 L8.6 5.4 L14 7 L8.6 8.6 L7 14 L5.4 8.6 L0 7 L5.4 5.4 Z" fill="#4A9EFF" /></svg>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';

const VALUES = [
  { num: '01', title: 'Clarity over complexity', body: "We cut through the noise. If we can't explain what we're doing and why in plain language, we're doing it wrong." },
  { num: '02', title: 'Execution is the strategy', body: 'Ideas are cheap. The agency that ships wins. We move fast without cutting corners on craft.' },
  { num: '03', title: 'Long-term or nothing', body: "We only take on clients we can genuinely move the needle for. Short wins don't interest us." },
];

const VISION =
  "We exist at the intersection of technology and human ambition. Not to automate for automation's sake - but to give founders and operators the leverage they need to compete at the highest level.";

const ACCENT = '#4A9EFF';
const EASE = 'cubic-bezier(0.16,1,0.3,1)';
const MONO = 'var(--font-geist-mono), ui-monospace, monospace';
const SERIF = 'var(--font-heading), Georgia, serif';

export default function VisionScreen() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F6F9FF 100%)',
        borderTop: '1px solid rgba(74,158,255,0.2)',
        padding: 'clamp(80px, 12vh, 160px) clamp(24px, 8vw, 120px)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <style>{`
        @keyframes visionDriftA {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(10vw, 8vh) scale(1.2); }
          100% { transform: translate(-4vw, 14vh) scale(1.05); }
        }
        @keyframes visionDriftB {
          0%   { transform: translate(0, 0) scale(1.1); }
          50%  { transform: translate(-12vw, -6vh) scale(0.95); }
          100% { transform: translate(6vw, -12vh) scale(1.2); }
        }
        @keyframes visionDriftC {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-8vw, 10vh) scale(1.25); }
        }
        .vision-blob { position: absolute; border-radius: 50%; pointer-events: none; will-change: transform; }
        @media (prefers-reduced-motion: reduce) { .vision-blob { animation: none !important; } }
      `}</style>

      {/* Drifting light-blue gradient blobs */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div className="vision-blob" style={{ top: '-15%', left: '-8%', width: '48vw', height: '48vw', background: 'radial-gradient(circle, rgba(74,158,255,0.28) 0%, transparent 68%)', filter: 'blur(70px)', animation: 'visionDriftA 16s ease-in-out infinite alternate' }} />
        <div className="vision-blob" style={{ bottom: '-20%', right: '-6%', width: '52vw', height: '52vw', background: 'radial-gradient(circle, rgba(91,201,232,0.26) 0%, transparent 68%)', filter: 'blur(80px)', animation: 'visionDriftB 20s ease-in-out infinite alternate' }} />
        <div className="vision-blob" style={{ top: '30%', left: '38%', width: '36vw', height: '36vw', background: 'radial-gradient(circle, rgba(160,210,255,0.3) 0%, transparent 70%)', filter: 'blur(70px)', animation: 'visionDriftC 18s ease-in-out infinite alternate' }} />
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          fontFamily: MONO,
          fontSize: 11,
          color: '#2A7DE1',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: 48,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: `opacity 0.6s ${EASE}, transform 0.6s ${EASE}`,
        }}
      >
        Vision
      </div>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 80, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Left: word-stagger statement */}
        <div style={{ flex: '1.2 1 320px', minWidth: 0 }}>
          <p
            style={{
              fontFamily: SERIF,
              fontStyle: 'italic',
              fontSize: 'clamp(28px, 3.5vw, 52px)',
              color: '#0A0A0A',
              lineHeight: 1.2,
              margin: 0,
              maxWidth: 'min(55vw, 100%)',
            }}
          >
            {VISION.split(' ').map((word, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  marginRight: '0.25em',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.6s ${EASE} ${i * 40}ms, transform 0.6s ${EASE} ${i * 40}ms`,
                }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Right: values */}
        <div style={{ flex: '0.8 1 280px', display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              color: 'rgba(10,10,10,0.4)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: 24,
              opacity: visible ? 1 : 0,
              transition: `opacity 0.6s ${EASE} 0.3s`,
            }}
          >
            Values
          </div>

          {VALUES.map((v, i) => (
            <div
              key={v.num}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                borderTop: `1px solid ${hovered === i ? ACCENT : 'rgba(10,10,10,0.1)'}`,
                padding: '20px 0',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(30px)',
                transition: `opacity 0.6s ${EASE} ${0.4 + i * 0.15}s, transform 0.6s ${EASE} ${0.4 + i * 0.15}s, border-color 0.3s ease`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 8 }}>
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    color: ACCENT,
                    letterSpacing: '0.1em',
                    display: 'inline-block',
                    transform: hovered === i ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  {v.num}
                </span>
                <span
                  style={{
                    fontFamily: SERIF,
                    fontStyle: 'italic',
                    fontSize: 24,
                    color: hovered === i ? '#0A0A0A' : 'rgba(10,10,10,0.85)',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {v.title}
                </span>
              </div>
              <p style={{ fontFamily: MONO, fontSize: 12, color: 'rgba(10,10,10,0.55)', lineHeight: 1.7, margin: 0 }}>
                {v.body}
              </p>
            </div>
          ))}

          <div style={{ borderTop: '1px solid rgba(10,10,10,0.1)' }} />
        </div>
      </div>
    </section>
  );
}

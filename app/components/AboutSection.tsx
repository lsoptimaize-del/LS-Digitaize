'use client';

import { useEffect, useRef, useState } from 'react';

const STATS = [
  { value: 50, suffix: '+', label: 'Brands Elevated' },
  { value: 200, suffix: '+', label: 'Campaigns Live' },
  { value: 6, suffix: '', label: 'Service Pillars' },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #B8D4E8 0%, #C8DFF0 30%, #D8EAF5 100%)',
        padding: 'clamp(5rem, 12vh, 10rem) 0 clamp(6rem, 14vh, 12rem)',
      }}
    >
      {/* Ambient floating orbs */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '10%', left: '-5%',
          width: '40vw', height: '40vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,234,221,0.3) 0%, transparent 70%)',
          filter: 'blur(50px)', animation: 'floatOrb1 12s ease-in-out infinite alternate',
        }} />
        <div style={{
          position: 'absolute', top: '40%', right: '-8%',
          width: '35vw', height: '35vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(86,136,201,0.22) 0%, transparent 70%)',
          filter: 'blur(60px)', animation: 'floatOrb2 16s ease-in-out infinite alternate',
        }} />
        <div style={{
          position: 'absolute', bottom: '5%', left: '30%',
          width: '30vw', height: '30vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(140,205,233,0.25) 0%, transparent 70%)',
          filter: 'blur(55px)', animation: 'floatOrb3 14s ease-in-out infinite alternate',
        }} />

        {/* Floating bubbles */}
        {[
          { size: 12, top: '15%', left: '8%', delay: '0s', dur: '8s' },
          { size: 8, top: '45%', left: '15%', delay: '1.5s', dur: '10s' },
          { size: 18, top: '70%', left: '5%', delay: '3s', dur: '12s' },
          { size: 10, top: '25%', right: '12%', delay: '0.5s', dur: '9s' },
          { size: 14, top: '60%', right: '8%', delay: '2s', dur: '11s' },
          { size: 6, top: '80%', right: '20%', delay: '4s', dur: '7s' },
        ].map((b, i) => (
          <div key={i} style={{
            position: 'absolute', top: b.top, left: (b as any).left, right: (b as any).right,
            width: b.size, height: b.size, borderRadius: '50%',
            border: '1px solid rgba(86,136,201,0.35)',
            background: 'rgba(200,223,240,0.2)',
            animation: `bubble ${b.dur} ${b.delay} ease-in-out infinite alternate`,
          }} />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Top label */}
        <p style={{
          fontSize: '0.7rem', letterSpacing: '0.38em', textTransform: 'uppercase',
          color: 'rgba(86,136,201,0.8)', marginBottom: '0.6rem',
        }}>
          Our Story
        </p>

        {/* Main layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: 'clamp(3rem, 8vw, 7rem)',
          alignItems: 'center',
        }}>
          {/* Left: Copy */}
          <div>
            <h2 style={{
              fontFamily: 'var(--font-sevone)',
              fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
              fontWeight: 900,
              color: '#1a2744',
              lineHeight: 0.9,
              marginBottom: '2rem',
              letterSpacing: '-0.03em',
              textShadow: '0 2px 30px rgba(86,136,201,0.15)',
            }}>
              WE SEE<br />
              <span style={{ color: '#5688C9' }}>POTENTIAL</span><br />
              WHERE OTHERS<br />SEE NOISE.
            </h2>

            <p style={{
              fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
              lineHeight: 1.8,
              color: 'rgba(26,39,68,0.72)',
              maxWidth: '480px',
              marginBottom: '1.5rem',
            }}>
              LS Digitaize is a full-spectrum digital marketing agency built for brands that are bold enough to matter. We don&apos;t take every client — we take the ones we believe in. From identity to performance, from content to culture, we handle everything A-to-Z so you can focus on what you do best.
            </p>
            <p style={{
              fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
              lineHeight: 1.8,
              color: 'rgba(26,39,68,0.72)',
              maxWidth: '480px',
              marginBottom: '2.5rem',
            }}>
              Show us the spark. We&apos;ll turn it into a flame.
            </p>

            <a
              href="/about"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontSize: '0.75rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: '#1a2744',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(26,39,68,0.35)',
                paddingBottom: '0.3rem',
                transition: 'gap 0.25s ease, border-color 0.25s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.gap = '1rem';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#5688C9';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.gap = '0.6rem';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(26,39,68,0.35)';
              }}
            >
              Our Full Story <span>→</span>
            </a>
          </div>

          {/* Right: Image placeholder */}
          <div style={{ position: 'relative' }}>
            {/* Main image box */}
            <div style={{
              width: '100%',
              aspectRatio: '4/5',
              borderRadius: '28px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 30px 80px rgba(26,39,68,0.2), 0 8px 30px rgba(86,136,201,0.15)',
              border: '1px solid rgba(200,223,240,0.6)',
            }}>
              {/* Placeholder gradient */}
              <div style={{
                width: '100%', height: '100%',
                background: 'linear-gradient(135deg, #B8D4E8 0%, #8CCDE9 40%, #8BEADD 70%, #5688C9 100%)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: '1rem',
              }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.35)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem',
                }}>
                  ✦
                </div>
                <p style={{
                  fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase',
                  color: 'rgba(26,39,68,0.6)', textAlign: 'center', padding: '0 2rem',
                }}>
                  IMAGE PLACEHOLDER
                </p>
                <p style={{
                  fontSize: '0.6rem', letterSpacing: '0.1em',
                  color: 'rgba(26,39,68,0.4)', textAlign: 'center', padding: '0 2rem',
                  fontStyle: 'italic',
                }}>
                  Prompt: Whimsical illustration of a small creative team collaborating — surrounded by floating UI elements, color swatches, and spark motifs. Watercolor style, navy + mint + sky blue palette. Dreamlike and editorial. No text.
                </p>
              </div>
            </div>

            {/* Floating accent card */}
            <div style={{
              position: 'absolute',
              bottom: '-2rem',
              left: '-2rem',
              background: 'rgba(26,39,68,0.92)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(140,205,233,0.25)',
              borderRadius: '16px',
              padding: '1.25rem 1.5rem',
              boxShadow: '0 12px 40px rgba(26,39,68,0.3)',
            }}>
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(140,205,233,0.7)', marginBottom: '0.3rem' }}>
                Our Approach
              </p>
              <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', margin: 0, fontFamily: 'var(--font-sevone)' }}>
                Curated. Committed.<br />Unstoppable.
              </p>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
          marginTop: 'clamp(4rem, 10vh, 8rem)',
          borderTop: '1px solid rgba(86,136,201,0.2)',
          paddingTop: '3rem',
        }}>
          {STATS.map(({ value, suffix, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-sevone)',
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 900,
                color: '#5688C9',
                lineHeight: 1,
                marginBottom: '0.5rem',
              }}>
                <CountUp target={value} suffix={suffix} />
              </div>
              <p style={{
                fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase',
                color: 'rgba(26,39,68,0.55)', margin: 0,
              }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes floatOrb1 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(4vw, 6vh) scale(1.1); }
        }
        @keyframes floatOrb2 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-5vw, 8vh) scale(1.08); }
        }
        @keyframes floatOrb3 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(3vw, -6vh) scale(1.12); }
        }
        @keyframes bubble {
          0% { transform: translateY(0) scale(1); opacity: 0.5; }
          100% { transform: translateY(-20px) scale(1.15); opacity: 0.9; }
        }
      `}</style>
    </section>
  );
}

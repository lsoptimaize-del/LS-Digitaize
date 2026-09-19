'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type LogoCell = { id: string; name: string; logo: string };

const CELLS: LogoCell[] = [
  { id: 'merc', name: 'Mercedes-Benz', logo: '/clients/merc.png' },
  { id: 'prestige', name: 'Prestige Group', logo: '/clients/prestige.png' },
  { id: 'rainbow', name: 'Rainbow Children’s Hospital', logo: '/clients/rainbow.png' },
  { id: 'ducati', name: 'Ducati', logo: '/clients/ducati.png' },
  { id: 'beyond', name: 'Beyond', logo: '/clients/Beyond.png' },
  { id: 'bremen', name: 'Bremen Protect', logo: '/clients/bremen-nobg.png' },
  { id: 'woohoo', name: 'Woohoo Health Club', logo: '/clients/woohoo.png' },
  { id: 'aurum', name: 'Aurum Fitness', logo: '/clients/aurum.jpeg' },
  { id: '7000rpm', name: '7000 RPM', logo: '/clients/7000rpm.png' },
  { id: 'adl', name: 'ADL Constructions', logo: '/clients/adl.jpeg' },
  { id: 'nhce', name: 'New Horizon College', logo: '/clients/nhce.png' },
  { id: 'rotary', name: 'Rotary Club', logo: '/clients/rotary.png' },
  { id: 'sitnstay', name: 'Sit N Stay', logo: '/clients/sitnstay.png' },
  { id: 'dom369', name: 'Dom369', logo: '/clients/dom369logo.png' },
  { id: 'redbrick', name: 'Red Brick Studio', logo: '/clients/redbrickstudio.png' },
  { id: 'savirajyam', name: 'Savirajyam', logo: '/clients/savirajyam.png' },
];

const WIDE_LOGOS = ['prestige', 'rainbow', 'adl', 'sitnstay', 'beyond'];

const H1_WORDS = [
  { text: 'Brands', hot: false },
  { text: 'we', hot: false },
  { text: 'took', hot: false },
  { text: 'from', hot: false },
  { text: 'offline', hot: false },
  { text: 'to', hot: true },
  { text: 'unmissable.', hot: true },
];

const EASE = 'cubic-bezier(0.16,1,0.3,1)';
const SPRING = 'cubic-bezier(0.34,1.56,0.64,1)';
const MONO = 'var(--font-geist-mono), ui-monospace, monospace';
const DISPLAY = 'var(--font-sevone), serif';

export default function ClientConstellation() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [h1Done, setH1Done] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setH1Done(true), 1600);
    return () => clearTimeout(t);
  }, [visible]);

  const gridBaseDelay = isMobile ? 0 : 0.3;

  return (
    <section
      ref={sectionRef}
      aria-label="Our brands"
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F6F9FF 100%)',
        padding: isMobile ? '72px 0 80px' : '120px 0 112px',
        borderRadius: isMobile ? '24px 24px 0 0' : '40px 40px 0 0',
        borderTop: '1px solid rgba(74,158,255,0.28)',
        boxShadow: '0 -24px 70px rgba(42,125,225,0.16), 0 -2px 0 rgba(74,158,255,0.10)',
      }}
    >
      <style>{`
        .cc-cell {
          background: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(74,158,255,0.22);
          border-radius: 10px;
          box-shadow: 0 6px 20px rgba(42,125,225,0.06);
        }
        .cc-cell:hover {
          background: #F7FAFF;
          border-color: rgba(74,158,255,0.6);
          box-shadow: 0 14px 34px rgba(42,125,225,0.18);
          translate: 0 -4px;
        }
        .cc-cell-corner-h,
        .cc-cell-corner-v {
          position: absolute;
          top: 0;
          left: 0;
          background: #4A9EFF;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .cc-cell-corner-h { width: 20px; height: 1.5px; }
        .cc-cell-corner-v { width: 1.5px; height: 20px; }
        .cc-cell:hover .cc-cell-corner-h,
        .cc-cell:hover .cc-cell-corner-v { opacity: 1; }
        .cc-cell-img { object-fit: contain; transition: transform 0.3s ease; }
        .cc-cell:hover .cc-cell-img { transform: scale(1.06); }
      `}</style>

      {/* soft brand glow + tech grid */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '55%', height: '70%', background: 'radial-gradient(circle, rgba(74,158,255,0.16), transparent 65%)', filter: 'blur(30px)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(74,158,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(74,158,255,0.07) 1px, transparent 1px)', backgroundSize: '48px 48px', maskImage: 'radial-gradient(ellipse at 20% 30%, black 0%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at 20% 30%, black 0%, transparent 70%)' }} />
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          maxWidth: isMobile ? undefined : 1400,
          margin: isMobile ? undefined : '0 auto',
          padding: isMobile ? '0 24px' : '0 64px',
          gap: isMobile ? undefined : 80,
          alignItems: isMobile ? undefined : 'center',
        }}
      >
        {/* Left panel: copy */}
        <div style={{ flex: isMobile ? undefined : '0.9', marginBottom: isMobile ? 48 : undefined }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              fontFamily: MONO,
              fontSize: 11,
              textTransform: 'uppercase',
              color: '#2A7DE1',
              letterSpacing: '0.2em',
              marginBottom: 20,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-30px)',
              transition: `opacity 0.7s ${EASE}, transform 0.7s ${EASE}`,
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: 999, background: '#4A9EFF', boxShadow: '0 0 12px rgba(74,158,255,0.8)' }} />
            Our Clients
          </div>

          <h2
            style={{
              fontFamily: DISPLAY,
              fontSize: isMobile ? 'clamp(34px, 9vw, 50px)' : 'clamp(42px, 4.6vw, 74px)',
              color: '#0A0A0A',
              lineHeight: 1,
              margin: 0,
              letterSpacing: '-0.01em',
            }}
          >
            {H1_WORDS.map((word, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  overflow: h1Done ? 'visible' : 'hidden',
                  marginRight: '0.25em',
                  verticalAlign: 'top',
                  paddingBottom: '0.08em',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    color: word.hot ? undefined : '#0A0A0A',
                    background: word.hot ? 'linear-gradient(120deg, #2A7DE1 0%, #4A9EFF 55%, #5BC9E8 100%)' : undefined,
                    WebkitBackgroundClip: word.hot ? 'text' : undefined,
                    backgroundClip: word.hot ? 'text' : undefined,
                    WebkitTextFillColor: word.hot ? 'transparent' : undefined,
                    transform: visible ? 'translateY(0)' : 'translateY(110%)',
                    transition: `transform 0.9s ${EASE} ${0.2 + i * 0.06}s`,
                  }}
                >
                  {word.text}
                </span>
              </span>
            ))}
          </h2>

          <p
            style={{
              fontFamily: MONO,
              fontSize: isMobile ? 12 : 13,
              color: 'rgba(10,10,10,0.55)',
              lineHeight: 1.9,
              maxWidth: isMobile ? '100%' : 360,
              marginTop: 24,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.8s ease-out 0.8s, transform 0.8s ease-out 0.8s',
            }}
          >
            Identity, content, performance and events: we build a brand&apos;s whole
            digital presence, then treat it like it&apos;s our own. Here are some of
            the names that trusted us with theirs.
          </p>

          <div
            style={{
              width: 56,
              height: 2,
              background: 'linear-gradient(90deg, #2A7DE1, #5BC9E8)',
              marginTop: 32,
              transformOrigin: 'left center',
              transform: visible ? 'scaleX(1)' : 'scaleX(0)',
              transition: 'transform 0.6s ease-out 1.1s',
            }}
          />
        </div>

        {/* Right panel: logo grid */}
        <div
          style={{
            flex: isMobile ? undefined : '1.1',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
            gap: isMobile ? 10 : 14,
          }}
        >
          {CELLS.map((cell, i) => {
            const wide = WIDE_LOGOS.includes(cell.id);
            return (
              <div
                key={cell.id}
                className="cc-cell"
                style={{
                  padding: isMobile ? '28px 18px' : cell.id === 'woohoo' || cell.id === 'aurum' ? '44px 24px' : '38px 24px',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'scale(1)' : 'scale(0.96)',
                  transition: `opacity 0.6s ${SPRING} ${gridBaseDelay + i * 0.08}s, transform 0.6s ${SPRING} ${gridBaseDelay + i * 0.08}s, translate 0.3s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease`,
                }}
              >
                <span className="cc-cell-corner-h" />
                <span className="cc-cell-corner-v" />
                <Image
                  src={cell.logo}
                  alt={cell.name}
                  width={400}
                  height={200}
                  className="cc-cell-img"
                  style={{
                    width: 'auto',
                    height: 'auto',
                    maxWidth: wide ? (isMobile ? 180 : 220) : isMobile ? 120 : 140,
                    maxHeight: wide ? (isMobile ? 75 : 100) : isMobile ? 50 : 64,
                    filter: cell.id === 'beyond' ? 'brightness(0)' : undefined,
                    opacity: cell.id === 'beyond' ? 0.85 : 1,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: isMobile ? undefined : 1400,
          margin: '0 auto',
          padding: isMobile ? '0 24px' : '0 64px',
          marginTop: 28,
          display: 'flex',
          justifyContent: isMobile ? 'center' : 'flex-end',
          alignItems: 'center',
          gap: 12,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.8s ease-out 1.4s',
        }}
      >
        <span style={{ width: 24, height: 1, background: 'rgba(42,125,225,0.4)', display: 'inline-block', flexShrink: 0 }} />
        <span style={{ fontFamily: MONO, fontSize: 11, color: 'rgba(10,10,10,0.4)', textTransform: 'uppercase', letterSpacing: '0.18em' }}>
          and many more.
        </span>
      </div>
    </section>
  );
}

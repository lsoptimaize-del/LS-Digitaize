'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

/*
  Background video slot. Drop your file at  public/media/cta.mp4  (and optionally a still at
  public/media/cta-poster.jpg). Until the file exists the section shows a soft animated blue
  gradient instead, so nothing looks broken.
*/
const CTA_VIDEO = '/media/cta.mp4';
const CTA_POSTER = '/media/cta-poster.jpg';

const WORDS = [
  { text: 'Ready', hot: false },
  { text: 'to', hot: false },
  { text: 'turn', hot: false },
  { text: 'attention', hot: false },
  { text: 'into', hot: false },
  { text: 'currency?', hot: true },
];

const EASE = 'cubic-bezier(0.16,1,0.3,1)';
const MONO = 'var(--font-geist-mono), ui-monospace, monospace';
const SERIF = 'var(--font-heading), Georgia, serif';

export default function ClosingCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [headlineDone, setHeadlineDone] = useState(false);
  const [videoOk, setVideoOk] = useState(true);

  // reveal once, and only play the video while the section is on screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
        const v = videoRef.current;
        if (v) (entry.isIntersecting ? v.play() : Promise.resolve(v.pause())).catch(() => {});
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setHeadlineDone(true), 1300);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'clamp(80px, 12vh, 160px) clamp(24px, 8vw, 120px)',
        background: 'linear-gradient(180deg, #FAFAF7 0%, #EAF3FF 100%)',
      }}
    >
      <style>{`
        @keyframes ctaDriftA { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(8vw, 6vh) scale(1.2); } }
        @keyframes ctaDriftB { 0% { transform: translate(0,0) scale(1.1); } 100% { transform: translate(-9vw, -5vh) scale(0.95); } }
        @media (prefers-reduced-motion: reduce) { .cta-blob { animation: none !important; } }
      `}</style>

      {/* fallback gradient glow, visible until a video is added */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div className="cta-blob" style={{ position: 'absolute', top: '-20%', left: '-10%', width: '55vw', height: '55vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(74,158,255,0.28) 0%, transparent 68%)', animation: 'ctaDriftA 16s ease-in-out infinite alternate' }} />
        <div className="cta-blob" style={{ position: 'absolute', bottom: '-25%', right: '-10%', width: '60vw', height: '60vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(91,201,232,0.26) 0%, transparent 68%)', animation: 'ctaDriftB 20s ease-in-out infinite alternate' }} />
      </div>

      {/* Background video */}
      {videoOk && (
        <video
          ref={videoRef}
          aria-hidden
          muted
          loop
          playsInline
          preload="metadata"
          poster={CTA_POSTER}
          onError={() => setVideoOk(false)}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
        >
          <source src={CTA_VIDEO} type="video/mp4" onError={() => setVideoOk(false)} />
        </video>
      )}

      {/* Scrim: keeps the dark headline readable over any footage and blends the edges into the page */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'linear-gradient(to bottom, #FAFAF7 0%, rgba(250,250,247,0.18) 22%, rgba(250,250,247,0.1) 74%, #FFFFFF 100%), radial-gradient(ellipse at center, rgba(255,255,255,0.3) 0%, transparent 62%)',
        }}
      />

      {/* small label */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          fontFamily: MONO,
          fontSize: 11,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#2A7DE1',
          marginBottom: 28,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(14px)',
          transition: `opacity 0.6s ${EASE}, transform 0.6s ${EASE}`,
        }}
      >
        Let&apos;s Talk
      </div>

      {/* Headline: word-by-word reveal */}
      <h2
        style={{
          position: 'relative',
          zIndex: 1,
          fontFamily: SERIF,
          fontStyle: 'italic',
          fontWeight: 500,
          fontSize: 'clamp(40px, 6.4vw, 100px)',
          color: '#0A0A0A',
          lineHeight: 1.08,
          margin: '0 0 26px',
          maxWidth: 980,
        }}
      >
        {WORDS.map((w, i) => (
          <span
            key={i}
            style={{ display: 'inline-block', overflow: headlineDone ? 'visible' : 'hidden', marginRight: '0.26em', verticalAlign: 'top', paddingBottom: '0.08em' }}
          >
            <span
              style={{
                display: 'inline-block',
                transform: visible ? 'translateY(0)' : 'translateY(110%)',
                transition: `transform 0.8s ${EASE} ${i * 80}ms`,
                ...(w.hot
                  ? {
                      background: 'linear-gradient(120deg, #2A7DE1 0%, #4A9EFF 55%, #5BC9E8 100%)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }
                  : null),
              }}
            >
              {w.text}
            </span>
          </span>
        ))}
      </h2>

      {/* Sub-line */}
      <p
        style={{
          position: 'relative',
          zIndex: 1,
          fontFamily: MONO,
          fontSize: 'clamp(12px, 1.3vw, 14px)',
          color: 'rgba(10,10,10,0.6)',
          letterSpacing: '0.03em',
          lineHeight: 1.8,
          maxWidth: 500,
          margin: '0 0 44px',
          opacity: visible ? 1 : 0,
          transition: `opacity 0.8s ${EASE} 0.6s`,
        }}
      >
        We work with founders and operators who are serious about growth. If that&apos;s you, let&apos;s talk.
      </p>

      {/* Buttons */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          href="/contact"
          className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full transition-transform duration-500 hover:scale-105"
          style={{
            padding: '16px 34px',
            background: '#4A9EFF',
            color: '#FFFFFF',
            fontFamily: MONO,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 0.6s ${EASE} 0.9s, transform 0.6s ${EASE} 0.9s`,
          }}
        >
          <span className="relative z-10">Start a Project</span>
          <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
          <span className="absolute inset-0 z-0 bg-[#7EC1F5] translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0" />
        </Link>
        <Link
          href="/services"
          className="inline-flex items-center justify-center rounded-full transition-colors duration-300 hover:bg-white"
          style={{
            padding: '16px 34px',
            background: 'rgba(255,255,255,0.4)',
            color: 'rgba(10,10,10,0.8)',
            border: '1px solid rgba(10,10,10,0.2)',
            fontFamily: MONO,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 0.6s ${EASE} 1s, transform 0.6s ${EASE} 1s, background-color 0.3s ease`,
          }}
        >
          View Services
        </Link>
      </div>
    </section>
  );
}

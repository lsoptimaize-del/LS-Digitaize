'use client';

import { useRef, useState, useCallback } from 'react';

const SERVICES = [
  {
    number: '01',
    title: 'Brand Identity',
    description:
      'We craft visual languages that feel inevitable — logos, palettes, type systems, and brand books that make you unmistakable in any room.',
    tag: 'Identity',
  },
  {
    number: '02',
    title: 'Content Systems',
    description:
      'Scalable content engines built for consistency and impact. Strategy, templates, and calendars that turn ideas into a steady stream of growth.',
    tag: 'Content',
  },
  {
    number: '03',
    title: 'Creative Marketing',
    description:
      "Campaigns that don't just sell — they linger. We blend storytelling and data to build movements around your brand.",
    tag: 'Marketing',
  },
  {
    number: '04',
    title: 'Social Growth',
    description:
      'Audience-first strategies with a sharp creative edge. We grow communities that convert, retain, and advocate.',
    tag: 'Growth',
  },
];

type CardProps = (typeof SERVICES)[number];

function ServiceCard({ number, title, description, tag }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({
    transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)',
  });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const shine = shineRef.current;
    if (!card || !shine) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotY = ((x - cx) / cx) * 10;
    const rotX = -((y - cy) / cy) * 10;
    setStyle({
      transform: `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`,
    });
    // shine follows cursor
    const pctX = (x / rect.width) * 100;
    const pctY = (y / rect.height) * 100;
    shine.style.background = `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(255,255,255,0.18) 0%, transparent 65%)`;
    shine.style.opacity = '1';
  }, []);

  const handleMouseLeave = useCallback(() => {
    setStyle({ transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)' });
    if (shineRef.current) shineRef.current.style.opacity = '0';
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transition: 'transform 0.25s ease',
        willChange: 'transform',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        background: 'rgba(200, 223, 240, 0.14)',
        border: '1px solid rgba(255,255,255,0.28)',
        borderRadius: '20px',
        padding: '2.25rem 2rem',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        boxShadow: '0 8px 40px rgba(26,39,68,0.18), inset 0 1px 0 rgba(255,255,255,0.22)',
      }}
    >
      {/* Shine layer */}
      <div
        ref={shineRef}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0,
          transition: 'opacity 0.2s ease',
          pointerEvents: 'none',
          borderRadius: '20px',
        }}
      />

      {/* Floating number */}
      <span
        style={{
          fontFamily: 'var(--font-sevone)',
          fontSize: 'clamp(3rem, 5vw, 5.5rem)',
          fontWeight: 900,
          color: 'rgba(255,255,255,0.08)',
          position: 'absolute',
          top: '-0.5rem',
          right: '1.25rem',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {number}
      </span>

      {/* Tag pill */}
      <span
        style={{
          display: 'inline-block',
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(200,223,240,0.85)',
          border: '1px solid rgba(200,223,240,0.35)',
          borderRadius: '999px',
          padding: '0.2rem 0.75rem',
          marginBottom: '1rem',
        }}
      >
        {tag}
      </span>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-sevone)',
          fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
          fontWeight: 700,
          color: '#fff',
          lineHeight: 1.1,
          marginBottom: '0.9rem',
          textShadow: '0 1px 12px rgba(26,39,68,0.3)',
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: '0.92rem',
          lineHeight: 1.65,
          color: 'rgba(220,235,248,0.82)',
          margin: 0,
        }}
      >
        {description}
      </p>

      {/* Bottom accent line */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '2rem',
          right: '2rem',
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(140,205,233,0.55), transparent)',
        }}
      />
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section
      id="services"
      style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}
    >
      {/* ── Water video background ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src="/thrid.mp4" type="video/mp4" />
      </video>

      {/* ── Dark overlay to deepen the water ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, #1a2744cc 0%, #0d1a2faa 50%, #1a2744dd 100%)',
          zIndex: 1,
        }}
      />

      {/* ── Top edge: seamless blend from DigitalSection ── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '220px',
          background:
            'linear-gradient(to bottom, #B8D4E8 0%, #B8D4E800 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* ── Content ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(8rem, 18vh, 14rem) 2rem 6rem',
        }}
      >
        {/* Section label */}
        <p
          style={{
            fontSize: '0.72rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(140,205,233,0.75)',
            marginBottom: '0.75rem',
          }}
        >
          What we do
        </p>

        {/* Heading */}
        <h2
          style={{
            fontFamily: 'var(--font-sevone)',
            fontSize: 'clamp(2.8rem, 6vw, 6rem)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 0.9,
            marginBottom: '4rem',
            textShadow: '0 4px 60px rgba(26,39,68,0.5)',
            letterSpacing: '-0.02em',
          }}
        >
          SERVICES
        </h2>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {SERVICES.map((s) => (
            <ServiceCard key={s.number} {...s} />
          ))}
        </div>
      </div>

      {/* ── Bottom fade out ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '160px',
          background: 'linear-gradient(to top, var(--background) 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
    </section>
  );
}

'use client';

import { useState, useRef } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { SERVICES, SERVICE_KEYFRAMES } from '../../data/services';
import { HERO_ART } from '../../data/heroArt';
import { HERO_ICONS } from '../../data/heroIcons';

export default function ServiceDetailPage() {
  const params = useParams<{ slug: string }>();
  const service = SERVICES.find(s => s.slug === params.slug);

  const ctaRef = useRef<HTMLElement>(null);
  const [ctaMousePos, setCtaMousePos] = useState({ x: -1000, y: -1000 });

  if (!service) {
    notFound();
    return null;
  }

  const handleCtaMouseMove = (e: React.MouseEvent) => {
    if (!ctaRef.current) return;
    const rect = ctaRef.current.getBoundingClientRect();
    setCtaMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const heroArt = HERO_ART[service.slug];

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#F2F6FC' }}>
      <style>{SERVICE_KEYFRAMES}</style>
      <Navbar />

      {/* ═══════════════════════════ HERO — text left, bespoke scene right ═══════════════════════════ */}
      <section
        className="flex items-start lg:items-center lg:min-h-[92vh]"
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: 'clamp(6.5rem, 14vh, 10rem) 1.25rem 3rem',
        }}
      >
        {/* Blueprint grid */}
        <svg aria-hidden className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="heroSchematicGrid" width="52" height="52" patternUnits="userSpaceOnUse">
              <path d="M 52 0 L 0 0 0 52" fill="none" stroke={service.accent} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroSchematicGrid)" />
        </svg>

        <div
          className="relative z-10 grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 lg:gap-6 items-center"
          style={{ maxWidth: '1320px', margin: '0 auto', width: '100%' }}
        >
          {/* Text column */}
          <motion.div
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="justify-center lg:justify-start" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.5rem' }}>
              <span
                style={{
                  padding: '0.2rem 0.65rem',
                  borderRadius: '6px',
                  background: `${service.accent}22`,
                  border: `1px solid ${service.accent}55`,
                  fontFamily: 'var(--font-sevone)',
                  fontSize: '0.75rem',
                  fontWeight: 900,
                  color: service.accent,
                  letterSpacing: '0.1em',
                }}
              >
                {service.number}
              </span>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(242,246,252,0.55)' }}>
                {service.category}
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-sevone)',
                fontSize: 'clamp(2.3rem, 4.6vw, 3.6rem)',
                fontWeight: 900,
                lineHeight: 1.04,
                letterSpacing: '-0.025em',
                marginBottom: '1.4rem',
                color: '#F2F6FC',
              }}
            >
              {service.title}
            </h1>

            <p
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: service.accent,
                marginBottom: '1.4rem',
              }}
            >
              {service.tagline}
            </p>

            <p style={{ fontSize: '1.02rem', lineHeight: 1.7, color: 'rgba(242,246,252,0.7)', maxWidth: '480px', marginBottom: '2.25rem' }}>
              {service.whatItIs}
            </p>

            <div className="justify-center lg:justify-start" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', marginBottom: '2.5rem' }}>
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.7rem',
                  padding: '0.85rem 1.75rem',
                  borderRadius: '999px',
                  background: `${service.accent}20`,
                  border: `1px solid ${service.accent}60`,
                  color: '#F2F6FC',
                  textDecoration: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                Start This Service <span style={{ color: service.accent }}>→</span>
              </Link>
              <Link
                href="/services"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.7rem',
                  padding: '0.85rem 1.75rem',
                  borderRadius: '999px',
                  background: 'transparent',
                  border: '1px solid rgba(242,246,252,0.25)',
                  color: '#F2F6FC',
                  textDecoration: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                All Services
              </Link>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.7rem', fontFamily: 'monospace', color: `${service.accent}a0`, letterSpacing: '0.12em' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: service.accent, boxShadow: `0 0 8px ${service.accent}` }} />
              {service.metric}
            </div>
          </motion.div>

          {/* Bespoke scene column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative',
              aspectRatio: '600/440',
              borderRadius: '20px',
              overflow: 'hidden',
              border: `1px solid ${service.accent}28`,
              background: `radial-gradient(circle at 50% 40%, ${service.accent}10 0%, #04070D 78%)`,
            }}
          >
            {heroArt ? heroArt(service.accent, service.accent2, service.metric) : service.illustration(service.accent, service.accent2)}

            {/* corner tech markers, inside the panel */}
            {[
              { top: '0.9rem', left: '0.9rem', rot: 0 },
              { top: '0.9rem', right: '0.9rem', rot: 90 },
              { bottom: '0.9rem', left: '0.9rem', rot: -90 },
              { bottom: '0.9rem', right: '0.9rem', rot: 180 },
            ].map((c, i) => (
              <svg key={i} aria-hidden width="18" height="18" style={{ position: 'absolute', ...c, opacity: 0.45, transform: `rotate(${c.rot}deg)` }}>
                <path d="M2 10L2 2L10 2" stroke={service.accent} strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            ))}

            <div
              style={{
                position: 'absolute',
                bottom: '0.9rem',
                left: '2.2rem',
                right: '2.2rem',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.62rem',
                fontFamily: 'monospace',
                color: `${service.accent}80`,
                letterSpacing: '0.12em',
                pointerEvents: 'none',
              }}
            >
              <span>SYS // {service.number}</span>
              <span style={{ color: 'rgba(242,246,252,0.4)' }}>{service.category.toUpperCase()}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════ INDEX — capabilities as a dossier list ═══════════════════════════ */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: 'clamp(4rem,8vw,6rem) 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ color: service.accent, fontFamily: 'monospace', letterSpacing: '0.3em', fontSize: '0.8rem', marginBottom: '0.75rem', textTransform: 'uppercase' }}
          >
            Capability Index
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-sevone)', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem', letterSpacing: '-0.02em' }}
          >
            Everything Inside
          </motion.h2>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {service.capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]"
                style={{
                  position: 'relative',
                  gap: 'clamp(0.6rem, 4vw, 3rem)',
                  alignItems: 'baseline',
                  padding: 'clamp(1.5rem, 3vw, 2.25rem) 0',
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                  overflow: 'hidden',
                }}
              >
                <span
                  aria-hidden
                  style={{
                    position: 'absolute',
                    right: '-0.5rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontFamily: 'var(--font-sevone)',
                    fontSize: 'clamp(4rem, 9vw, 7rem)',
                    fontWeight: 900,
                    color: service.accent,
                    opacity: 0.05,
                    lineHeight: 1,
                    pointerEvents: 'none',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  aria-hidden
                  className="scale-y-0 group-hover:scale-y-100 transition-transform duration-300"
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '2px',
                    background: service.accent,
                    transformOrigin: 'top',
                  }}
                />
                <h3
                  className="transition-colors duration-300 group-hover:text-white"
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontFamily: 'var(--font-sevone)',
                    fontSize: 'clamp(1.15rem, 2vw, 1.55rem)',
                    fontWeight: 700,
                    color: '#F2F6FC',
                    letterSpacing: '-0.01em',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '34px',
                      height: '34px',
                      borderRadius: '9px',
                      background: `${service.accent}16`,
                      border: `1px solid ${service.accent}35`,
                      color: service.accent,
                      flexShrink: 0,
                    }}
                  >
                    {HERO_ICONS[cap.icon]?.({ size: 16 })}
                  </span>
                  {cap.title}
                </h3>
                <p style={{ position: 'relative', zIndex: 1, fontSize: '0.95rem', lineHeight: 1.65, color: 'rgba(242,246,252,0.6)' }}>{cap.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ PROCESS — schematic flight path ═══════════════════════════ */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(10,15,26,0.45)', padding: 'clamp(4rem,8vw,6rem) 1.5rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ color: service.accent, fontFamily: 'monospace', letterSpacing: '0.3em', fontSize: '0.8rem', marginBottom: '0.75rem', textTransform: 'uppercase' }}
          >
            Flight Path
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-sevone)', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '3.5rem', letterSpacing: '-0.02em' }}
          >
            How It Runs
          </motion.h2>

          <div style={{ position: 'relative' }}>
            <div
              aria-hidden
              className="hidden md:block"
              style={{
                position: 'absolute',
                left: '50%',
                top: '0.7rem',
                bottom: '0.7rem',
                width: '1px',
                background: `linear-gradient(180deg, transparent, ${service.accent}55, ${service.accent}55, transparent)`,
              }}
            />
            {service.process.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6 }}
                  className="md:grid md:grid-cols-2"
                  style={{ position: 'relative', marginBottom: '2.5rem' }}
                >
                  <div
                    aria-hidden
                    className="hidden md:block"
                    style={{
                      position: 'absolute',
                      left: 'calc(50% - 5px)',
                      top: '0.35rem',
                      width: '10px',
                      height: '10px',
                      background: '#05070c',
                      border: `1.5px solid ${service.accent}`,
                      transform: 'rotate(45deg)',
                      zIndex: 2,
                    }}
                  />
                  <div
                    className={isLeft ? 'md:pr-12 md:text-right' : 'md:col-start-2 md:pl-12 md:text-left'}
                    style={{ gridColumn: isLeft ? '1' : '2' }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        marginBottom: '0.65rem',
                        fontFamily: 'monospace',
                        fontSize: '0.7rem',
                        letterSpacing: '0.2em',
                        color: service.accent,
                      }}
                    >
                      STAGE {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.6rem', color: '#F2F6FC' }}>{step.title}</h3>
                    <p style={{ fontSize: '0.92rem', lineHeight: 1.65, color: 'rgba(242,246,252,0.62)', maxWidth: '360px' }}>
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ MANIFEST — deliverables ═══════════════════════════ */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: 'clamp(4rem,8vw,6rem) 1.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ color: service.accent, fontFamily: 'monospace', letterSpacing: '0.3em', fontSize: '0.8rem', marginBottom: '0.75rem', textTransform: 'uppercase' }}
          >
            Manifest
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-sevone)', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '2.5rem', letterSpacing: '-0.02em' }}
          >
            What&apos;s Included
          </motion.h2>

          <div
            style={{
              border: `1px solid ${service.accent}30`,
              borderRadius: '18px',
              background: 'linear-gradient(165deg, rgba(13,19,33,0.7) 0%, rgba(5,7,13,0.85) 100%)',
              overflow: 'hidden',
            }}
          >
            {service.deliverables.map((d, i) => (
              <motion.div
                key={d}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.15rem 1.5rem',
                  borderBottom: i === service.deliverables.length - 1 ? 'none' : '1px dashed rgba(255,255,255,0.09)',
                }}
              >
                <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: `${service.accent}90`, letterSpacing: '0.05em', flexShrink: 0 }}>
                  M–{String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ flex: 1, fontSize: '0.94rem', color: 'rgba(242,246,252,0.85)' }}>{d}</span>
                <span
                  style={{
                    flexShrink: 0,
                    width: '20px',
                    height: '20px',
                    borderRadius: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: `${service.accent}1a`,
                    color: service.accent,
                    fontSize: '0.7rem',
                    fontWeight: 900,
                  }}
                >
                  ✓
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ VALUE — the why, as statements ═══════════════════════════ */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(10,15,26,0.45)', padding: 'clamp(4rem,8vw,6rem) 1.5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ color: service.accent, fontFamily: 'monospace', letterSpacing: '0.3em', fontSize: '0.8rem', marginBottom: '0.75rem', textTransform: 'uppercase' }}
          >
            Why It Matters
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'var(--font-sevone)', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '3rem', letterSpacing: '-0.02em' }}
          >
            What You Get
          </motion.h2>

          <div>
            {service.values.map((v, i) => (
              <motion.div
                key={v}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'flex-start',
                  padding: '1.75rem 0',
                  borderBottom: i === service.values.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <span
                  aria-hidden
                  style={{
                    fontFamily: 'var(--font-sevone)',
                    fontSize: '2.5rem',
                    lineHeight: 0.7,
                    color: service.accent,
                    flexShrink: 0,
                  }}
                >
                  &ldquo;
                </span>
                <p
                  style={{
                    fontSize: 'clamp(1.05rem, 2vw, 1.4rem)',
                    lineHeight: 1.5,
                    color: '#F2F6FC',
                    fontWeight: 500,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {v}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ CTA ═══════════════════════════ */}
      <section
        ref={ctaRef}
        onMouseMove={handleCtaMouseMove}
        onMouseLeave={() => setCtaMousePos({ x: -1000, y: -1000 })}
        style={{
          position: 'relative',
          minHeight: '70vh',
          background: '#05070c',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '2rem',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: ctaMousePos.x,
            top: ctaMousePos.y,
            transform: 'translate(-50%, -50%)',
            width: 'clamp(300px, 40vw, 600px)',
            height: 'clamp(300px, 40vw, 600px)',
            background: `radial-gradient(circle, ${service.accent}30 0%, transparent 70%)`,
            filter: 'blur(50px)',
            pointerEvents: 'none',
            transition: 'width 0.3s, height 0.3s, left 0.1s, top 0.1s',
          }}
        />
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          style={{
            position: 'relative',
            zIndex: 2,
            fontFamily: 'var(--font-sevone)',
            fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            textAlign: 'center',
            marginBottom: '1.5rem',
          }}
        >
          Ready to Start?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.1 }}
          style={{ position: 'relative', zIndex: 2, color: 'rgba(242,246,252,0.6)', maxWidth: '460px', textAlign: 'center', marginBottom: '2.5rem' }}
        >
          Let&apos;s talk about how {service.title.toLowerCase()} fits into your brand&apos;s next move.
        </motion.p>
        <motion.a
          href="/contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.2 }}
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.7rem',
            padding: '1rem 2.25rem',
            borderRadius: '999px',
            background: service.accent,
            color: '#05070c',
            textDecoration: 'none',
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          Get in Touch →
        </motion.a>
      </section>

      <Footer />
    </div>
  );
}

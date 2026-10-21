'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES, SERVICE_KEYFRAMES } from '../data/services';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}


/* ─── Bento layout ───────────────────────────────────────────────── */
/*
  Desktop (4 cols): row 1 = wide + 2 · row 2 = 1 + wide + 1 · row 3 = wide + Explore (wide).
  Tiles alternate light / ink / blue so the grid reads as one abstract composition.
*/
const WIDE = new Set([0, 4, 6]);
type Theme = { bg: string; border: string; fg: string; sub: string; chip: string; ring: string; dark: boolean };
const THEMES: Theme[] = [
  { bg: '#FFFFFF', border: 'rgba(10,10,10,0.08)', fg: '#0A0A0A', sub: 'rgba(10,10,10,0.6)', chip: 'rgba(74,158,255,0.12)', ring: 'rgba(74,158,255,0.16)', dark: false },
  { bg: 'linear-gradient(155deg,#0B1220 0%,#14264A 100%)', border: '#0B1220', fg: '#FFFFFF', sub: 'rgba(255,255,255,0.65)', chip: 'rgba(255,255,255,0.1)', ring: 'rgba(255,255,255,0.09)', dark: true },
  { bg: 'linear-gradient(155deg,#2A7DE1 0%,#4A9EFF 100%)', border: '#2A7DE1', fg: '#FFFFFF', sub: 'rgba(255,255,255,0.8)', chip: 'rgba(255,255,255,0.18)', ring: 'rgba(255,255,255,0.18)', dark: true },
  { bg: '#FFFFFF', border: 'rgba(10,10,10,0.08)', fg: '#0A0A0A', sub: 'rgba(10,10,10,0.6)', chip: 'rgba(74,158,255,0.12)', ring: 'rgba(74,158,255,0.16)', dark: false },
  { bg: 'linear-gradient(155deg,#0B1220 0%,#14264A 100%)', border: '#0B1220', fg: '#FFFFFF', sub: 'rgba(255,255,255,0.65)', chip: 'rgba(255,255,255,0.1)', ring: 'rgba(255,255,255,0.09)', dark: true },
  { bg: '#EAF2FF', border: 'rgba(74,158,255,0.25)', fg: '#0A0A0A', sub: 'rgba(10,10,10,0.6)', chip: 'rgba(42,125,225,0.14)', ring: 'rgba(42,125,225,0.14)', dark: false },
  { bg: 'linear-gradient(155deg,#2A7DE1 0%,#4A9EFF 100%)', border: '#2A7DE1', fg: '#FFFFFF', sub: 'rgba(255,255,255,0.8)', chip: 'rgba(255,255,255,0.18)', ring: 'rgba(255,255,255,0.18)', dark: true },
];

/* ─── Card component ─────────────────────────────────────────────── */
function ServiceCard({ service, index }: { service: typeof SERVICES[number]; index: number }) {
  const t = THEMES[index];
  const wide = WIDE.has(index);

  return (
    <Link
      href={`/services/${service.slug}`}
      className={`service-card group relative flex flex-col ${wide ? 'lg:flex-row lg:items-stretch md:col-span-2' : ''} rounded-3xl overflow-hidden cursor-pointer transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_30px_70px_-25px_rgba(20,60,140,0.45)]`}
      style={{ background: t.bg, border: `1px solid ${t.border}` }}
    >
      {/* abstract rings */}
      <div aria-hidden className="absolute -right-20 -top-20 w-64 h-64 rounded-full pointer-events-none" style={{ border: `1px solid ${t.ring}` }} />
      <div aria-hidden className="absolute -right-8 -top-8 w-40 h-40 rounded-full pointer-events-none" style={{ border: `1px solid ${t.ring}` }} />

      <div className={`relative z-10 p-5 flex flex-col ${wide ? 'lg:w-1/2' : 'flex-1'}`}>
        <div className="flex items-center justify-between mb-5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center [&_svg]:w-5 [&_svg]:h-5"
            style={{ background: t.chip, color: t.dark ? '#fff' : service.accent }}
          >
            {service.icon}
          </div>
          <span className="font-mono text-xs tracking-widest" style={{ color: t.sub }}>
            {service.number}
          </span>
        </div>

        <h3
          className="font-bold mb-2 leading-tight tracking-tight"
          style={{
            fontSize: wide ? 'clamp(1.2rem, 1.7vw, 1.55rem)' : 'clamp(1rem, 1.25vw, 1.2rem)',
            color: t.fg,
            fontFamily: 'var(--font-sevone)',
          }}
        >
          {service.cardHeading ?? service.title}
        </h3>

        <p className={`leading-relaxed text-[0.85rem] ${wide ? 'line-clamp-3' : 'line-clamp-2'}`} style={{ color: t.sub, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          {service.description}
        </p>

        <span
          className="mt-auto pt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-semibold transition-transform duration-300 group-hover:translate-x-1"
          style={{ color: t.dark ? '#fff' : service.accent }}
        >
          Explore <span aria-hidden>→</span>
        </span>
      </div>

      {/* Illustration inset */}
      <div className={`relative z-10 ${wide ? 'lg:w-1/2 p-3 lg:pl-0' : 'p-3 pt-0'}`}>
        <div
          className="rounded-2xl overflow-hidden relative"
          style={{
            background: 'linear-gradient(135deg,#F4F7FC 0%,#E8EEF8 100%)',
            height: wide ? '100%' : '6.75rem',
            minHeight: wide ? '9rem' : undefined,
          }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundImage: 'radial-gradient(rgba(43,58,103,0.16) 1px, transparent 1px)', backgroundSize: '12px 12px' }}
          />
          <div className="w-full h-full relative z-10 p-1.5">{service.illustration(service.accent, service.accent2)}</div>
        </div>
      </div>
    </Link>
  );
}

/* ─── Main section ───────────────────────────────────────────────── */
export default function ServicesSectionNew() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { y: 60, opacity: 0, filter: 'blur(12px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: titleRef.current, start: 'top 85%' } }
        );
      }
      const cards = gridRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: 55, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 82%' } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden"
      style={{ background: '#FAFAF7', padding: 'clamp(1rem, 8vh, 5rem) 0 clamp(3.5rem, 8vh, 6rem)', position: 'relative', zIndex: 30 }}
    >
      <style>{SERVICE_KEYFRAMES}</style>

      {/* Background blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div style={{
          position: 'absolute', top: '-15%', left: '-10%', width: '55vw', height: '55vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(30,80,220,0.09) 0%, transparent 70%)', filter: 'blur(80px)',
        }}/>
        <div style={{
          position: 'absolute', bottom: '-10%', right: '-10%', width: '50vw', height: '50vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(74,158,255,0.06) 0%, transparent 70%)', filter: 'blur(90px)',
        }}/>
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Header - centered */}
        <div className="mb-8 md:mb-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="uppercase tracking-[0.4em] mb-3"
            style={{ color: '#4A9EFF', fontFamily: 'monospace', fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
          >
            What We Do
          </motion.p>
          <motion.h2
            ref={titleRef}
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, ease: [0.25, 1, 0.3, 1], delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-sevone)',
              fontSize: 'clamp(2.4rem, 5.2vw, 4.6rem)',
              color: '#0A0A0A',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
            }}
          >
            Services Built for<br />Brands That Mean Business
          </motion.h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:grid-flow-dense gap-4"
        >
          {SERVICES.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: i * 0.09,
                ease: [0.25, 1, 0.36, 1],
              }}
              style={{ display: 'contents' }}
            >
              <ServiceCard key={i} service={service} index={i} />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: 7 * 0.09, ease: [0.25, 1, 0.36, 1] }}
            style={{ display: 'contents' }}
          >
            <Link
              href="/services"
              className="group relative flex flex-col justify-between rounded-3xl overflow-hidden cursor-pointer md:col-span-2 p-6 transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1"
              style={{ minHeight: '12rem', background: 'rgba(74,158,255,0.06)', border: '1.5px dashed rgba(74,158,255,0.5)' }}
            >
              <div aria-hidden className="absolute -right-16 -bottom-16 w-56 h-56 rounded-full pointer-events-none" style={{ border: '1px solid rgba(74,158,255,0.25)' }} />
              <div aria-hidden className="absolute -right-4 -bottom-4 w-32 h-32 rounded-full pointer-events-none" style={{ border: '1px solid rgba(74,158,255,0.25)' }} />
              <span className="font-mono text-xs tracking-widest" style={{ color: 'rgba(10,10,10,0.5)' }}>08</span>
              <span
                className="relative"
                style={{
                  fontFamily: 'var(--font-sevone)',
                  fontSize: 'clamp(2rem, 3.6vw, 3.2rem)',
                  fontWeight: 900,
                  color: '#0A0A0A',
                  letterSpacing: '-0.02em',
                  lineHeight: 0.95,
                }}
              >
                Explore<br />
                <span style={{ color: '#4A9EFF' }}>our services</span>
              </span>
              <span
                className="relative inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-semibold transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: 'rgba(10,10,10,0.6)' }}
              >
                All Services <span aria-hidden>→</span>
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

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


/*
  Grid positions (3 cols, 4 rows) for all 7 services + 1 "Explore" banner:
  Row 1: [0] [1] [2]                     → three equal
  Row 2: [3 tall, col 1, rows 2-3] [4 wide, col 2-3] → tall + wide
  Row 3: [3 continues]             [5] [6]           → wide's row splits into two below it
  Row 4: [Explore banner, full width]
*/
const GRID_POSITIONS = [
  'md:col-start-1 md:col-span-1 md:row-start-1 md:row-span-1',
  'md:col-start-2 md:col-span-1 md:row-start-1 md:row-span-1',
  'md:col-start-3 md:col-span-1 md:row-start-1 md:row-span-1',
  'md:col-start-1 md:col-span-1 md:row-start-2 md:row-span-2', // tall
  'md:col-start-2 md:col-span-2 md:row-start-2 md:row-span-1', // wide
  'md:col-start-2 md:col-span-1 md:row-start-3 md:row-span-1',
  'md:col-start-3 md:col-span-1 md:row-start-3 md:row-span-1',
];
const EXPLORE_TILE_POSITION = 'md:col-start-1 md:col-span-3 md:row-start-4 md:row-span-1';

/* ─── Card component ─────────────────────────────────────────────── */
function ServiceCard({ service, index }: { service: typeof SERVICES[number]; index: number }) {
  const isWide = index === 4;
  const isTall = index === 3;

  return (
    <Link
      href={`/services/${service.slug}`}
      className={`service-card group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer ${GRID_POSITIONS[index]}`}
      style={{
        background: 'rgba(6, 11, 28, 0.9)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(12px)',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.borderColor = `${service.accent}50`;
        el.style.boxShadow = `0 0 50px ${service.accent}15, 0 25px 70px rgba(0,0,0,0.5)`;
        el.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.borderColor = 'rgba(255,255,255,0.07)';
        el.style.boxShadow = 'none';
        el.style.transform = 'translateY(0)';
      }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${service.accent}60, transparent)` }}
      />

      <div className="p-7 flex flex-col flex-1">
        {/* Icon chip */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mb-6 flex-shrink-0"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${service.accent}15, transparent)`,
            border: `1px solid ${service.accent}30`,
            color: service.accent,
            boxShadow: `0 4px 20px ${service.accent}10`,
          }}
        >
          {service.icon}
        </div>

        {/* Title */}
        <h3
          className="font-bold mb-3 leading-tight tracking-tight"
          style={{
            fontSize: 'clamp(1.05rem, 1.8vw, 1.45rem)',
            color: '#F2F6FC',
            fontFamily: 'var(--font-sevone)',
          }}
        >
          {service.cardHeading ?? service.title}
        </h3>

        {/* Description */}
        <p
          className="leading-relaxed mb-8"
          style={{ 
            color: 'rgba(242,246,252,0.6)', 
            fontSize: '0.95rem', 
            maxWidth: '95%',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
        >
          {service.description}
        </p>

        {/* Illustration */}
        <div
          className="mt-auto rounded-xl overflow-hidden relative flex-shrink-0"
          style={{
            background: 'rgba(4,8,22,0.8)',
            border: `1px solid ${service.accent}18`,
            height: isTall ? '16rem' : isWide ? '10rem' : '9rem',
          }}
        >
          <div className="absolute inset-0"
            style={{ background: `radial-gradient(ellipse at 50% 110%, ${service.accent}10, transparent 70%)` }}
          />
          <div className="w-full h-full relative z-10 p-2">
            {service.illustration(service.accent, service.accent2)}
          </div>
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
      style={{ background: '#000000', padding: 'clamp(1rem, 12vh, 9rem) 0 clamp(6rem, 14vh, 10rem)', position: 'relative', zIndex: 30 }}
    >
      <style>{SERVICE_KEYFRAMES}</style>

      {/* Background blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div style={{
          position: 'absolute', top: '-15%', left: '-10%', width: '55vw', height: '55vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(30,80,220,0.18) 0%, transparent 70%)', filter: 'blur(80px)',
        }}/>
        <div style={{
          position: 'absolute', bottom: '-10%', right: '-10%', width: '50vw', height: '50vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(74,158,255,0.12) 0%, transparent 70%)', filter: 'blur(90px)',
        }}/>
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Header - centered */}
        <div className="mb-14 md:mb-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="uppercase tracking-[0.4em] mb-5"
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
              fontSize: 'clamp(2.8rem, 7vw, 6rem)',
              color: '#F2F6FC',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
            }}
          >
            Services Built for<br />Brands That<br />Mean Business
          </motion.h2>
        </div>

        <div
          ref={gridRef}
          className="flex flex-col md:grid md:grid-cols-3 md:grid-rows-[auto_auto_auto_auto] gap-6 md:gap-5"
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
              className={`group relative flex flex-col items-center justify-center rounded-2xl overflow-hidden cursor-pointer ${EXPLORE_TILE_POSITION}`}
              style={{
                minHeight: '9rem',
                background: 'rgba(74,158,255,0.06)',
                border: '1px solid rgba(74,158,255,0.3)',
                transition: 'border-color 0.4s ease, box-shadow 0.4s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.borderColor = '#4A9EFF80';
                el.style.boxShadow = '0 0 50px rgba(74,158,255,0.15), 0 25px 70px rgba(0,0,0,0.5)';
                el.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.borderColor = 'rgba(74,158,255,0.3)';
                el.style.boxShadow = 'none';
                el.style.transform = 'translateY(0)';
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sevone)',
                  fontSize: 'clamp(1.4rem, 2.4vw, 1.8rem)',
                  fontWeight: 900,
                  color: '#F2F6FC',
                  letterSpacing: '-0.01em',
                }}
              >
                Explore{' '}
                <span style={{ color: '#4A9EFF' }}>our services</span>
              </span>
              <span
                className="transition-transform duration-300 group-hover:translate-x-1"
                style={{
                  marginTop: '0.5rem',
                  fontSize: '0.75rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(242,246,252,0.55)',
                }}
              >
                All Services →
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

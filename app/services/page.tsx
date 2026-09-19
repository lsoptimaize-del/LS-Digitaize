'use client';

import { useRef, useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from 'framer-motion';
import ServicesHero from '../components/ServicesHero';
import ServicesBento from '../components/ServicesBento';


export default function ServicesPage() {
  const ctaRef = useRef<HTMLElement>(null);
  const [ctaMousePos, setCtaMousePos] = useState({ x: -1000, y: -1000 });

  const handleCtaMouseMove = (e: React.MouseEvent) => {
    if (!ctaRef.current) return;
    const rect = ctaRef.current.getBoundingClientRect();
    setCtaMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div style={{ minHeight: '100dvh', background: '#FAFAF7', color: '#0A0A0A' }}>
      <Navbar />

      <ServicesHero />

      <div className="py-6 text-center" style={{ background: '#FAFAF7', borderTop: '1px solid rgba(74,158,255,0.15)' }}>
        <p style={{ fontFamily: 'var(--font-geist-mono), ui-monospace, monospace', fontSize: '0.8rem', letterSpacing: '0.08em', color: 'rgba(10,10,10,0.55)' }}>
          Proudly Serving Brands Across Industries
        </p>
      </div>

      <ServicesBento />

      {/* ── Key Metrics Ribbon ── */}
      <section
        style={{
          borderTop: '1px solid rgba(74,158,255,0.15)',
          borderBottom: '1px solid rgba(74,158,255,0.15)',
          background: 'rgba(250, 250, 247, 0.6)',
          backdropFilter: 'blur(16px)',
          position: 'relative',
          zIndex: 5,
        }}
      >
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
          style={{
            maxWidth: '1300px',
            margin: '0 auto',
            padding: '2rem 1.5rem',
            textAlign: 'center',
          }}
        >
          {[
            { value: '07', label: 'Dedicated Disciplines' },
            { value: '100%', label: 'In-House Execution' },
            { value: 'A–Z', label: 'End-to-End Handled' },
            { value: '24/7', label: 'Brand & Market Pulse' },
          ].map((stat, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <span
                className="text-2xl md:text-3xl"
                style={{
                  fontFamily: 'var(--font-sevone)',
                  fontWeight: 900,
                  color: '#4A9EFF',
                }}
              >
                {stat.value}
              </span>
              <span
                className="text-[0.7rem] md:text-xs"
                style={{
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(10,10,10,0.65)',
                  marginTop: '0.3rem'
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Immersive CTA ── */}
      <section
        ref={ctaRef}
        onMouseMove={handleCtaMouseMove}
        onMouseLeave={() => setCtaMousePos({ x: -1000, y: -1000 })}
        style={{
          position: 'relative',
          zIndex: 30,
          minHeight: '100dvh',
          background: '#FAFAF7',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '2rem',
        }}
      >
        {/* Interactive Glow Spotlight */}
        <div
          style={{
            position: 'absolute',
            left: ctaMousePos.x,
            top: ctaMousePos.y,
            transform: 'translate(-50%, -50%)',
            width: 'clamp(300px, 40vw, 600px)',
            height: 'clamp(300px, 40vw, 600px)',
            background: 'radial-gradient(circle, rgba(74,158,255,0.15) 0%, transparent 70%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
            transition: 'width 0.3s, height 0.3s, left 0.1s, top 0.1s',
          }}
        />

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: [0.25, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            zIndex: 2,
            fontFamily: 'Helvetica Neue, Arial, sans-serif',
            fontSize: 'clamp(3.5rem, 8vw, 10rem)',
            fontWeight: 900,
            color: '#0A0A0A',
            lineHeight: 0.85,
            letterSpacing: '-0.03em',
            textAlign: 'center',
            textTransform: 'uppercase',
            marginBottom: '2rem',
          }}
        >
          FIND YOUR<br />PERFECT FIT.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          style={{
            position: 'relative',
            zIndex: 2,
            fontSize: 'clamp(1rem, 1.5vw, 1.3rem)',
            color: 'rgba(10,10,10,0.6)',
            marginBottom: '5rem',
            maxWidth: '550px',
            textAlign: 'center',
            lineHeight: 1.6,
          }}
        >
          Not sure which service is right for you? Let&apos;s talk it through together and build something extraordinary.
        </motion.p>

        <motion.a
          href="/contact"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 'clamp(140px, 15vw, 180px)',
            height: 'clamp(140px, 15vw, 180px)',
            borderRadius: '50%',
            background: 'transparent',
            border: '1px solid rgba(10,10,10,0.25)',
            color: '#0A0A0A',
            textDecoration: 'none',
            fontSize: 'clamp(0.7rem, 0.8vw, 0.85rem)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 700,
            transition: 'all 0.5s cubic-bezier(0.25, 1, 0.2, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#4A9EFF';
            e.currentTarget.style.color = '#FFFFFF';
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.border = '1px solid #4A9EFF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#0A0A0A';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.border = '1px solid rgba(10,10,10,0.25)';
          }}
        >
          Get in Touch
        </motion.a>
      </section>

      <div style={{ position: 'relative', zIndex: 30 }}>
        <Footer />
      </div>
    </div>
  );
}

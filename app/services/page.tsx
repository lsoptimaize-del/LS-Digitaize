'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from 'framer-motion';

const SERVICES = [
  {
    number: '01',
    category: 'Identity',
    title: 'A-Z Branding & Identity',
    description: 'From logo to language — we create visual systems that make your brand feel inevitable in any room.',
    whatItIs: 'A complete visual and verbal identity system: logo, guidelines, tone of voice, and every asset that carries your name.',
    values: [
      'Consistent recognition across every touchpoint',
      'Faster onboarding for new hires, vendors, and partners',
      'Premium positioning that justifies premium pricing',
    ],
    image: '/bg_service_1.png',
  },
  {
    number: '02',
    category: 'Content',
    title: 'Content Strategy & Creation',
    description: 'Strategy, templates, scripts, visuals — built as a system that turns ideas into a steady stream of impact.',
    whatItIs: 'An end-to-end content engine: strategy, scripts, templates, and production, so output never depends on one person\'s bandwidth.',
    values: [
      'Steady publishing cadence without burnout',
      'Content that compounds into an owned audience',
      'One clear narrative across every channel',
    ],
    image: '/bg_service_2.png',
  },
  {
    number: '03',
    category: 'Performance',
    title: 'Performance Marketing',
    description: 'Data-led paid campaigns that convert. We test relentlessly and optimise until the numbers sing.',
    whatItIs: 'Data-led paid acquisition across search, social, and programmatic — built around your unit economics, not vanity metrics.',
    values: [
      'Lower cost-per-acquisition over time',
      'Budget reallocated toward what\'s proven to work',
      'Forecastable, repeatable pipeline growth',
    ],
    image: '/bg_service_3.png',
  },
  {
    number: '04',
    category: 'Social',
    title: 'Social Media Management',
    description: 'Your brand, alive online — every day. Strategy, content, community, all handled.',
    whatItIs: 'Always-on social presence: content calendars, community moderation, and real-time response, fully managed.',
    values: [
      'Always-on brand presence across platforms',
      'Faster response to trends and culture moments',
      'A community that converts into advocates',
    ],
    image: '/bg_service_4.png',
  },
  {
    number: '05',
    category: 'Events',
    title: 'Event Curation & Management',
    description: 'Concept to execution — brand activations and launches that create moments people talk about.',
    whatItIs: 'Concept-to-execution activations, launches, and experiential events, handled from venue to run-of-show.',
    values: [
      'Memorable, shareable brand moments',
      'Press and influencer amplification built in',
      'Direct relationship-building with key audiences',
    ],
    image: '/bg_service_5.png',
  },
  {
    number: '06',
    category: 'Growth',
    title: 'Business Development',
    description: 'Market research, partnerships, and growth roadmaps. We help ambitious brands open new doors — sustainably.',
    whatItIs: 'Market research, partnership sourcing, and growth roadmaps that turn ambition into a sequenced plan.',
    values: [
      'New revenue channels identified and opened',
      'Market expansion validated before you spend',
      'Strategic partnerships that compound growth',
    ],
    image: '/bg_service_6.png',
  },
];

function ServiceCard({ service, index }: { service: typeof SERVICES[number]; index: number }) {
  return (
    <div
      className="stack-wrapper"
      style={{
        position: 'sticky',
        top: 'var(--stack-top)',
        ['--stack-top' as string]: `${5 + index * 1.5}rem`,
        zIndex: index + 1,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.3, 1] }}
        className="group service-card"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 0.85fr) 1fr',
          gap: 'clamp(2rem, 4vw, 3.5rem)',
          alignItems: 'center',
          background: 'linear-gradient(160deg, #0a0f1a 0%, #05070c 100%)',
          border: '1px solid rgba(74,158,255,0.18)',
          borderRadius: '28px',
          padding: 'clamp(1.75rem, 3.5vw, 3rem)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
        }}
      >
        {/* Image */}
        <div
          className="service-card-image"
          style={{
            position: 'relative',
            aspectRatio: '4/3',
            borderRadius: '18px',
            overflow: 'hidden',
            border: '1px solid rgba(74,158,255,0.15)',
          }}
        >
          <img
            src={service.image}
            alt={service.title}
            className="transition-transform duration-[1200ms] ease-out group-hover:scale-110"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.85)' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.55) 100%)',
              pointerEvents: 'none',
            }}
          />
          <span
            style={{
              position: 'absolute',
              top: '1.25rem',
              left: '1.5rem',
              fontFamily: 'var(--font-sevone)',
              fontSize: '0.85rem',
              fontWeight: 900,
              letterSpacing: '0.15em',
              color: '#F2F6FC',
            }}
          >
            {service.number}
          </span>
        </div>

        {/* Text */}
        <div>
          <p
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              fontSize: '0.7rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#4A9EFF',
              marginBottom: '1.1rem',
            }}
          >
            {service.category}
          </p>

          <h3
            style={{
              fontFamily: 'var(--font-sevone)',
              fontSize: 'clamp(1.7rem, 2.8vw, 2.6rem)',
              fontWeight: 900,
              color: '#F2F6FC',
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
              marginBottom: '0.9rem',
            }}
          >
            {service.title}
          </h3>

          <p
            style={{
              fontSize: '0.95rem',
              lineHeight: 1.7,
              color: 'rgba(242,246,252,0.6)',
              maxWidth: '480px',
              marginBottom: '1.25rem',
            }}
          >
            {service.whatItIs}
          </p>

          <ul style={{ listStyle: 'none', margin: '0 0 1.5rem', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {service.values.map((v) => (
              <li
                key={v}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.6rem',
                  fontSize: '0.88rem',
                  lineHeight: 1.5,
                  color: 'rgba(242,246,252,0.82)',
                }}
              >
                <span style={{ color: '#4A9EFF', marginTop: '0.15rem' }}>✓</span>
                {v}
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            className="transition-opacity duration-300"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontSize: '0.7rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#F2F6FC',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(242,246,252,0.3)',
              paddingBottom: '0.3rem',
            }}
          >
            Start This Service <span>→</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

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
    <div style={{ minHeight: '100vh', background: '#000' }}>
      <Navbar />

      {/* ── Intro ── */}
      <section
        style={{
          position: 'relative',
          minHeight: '65vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 'clamp(9rem, 20vh, 12rem) 2rem 3rem',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60vw',
            height: '40vw',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(74,158,255,0.12) 0%, transparent 70%)',
            filter: 'blur(70px)',
            pointerEvents: 'none',
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            position: 'relative',
            fontSize: '0.7rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#4A9EFF',
            marginBottom: '1.25rem',
          }}
        >
          What We Do
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.1, ease: [0.25, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            fontFamily: 'var(--font-sevone)',
            fontSize: 'clamp(3.5rem, 10vw, 9rem)',
            fontWeight: 900,
            color: '#F2F6FC',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          Services
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          style={{
            position: 'relative',
            marginTop: '1.75rem',
            maxWidth: '540px',
            fontSize: '1rem',
            lineHeight: 1.7,
            color: 'rgba(242,246,252,0.6)',
          }}
        >
          Six disciplines, one team. Everything a brand needs to go from idea to impact, handled A-to-Z.
        </motion.p>
      </section>

      {/* ── Stacking Services Cards ── */}
      <section style={{ background: '#000', padding: '0 0 6rem' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 2rem' }}>
          {SERVICES.map((service, i) => (
            <div key={service.number} className="stack-spacer" style={{ height: '85vh' }}>
              <ServiceCard service={service} index={i} />
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .stack-spacer {
            height: 100vh !important;
          }
          .stack-wrapper {
            --stack-top: 3rem !important;
          }
          .service-card {
            grid-template-columns: 1fr !important;
            padding: 1.25rem !important;
            border-radius: 18px !important;
            gap: 0.9rem !important;
          }
          .service-card-image {
            aspect-ratio: 16/8 !important;
          }
          .service-card h3 {
            font-size: 1.4rem !important;
            margin-bottom: 0.5rem !important;
          }
          .service-card p {
            font-size: 0.82rem !important;
            line-height: 1.5 !important;
            margin-bottom: 0.85rem !important;
          }
          .service-card ul {
            gap: 0.4rem !important;
            margin-bottom: 1rem !important;
          }
          .service-card li {
            font-size: 0.78rem !important;
            line-height: 1.4 !important;
          }
        }
      `}</style>

      {/* ── Immersive CTA ── */}
      <section
        ref={ctaRef}
        onMouseMove={handleCtaMouseMove}
        onMouseLeave={() => setCtaMousePos({ x: -1000, y: -1000 })}
        style={{
          position: 'relative',
          zIndex: 30,
          minHeight: '100vh',
          background: '#05070c',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '2rem',
        }}
      >
        {/* Interactive Glow Spotlight */}
        <div style={{
          position: 'absolute',
          left: ctaMousePos.x,
          top: ctaMousePos.y,
          transform: 'translate(-50%, -50%)',
          width: 'clamp(300px, 40vw, 600px)',
          height: 'clamp(300px, 40vw, 600px)',
          background: 'radial-gradient(circle, rgba(74,158,255,0.3) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          transition: 'width 0.3s, height 0.3s, left 0.1s, top 0.1s',
        }} />

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
          color: '#F2F6FC',
          lineHeight: 0.85,
          letterSpacing: '-0.03em',
          textAlign: 'center',
          textTransform: 'uppercase',
          marginBottom: '2rem',
        }}>
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
          color: 'rgba(242,246,252,0.6)',
          marginBottom: '5rem',
          maxWidth: '550px',
          textAlign: 'center',
          lineHeight: 1.6,
        }}>
          Not sure which service is right for you? Let's talk it through together and build something extraordinary.
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
            border: '1px solid rgba(242,246,252,0.25)',
            color: '#F2F6FC',
            textDecoration: 'none',
            fontSize: 'clamp(0.7rem, 0.8vw, 0.85rem)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 700,
            transition: 'all 0.5s cubic-bezier(0.25, 1, 0.2, 1)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#4A9EFF';
            e.currentTarget.style.color = '#05070c';
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.border = '1px solid #4A9EFF';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#F2F6FC';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.border = '1px solid rgba(242,246,252,0.25)';
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

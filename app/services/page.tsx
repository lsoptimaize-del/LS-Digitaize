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
    tagline: 'Brand Architecture & Visual Systems',
    description: 'From logo to language - we create visual systems that make your brand feel inevitable in any room.',
    whatItIs: 'A complete visual and verbal identity system: logo, guidelines, tone of voice, and every asset that carries your name.',
    values: [
      'Consistent recognition across every touchpoint',
      'Faster onboarding for new hires, vendors, and partners',
      'Premium positioning that justifies premium pricing',
    ],
    image: '/bg_service_1.png',
    accent: '#4A9EFF',
    accent2: '#5BC9E8',
    metric: '100% Brand Consistency',
  },
  {
    number: '02',
    category: 'Content',
    title: 'Content Strategy & Creation',
    tagline: 'Editorial Engine & Production',
    description: 'Strategy, templates, scripts, visuals - built as a system that turns ideas into a steady stream of impact.',
    whatItIs: 'An end-to-end content engine: strategy, scripts, templates, and production, so output never depends on one person\'s bandwidth.',
    values: [
      'Steady publishing cadence without burnout',
      'Content that compounds into an owned audience',
      'One clear narrative across every channel',
    ],
    image: '/bg_service_2.png',
    accent: '#5BC9E8',
    accent2: '#4A9EFF',
    metric: 'Always-On Output Engine',
  },
  {
    number: '03',
    category: 'Performance',
    title: 'Performance Marketing',
    tagline: 'Data-Led Paid Acquisition',
    description: 'Data-led paid campaigns that convert. We test relentlessly and optimise until the numbers sing.',
    whatItIs: 'Data-led paid acquisition across search, social, and programmatic - built around your unit economics, not vanity metrics.',
    values: [
      'Lower cost-per-acquisition over time',
      'Budget reallocated toward what\'s proven to work',
      'Forecastable, repeatable pipeline growth',
    ],
    image: '/bg_service_3.png',
    accent: '#4A9EFF',
    accent2: '#63B3ED',
    metric: 'Proven Unit Economics',
  },
  {
    number: '04',
    category: 'Social',
    title: 'Social Media Management',
    tagline: 'Community & Cultural Pulse',
    description: 'Your brand, alive online - every day. Strategy, content, community, all handled.',
    whatItIs: 'Always-on social presence: content calendars, community moderation, and real-time response, fully managed.',
    values: [
      'Always-on brand presence across platforms',
      'Faster response to trends and culture moments',
      'A community that converts into advocates',
    ],
    image: '/bg_service_4.png',
    accent: '#5BC9E8',
    accent2: '#4A9EFF',
    metric: 'Real-Time Engagement',
  },
  {
    number: '05',
    category: 'Events',
    title: 'Event Curation & Management',
    tagline: 'Experiential Brand Activations',
    description: 'Concept to execution - brand activations and launches that create moments people talk about.',
    whatItIs: 'Concept-to-execution activations, launches, and experiential events, handled from venue to run-of-show.',
    values: [
      'Memorable, shareable brand moments',
      'Press and influencer amplification built in',
      'Direct relationship-building with key audiences',
    ],
    image: '/bg_service_5.png',
    accent: '#4A9EFF',
    accent2: '#90CDF4',
    metric: 'High-Impact Moments',
  },
  {
    number: '06',
    category: 'Growth',
    title: 'Business Development',
    tagline: 'Partnerships & Market Expansion',
    description: 'Market research, partnerships, and growth roadmaps. We help ambitious brands open new doors - sustainably.',
    whatItIs: 'Market research, partnership sourcing, and growth roadmaps that turn ambition into a sequenced plan.',
    values: [
      'New revenue channels identified and opened',
      'Market expansion validated before you spend',
      'Strategic partnerships that compound growth',
    ],
    image: '/bg_service_6.png',
    accent: '#5BC9E8',
    accent2: '#4A9EFF',
    metric: 'Sequenced Pipeline Growth',
  },
];

/* ── Custom Animated SVG Overlay per Discipline ── */
function ServiceSvgGraphic({ number }: { number: string }) {
  switch (number) {
    case '01': // Identity
      return (
        <svg viewBox="0 0 280 140" fill="none" className="w-full h-full">
          <defs>
            <linearGradient id="grad01" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4A9EFF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#5BC9E8" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <rect x="18" y="18" width="244" height="104" rx="12" stroke="#4A9EFF" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="140" cy="70" r="38" stroke="url(#grad01)" strokeWidth="2" className="animate-spin-slow" />
          <circle cx="140" cy="70" r="22" fill="rgba(74,158,255,0.15)" stroke="#4A9EFF" strokeWidth="1.5" />
          <path d="M140 46V30M140 110V94M116 70H100M180 70H164" stroke="#4A9EFF" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="140" cy="30" r="3" fill="#5BC9E8" />
          <circle cx="180" cy="70" r="3" fill="#4A9EFF" />
          <line x1="25" y1="25" x2="45" y2="25" stroke="#4A9EFF" strokeWidth="2" />
          <line x1="25" y1="25" x2="25" y2="45" stroke="#4A9EFF" strokeWidth="2" />
          <line x1="255" y1="115" x2="235" y2="115" stroke="#4A9EFF" strokeWidth="2" />
          <line x1="255" y1="115" x2="255" y2="95" stroke="#4A9EFF" strokeWidth="2" />
        </svg>
      );
    case '02': // Content
      return (
        <svg viewBox="0 0 280 140" fill="none" className="w-full h-full">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
            const h = Math.round(20 + Math.sin(i * 0.8) * 35);
            return (
              <rect
                key={i}
                x={45 + i * 16}
                y={Math.round(70 - h / 2)}
                width="8"
                height={h}
                rx="4"
                fill="#4A9EFF"
                fillOpacity={0.3 + (i % 3) * 0.25}
              />
            );
          })}
          <path d="M35 70L245 70" stroke="#5BC9E8" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="215" cy="70" r="5" fill="#4A9EFF" />
          <circle cx="215" cy="70" r="10" stroke="#4A9EFF" strokeOpacity="0.4" />
        </svg>
      );
    case '03': // Performance
      return (
        <svg viewBox="0 0 280 140" fill="none" className="w-full h-full">
          <path d="M35 110L85 85L135 95L185 55L245 30" stroke="#4A9EFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M35 110L85 85L135 95L185 55L245 30V115H35Z" fill="rgba(74,158,255,0.12)" />
          {[
            [35, 110],
            [85, 85],
            [135, 95],
            [185, 55],
            [245, 30],
          ].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="4" fill="#05070C" stroke="#5BC9E8" strokeWidth="2" />
              {i === 4 && <circle cx={x} cy={y} r="9" stroke="#4A9EFF" strokeOpacity="0.6" />}
            </g>
          ))}
          <line x1="35" y1="115" x2="245" y2="115" stroke="rgba(242,246,252,0.2)" strokeWidth="1" />
        </svg>
      );
    case '04': // Social
      return (
        <svg viewBox="0 0 280 140" fill="none" className="w-full h-full">
          <circle cx="140" cy="70" r="14" fill="rgba(74,158,255,0.2)" stroke="#4A9EFF" strokeWidth="2" />
          <circle cx="140" cy="70" r="40" stroke="#4A9EFF" strokeOpacity="0.25" strokeDasharray="4 4" />
          {[
            [85, 45],
            [195, 45],
            [75, 95],
            [205, 95],
            [140, 20],
          ].map(([x, y], i) => (
            <g key={i}>
              <line x1="140" y1="70" x2={x} y2={y} stroke="#4A9EFF" strokeOpacity="0.35" strokeWidth="1.5" />
              <circle cx={x} cy={y} r="6" fill="#05070C" stroke="#5BC9E8" strokeWidth="2" />
            </g>
          ))}
        </svg>
      );
    case '05': // Events
      return (
        <svg viewBox="0 0 280 140" fill="none" className="w-full h-full">
          <polygon points="140,25 65,115 215,115" fill="rgba(74,158,255,0.08)" stroke="#4A9EFF" strokeOpacity="0.4" strokeWidth="1.5" />
          <line x1="140" y1="25" x2="140" y2="115" stroke="#5BC9E8" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="140" cy="25" r="5" fill="#4A9EFF" />
          <circle cx="65" cy="115" r="4" fill="#5BC9E8" />
          <circle cx="215" cy="115" r="4" fill="#5BC9E8" />
          <ellipse cx="140" cy="115" rx="75" ry="12" stroke="#4A9EFF" strokeOpacity="0.25" />
        </svg>
      );
    default: // Growth
      return (
        <svg viewBox="0 0 280 140" fill="none" className="w-full h-full">
          <rect x="40" y="35" width="55" height="70" rx="8" stroke="#4A9EFF" strokeOpacity="0.4" strokeWidth="1.5" />
          <rect x="115" y="25" width="55" height="90" rx="8" stroke="#5BC9E8" strokeOpacity="0.6" strokeWidth="1.5" fill="rgba(74,158,255,0.1)" />
          <rect x="190" y="15" width="50" height="110" rx="8" stroke="#4A9EFF" strokeWidth="2" fill="rgba(74,158,255,0.18)" />
          <path d="M68 65L142 45L215 25" stroke="#F2F6FC" strokeWidth="2" strokeLinecap="round" />
          <circle cx="215" cy="25" r="4" fill="#4A9EFF" />
        </svg>
      );
  }
}

function ServiceCard({ service, index, total }: { service: typeof SERVICES[number]; index: number; total: number }) {
  const isLast = index === total - 1;

  return (
    <div
      id={`service-${service.number}`}
      className="service-card-wrapper"
      style={{
        position: 'sticky',
        top: `calc(5.5rem + ${index * 1.6}rem)`,
        zIndex: index + 10,
        marginBottom: '34vh',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.75, ease: [0.25, 1, 0.3, 1] }}
        className="service-card-card group"
        style={{
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(165deg, rgba(13, 19, 33, 0.96) 0%, rgba(5, 7, 13, 0.98) 100%)',
          border: '1px solid rgba(74,158,255,0.24)',
          borderRadius: '26px',
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.85), 0 0 40px rgba(74,158,255,0.06)',
          overflow: 'hidden',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Top Tab Bar (Remains visible as cards stack on each other) */}
        <div
          className="service-card-top-bar"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.85rem 1.75rem',
            background: 'rgba(255,255,255,0.02)',
            borderBottom: '1px solid rgba(74,158,255,0.12)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.2rem 0.65rem',
                borderRadius: '6px',
                background: 'rgba(74,158,255,0.14)',
                border: '1px solid rgba(74,158,255,0.35)',
                fontFamily: 'var(--font-sevone)',
                fontSize: '0.75rem',
                fontWeight: 900,
                color: '#4A9EFF',
                letterSpacing: '0.1em',
              }}
            >
              {service.number}
            </span>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: '#F2F6FC',
              }}
            >
              {service.category}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#4A9EFF',
                boxShadow: '0 0 10px #4A9EFF',
              }}
            />
            <span
              style={{
                fontSize: '0.7rem',
                color: 'rgba(242,246,252,0.55)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              {service.metric}
            </span>
          </div>
        </div>

        {/* Main Card Content Layout */}
        <div
          className="service-card-body"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 0.95fr) 1.15fr',
            gap: 'clamp(2rem, 3.5vw, 3.5rem)',
            padding: 'clamp(1.75rem, 3vw, 3rem)',
            alignItems: 'center',
          }}
        >
          {/* Visual Column: Image + Animated Interactive SVG Overlay */}
          <div
            className="service-image-box"
            style={{
              position: 'relative',
              aspectRatio: '16/11',
              borderRadius: '18px',
              overflow: 'hidden',
              border: '1px solid rgba(74,158,255,0.18)',
              background: '#04070D',
            }}
          >
            <img
              src={service.image}
              alt={service.title}
              className="transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                filter: 'brightness(0.72) contrast(1.08)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(5,7,12,0.2) 0%, rgba(5,7,12,0.85) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Floating Animated SVG Schematic Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: '1rem',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.88,
              }}
            >
              <ServiceSvgGraphic number={service.number} />
            </div>

            {/* Corner Decorative Tech Markers */}
            <div
              style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                right: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pointerEvents: 'none',
              }}
            >
              <span
                style={{
                  fontSize: '0.68rem',
                  fontFamily: 'monospace',
                  color: 'rgba(74,158,255,0.75)',
                  letterSpacing: '0.15em',
                }}
              >
                SYS // {service.number}
              </span>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontFamily: 'monospace',
                  color: 'rgba(242,246,252,0.5)',
                  textTransform: 'uppercase',
                }}
              >
                {service.tagline}
              </span>
            </div>
          </div>

          {/* Details & Checkmarks Column */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-sevone)',
                fontSize: 'clamp(1.75rem, 2.7vw, 2.5rem)',
                fontWeight: 900,
                color: '#F2F6FC',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                marginBottom: '0.85rem',
              }}
            >
              {service.title}
            </h3>

            <p
              style={{
                fontSize: '0.96rem',
                lineHeight: 1.68,
                color: 'rgba(242,246,252,0.68)',
                marginBottom: '1.4rem',
                maxWidth: '520px',
              }}
            >
              {service.whatItIs}
            </p>

            <ul
              style={{
                listStyle: 'none',
                margin: '0 0 1.75rem',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.7rem',
              }}
            >
              {service.values.map((v) => (
                <li
                  key={v}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    fontSize: '0.88rem',
                    lineHeight: 1.5,
                    color: 'rgba(242,246,252,0.85)',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: 'rgba(74,158,255,0.18)',
                      color: '#4A9EFF',
                      fontSize: '0.72rem',
                      fontWeight: 'bold',
                      marginTop: '0.1rem',
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="group/btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.7rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '999px',
                background: 'rgba(74,158,255,0.12)',
                border: '1px solid rgba(74,158,255,0.35)',
                color: '#F2F6FC',
                textDecoration: 'none',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease',
              }}
            >
              <span>Start This Service</span>
              <span className="transition-transform duration-300 group-hover/btn:translate-x-1" style={{ color: '#4A9EFF' }}>
                →
              </span>
            </Link>
          </div>
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

  const scrollToService = (number: string) => {
    const el = document.getElementById(`service-${number}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#F2F6FC' }}>
      <Navbar />

      {/* ── Elevated Hero Section with Animated Theme Elements ── */}
      <section
        style={{
          position: 'relative',
          minHeight: '75vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 'clamp(9rem, 18vh, 13rem) 2rem 4rem',
          overflow: 'hidden',
        }}
      >
        {/* Subtle Cyber Grid Background */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="heroGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#4A9EFF" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGrid)" />
        </svg>

        {/* Dual Ambient Glow Orbs matching Brand Theme */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '15%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '65vw',
            height: '40vw',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(74,158,255,0.18) 0%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '30%',
            left: '30%',
            width: '35vw',
            height: '35vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(91,201,232,0.11) 0%, transparent 70%)',
            filter: 'blur(90px)',
            pointerEvents: 'none',
          }}
        />

        {/* Top Shimmer Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.45rem 1.15rem',
            borderRadius: '999px',
            background: 'rgba(74,158,255,0.08)',
            border: '1px solid rgba(74,158,255,0.28)',
            marginBottom: '1.6rem',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#4A9EFF',
              boxShadow: '0 0 8px #4A9EFF',
            }}
          />
          <span
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#4A9EFF',
              fontWeight: 700,
            }}
          >
            Six Disciplines • One Unified Team
          </span>
        </motion.div>

        {/* Massive Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.95, delay: 0.1, ease: [0.25, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            fontFamily: 'var(--font-sevone)',
            fontSize: 'clamp(3.8rem, 11vw, 9.5rem)',
            fontWeight: 900,
            color: '#F2F6FC',
            lineHeight: 0.88,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          SERVICES
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          style={{
            position: 'relative',
            marginTop: '1.75rem',
            maxWidth: '580px',
            fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
            lineHeight: 1.7,
            color: 'rgba(242,246,252,0.7)',
          }}
        >
          Six disciplines, one team. Everything a brand needs to go from ambition to undeniable market authority - handled A-to-Z.
        </motion.p>

        {/* Quick Jump Interactive Navigation Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.6rem',
            marginTop: '2.5rem',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {SERVICES.map((s) => (
            <button
              key={s.number}
              onClick={() => scrollToService(s.number)}
              className="cursor-pointer transition-all duration-300 hover:border-[#4A9EFF] hover:bg-[#4A9EFF]/15"
              style={{
                padding: '0.45rem 1rem',
                borderRadius: '999px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(242,246,252,0.15)',
                color: '#F2F6FC',
                fontSize: '0.74rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              <span style={{ color: '#4A9EFF', marginRight: '0.35rem' }}>{s.number}</span>
              {s.category}
            </button>
          ))}
        </motion.div>
      </section>

      {/* ── Key Metrics Ribbon ── */}
      <section
        style={{
          borderTop: '1px solid rgba(74,158,255,0.15)',
          borderBottom: '1px solid rgba(74,158,255,0.15)',
          background: 'rgba(10, 15, 26, 0.5)',
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
            { value: '06', label: 'Dedicated Disciplines' },
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
                className="text-[0.65rem] md:text-xs"
                style={{
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(242,246,252,0.65)',
                  marginTop: '0.3rem'
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stacking Services Deck (True Sticky Stacking Structure) ── */}
      <section style={{ background: '#000', padding: '5rem 0 5vh' }}>
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 2rem',
            position: 'relative',
          }}
        >
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.number}
              service={service}
              index={i}
              total={SERVICES.length}
            />
          ))}
        </div>
      </section>

      {/* ── Responsive Styling ── */}
      <style>{`
        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spinSlow 20s linear infinite;
          transform-origin: center;
        }
        @media (max-width: 768px) {
          .service-card-wrapper {
            top: 50% !important;
            transform: translateY(-50%) !important;
          }
          .service-card-wrapper:not(:last-child) {
            margin-bottom: 50vh !important;
          }
          .service-card-wrapper:last-child {
            margin-bottom: 0 !important;
          }
          .service-card-top-bar {
            padding: 0.6rem 1rem !important;
          }
          .service-card-body {
            grid-template-columns: 1fr !important;
            padding: 1.15rem !important;
            gap: 0.85rem !important;
          }
          .service-image-box {
            aspect-ratio: 21/9 !important;
          }
          .service-card-body h3 {
            font-size: 1.35rem !important;
            margin-bottom: 0.4rem !important;
          }
          .service-card-body p {
            font-size: 0.82rem !important;
            line-height: 1.45 !important;
            margin-bottom: 0.8rem !important;
          }
          .service-card-body ul {
            gap: 0.4rem !important;
            margin-bottom: 1rem !important;
          }
          .service-card-body li {
            font-size: 0.75rem !important;
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
        <div
          style={{
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
            color: '#F2F6FC',
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
            color: 'rgba(242,246,252,0.6)',
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
            border: '1px solid rgba(242,246,252,0.25)',
            color: '#F2F6FC',
            textDecoration: 'none',
            fontSize: 'clamp(0.7rem, 0.8vw, 0.85rem)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 700,
            transition: 'all 0.5s cubic-bezier(0.25, 1, 0.2, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#4A9EFF';
            e.currentTarget.style.color = '#05070c';
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.border = '1px solid #4A9EFF';
          }}
          onMouseLeave={(e) => {
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

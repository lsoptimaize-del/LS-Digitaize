'use client';

import React, { useMemo } from 'react';

/* ─── Types ─── */
type CardData = {
  initials: string;
  name: string;
  handle: string;
  quote: string;
  accentColor?: string;
};

/* ─── Testimonial data ─── */
const ROW1: CardData[] = [
  {
    initials: 'RS',
    name: 'Rohan Sharma',
    handle: '@rohans',
    quote: "LS Digitaize rebuilt our entire brand system in six weeks. Our conversion rate on paid campaigns nearly doubled the quarter after launch.",
    accentColor: '#4A9EFF',
  },
  {
    initials: 'PP',
    name: 'Priya Patel',
    handle: '@priyapatel_ux',
    quote: "They don't just execute — they actually push back when something won't work. That kind of strategic honesty is why we've stayed with them.",
    accentColor: '#5BC9E8',
  },
  {
    initials: 'AD',
    name: 'Arjun Desai',
    handle: '@arjundesai',
    quote: "Having content, performance marketing, and events all under one roof meant zero handoff friction. It was the fastest rebrand we've ever done.",
    accentColor: '#4A9EFF',
  },
  {
    initials: 'SI',
    name: 'Sneha Iyer',
    handle: '@snehaiyer',
    quote: "The strategy phase alone changed how we think about our entire go-to-market plan in India. This team is absolutely exceptional.",
    accentColor: '#5BC9E8',
  },
  {
    initials: 'VS',
    name: 'Vikram Singh',
    handle: '@vikram_s',
    quote: "From zero to a full identity system in just a month. I've never seen a creative agency move this fast without sacrificing quality.",
    accentColor: '#4A9EFF',
  },
];

const ROW2: CardData[] = [
  {
    initials: 'NG',
    name: 'Neha Gupta',
    handle: '@nehagupta',
    quote: "ROI was visible within the very first campaign cycle. No other agency has delivered measurable results this quickly for our D2C brand.",
    accentColor: '#5BC9E8',
  },
  {
    initials: 'RV',
    name: 'Rahul Verma',
    handle: '@rahulv_tech',
    quote: "Our social following tripled in 90 days. The content strategy they built for us is something we're still successfully scaling two years later.",
    accentColor: '#4A9EFF',
  },
  {
    initials: 'KN',
    name: 'Kavita Nair',
    handle: '@kavitanair',
    quote: "We went through three agencies before finding LS Digitaize. None of them understood our brand vision the way this team did from day one.",
    accentColor: '#5BC9E8',
  },
  {
    initials: 'SM',
    name: 'Siddharth Mehta',
    handle: '@siddharthm',
    quote: "A true strategic partner. They challenged our assumptions and helped us find a highly profitable market position we hadn't even considered.",
    accentColor: '#4A9EFF',
  },
  {
    initials: 'AR',
    name: 'Ananya Rao',
    handle: '@ananyarao',
    quote: "The launch campaign they ran for our new product was genuinely beautiful and it performed amazingly well. You rarely get both. Highly recommend.",
    accentColor: '#5BC9E8',
  },
];

/* ─── Verify icon ─── */
const VerifyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 48 48" aria-hidden="true">
    <polygon fill="#4A9EFF" points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884" />
    <polygon fill="#fff" points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926" />
  </svg>
);

/* ─── Single testimonial card ─── */
const TestimonialCard = ({ card }: { card: CardData }) => (
  <div
    style={{
      width: '17rem',
      flexShrink: 0,
      margin: '0 0.75rem',
      padding: '1.25rem 1.5rem',
      borderRadius: '16px',
      background: 'rgba(255,255,255,0.03)',
      border: `1px solid ${card.accentColor ?? '#4A9EFF'}20`,
      backdropFilter: 'blur(12px)',
      boxShadow: `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)`,
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'default',
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 48px rgba(0,0,0,0.5), 0 0 20px ${card.accentColor ?? '#4A9EFF'}18, inset 0 1px 0 rgba(255,255,255,0.08)`;
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)`;
    }}
  >
    {/* Author row */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.9rem' }}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `radial-gradient(circle at top left, ${card.accentColor ?? '#4A9EFF'}33, transparent)`,
          border: `1.5px solid ${card.accentColor ?? '#4A9EFF'}40`,
          color: card.accentColor ?? '#4A9EFF',
          fontSize: '0.9rem',
          fontWeight: 700,
          fontFamily: 'system-ui, sans-serif',
          letterSpacing: '0.05em'
        }}
      >
        {card.initials}
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#F2F6FC' }}>{card.name}</span>
          <VerifyIcon />
        </div>
        <span style={{ fontSize: '0.7rem', color: 'rgba(242,246,252,0.4)' }}>{card.handle}</span>
      </div>
    </div>

    {/* Accent line */}
    <div style={{
      width: '24px', height: '2px',
      background: `linear-gradient(90deg, ${card.accentColor ?? '#4A9EFF'}, transparent)`,
      marginBottom: '0.75rem',
      borderRadius: '99px',
    }} />

    {/* Quote */}
    <p style={{
      fontSize: '0.82rem',
      lineHeight: 1.65,
      color: 'rgba(242,246,252,0.7)',
      margin: 0,
    }}>
      {card.quote}
    </p>
  </div>
);

/* ─── Marquee row ─── */
function MarqueeRow({ data, reverse = false, speed = 28 }: { data: CardData[]; reverse?: boolean; speed?: number }) {
  const doubled = useMemo(() => [...data, ...data], [data]);

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      {/* Left fade */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '8rem',
        background: 'linear-gradient(to right, #070c16, transparent)',
        zIndex: 10, pointerEvents: 'none',
      }} />

      {/* Scrolling strip */}
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          paddingTop: reverse ? '0.5rem' : '0',
          paddingBottom: reverse ? '0' : '0.5rem',
          animation: `marqueeScroll ${speed}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {doubled.map((card, i) => (
          <TestimonialCard key={i} card={card} />
        ))}
      </div>

      {/* Right fade */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '8rem',
        background: 'linear-gradient(to left, #070c16, transparent)',
        zIndex: 10, pointerEvents: 'none',
      }} />
    </div>
  );
}

/* ─── Section ─── */
export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      style={{
        background: '#070c16',
        padding: 'clamp(5rem, 12vh, 9rem) 0',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 40,
        marginTop: '-2px', // hair-line overlap to prevent gap on desktop
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vh, 5rem)', padding: '0 2rem' }}>
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: '#4A9EFF',
          marginBottom: '1rem',
        }}>
          What Clients Say
        </p>
        <h2 style={{
          fontFamily: 'var(--font-sevone)',
          fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
          fontWeight: 900,
          color: '#F2F6FC',
          letterSpacing: '-0.02em',
          lineHeight: 0.95,
          margin: 0,
          textShadow: '0 4px 50px rgba(74,158,255,0.25)',
        }}>
          RESULTS,<br />NOT PROMISES
        </h2>
      </div>

      {/* Marquee rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <MarqueeRow data={ROW1} reverse={false} speed={30} />
        <MarqueeRow data={ROW2} reverse={true} speed={28} />
      </div>
    </section>
  );
}

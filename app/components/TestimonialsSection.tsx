'use client';

import React, { useMemo } from 'react';

/* ─── Types ─── */
type CardData = {
  image: string;
  name: string;
  handle: string;
  quote: string;
  accentColor?: string;
};

/* ─── Testimonial data ─── */
const ROW1: CardData[] = [
  {
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop',
    name: 'Briar Martin',
    handle: '@briarmartin',
    quote: 'LS Digitaize rebuilt our entire brand system in six weeks. Our conversion rate on paid nearly doubled the quarter after launch.',
    accentColor: '#4A9EFF',
  },
  {
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    name: 'Amira Hassan',
    handle: '@amirahassan',
    quote: 'They don\'t just execute — they push back when something won\'t work. That honesty is why we\'ve stayed with them for three years.',
    accentColor: '#5BC9E8',
  },
  {
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
    name: 'Owen Dietrich',
    handle: '@owend',
    quote: 'Content, performance, and events all under one roof meant zero handoff friction. Fastest rebrand we\'ve ever taken to market.',
    accentColor: '#4A9EFF',
  },
  {
    image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop',
    name: 'Jordan Lee',
    handle: '@jordantalks',
    quote: 'The strategy phase alone changed how we think about our entire go-to-market. This team is exceptional.',
    accentColor: '#5BC9E8',
  },
  {
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
    name: 'Priya Nathan',
    handle: '@priyagrowth',
    quote: 'From zero to a full identity system in a month. I\'ve never seen a creative team move this fast without sacrificing quality.',
    accentColor: '#4A9EFF',
  },
];

const ROW2: CardData[] = [
  {
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop',
    name: 'Marcus Webb',
    handle: '@marcuswebb',
    quote: 'ROI was visible within the first campaign cycle. No agency has delivered results this quickly for us before.',
    accentColor: '#5BC9E8',
  },
  {
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
    name: 'Sofia Reyes',
    handle: '@sofiareyes',
    quote: 'Our social following tripled in 90 days. The content strategy they built is something we\'re still scaling two years later.',
    accentColor: '#4A9EFF',
  },
  {
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    name: 'Derek Huang',
    handle: '@derekhuang',
    quote: 'We tried three agencies before LS Digitaize. None of them understood our vision the way this team did from day one.',
    accentColor: '#5BC9E8',
  },
  {
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    name: 'Naomi Clarke',
    handle: '@naomiclarke',
    quote: 'A true strategic partner. They challenged our assumptions and helped us find a market position we hadn\'t considered.',
    accentColor: '#4A9EFF',
  },
  {
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    name: 'Alex Fontaine',
    handle: '@alexfontaine',
    quote: 'The launch campaign they ran was genuinely beautiful and it performed. You rarely get both. Highly recommend.',
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
      <img
        src={card.image}
        alt={card.name}
        width={40}
        height={40}
        style={{ borderRadius: '50%', objectFit: 'cover', border: `1.5px solid ${card.accentColor ?? '#4A9EFF'}40` }}
      />
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

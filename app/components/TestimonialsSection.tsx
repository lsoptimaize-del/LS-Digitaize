'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';

/* ─── Types ─── */
type Testimonial = {
  initials: string;
  name: string;
  handle: string;
  quote: string;
  accentColor: string;
};

/* ─── Testimonial data ─── */
const TESTIMONIALS: Testimonial[] = [
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
    quote: "They don't just execute, they actually push back when something won't work. That kind of strategic honesty is why we've stayed with them.",
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
  {
    initials: 'KJ',
    name: 'Karan Joshi',
    handle: '@karanjoshi',
    quote: "We handed them a half-finished brand and a messy Instagram. Ninety days later, both looked like they belonged to a company twice our size.",
    accentColor: '#4A9EFF',
  },
  {
    initials: 'MB',
    name: 'Meera Bhat',
    handle: '@meerab',
    quote: "Every deliverable landed on time, every single month, for a year straight. That kind of reliability is rarer than good creative work.",
    accentColor: '#5BC9E8',
  },
  {
    initials: 'AK',
    name: 'Aditya Kapoor',
    handle: '@adityak',
    quote: "The events team pulled off our product launch with three weeks' notice and it still felt like it had been planned for months.",
    accentColor: '#4A9EFF',
  },
  {
    initials: 'ID',
    name: 'Ishita Deshmukh',
    handle: '@ishitad',
    quote: "Their reporting is the first I've actually looked forward to reading. Clear numbers, clear reasoning, no fluff.",
    accentColor: '#5BC9E8',
  },
  {
    initials: 'TS',
    name: 'Tarun Shetty',
    handle: '@tarunshetty',
    quote: "We came in for paid ads and left with a full brand refresh, because they kept flagging things upstream that were actually holding us back.",
    accentColor: '#4A9EFF',
  },
  {
    initials: 'RP',
    name: 'Riya Pillai',
    handle: '@riyapillai',
    quote: "Best onboarding I've had with any agency. They understood our market faster than some of our own new hires do.",
    accentColor: '#5BC9E8',
  },
];

/* ─── Small hook: are we on a touch/mobile width? ─── */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

/* ─── Avatar ─── */
const Avatar = ({ t, size = 44 }: { t: Testimonial; size?: number }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      background: `radial-gradient(circle at top left, ${t.accentColor}33, transparent)`,
      border: `1.5px solid ${t.accentColor}55`,
      color: t.accentColor,
      fontSize: size * 0.36,
      fontWeight: 700,
      fontFamily: 'system-ui, sans-serif',
      letterSpacing: '0.03em',
    }}
  >
    {t.initials}
  </div>
);

/* ─── Popup ─── */
function Popup({ t, onClose }: { t: Testimonial; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,2,6,0.86)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(12px,3vw,32px)',
      }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 32, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: 'linear-gradient(165deg, rgba(13,19,33,0.98) 0%, rgba(5,7,13,0.99) 100%)',
          border: `1px solid ${t.accentColor}35`,
          borderRadius: 'clamp(14px,1.5vw,24px)',
          width: 'min(640px, 96vw)',
          maxHeight: '90vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          boxShadow: '0 48px 120px rgba(0,0,0,0.7)',
        }}
      >
        {/* Accent banner */}
        <div
          style={{
            position: 'relative',
            padding: 'clamp(28px,4vw,44px) clamp(24px,4vw,44px) clamp(16px,2vw,20px)',
            background: `radial-gradient(circle at 20% 20%, ${t.accentColor}22, transparent 60%)`,
            borderBottom: `1px solid ${t.accentColor}25`,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sevone)',
              fontSize: 'clamp(2.5rem,6vw,3.5rem)',
              lineHeight: 0.6,
              color: t.accentColor,
              opacity: 0.5,
            }}
          >
            &ldquo;
          </span>
          <p style={{
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 600,
            fontSize: 10,
            letterSpacing: '0.25em',
            color: t.accentColor,
            textTransform: 'uppercase',
            margin: '8px 0 0',
          }}>
            Verified Client
          </p>
        </div>

        {/* Review content */}
        <div style={{ padding: 'clamp(20px,3vw,36px)', overflowY: 'auto', flex: 1 }}>
          <div style={{ display: 'flex', gap: 4, marginBottom: 18 }}>
            {[...Array(5)].map((_, i) => <span key={i} style={{ color: t.accentColor, fontSize: 15 }}>★</span>)}
          </div>
          <p style={{
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(16px,2vw,20px)',
            color: '#F2F6FC', lineHeight: 1.7,
            margin: '0 0 clamp(20px,3vw,32px)',
          }}>
            &ldquo;{t.quote}&rdquo;
          </p>
          <div style={{ width: 40, height: 1, background: t.accentColor, marginBottom: 18, opacity: 0.5 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Avatar t={t} size={48} />
            <div>
              <p style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600, fontSize: 15, color: '#F2F6FC', margin: '0 0 3px' }}>{t.name}</p>
              <p style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 400, fontSize: 12, color: 'rgba(242,246,252,0.45)', letterSpacing: '0.04em', margin: 0 }}>{t.handle}</p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute', top: 16, right: 16,
            width: 40, height: 40, borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#F2F6FC', fontSize: 22, lineHeight: 1,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)', zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = t.accentColor;
            e.currentTarget.style.color = '#05070c';
            e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
            e.currentTarget.style.color = '#F2F6FC';
            e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
          }}
        >
          ×
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ─── Marquee column (vertical, one of several forming the 3D wall) ─── */
function MarqueeColumn({ items, duration, reverse, cardWidth, onSelect, isMobile }: {
  items: Testimonial[];
  duration: number;
  reverse: boolean;
  cardWidth: number;
  onSelect: (t: Testimonial) => void;
  isMobile: boolean;
}) {
  const doubled = [...items, ...items];
  const [isPaused, setIsPaused] = useState(false);
  const y = useMotionValue(reverse ? -50 : 0);
  const yPercent = useTransform(y, (v) => `${v}%`);

  useAnimationFrame((_, delta) => {
    if (isPaused) return;
    const speed = 50 / (duration * 1000);
    let cur = y.get();
    if (reverse) {
      cur += speed * delta;
      if (cur >= 0) cur = -50;
    } else {
      cur -= speed * delta;
      if (cur <= -50) cur = 0;
    }
    y.set(cur);
  });

  return (
    <div style={{ width: cardWidth, flexShrink: 0, overflow: 'hidden', height: '100%', position: 'relative' }}>
      <motion.div style={{ display: 'flex', flexDirection: 'column', gap: 10, y: yPercent }}>
        {doubled.map((t, i) => (
          <button
            key={i}
            onClick={() => onSelect(t)}
            onMouseEnter={isMobile ? undefined : (e) => {
              setIsPaused(true);
              e.currentTarget.style.borderColor = `${t.accentColor}70`;
              e.currentTarget.style.boxShadow = `0 0 0 1px ${t.accentColor}20, 0 12px 32px rgba(0,0,0,0.5)`;
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={isMobile ? undefined : (e) => {
              setIsPaused(false);
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            style={{
              width: cardWidth,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16,
              padding: '22px 24px',
              cursor: 'pointer',
              textAlign: 'left',
              flexShrink: 0,
              backdropFilter: 'blur(10px)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              transition: 'all 350ms cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'block',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <Avatar t={t} />
              <div>
                <p style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600, fontSize: 14, color: '#F2F6FC', margin: 0, lineHeight: 1.3 }}>{t.name}</p>
                <p style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 500, fontSize: 11, color: t.accentColor, margin: 0, letterSpacing: '0.04em' }}>{t.handle}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 3, marginBottom: 12 }}>
              {[...Array(5)].map((_, i) => <span key={i} style={{ color: t.accentColor, fontSize: 12 }}>★</span>)}
            </div>
            <p style={{
              fontFamily: 'system-ui, sans-serif',
              fontWeight: 400,
              fontSize: 13.5,
              color: 'rgba(242,246,252,0.7)',
              lineHeight: 1.6,
              margin: 0,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            } as React.CSSProperties}>
              &ldquo;{t.quote}&rdquo;
            </p>
          </button>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Section ─── */
export default function TestimonialsSection() {
  const [active, setActive] = useState<Testimonial | null>(null);
  const isMobile = useIsMobile();
  const [cols, setCols] = useState(4);
  const [cardWidth, setCardWidth] = useState(220);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) { setCols(2); setCardWidth(170); }
      else if (w < 768) { setCols(2); setCardWidth(210); }
      else if (w < 1024) { setCols(3); setCardWidth(250); }
      else { setCols(4); setCardWidth(300); }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const handleSelect = useCallback((t: Testimonial) => setActive(t), []);
  const close = useCallback(() => setActive(null), []);

  // Round-robin so every column ends up within one card of the others,
  // regardless of how many testimonials there are or how many columns.
  const columnData = Array.from({ length: cols }, (_, ci) =>
    TESTIMONIALS.filter((_, i) => i % cols === ci)
  );
  const durations = [28, 22, 32, 25];

  return (
    <section
      id="testimonials"
      style={{
        height: '100vh',
        width: '100%',
        maxWidth: '100vw',
        overflow: 'hidden',
        background: '#070c16',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 40,
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', padding: 'clamp(44px,6vh,76px) 24px clamp(16px,2.5vh,24px)', flexShrink: 0, position: 'relative', zIndex: 2 }}>
        <p style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 600, fontSize: 11, letterSpacing: '0.3em', color: '#4A9EFF', textTransform: 'uppercase', marginBottom: 14, marginTop: 0 }}>
          What Clients Say
        </p>
        <h2 style={{
          fontFamily: 'var(--font-sevone)',
          fontWeight: 900,
          fontSize: 'clamp(2.2rem,5vw,4.5rem)',
          color: '#F2F6FC',
          letterSpacing: '-0.02em',
          lineHeight: 0.95,
          margin: '0 0 10px',
          textShadow: '0 4px 50px rgba(74,158,255,0.25)',
        }}>
          RESULTS, NOT PROMISES
        </h2>
        <p style={{ fontFamily: 'system-ui, sans-serif', color: 'rgba(242,246,252,0.5)', fontWeight: 400, fontSize: 'clamp(12px,1.1vw,15px)', lineHeight: 1.65, maxWidth: 380, margin: '0 auto' }}>
          Every brand that leaves our studio carries the story of a team who chose to bet on us.
        </p>
      </div>

      {/* 3D marquee */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '900px', perspectiveOrigin: '50% 38%' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 12, transform: 'rotateX(16deg) rotateY(-5deg) rotateZ(6deg)', transformOrigin: 'center center', height: '100%' }}>
          {columnData.map((colData, ci) => (
            <MarqueeColumn
              key={ci}
              items={colData}
              duration={durations[ci % durations.length]}
              reverse={ci % 2 === 1}
              cardWidth={cardWidth}
              onSelect={handleSelect}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* Edge fades */}
        <div style={{ pointerEvents: 'none', position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #070c16 0%, transparent 20%, transparent 80%, #070c16 100%)' }} />
        <div style={{ pointerEvents: 'none', position: 'absolute', inset: 0, background: 'linear-gradient(to right, #070c16 0%, transparent 12%, transparent 88%, #070c16 100%)' }} />
      </div>

      {/* Ambient glow vignette */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 15,
          pointerEvents: 'none',
          background: [
            'radial-gradient(circle at 50% 0%, rgba(74,158,255,0.1) 0%, transparent 40%)',
            'linear-gradient(to right, #070c16 0%, transparent 11%, transparent 89%, #070c16 100%)',
          ].join(', '),
        }}
      />

      <AnimatePresence>
        {active && <Popup t={active} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}

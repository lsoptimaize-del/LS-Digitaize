'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MeshGradient } from '@paper-design/shaders-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  {
    number: '01',
    title: 'Discover',
    category: 'Research',
    description:
      'We dig into your brand, market, and goals before touching a single pixel or campaign. No guesswork.',
    accentLine: '#4A9EFF',
    colors: ['#060a14', '#0a1428', '#123055', '#1a4a7a', '#0d1e38', '#081020'],
    distortion: 0.72,
    swirl: 0.58,
    image: '/process-discover.png',
  },
  {
    number: '02',
    title: 'Strategize',
    category: 'Strategy',
    description:
      'A roadmap built around what actually moves your numbers. Not trends for their own sake.',
    accentLine: '#5BC9E8',
    colors: ['#050c14', '#0a1a24', '#134a5a', '#0d2836', '#1a3d4a', '#081418'],
    distortion: 0.65,
    swirl: 0.70,
    image: '/process-strategize.png',
  },
  {
    number: '03',
    title: 'Create',
    category: 'Execution',
    description:
      'Identity, content, and campaigns come to life. Crafted to feel inevitable, not generic.',
    accentLine: '#4A9EFF',
    colors: ['#04070f', '#0a1428', '#123055', '#4A9EFF', '#0d1e38', '#08101c'],
    distortion: 0.85,
    swirl: 0.45,
    image: '/process-create.png',
  },
  {
    number: '04',
    title: 'Launch & Grow',
    category: 'Growth',
    description:
      'We ship, measure, and iterate relentlessly. Growth is a system, not a one-off push.',
    accentLine: '#5BC9E8',
    colors: ['#050c10', '#0a1e22', '#134a5a', '#123055', '#0d2836', '#081418'],
    distortion: 0.70,
    swirl: 0.75,
    image: '/process-launch.png',
  },
];

export default function ProcessSection() {
  const wrapperRef    = useRef<HTMLDivElement>(null);
  const cardRef       = useRef<HTMLDivElement>(null);
  const stripRef      = useRef<HTMLDivElement>(null);
  const mobileStripRef = useRef<HTMLDivElement>(null);
  const textWrapRef   = useRef<HTMLDivElement>(null);
  const introRef      = useRef<HTMLDivElement>(null);
  const contentRef    = useRef<HTMLDivElement>(null);
  const introTitleRef = useRef<HTMLHeadingElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [isMobile, setIsMobile] = useState(false);
  const lastIndex = useRef(0);

  useLayoutEffect(() => {
    if (textWrapRef.current) {
      textWrapRef.current.style.transform = 'translateY(calc(-50% + 30px))';
      textWrapRef.current.style.opacity = '0';
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    const update = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
      setIsMobile(window.innerWidth < 768);
    };
    update();
    window.addEventListener('resize', update, { passive: true });

    if (introTitleRef.current && wrapperRef.current) {
      gsap.fromTo(
        introTitleRef.current,
        { y: 80, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0, opacity: 1, filter: 'blur(0px)',
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top top',
          }
        }
      );
    }

    const servicesSection = document.querySelector('#services');
    if (servicesSection && wrapperRef.current) {
      gsap.fromTo(wrapperRef.current,
        { y: () => -window.innerHeight },
        {
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: servicesSection,
            start: 'bottom bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );
    }

    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect       = wrapper.getBoundingClientRect();
      const scrolled   = -rect.top;
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;

      const introScroll = window.innerHeight * 0.9;
      const introProgress = Math.max(0, Math.min(1, scrolled / introScroll));

      if (introRef.current) {
        introRef.current.style.opacity = String(1 - introProgress);
        introRef.current.style.transform = `translateY(${-introProgress * 150}px) scale(${1 + introProgress * 0.05})`;
        introRef.current.style.pointerEvents = introProgress === 1 ? 'none' : 'auto';
      }

      if (contentRef.current) {
        contentRef.current.style.opacity = String(Math.min(1, introProgress * 1.5));
        const yOffset = (1 - introProgress) * window.innerHeight * 0.6;
        contentRef.current.style.transform = `translateY(${yOffset}px)`;
      }

      const servicesScrollable = scrollable - window.innerHeight;
      const servicesScrolled = Math.max(0, scrolled - window.innerHeight);
      const progress = servicesScrollable > 0 ? Math.min(1, servicesScrolled / servicesScrollable) : 0;

      const raw      = progress * STEPS.length;
      const newIndex = Math.min(Math.floor(raw + 0.5), STEPS.length - 1);
      const within   = raw - Math.floor(raw);

      const clampedRaw = Math.min(raw, STEPS.length - 1);
      const stripPct = (clampedRaw / STEPS.length) * 100;

      if (stripRef.current) {
        stripRef.current.style.transform = `translateY(-${stripPct}%)`;
      }
      if (mobileStripRef.current) {
        mobileStripRef.current.style.transform = `translateY(-${stripPct}%)`;
      }

      let tp = 1;
      if (within > 0.3 && within < 0.7) {
        tp = within < 0.5 ? (0.5 - within) / 0.2 : (within - 0.5) / 0.2;
      }

      if (textWrapRef.current) {
        textWrapRef.current.style.opacity = String(tp);
        textWrapRef.current.style.transform = `translateY(-50%)`;
      }

      if (newIndex !== lastIndex.current) {
        lastIndex.current = newIndex;
        setActiveIndex(newIndex);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const step = STEPS[activeIndex];

  return (
    <div
      ref={wrapperRef}
      id="process"
      style={{ height: `${(STEPS.length + 2) * 100}vh`, position: 'relative', zIndex: 20 }}
    >
      <section
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: '#070c16',
        }}
      >
        {/* MeshGradient background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          {mounted && (
            <MeshGradient
              width={dimensions.width}
              height={dimensions.height}
              colors={STEPS[0].colors}
              distortion={STEPS[0].distortion}
              swirl={STEPS[0].swirl}
              speed={0.36}
              offsetX={0.06}
              grainMixer={1}
              grainOverlay={0.06}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            />
          )}
        </div>

        {/* Intro title */}
        <div
          ref={introRef}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 40,
            willChange: 'opacity, transform',
            gap: '1.5rem',
          }}
        >
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)', letterSpacing: '0.4em', textTransform: 'uppercase',
            color: '#4A9EFF', margin: 0,
          }}>
            How We Work
          </p>
          <h2 ref={introTitleRef} style={{
            fontFamily: 'var(--font-sevone)',
            fontSize: 'clamp(3.5rem, 9vw, 11rem)',
            color: '#F2F6FC',
            margin: 0,
            lineHeight: 0.9,
            textAlign: 'center',
            textShadow: '0 4px 50px rgba(74,158,255,0.3)',
            willChange: 'transform, opacity, filter',
          }}>
            FROM SPARK<br />TO SYSTEM
          </h2>
        </div>

        {/* Content wrapper */}
        <div ref={contentRef} style={{ position: 'absolute', inset: 0, willChange: 'opacity, transform', opacity: 0, zIndex: 10 }}>

          {isMobile ? (
            /* ── MOBILE LAYOUT: image top, text bottom ── */
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '1.5rem',
              gap: '1.25rem',
            }}>
              {/* Image card */}
              <div style={{
                borderRadius: '16px',
                overflow: 'hidden',
                aspectRatio: '16/9',
                position: 'relative',
                background: '#08111e',
                boxShadow: '0 20px 60px rgba(26,39,68,0.3)',
                border: `1px solid ${step.accentLine}30`,
                transition: 'border-color 0.9s ease',
                flexShrink: 0,
              }}>
                <div
                  ref={mobileStripRef}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: `${STEPS.length * 100}%`,
                    willChange: 'transform',
                    transition: 'transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                >
                  {STEPS.map((s, i) => (
                    <div key={i} style={{ width: '100%', height: `${100 / STEPS.length}%`, flexShrink: 0 }}>
                      <img
                        src={s.image}
                        alt={s.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                  ))}
                </div>
                {/* Category badge */}
                <div style={{
                  position: 'absolute', top: '0.75rem', right: '0.75rem',
                  fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase',
                  color: step.accentLine, background: 'rgba(5,10,24,0.8)',
                  padding: '0.3rem 0.8rem', borderRadius: '999px',
                  border: `1px solid ${step.accentLine}40`,
                  backdropFilter: 'blur(8px)',
                  zIndex: 3,
                  transition: 'color 0.4s ease',
                }}>
                  {step.category}
                </div>
              </div>

              {/* Text block */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
                  transition={{ duration: 0.4, ease: [0.25, 1, 0.3, 1] }}
                  style={{ flexShrink: 0 }}
                >
                  {/* Category + step counter */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <p style={{
                      fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase',
                      color: 'rgba(242,246,252,0.6)', margin: 0,
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                    }}>
                      <span style={{ width: '20px', height: '1.5px', background: 'rgba(242,246,252,0.35)', display: 'inline-block' }} />
                      {step.category}
                    </p>
                    <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(242,246,252,0.3)', fontFamily: 'monospace' }}>
                      {step.number} / {String(STEPS.length).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 style={{
                    fontFamily: 'var(--font-sevone)',
                    fontSize: 'clamp(3rem, 13vw, 4.5rem)',
                    fontWeight: 900,
                    color: '#F2F6FC',
                    lineHeight: 0.9,
                    letterSpacing: '-0.03em',
                    marginBottom: '0.85rem',
                    textShadow: `0 4px 40px rgba(0,0,0,0.6), 0 0 25px ${step.accentLine}40`,
                  }}>
                    {step.title}
                  </h2>

                  {/* Description */}
                  <p style={{
                    fontSize: 'clamp(0.9rem, 3.8vw, 1.05rem)',
                    lineHeight: 1.65,
                    color: 'rgba(242,246,252,0.65)',
                    margin: 0,
                  }}>
                    {step.description}
                  </p>

                  {/* Step dots */}
                  <div style={{ display: 'flex', gap: '0.45rem', marginTop: '1rem' }}>
                    {STEPS.map((_, i) => (
                      <div key={i} style={{
                        width: i === activeIndex ? '22px' : '6px',
                        height: '6px',
                        borderRadius: '999px',
                        background: i === activeIndex ? step.accentLine : 'rgba(255,255,255,0.18)',
                        transition: 'all 0.4s ease',
                      }} />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            /* ── DESKTOP LAYOUT (unchanged) ── */
            <>
              {/* Visual panel — right side, centered */}
              <div
                ref={cardRef}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '20vh',
                  transform: 'translateX(-40%)',
                  width: 'clamp(320px, 40vw, 580px)',
                  zIndex: 10,
                }}
              >
                <div style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  aspectRatio: '4/3',
                  position: 'relative',
                  background: '#08111e',
                  boxShadow: '0 40px 100px rgba(26,39,68,0.25), 0 0 50px rgba(86,136,201,0.12)',
                  border: `1px solid ${step.accentLine}30`,
                  transition: 'border-color 0.9s ease, box-shadow 0.9s ease',
                }}>
                  <div
                    ref={stripRef}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      height: `${STEPS.length * 100}%`,
                      willChange: 'transform',
                      transition: 'transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    }}
                  >
                    {STEPS.map((s, i) => (
                      <div key={i} style={{ width: '100%', height: `${100 / STEPS.length}%`, flexShrink: 0, position: 'relative' }}>
                        <img src={s.image} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      </div>
                    ))}
                  </div>

                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(to bottom, transparent 40%, rgba(5,10,24,0.7) 100%)`,
                    pointerEvents: 'none', zIndex: 2,
                  }}/>
                  <div style={{
                    position: 'absolute', top: '1rem', right: '1rem',
                    fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase',
                    color: step.accentLine, background: 'rgba(5,10,24,0.7)',
                    padding: '0.45rem 1rem', borderRadius: '999px',
                    border: `1px solid ${step.accentLine}40`,
                    backdropFilter: 'blur(8px)',
                    zIndex: 3,
                    transition: 'color 0.4s ease, border-color 0.4s ease',
                  }}>
                    {step.category}
                  </div>

                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '28%',
                    background: 'linear-gradient(to top, rgba(5,12,24,0.5) 0%, transparent 100%)',
                    zIndex: 5, pointerEvents: 'none',
                  }} />
                </div>
              </div>

              {/* Left text block */}
              <div
                ref={textWrapRef}
                style={{
                  position: 'absolute',
                  left: 'clamp(2rem, 15vw, 22vw)',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 30,
                  maxWidth: 'min(650px, 45vw)',
                  willChange: 'transform, opacity',
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
                    transition={{ duration: 0.45, ease: [0.25, 1, 0.3, 1] }}
                  >
                    <div aria-hidden="true" style={{
                      fontFamily: 'var(--font-sevone)',
                      fontSize: 'clamp(5rem, 13vw, 17rem)',
                      fontWeight: 900,
                      color: 'rgba(255,255,255,0.05)',
                      lineHeight: 0.8,
                      position: 'absolute', bottom: '100%', left: '-0.06em',
                      userSelect: 'none', pointerEvents: 'none',
                      letterSpacing: '-0.04em',
                    }}>
                      {step.number}
                    </div>

                    <p style={{
                      fontSize: 'clamp(0.85rem, 1.2vw, 1.1rem)', letterSpacing: '0.35em', textTransform: 'uppercase',
                      color: 'rgba(242,246,252,0.7)',
                      marginBottom: '1.5rem',
                      transition: 'color 0.7s ease',
                      display: 'flex', alignItems: 'center', gap: '0.8rem',
                    }}>
                      <span style={{ width: '25px', height: '1.5px', background: 'rgba(242,246,252,0.4)' }} />
                      {step.category}
                    </p>

                    <h2 style={{
                      fontFamily: 'var(--font-sevone)',
                      fontSize: 'clamp(3.5rem, 7vw, 8rem)',
                      fontWeight: 900,
                      color: '#F2F6FC',
                      lineHeight: 0.92,
                      letterSpacing: '-0.03em',
                      marginBottom: '1.5rem',
                      textShadow: `0 4px 40px rgba(0,0,0,0.6), 0 0 25px ${step.accentLine}40`,
                    }}>
                      {step.title}
                    </h2>

                    <p style={{
                      fontSize: 'clamp(1.1rem, 1.5vw, 1.4rem)', lineHeight: 1.7,
                      color: 'rgba(242,246,252,0.65)',
                      margin: '0 0 2.5rem',
                      maxWidth: '95%',
                    }}>
                      {step.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right-edge step indicators */}
              <div style={{
                position: 'absolute',
                right: 'clamp(1.5rem, 4vw, 4rem)',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 20,
                height: '40vh',
              }}>
                <div style={{ position: 'relative', height: '100%' }}>
                  <div style={{
                    position: 'absolute',
                    right: 0, top: 0, bottom: 0,
                    width: '1px',
                    background: 'rgba(255,255,255,0.12)',
                  }} />
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    paddingTop: '1px',
                    paddingBottom: '1px',
                  }}>
                    {STEPS.map((_s, i) => {
                      const isActive = i === activeIndex;
                      const isPast   = i < activeIndex;
                      return (
                        <div key={i} style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                          height: '1px',
                          position: 'relative',
                        }}>
                          <div style={{
                            marginRight: '40px',
                            opacity: isActive ? 1 : 0,
                            transform: isActive ? 'translateX(0)' : 'translateX(15px)',
                            transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
                            fontFamily: 'var(--font-sevone)',
                            fontSize: '1.4rem',
                            fontWeight: 900,
                            color: '#F2F6FC',
                          }}>
                            {String(i + 1).padStart(2, '0')}
                          </div>
                          <div style={{
                            position: 'absolute',
                            right: isActive ? '-1px' : '0',
                            width: isActive ? '24px' : '10px',
                            height: isActive ? '2px' : '1px',
                            background: isActive
                              ? '#F2F6FC'
                              : isPast
                                ? 'rgba(255,255,255,0.4)'
                                : 'rgba(255,255,255,0.15)',
                            transition: 'all 0.4s ease',
                          }} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}

        </div>

        <style>{`
          @keyframes svcScrollPulse {
            0%, 100% { opacity: 0.22; transform: scaleY(1); }
            50%       { opacity: 0.55; transform: scaleY(1.35); }
          }
        `}</style>
      </section>
    </div>
  );
}

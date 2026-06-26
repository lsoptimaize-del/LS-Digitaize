'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { MeshGradient } from '@paper-design/shaders-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICES = [
  {
    number: '01',
    title: 'A-Z Branding\n& Identity',
    category: 'Identity',
    description:
      'From logo to language — we create visual systems that make your brand feel inevitable in any room.',
    accentLine: '#5688C9',
    colors: ['#E8F4FB', '#C8DFF0', '#8CCDE9', '#8BEADD', '#B8D8EE', '#F2F8FC'],
    distortion: 0.72,
    swirl: 0.58,
    image: '/service-branding.png',
  },
  {
    number: '02',
    title: 'Content Strategy\n& Creation',
    category: 'Content',
    description:
      'Strategy, templates, scripts, visuals — built as a system that turns ideas into a steady stream of impact.',
    accentLine: '#8CCDE9',
    colors: ['#EFF9FF', '#DCF0FA', '#8CCDE9', '#C8DFF0', '#8BEADD', '#E8F6FF'],
    distortion: 0.65,
    swirl: 0.70,
    image: '/service-content.png',
  },
  {
    number: '03',
    title: 'Performance\nMarketing',
    category: 'Performance',
    description:
      'Data-led paid campaigns that convert. We test relentlessly and optimise until the numbers sing.',
    accentLine: '#5688C9',
    colors: ['#D8E8F8', '#C8DFF0', '#8CCDE9', '#5688C9', '#B0CAE8', '#E4EEF8'],
    distortion: 0.85,
    swirl: 0.45,
    image: '/service-performance.png',
  },
  {
    number: '04',
    title: 'Social Media\nManagement',
    category: 'Social',
    description:
      'Your brand, alive online — every day. Strategy, content, community, all handled.',
    accentLine: '#8BEADD',
    colors: ['#D8F8F2', '#8BEADD', '#C8DFF0', '#8CCDE9', '#B8EDE4', '#EAF9F5'],
    distortion: 0.70,
    swirl: 0.75,
    image: '/service-social.png',
  },
  {
    number: '05',
    title: 'Event Curation\n& Management',
    category: 'Events',
    description:
      'Concept to execution — brand activations and launches that create moments people talk about.',
    accentLine: '#5688C9',
    colors: ['#E2ECFA', '#C8DFF0', '#5688C9', '#8CCDE9', '#D0DCF5', '#EEF3FA'],
    distortion: 0.78,
    swirl: 0.55,
    image: '/service-events.png',
  },
  {
    number: '06',
    title: 'Business\nDevelopment',
    category: 'Growth',
    description:
      'Market research, partnerships, and growth roadmaps. We help ambitious brands open new doors — sustainably.',
    accentLine: '#5688C9',
    colors: ['#E0EAF5', '#C8DFF0', '#8CCDE9', '#5688C9', '#B8D0E8', '#EAF0F8'],
    distortion: 0.80,
    swirl: 0.50,
    image: '/service-business.png',
  },
];

export default function ServicesSection() {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const cardRef     = useRef<HTMLDivElement>(null);
  const imgRef      = useRef<HTMLDivElement>(null);
  const textWrapRef = useRef<HTMLDivElement>(null);
  const introRef    = useRef<HTMLDivElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);

  const introTitleRef = useRef<HTMLHeadingElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const lastIndex = useRef(0);

  // Set starting transforms before first paint to prevent flash
  useLayoutEffect(() => {
    if (textWrapRef.current) {
      textWrapRef.current.style.transform = 'translateY(calc(-50% + 30px))';
      textWrapRef.current.style.opacity = '0';
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    const update = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener('resize', update, { passive: true });
    
    // In-view animation for "WHAT WE DO"
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
            start: 'top 80%',
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

      const introScroll = window.innerHeight * 0.9; // first 90vh fades intro
      const introProgress = Math.max(0, Math.min(1, scrolled / introScroll));
      
      if (introRef.current) {
        introRef.current.style.opacity = String(1 - introProgress);
        // Intro text goes up and scales slightly as it fades
        introRef.current.style.transform = `translateY(${-introProgress * 150}px) scale(${1 + introProgress * 0.05})`;
        introRef.current.style.pointerEvents = introProgress === 1 ? 'none' : 'auto';
      }

      if (contentRef.current) {
        contentRef.current.style.opacity = String(Math.min(1, introProgress * 1.5)); // Fades in a bit faster
        // Content slides all the way up from the bottom
        const yOffset = (1 - introProgress) * window.innerHeight * 0.6;
        contentRef.current.style.transform = `translateY(${yOffset}px)`;
      }

      const servicesScrollable = scrollable - window.innerHeight;
      const servicesScrolled = Math.max(0, scrolled - window.innerHeight);
      const progress = servicesScrollable > 0 ? Math.min(1, servicesScrolled / servicesScrollable) : 0;
      
      const raw      = progress * SERVICES.length;
      const newIndex = Math.min(Math.floor(raw + 0.5), SERVICES.length - 1);
      const within   = raw - Math.floor(raw); // 0 to 1 within the current scroll segment

      // Image track translation
      if (imgRef.current) {
        const translateY = -Math.min(raw * 100, (SERVICES.length - 1) * 100);
        imgRef.current.style.transform = `translateY(${translateY}%)`;
      }

      // Text fades out during the halfway point of the scroll
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

  const service = SERVICES[activeIndex];

  return (
    <div
      ref={wrapperRef}
      id="services"
      style={{ height: `${(SERVICES.length + 2) * 100}vh`, position: 'relative', zIndex: 20 }}
    >
      <section
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: '#E8F4FB',
        }}
      >
        {/* ── MeshGradient background ── */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          {mounted && (
            <MeshGradient
              width={dimensions.width}
              height={dimensions.height}
              colors={service.colors}
              distortion={service.distortion}
              swirl={service.swirl}
              speed={0.36}
              offsetX={0.06}
              grainMixer={1}
              grainOverlay={0.06}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            />
          )}
        </div>

        {/* ── Intro Title ── */}
        <div
          ref={introRef}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 40,
            willChange: 'opacity, transform',
          }}
        >
          <h2 ref={introTitleRef} style={{
            fontFamily: 'var(--font-sevone)',
            fontSize: 'clamp(3.5rem, 9vw, 11rem)',
            color: '#1a2744',
            margin: 0,
            lineHeight: 0.9,
            textAlign: 'center',
            textShadow: '0 4px 40px rgba(232,244,251,0.5)',
            willChange: 'transform, opacity, filter',
          }}>
            WHAT WE DO
          </h2>
        </div>

        {/* ── Content Wrapper ── */}
        <div ref={contentRef} style={{ position: 'absolute', inset: 0, willChange: 'opacity, transform', opacity: 0, zIndex: 10 }}>

        {/* ── Image card — centered, scroll-driven ── */}
        <div
          ref={cardRef}
          style={{
            position: 'absolute',
            left: '50%',
            top: '20vh',
            transform: 'translateX(-40%)', // Shifted slightly right to balance text
            width: 'clamp(350px, 45vw, 680px)',
            zIndex: 10,
          }}
        >
          <div style={{
            borderRadius: '16px',
            overflow: 'hidden',
            aspectRatio: '3/2',
            position: 'relative',
            background: '#08111e',
            boxShadow: '0 40px 100px rgba(26,39,68,0.2), 0 0 50px rgba(86,136,201,0.1)',
            border: '1px solid rgba(255,255,255,0.18)',
            transition: 'box-shadow 0.9s ease',
          }}>
            {/* Image track container */}
            <div
              ref={imgRef}
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: '100%',
                willChange: 'transform',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {SERVICES.map((s, i) => (
                <div key={i} style={{ flexShrink: 0, width: '100%', height: '100%', position: 'relative' }}>
                  <img
                    src={s.image}
                    alt={s.title.replace('\n', ' ')}
                    style={{
                      width: '100%', height: '100%',
                      objectFit: 'cover', display: 'block'
                    }}
                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
              ))}
            </div>

            {/* Bottom scrim */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '28%',
              background: 'linear-gradient(to top, rgba(5,12,24,0.5) 0%, transparent 100%)',
              zIndex: 5, pointerEvents: 'none',
            }} />
          </div>
        </div>

        {/* ── Left text block — vertically centered, DOM-animated ── */}
        <div
          ref={textWrapRef}
          style={{
            position: 'absolute',
            left: 'clamp(2rem, 15vw, 22vw)', // Overlaps the left side of the card
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 30,
            maxWidth: 'min(500px, 40vw)',
            willChange: 'transform, opacity',
          }}
        >
          {/* Giant watermark number */}
          <div aria-hidden="true" style={{
            fontFamily: 'var(--font-sevone)',
            fontSize: 'clamp(5rem, 13vw, 17rem)',
            fontWeight: 900,
            color: 'rgba(26,39,68,0.04)',
            lineHeight: 0.8,
            position: 'absolute', bottom: '100%', left: '-0.06em',
            userSelect: 'none', pointerEvents: 'none',
            letterSpacing: '-0.04em',
          }}>
            {service.number}
          </div>

          <p style={{
            fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase',
            color: 'rgba(26,39,68,0.7)',
            marginBottom: '1.5rem',
            transition: 'color 0.7s ease',
            display: 'flex', alignItems: 'center', gap: '0.8rem',
          }}>
            <span style={{ width: '20px', height: '1px', background: 'rgba(26,39,68,0.4)' }} />
            {service.category}
          </p>

          <h2 style={{
            fontFamily: 'var(--font-sevone)',
            fontSize: 'clamp(2.5rem, 5.5vw, 6.5rem)',
            fontWeight: 900,
            color: '#1a2744',
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
            whiteSpace: 'pre-line',
            textShadow: '0 4px 40px rgba(232,244,251,0.95), 0 0 15px rgba(255,255,255,1)',
          }}>
            {service.title}
          </h2>

          <p style={{
            fontSize: '1rem', lineHeight: 1.6,
            color: 'rgba(26,39,68,0.65)',
            margin: '0 0 2.5rem',
            maxWidth: '85%',
          }}>
            {service.description}
          </p>

          <a
            href="/services"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
              fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase',
              color: '#1a2744', textDecoration: 'none',
              opacity: 0.45, transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.45'; }}
          >
            Explore Service <span style={{ letterSpacing: 0 }}>→</span>
          </a>
        </div>

        {/* ── Right-edge vertical line indicators (monopo style) ── */}
        <div style={{
          position: 'absolute',
          right: 'clamp(1.5rem, 4vw, 4rem)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          height: '45vh',
        }}>
          <div style={{ position: 'relative', height: '100%' }}>
            {/* Continuous thin vertical line */}
            <div style={{
              position: 'absolute',
              right: 0, top: 0, bottom: 0,
              width: '1px',
              background: 'rgba(26,39,68,0.12)',
            }} />

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              paddingTop: '1px',
              paddingBottom: '1px',
            }}>
              {SERVICES.map((_s, i) => {
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
                    {/* Active Indicator Number */}
                    <div style={{
                      marginRight: '40px',
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateX(0)' : 'translateX(15px)',
                      transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
                      fontFamily: 'var(--font-sevone)',
                      fontSize: '1.4rem',
                      fontWeight: 900,
                      color: '#1a2744',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    {/* Horizontal tick protruding from vertical line */}
                    <div style={{
                      position: 'absolute',
                      right: isActive ? '-1px' : '0',
                      width: isActive ? '24px' : '10px',
                      height: isActive ? '2px' : '1px',
                      background: isActive
                        ? '#1a2744'
                        : isPast
                          ? 'rgba(26,39,68,0.4)'
                          : 'rgba(26,39,68,0.15)',
                      transition: 'all 0.4s ease',
                    }} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Scroll hint (first service only) ── */}
        {activeIndex === 0 && (
          <div style={{
            position: 'absolute',
            bottom: '2.25rem',
            right: 'clamp(3rem, 7vw, 8rem)',
            zIndex: 20,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.45rem',
          }}>
            <span style={{
              fontSize: '0.52rem', letterSpacing: '0.4em', textTransform: 'uppercase',
              color: 'rgba(26,39,68,0.3)',
            }}>
              Scroll
            </span>
            <div style={{
              width: '1px', height: '22px',
              background: 'linear-gradient(to bottom, rgba(26,39,68,0.3), transparent)',
              animation: 'svcScrollPulse 1.6s ease-in-out infinite',
            }} />
          </div>
        )}

        </div>

        <style>{`
          @keyframes svcScrollPulse {
            0%, 100% { opacity: 0.22; transform: scaleY(1); }
            50%       { opacity: 0.55; transform: scaleY(1.35); }
          }
          @keyframes slideUpImage {
            0%   { transform: translateY(100%); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
        `}</style>
      </section>
    </div>
  );
}

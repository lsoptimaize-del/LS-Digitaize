'use client';

import { useEffect, useRef, useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICES = [
  {
    title: 'A-Z Branding & Identity',
    image: '/bg_service_1.png',
  },
  {
    title: 'Content Strategy & Creation',
    image: '/bg_service_2.png',
  },
  {
    title: 'Performance Marketing',
    image: '/bg_service_3.png',
  },
  {
    title: 'Social Media Management',
    image: '/bg_service_4.png',
  },
  {
    title: 'Event Curation & Management',
    image: '/bg_service_5.png',
  },
  {
    title: 'Business Development',
    image: '/bg_service_6.png',
  },
];

export default function ServicesPage() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bgWrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const lastIndex = useRef(0);
  const imgTrackRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const onScroll = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const scrolled = -rect.top;
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;

      // Phase 1: Intro (0 to 100vh) - "SERVICES" moves up, BG shrinks
      const introScroll = window.innerHeight;
      const introProgress = Math.max(0, Math.min(1, scrolled / introScroll));

      if (titleRef.current) {
        // Starts at bottom of viewport with only top half visible, ends at top
        const startY = window.innerHeight - (titleRef.current.clientHeight * 0.45); 
        const yOffset = (1 - introProgress) * startY;
        titleRef.current.style.transform = `translateY(${yOffset}px) scaleX(1.05)`;
      }

      if (bgWrapperRef.current) {
        const scale = 1 - (introProgress * 0.04); // shrinks to 96%
        const borderRadius = introProgress * 24; // 0px to 24px
        bgWrapperRef.current.style.transform = `scale(${scale})`;
        bgWrapperRef.current.style.borderRadius = `${borderRadius}px`;
      }

      if (listRef.current) {
        // List only fades in right as the text reaches the very top
        let listOpacity = 0;
        let listX = -100;
        
        if (introProgress > 0.85) {
          // Fades in from 0 to 1 during the last 15% of the intro scroll
          const fadeProgress = (introProgress - 0.85) / 0.15;
          listOpacity = fadeProgress;
          listX = (1 - fadeProgress) * -100;
        }
        
        listRef.current.style.transform = `translateY(-50%) translateX(${listX}px)`;
        listRef.current.style.opacity = String(listOpacity);
        listRef.current.style.pointerEvents = introProgress === 1 ? 'auto' : 'none';
      }

      // Phase 2: Services List (after 100vh)
      const servicesScrollable = scrollable - introScroll;
      const servicesScrolled = Math.max(0, scrolled - introScroll);
      const listProgress = servicesScrollable > 0 ? Math.min(1, servicesScrolled / servicesScrollable) : 0;
      
      const raw = listProgress * SERVICES.length;
      
      // Image track translation
      if (imgTrackRef.current) {
        const maxTranslate = SERVICES.length - 1;
        const currentTranslate = Math.min(raw, maxTranslate);
        imgTrackRef.current.style.transform = `translateY(-${currentTranslate * 100}%)`;
      }

      // We want it to reach the last index right at the end of the scroll
      const newIndex = Math.min(Math.floor(raw), SERVICES.length - 1);
      
      if (newIndex !== lastIndex.current) {
        lastIndex.current = newIndex;
        setActiveIndex(newIndex);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    window.addEventListener('resize', onScroll, { passive: true });
    
    // In-view text animations
    const inViewTexts = gsap.utils.toArray<HTMLElement>('.in-view-text');
    inViewTexts.forEach((text) => {
      gsap.fromTo(text, 
        { y: 60, opacity: 0 },
        {
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#000' }}>
      <Navbar />

      {/* ── Main Immersive Scroll Section ── */}
      <div
        ref={wrapperRef}
        style={{
          height: `${(SERVICES.length + 1) * 100}vh`,
          position: 'relative',
          zIndex: 20,
          background: '#000', 
        }}
      >
        <section
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* ── Background Images Wrapper ── */}
          <div
            ref={bgWrapperRef}
            style={{
              position: 'absolute',
              inset: 0,
              overflow: 'hidden',
              transformOrigin: 'center center',
              willChange: 'transform, border-radius',
              transform: 'scale(1)',
              borderRadius: '0px',
              backgroundColor: '#111',
            }}
          >
            <div
              ref={imgTrackRef}
              style={{
                 position: 'absolute',
                 top: 0, left: 0, right: 0, height: '100%',
                 display: 'flex', flexDirection: 'column',
                 willChange: 'transform'
              }}
            >
              {SERVICES.map((s, i) => (
                <div key={i} style={{ flexShrink: 0, width: '100%', height: '100%', position: 'relative' }}>
                  <img
                    src={s.image}
                    alt={s.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      filter: 'brightness(0.6) contrast(1.1)', 
                    }}
                  />
                </div>
              ))}
            </div>
            
            {/* Subtle gradient overlay to ensure text legibility */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.4) 100%)',
              pointerEvents: 'none',
            }} />
          </div>

          {/* ── Giant "SERVICES" Text ── */}
          <h2
            ref={titleRef}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0, 
              margin: 0,
              fontFamily: 'Helvetica Neue, Arial, sans-serif',
              fontSize: 'clamp(6rem, 18vw, 28rem)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 0.75,
              letterSpacing: '-0.02em',
              textAlign: 'center',
              textTransform: 'uppercase',
              willChange: 'transform',
              zIndex: 10,
              pointerEvents: 'none',
              textShadow: '0 10px 40px rgba(0,0,0,0.3)',
              transformOrigin: 'bottom center',
              transform: 'scaleX(1.05)',
            }}
          >
            SERVICES
          </h2>

          {/* ── Vertical Services List ── */}
          <div
            ref={listRef}
            style={{
              position: 'absolute',
              left: 'clamp(2rem, 6vw, 8rem)',
              top: 'clamp(45%, 55vh, 60%)', // Pushed down to completely clear the SERVICES text
              right: '2rem', // Allow it to span across the screen
              zIndex: 20,
              display: 'flex',
              flexDirection: 'column',
              willChange: 'transform, opacity',
              opacity: 0, 
            }}
          >
            {SERVICES.map((s, i) => {
              const isActive = i === activeIndex;
              return (
                <div
                  key={i}
                  style={{
                    fontFamily: 'Helvetica Neue, Arial, sans-serif',
                    fontSize: isActive ? 'clamp(2rem, 4vw, 5rem)' : 'clamp(1rem, 1.8vw, 2.5rem)',
                    fontWeight: isActive ? 900 : 400,
                    color: '#fff',
                    textTransform: 'uppercase',
                    letterSpacing: isActive ? '-0.02em' : '0.05em',
                    opacity: isActive ? 1 : 0.35,
                    paddingTop: 'clamp(1.5rem, 3.5vh, 4rem)',
                    paddingBottom: 'clamp(1.5rem, 3.5vh, 4rem)',
                    borderBottom: '1px solid rgba(255,255,255,0.15)',
                    transition: 'all 0.6s cubic-bezier(0.25, 1, 0.2, 1)',
                    lineHeight: 0.9,
                    cursor: 'pointer',
                    transform: isActive ? 'translateX(0)' : 'translateX(-5px)',
                    whiteSpace: 'nowrap', // Force single line
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {s.title}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* ── Immersive CTA ── */}
      <section 
        ref={ctaRef}
        onMouseMove={handleCtaMouseMove}
        onMouseLeave={() => setCtaMousePos({ x: -1000, y: -1000 })}
        style={{
          position: 'relative',
          zIndex: 30,
          minHeight: '100vh',
          background: '#F0F6FB', // Light theme background
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
          background: 'radial-gradient(circle, rgba(139,234,221,0.4) 0%, transparent 70%)', // Stronger cyan for light BG
          filter: 'blur(50px)',
          pointerEvents: 'none',
          transition: 'width 0.3s, height 0.3s, left 0.1s, top 0.1s', // slight ease on cursor
        }} />

        <h2 
          className="in-view-text"
          style={{
          position: 'relative',
          zIndex: 2,
          fontFamily: 'Helvetica Neue, Arial, sans-serif',
          fontSize: 'clamp(3.5rem, 8vw, 10rem)',
          fontWeight: 900,
          color: '#040914', // Dark text
          lineHeight: 0.85,
          letterSpacing: '-0.03em',
          textAlign: 'center',
          textTransform: 'uppercase',
          marginBottom: '2rem',
        }}>
          FIND YOUR<br />PERFECT FIT.
        </h2>
        
        <p 
          className="in-view-text"
          style={{
          position: 'relative',
          zIndex: 2,
          fontSize: 'clamp(1rem, 1.5vw, 1.3rem)',
          color: 'rgba(4,9,20,0.6)', // Dark gray text
          marginBottom: '5rem',
          maxWidth: '550px',
          textAlign: 'center',
          lineHeight: 1.6,
        }}>
          Not sure which service is right for you? Let's talk it through together and build something extraordinary.
        </p>

        <a 
          href="/contact" 
          className="in-view-text" // Animating the button as well
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
            border: '1px solid rgba(4,9,20,0.2)', // Dark border
            color: '#040914', // Dark text
            textDecoration: 'none',
            fontSize: 'clamp(0.7rem, 0.8vw, 0.85rem)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 700,
            transition: 'all 0.5s cubic-bezier(0.25, 1, 0.2, 1)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#040914'; // Dark background on hover
            e.currentTarget.style.color = '#fff'; // White text on hover
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.border = '1px solid #040914';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#040914';
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.border = '1px solid rgba(4,9,20,0.2)';
          }}
        >
          Get in Touch
        </a>
      </section>

      <div style={{ position: 'relative', zIndex: 30 }}>
        <Footer />
      </div>
    </div>
  );
}

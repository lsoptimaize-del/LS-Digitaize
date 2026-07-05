'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const VALUES = [
  {
    symbol: '✦',
    title: 'Curated Over Crowded',
    body: 'We choose clients like we choose ideas — with intention. A smaller roster means every brand gets our full creative firepower.',
  },
  {
    symbol: '◈',
    title: 'Bold Over Safe',
    body: 'Safe is forgettable. We push until it feels like something — then we push a little more. The brands we work with deserve nothing less.',
  },
  {
    symbol: '⬡',
    title: 'Full-Spectrum Thinking',
    body: 'We don\'t silo. Brand, content, performance, social — they feed each other. We see the whole picture so nothing falls between the cracks.',
  },
  {
    symbol: '◎',
    title: 'Growth With Roots',
    body: 'Viral moments are fun. Sustainable growth is the point. We build ecosystems, not just campaigns.',
  },
];


// TEAM data for the interactive carousel
const TEAM = [
  { name: 'Lucas Sterling', role: 'Creative Director', image: '/team-1.png', quote: '"Design is not just what it looks like and feels like. Design is how it works. We engineer experiences that ignite brands and leave lasting impressions."' },
  { name: 'Elena Rostova', role: 'Marketing Strategist', image: '/team-2.png', quote: '"We don\'t just chase trends, we analyze the underlying human behaviors that create them. That is where real, sustainable growth happens."' },
  { name: 'Marcus Chen', role: 'Lead Developer', image: '/team-3.png', quote: '"Code is the invisible architecture of your brand. We build scalable, performant systems that never get in the way of the story."' },
  { name: 'Zara Vane', role: 'Art Director', image: '/team-4.png', quote: '"Aesthetics must serve a purpose. Every pixel, every color, every frame is a calculated decision to elevate the brand\'s narrative."' },
  { name: 'David Mercer', role: 'Copywriter', image: '/team-5.png', quote: '"Words are the currency of connection. We write copy that doesn\'t just sound clever, it moves the needle and converts your audience."' },
  { name: 'Sophia Lin', role: 'Project Manager', image: '/team-6.png', quote: '"Chaos is the enemy of creativity. I build the frameworks that allow our team to consistently deliver unmissable work on time, every time."' },
];

export default function AboutPage() {
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const ceoSectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const goToNext = () => {
    if (animating) return;
    setAnimating(true);
    setActiveIndex((prev) => (prev + 1) % TEAM.length);
    setTimeout(() => setAnimating(false), 700);
  };

  const goToIndex = (idx: number) => {
    if (animating || idx === activeIndex) return;
    setAnimating(true);
    setActiveIndex(idx);
    setTimeout(() => setAnimating(false), 700);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero cutout animation
      if (heroWrapperRef.current && maskRef.current) {
        gsap.to(maskRef.current, {
          y: '-100%',
          ease: 'none',
          scrollTrigger: {
            trigger: heroWrapperRef.current,
            start: 'top top',
            end: '+=100%', // Completes animation during the first 100vh of scroll
            scrub: true,
          }
        });
      }

      // CEO Section animation
      if (heroWrapperRef.current && ceoSectionRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroWrapperRef.current,
            start: 'top -100%', // Starts exactly when the mask finishes moving up
            end: 'top -150%', // Fades in over the next 50vh of scrolling
            scrub: true,
          }
        });
        
        tl.fromTo(ceoSectionRef.current, { opacity: 0 }, { opacity: 1, duration: 1 })
          .fromTo('.ceo-photo', { x: -80, rotation: -10, opacity: 0 }, { x: 0, rotation: -3, opacity: 1, duration: 1 }, '<')
          .fromTo('.ceo-text', { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, '<');
      }

      // In-view motion text slide-up animation
      const motionTextLines = gsap.utils.toArray<HTMLElement>('.motion-text-line');
      motionTextLines.forEach(line => {
        gsap.fromTo(line, 
          { y: '120%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            ease: 'power4.out',
            duration: 1.2,
            scrollTrigger: {
              trigger: line.parentElement,
              start: 'top 90%',
              toggleActions: 'play reverse play reverse'
            }
          }
        );
      });

      // Team roster slide-up animation
      const teamElements = gsap.utils.toArray<HTMLElement>('.team-roster-element');
      if (teamElements.length > 0) {
        gsap.fromTo(teamElements,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: teamElements[0].parentElement,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse'
            }
          }
        );
      }


    }); // removed scope so it searches the whole page

    return () => ctx.revert();
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#05070c' }}>
      <Navbar />

      {/* ── Scroll-Linked Video Cutout Hero ── */}
      <div ref={heroWrapperRef} style={{ position: 'relative', height: '300vh' }}>
        <div style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: '#050c18', // Fallback color before video loads
        }}>
          {/* Background Video */}
          <video
            src="/thrid.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
            }}
          />

          {/* Dark Blue Mask with Multiply Blend Mode */}
          <div
            ref={maskRef}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#050c18',
              mixBlendMode: 'multiply',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              willChange: 'transform',
            }}
          >
            {/* ABOUT US */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '1.5rem 0' }}>
              <p style={{
                fontFamily: 'inherit',
                fontSize: '1rem',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: '#fff',
                margin: 0,
                fontWeight: 700,
              }}>
                ABOUT US
              </p>
            </div>

            {/* Row 1: WE EXIST */}
            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.12)',
              borderBottom: '1px solid rgba(255,255,255,0.12)',
              display: 'flex',
              justifyContent: 'center',
              padding: '0.5rem 0',
              width: '100%',
            }}>
              <h1 style={{
                fontFamily: 'var(--font-sevone)',
                fontSize: 'clamp(4rem, 16vw, 15rem)',
                fontWeight: 900,
                color: '#fff',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                margin: 0,
              }}>
                WE EXIST
              </h1>
            </div>

            {/* Row 2: TO */}
            <div style={{
              borderBottom: '1px solid rgba(255,255,255,0.12)',
              display: 'flex',
              justifyContent: 'center',
              padding: '0.5rem 0',
              width: '100%',
            }}>
              <h1 style={{
                fontFamily: 'var(--font-sevone)',
                fontSize: 'clamp(3rem, 12vw, 11rem)',
                fontWeight: 900,
                color: '#fff',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                margin: 0,
              }}>
                TO
              </h1>
            </div>

            {/* Row 3: IGNITE BRANDS */}
            <div className="hero-row-3" style={{
              borderBottom: '1px solid rgba(255,255,255,0.12)',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0.5rem clamp(1rem, 4vw, 2rem)',
              width: '100%',
            }}>
              <h1 style={{
                fontFamily: 'var(--font-sevone)',
                fontSize: 'clamp(5rem, 22vw, 15rem)',
                fontWeight: 900,
                color: '#fff',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                margin: 0,
              }}>
                IGNITE
              </h1>
              <h1 style={{
                fontFamily: 'var(--font-sevone)',
                fontSize: 'clamp(5rem, 22vw, 15rem)',
                fontWeight: 900,
                color: '#fff',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                margin: 0,
              }}>
                BRANDS
              </h1>
            </div>
          </div>

          {/* ── CEO Intro Section ── */}
          <div
            ref={ceoSectionRef}
            className="ceo-section"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 20, // Above the mask so it shows after the mask is gone
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 clamp(1.5rem, 8vw, 8rem)',
              gap: 'clamp(2rem, 6vw, 6rem)',
              opacity: 0, // Animated by GSAP
            }}
          >
            {/* Left: Polaroid Image */}
            <div className="ceo-photo" style={{
              flex: '0 0 35%',
              maxWidth: '450px',
              backgroundColor: '#0d1e38', // Dark blue border
              padding: '1rem 1rem 4rem 1rem', // Polaroid bottom heavy
              borderRadius: '8px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              transform: 'rotate(-3deg)',
              willChange: 'transform, opacity',
            }}>
              <div style={{
                width: '100%',
                aspectRatio: '3/4',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '4px',
              }}>
                <img
                  src="/Tejas.png"
                  alt="CEO Tejas"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </div>

            {/* Right: Fading Text */}
            <div className="ceo-text" style={{ flex: '1', maxWidth: '600px', willChange: 'transform, opacity' }}>
              <h2 style={{
                fontFamily: 'var(--font-sevone)',
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                color: '#0d1e38',
                marginBottom: '1rem',
                lineHeight: 1,
              }}>
                LEADING THE CHARGE
              </h2>
              <p style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                color: 'rgba(13, 30, 56, 0.85)',
                lineHeight: 1.6,
                fontWeight: 500,
              }}>
                "Our mission isn't just to make noise. It's to build resonance. 
                We combine sharp strategy with bold creative to ignite brands and 
                drive sustainable growth. The work you see here is the result of 
                obsessive craft and relentless execution."
              </p>
              <p style={{
                marginTop: '1.5rem',
                fontFamily: 'var(--font-geist-mono)',
                color: '#1a4a7a',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 800,
                fontSize: '0.85rem'
              }}>
                — Tejas G., Founder & CEO
              </p>
            </div>
          </div>
        </div>
      </div>


      {/* ── Team Carousel Gallery ── */}
      <section style={{
        backgroundColor: '#0a0f1a',
        padding: '10rem 0',
        overflow: 'hidden',
      }}>
        {/* Animated Heading */}
        <div className="roster-heading" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 4rem', marginBottom: '6rem' }}>
          {['THE', 'ROSTER'].map((word, i) => (
            <div key={i} style={{ overflow: 'hidden', paddingBottom: '1rem' }}>
              <h2 className="motion-text-line" style={{
                fontFamily: 'var(--font-sevone)',
                fontSize: 'clamp(3.5rem, 12vw, 15rem)',
                fontWeight: 900,
                color: '#F2F6FC',
                lineHeight: 0.85,
                letterSpacing: '-0.02em',
                margin: 0,
              }}>
                {word}
              </h2>
            </div>
          ))}
        </div>

        {/* CSS Keyframes for directional transitions */}
        <style>{`
          @keyframes enterFromLeft {
            0%   { opacity: 0; transform: translateX(-60px) scale(0.92); }
            100% { opacity: 1; transform: translateX(0) scale(1); }
          }
          @keyframes fadeInText {
            0%   { opacity: 0; transform: translateY(16px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          
          /* Mobile Overrides for About Page Hero */
          @media (max-width: 768px) {
            .ceo-section {
              flex-direction: column !important;
              text-align: center;
              padding: 1.5rem !important;
              gap: 0.5rem !important; /* Tighter gap to save vertical space instead of shrinking content */
            }
            .ceo-photo {
              width: 60vw !important; /* Restored to a bold, large size */
              max-width: 280px !important; 
              padding: 0.5rem 0.5rem 2rem 0.5rem !important;
              margin-bottom: 0.5rem !important;
            }
            .ceo-text h2 {
              font-size: clamp(2.5rem, 10vw, 3.5rem) !important; /* Large, impactful heading */
              margin-bottom: 0.5rem !important;
              line-height: 0.9 !important;
            }
            .ceo-text p {
              font-size: clamp(0.95rem, 4vw, 1.15rem) !important; /* Readable, substantial text */
              line-height: 1.45 !important;
            }
            .ceo-text p:last-child {
              margin-top: 1rem !important;
            }
            .hero-row-3 {
              flex-direction: column !important;
              align-items: center !important;
            }
            .roster-heading {
              padding: 0 1.5rem !important;
            }
            .team-roster-grid {
              grid-template-columns: 1fr !important;
              padding: 0 1.5rem !important;
              gap: 2rem !important;
              min-height: auto !important;
            }
            .team-roster-element-left {
              order: 3;
            }
            .team-roster-element-center {
              order: 1;
              height: 55vh !important;
              min-height: 400px;
            }
            .team-roster-element-right {
              order: 2;
            }
            .roster-header-meta {
              display: none !important;
            }
            .roster-thumbnails {
              flex-direction: row !important;
              overflow-x: auto;
              scroll-snap-type: x mandatory;
              padding-bottom: 1rem;
              -webkit-overflow-scrolling: touch;
            }
            .roster-thumbnail-item {
              width: 140px !important;
              height: 90px !important;
              flex-shrink: 0;
              scroll-snap-align: start;
            }
            /* Hide scrollbar for cleaner look */
            .roster-thumbnails::-webkit-scrollbar {
              display: none;
            }
            .roster-thumbnails {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          }
        `}</style>

        {/* ─────────── MOBILE LAYOUT ─────────── */}
        {isMobile ? (
          <div style={{ padding: '0 1.25rem' }}>
            {/* Big portrait */}
            <div style={{
              width: '100%',
              aspectRatio: '3/4',
              overflow: 'hidden',
              borderRadius: '12px',
              boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
              marginBottom: '2rem',
              position: 'relative',
            }}>
              <img
                key={`mob-img-${activeIndex}`}
                src={TEAM[activeIndex].image}
                alt={TEAM[activeIndex].name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  filter: 'grayscale(15%) contrast(1.05)',
                  animation: 'enterFromLeft 0.55s cubic-bezier(0.25,1,0.2,1) forwards',
                }}
              />
              {/* Gradient overlay with counter */}
              <div style={{
                position: 'absolute',
                bottom: 0, left: 0, right: 0,
                padding: '2rem 1.5rem 1.5rem',
                background: 'linear-gradient(to top, rgba(5,7,12,0.9) 0%, transparent 100%)',
              }}>
                <span style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: '0.7rem',
                  color: 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.15em',
                }}>0{activeIndex + 1} / 0{TEAM.length}</span>
              </div>
            </div>

            {/* Name + Role + Quote */}
            <div key={`mob-text-${activeIndex}`} style={{ animation: 'fadeInText 0.55s ease forwards', marginBottom: '2.5rem' }}>
              <h3 style={{
                fontFamily: 'var(--font-sevone)',
                fontSize: 'clamp(2.2rem, 9vw, 3rem)',
                fontWeight: 900,
                color: '#F2F6FC',
                margin: '0 0 0.3rem',
                lineHeight: 1,
              }}>{TEAM[activeIndex].name}</h3>
              <p style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                color: '#4A9EFF',
                letterSpacing: '0.15em',
                fontWeight: 700,
                margin: '0 0 1.25rem',
              }}>{TEAM[activeIndex].role}</p>
              <p style={{
                fontSize: '0.95rem',
                lineHeight: 1.7,
                color: 'rgba(242,246,252,0.72)',
                marginBottom: '1.5rem',
              }}>{TEAM[activeIndex].quote}</p>

              {/* Next button */}
              <button
                onClick={goToNext}
                style={{
                  width: '52px', height: '52px',
                  borderRadius: '50%',
                  backgroundColor: '#12203a',
                  border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            {/* Horizontal snap-scroll thumbnail strip */}
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch' as any,
              paddingBottom: '0.5rem',
              msOverflowStyle: 'none' as any,
              scrollbarWidth: 'none' as any,
            }}>
              {TEAM.map((member, idx) => (
                <div
                  key={member.name}
                  onClick={() => goToIndex(idx)}
                  style={{
                    flexShrink: 0,
                    scrollSnapAlign: 'start',
                    width: '130px',
                    height: '85px',
                    overflow: 'hidden',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    border: idx === activeIndex ? '2px solid #4A9EFF' : '2px solid transparent',
                    transition: 'border-color 0.3s ease',
                    position: 'relative',
                  }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{
                      width: '100%', height: '100%',
                      objectFit: 'cover', objectPosition: 'center top',
                      filter: idx === activeIndex ? 'grayscale(0%) brightness(1)' : 'grayscale(100%) brightness(0.6)',
                      transition: 'filter 0.3s ease',
                    }}
                  />
                  {idx === activeIndex && (
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(5,7,12,0.7) 0%, transparent 60%)',
                      display: 'flex', alignItems: 'flex-end',
                      padding: '0.4rem 0.5rem',
                    }}>
                      <span style={{ fontFamily: 'var(--font-geist-mono)', fontSize: '0.55rem', color: '#4A9EFF', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        Active
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
        // ─────────── DESKTOP LAYOUT ─────────── 
        <div className="team-roster-grid" style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 4rem',
          display: 'grid',
          gridTemplateColumns: '260px 1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
          minHeight: '700px',
        }}>

          {/* ─ LEFT COLUMN: Counter + Thumbnails ─ */}
          <div className="team-roster-element team-roster-element-left" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* Counter + vertical label */}
            <div className="roster-header-meta" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
              <span style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#F2F6FC',
                whiteSpace: 'nowrap',
              }}>
                0{activeIndex + 1} / 0{TEAM.length}
              </span>
              <span style={{
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                whiteSpace: 'nowrap',
              }}>
                The Roster
              </span>
            </div>

            {/* Thumbnail Grid — only non-active members */}
            <div className="roster-thumbnails" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {TEAM.map((member, idx) => (
                idx !== activeIndex && (
                  <div
                    className="roster-thumbnail-item"
                    key={member.name}
                    onClick={() => goToIndex(idx)}
                    style={{
                      width: '100%',
                      height: '80px',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      position: 'relative',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                      borderRadius: '4px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(6px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(74,158,255,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                    }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        filter: 'grayscale(100%) brightness(0.75)',
                        transition: 'filter 0.3s ease',
                      }}
                    />
                    {/* Hover name overlay */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to right, rgba(5,7,12,0.9) 0%, transparent 60%)',
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: '0.75rem',
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-geist-mono)',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        color: '#fff',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                      }}>{member.name}</span>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>

          {/* ─ CENTER COLUMN: Big Active Portrait ─ */}
          {/* overflow: hidden clips the exit animation so it doesn't bleed outside */}
          <div className="team-roster-element team-roster-element-center" style={{
            height: '680px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
            borderRadius: '6px',
          }}>
            <img
              key={`img-${activeIndex}`}  /* key change triggers re-mount → CSS animation plays */
              src={TEAM[activeIndex].image}
              alt={TEAM[activeIndex].name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                filter: 'grayscale(15%) contrast(1.05)',
                animation: 'enterFromLeft 0.65s cubic-bezier(0.25, 1, 0.2, 1) forwards',
              }}
            />
          </div>

          {/* ─ RIGHT COLUMN: Active Member Details ─ */}
          <div className="team-roster-element team-roster-element-right" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div
              key={`text-${activeIndex}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                animation: 'fadeInText 0.65s cubic-bezier(0.25, 1, 0.2, 1) forwards',
              }}
            >
            <h3 style={{
              fontFamily: 'var(--font-sevone)',
              fontSize: 'clamp(2rem, 2.8vw, 3.2rem)',
              fontWeight: 900,
              color: '#F2F6FC',
              margin: '0 0 0.4rem 0',
              lineHeight: 1,
            }}>
              {TEAM[activeIndex].name}
            </h3>
            <p style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '0.72rem',
              textTransform: 'uppercase',
              color: '#4A9EFF',
              letterSpacing: '0.18em',
              margin: '0 0 2.5rem 0',
              fontWeight: 700,
            }}>
              {TEAM[activeIndex].role}
            </p>

            <p style={{
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: 'rgba(242,246,252,0.75)',
              fontWeight: 400,
              marginBottom: '3.5rem',
            }}>
              {TEAM[activeIndex].quote}
            </p>

            {/* Circular Next → button */}
            <button
              onClick={goToNext}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: '#12203a',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: animating ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 24px rgba(0,0,0,0.4)',
                opacity: animating ? 0.6 : 1,
              }}
              onMouseEnter={(e) => {
                if (!animating) {
                  e.currentTarget.style.transform = 'scale(1.12)';
                  e.currentTarget.style.backgroundColor = '#4A9EFF';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = '#12203a';
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        </div>
        )} {/* end isMobile ternary */}
      </section>
          




      <Footer />
    </div>
  );
}

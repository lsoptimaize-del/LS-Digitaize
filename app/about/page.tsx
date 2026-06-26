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
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false); // Prevent rapid clicking during animation

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

      // Editorial text slide-up animation
      const storyTextLines = gsap.utils.toArray<HTMLElement>('.story-text-line');
      storyTextLines.forEach(line => {
        gsap.from(line, {
          y: '120%',
          ease: 'power4.out',
          duration: 1.2,
          scrollTrigger: {
            trigger: line.parentElement,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        });
      });

      // Scatter team animation
      const scatterItems = gsap.utils.toArray<HTMLElement>('.scatter-item');
      scatterItems.forEach((item, index) => {
        gsap.fromTo(item, 
          { y: 150, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
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
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Image curtain reveal animation
      const revealWrappers = gsap.utils.toArray<HTMLElement>('.reveal-image-wrapper');
      revealWrappers.forEach(wrapper => {
        const curtain = wrapper.querySelector('.reveal-curtain');
        const img = wrapper.querySelector('img');
        
        gsap.set(img, { scale: 1.2 }); // slight zoom in initially
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: 'top 80%',
          }
        });
        
        tl.to(curtain, {
          y: '-100%',
          duration: 1,
          ease: 'power3.inOut'
        })
        .to(img, {
          scale: 1,
          duration: 1.5,
          ease: 'power3.out'
        }, "-=1"); // overlap the scale down with the curtain reveal
      });

    }); // removed scope so it searches the whole page

    return () => ctx.revert();
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#C8DFF0' }}>
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

          {/* White Mask with Screen Blend Mode */}
          <div
            ref={maskRef}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#fff',
              mixBlendMode: 'screen',
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
                color: '#000',
                margin: 0,
                fontWeight: 700,
              }}>
                ABOUT US
              </p>
            </div>

            {/* Row 1: WE EXIST */}
            <div style={{
              borderTop: '1px solid rgba(0,0,0,0.12)',
              borderBottom: '1px solid rgba(0,0,0,0.12)',
              display: 'flex',
              justifyContent: 'center',
              padding: '0.5rem 0',
              width: '100%',
            }}>
              <h1 style={{
                fontFamily: 'var(--font-sevone)',
                fontSize: 'clamp(4rem, 12vw, 15rem)',
                fontWeight: 900,
                color: '#000',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                margin: 0,
              }}>
                WE EXIST
              </h1>
            </div>

            {/* Row 2: TO */}
            <div style={{
              borderBottom: '1px solid rgba(0,0,0,0.12)',
              display: 'flex',
              justifyContent: 'center',
              padding: '0.5rem 0',
              width: '100%',
            }}>
              <h1 style={{
                fontFamily: 'var(--font-sevone)',
                fontSize: 'clamp(3rem, 9vw, 11rem)',
                fontWeight: 900,
                color: '#000',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                margin: 0,
              }}>
                TO
              </h1>
            </div>

            {/* Row 3: IGNITE BRANDS */}
            <div style={{
              borderBottom: '1px solid rgba(0,0,0,0.12)',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0.5rem 2rem',
              width: '100%',
            }}>
              <h1 style={{
                fontFamily: 'var(--font-sevone)',
                fontSize: 'clamp(4rem, 12vw, 15rem)',
                fontWeight: 900,
                color: '#000',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                margin: 0,
              }}>
                IGNITE
              </h1>
              <h1 style={{
                fontFamily: 'var(--font-sevone)',
                fontSize: 'clamp(4rem, 12vw, 15rem)',
                fontWeight: 900,
                color: '#000',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                margin: 0,
              }}>
                BRANDS
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* ── New Editorial Story Section ── */}
      <section style={{ backgroundColor: '#fff', padding: '10vh 0', overflow: 'hidden' }}>
        
        {/* Block 1: MASTERS OF DIGITAL CRAFT */}
        <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 2rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          
          {/* Top Text */}
          <div style={{ overflow: 'hidden' }}>
            <h2 className="story-text-line" style={{
              fontFamily: 'var(--font-sevone)',
              fontSize: 'clamp(5rem, 14vw, 18rem)',
              fontWeight: 900,
              color: '#000',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              margin: 0,
            }}>
              MASTERS OF
            </h2>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10vh' }}>
            {/* Left side */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ overflow: 'hidden' }}>
                <h2 className="story-text-line" style={{
                  fontFamily: 'var(--font-sevone)',
                  fontSize: 'clamp(4rem, 10vw, 14rem)',
                  fontWeight: 900,
                  color: '#000',
                  lineHeight: 0.9,
                  letterSpacing: '-0.02em',
                  margin: 0,
                }}>
                  DIGITAL
                </h2>
              </div>
              <div className="reveal-image-wrapper" style={{ width: '15vw', minWidth: '160px', aspectRatio: '3/4', marginTop: '2rem', position: 'relative', overflow: 'hidden' }}>
                <div className="reveal-curtain" style={{ position: 'absolute', inset: 0, backgroundColor: '#000', zIndex: 10, willChange: 'transform' }} />
                <img src="/about-1.png" alt="Digital Workspace" style={{ width: '100%', height: '100%', objectFit: 'cover', willChange: 'transform' }} />
              </div>
              {/* ON below Image 1 */}
              <div style={{ overflow: 'hidden', marginTop: '10vh' }}>
                <h2 className="story-text-line" style={{
                  fontFamily: 'var(--font-sevone)',
                  fontSize: 'clamp(5rem, 12vw, 16rem)',
                  fontWeight: 900,
                  color: '#000',
                  lineHeight: 0.9,
                  letterSpacing: '-0.02em',
                  margin: 0,
                }}>
                  ON
                </h2>
              </div>
            </div>
            
            {/* Right side */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <div style={{ overflow: 'hidden' }}>
                <h2 className="story-text-line" style={{
                  fontFamily: 'var(--font-sevone)',
                  fontSize: 'clamp(4rem, 10vw, 14rem)',
                  fontWeight: 900,
                  color: '#000',
                  lineHeight: 0.9,
                  letterSpacing: '-0.02em',
                  margin: 0,
                }}>
                  CRAFT
                </h2>
              </div>
              <div className="reveal-image-wrapper" style={{ width: '18vw', minWidth: '200px', aspectRatio: '4/5', marginTop: '4rem', position: 'relative', overflow: 'hidden' }}>
                <div className="reveal-curtain" style={{ position: 'absolute', inset: 0, backgroundColor: '#000', zIndex: 10, willChange: 'transform' }} />
                <img src="/about-2.png" alt="Team Collaboration" style={{ width: '100%', height: '100%', objectFit: 'cover', willChange: 'transform' }} />
              </div>
              {/* AND OFF below Image 2 */}
              <div style={{ overflow: 'hidden', marginTop: '10vh' }}>
                <h2 className="story-text-line" style={{
                  fontFamily: 'var(--font-sevone)',
                  fontSize: 'clamp(5rem, 12vw, 16rem)',
                  fontWeight: 900,
                  color: '#000',
                  lineHeight: 0.9,
                  letterSpacing: '-0.02em',
                  margin: 0,
                }}>
                  AND OFF
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Block 2: ON AND OFF THE GRID */}
        <div style={{ maxWidth: '1600px', margin: '20vh auto 0', padding: '0 2rem', display: 'flex', gap: 'clamp(2rem, 5vw, 6rem)', alignItems: 'center' }}>
          {/* Left: Large Image */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <div className="reveal-image-wrapper" style={{ width: '25vw', minWidth: '250px', aspectRatio: '4/5', position: 'relative', overflow: 'hidden' }}>
              <div className="reveal-curtain" style={{ position: 'absolute', inset: 0, backgroundColor: '#000', zIndex: 10, willChange: 'transform' }} />
              <img src="/about-3.png" alt="Abstract Growth" style={{ width: '100%', height: '100%', objectFit: 'cover', willChange: 'transform' }} />
            </div>
          </div>
          
          {/* Right: Stacked Text */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {['THE', 'GRID'].map((word, i) => (
              <div key={i} style={{ 
                overflow: 'hidden', 
                borderBottom: '1px solid rgba(0,0,0,0.12)',
                borderTop: i === 0 ? '1px solid rgba(0,0,0,0.12)' : 'none'
              }}>
                <h2 className="story-text-line" style={{
                  fontFamily: 'var(--font-sevone)',
                  fontSize: 'clamp(5rem, 12vw, 16rem)',
                  fontWeight: 900,
                  color: '#000',
                  lineHeight: 0.9,
                  letterSpacing: '-0.02em',
                  margin: 0,
                  padding: '1rem 0',
                }}>
                  {word}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team Carousel Gallery ── */}
      <section style={{
        backgroundColor: '#fff',
        padding: '8rem 0',
        overflow: 'hidden',
      }}>
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
        `}</style>

        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 4rem',
          display: 'grid',
          gridTemplateColumns: '260px 1fr 1fr', /* Fixed left col for thumbnails, center for image, right for text */
          gap: '4rem',
          alignItems: 'center',
          minHeight: '700px',
        }}>

          {/* ─ LEFT COLUMN: Counter + Thumbnails ─ */}
          <div className="team-roster-element" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* Counter + vertical label */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
              <span style={{
                fontFamily: 'var(--font-geist-mono)',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#1a2744',
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
                color: 'rgba(26,39,68,0.4)',
                whiteSpace: 'nowrap',
              }}>
                The Roster
              </span>
            </div>

            {/* Thumbnail Grid — only non-active members */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {TEAM.map((member, idx) => (
                idx !== activeIndex && (
                  <div
                    key={member.name}
                    onClick={() => goToIndex(idx)}
                    style={{
                      width: '100%',
                      height: '80px',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      position: 'relative',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(6px)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(26,39,68,0.15)';
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
                      background: 'linear-gradient(to right, rgba(26,39,68,0.85) 0%, transparent 60%)',
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
          <div className="team-roster-element" style={{
            height: '680px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 24px 60px rgba(26,39,68,0.12)',
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
          <div className="team-roster-element" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
              color: '#1a2744',
              margin: '0 0 0.4rem 0',
              lineHeight: 1,
            }}>
              {TEAM[activeIndex].name}
            </h3>
            <p style={{
              fontFamily: 'var(--font-geist-mono)',
              fontSize: '0.72rem',
              textTransform: 'uppercase',
              color: '#5688C9',
              letterSpacing: '0.18em',
              margin: '0 0 2.5rem 0',
              fontWeight: 700,
            }}>
              {TEAM[activeIndex].role}
            </p>

            <p style={{
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: 'rgba(26,39,68,0.75)',
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
                backgroundColor: '#1a2744',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: animating ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 24px rgba(26,39,68,0.25)',
                opacity: animating ? 0.6 : 1,
              }}
              onMouseEnter={(e) => {
                if (!animating) {
                  e.currentTarget.style.transform = 'scale(1.12)';
                  e.currentTarget.style.backgroundColor = '#5688C9';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.backgroundColor = '#1a2744';
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        </div>
      </section>
          




      <Footer />
    </div>
  );
}

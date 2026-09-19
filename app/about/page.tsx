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
  { name: 'Bharath', role: 'Creative Director', image: '/bharath.png', quote: '"Design is not just what it looks like and feels like. Design is how it works. We engineer experiences that ignite brands and leave lasting impressions."' },
  { name: 'Prayansh', role: 'Marketing Strategist', image: '/prayansh.png', quote: '"We don\'t just chase trends, we analyze the underlying human behaviors that create them. That is where real, sustainable growth happens."' },
  { name: 'Sahil', role: 'Lead Developer', image: '/sahil.png', quote: '"Code is the invisible architecture of your brand. We build scalable, performant systems that never get in the way of the story."' },
];

export default function AboutPage() {
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const ceoSectionRef = useRef<HTMLDivElement>(null);
  // No carousel state needed for the static 3-column layout

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
          .fromTo('.ceo-photo', { x: -150, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '<')
          .fromTo('.ceo-text', { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '<');
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
    <div style={{ minHeight: '100dvh', background: '#FAFAF7' }}>
      <Navbar />

      {/* ── Scroll-Linked Video Cutout Hero ── */}
      <div ref={heroWrapperRef} style={{ position: 'relative', height: '300vh' }}>
        <div style={{
          position: 'sticky',
          top: 0,
          height: '100dvh',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: '#FAFAF7', // Fallback color before video loads
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

          {/* Light Theme Mask with Screen Blend Mode */}
          <div
            ref={maskRef}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#FAFAF7',
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
                fontSize: 'clamp(4rem, 16vw, 15rem)',
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
                fontSize: 'clamp(3rem, 12vw, 11rem)',
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
            <div className="hero-row-3" style={{
              borderBottom: '1px solid rgba(0,0,0,0.12)',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0.5rem clamp(1rem, 4vw, 2rem)',
              width: '100%',
            }}>
              <h1 className="hero-text-split" style={{
                fontFamily: 'var(--font-sevone)',
                fontWeight: 900,
                color: '#000',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                margin: 0,
              }}>
                IGNITE
              </h1>
              <h1 className="hero-text-split" style={{
                fontFamily: 'var(--font-sevone)',
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
            {/* Left: Professional Portrait */}
            <div className="ceo-photo" style={{
              flex: '0 0 35%',
              maxWidth: '450px',
              padding: '0.5rem',
              backgroundColor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '0',
              boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
              willChange: 'transform, opacity',
            }}>
              <div style={{
                width: '100%',
                aspectRatio: '3/4',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '0',
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
                fontSize: 'clamp(3rem, 7vw, 6rem)',
                color: '#0d1e38',
                marginBottom: '1rem',
                lineHeight: 1,
              }}>
                LEADING THE CHARGE
              </h2>
              <p style={{
                fontSize: 'clamp(1rem, 2vw, 1.75rem)',
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
                fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)'
              }}>
                — Tejas G., Founder & CEO
              </p>
            </div>
          </div>
        </div>
      </div>


      {/* ── Team Roster Grid ── */}
      <section style={{
        backgroundColor: '#FAFAF7',
        padding: '10rem 0',
        overflow: 'hidden',
      }}>
        {/* Animated Heading */}
        <div className="roster-heading" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1.5rem, 4vw, 4rem)', marginBottom: '4rem' }}>
          {['THE', 'ROSTER'].map((word, i) => (
            <div key={i} style={{ overflow: 'hidden', paddingBottom: '1rem' }}>
              <h2 className="motion-text-line" style={{
                fontFamily: 'var(--font-sevone)',
                fontSize: 'clamp(3.5rem, 12vw, 12rem)',
                fontWeight: 900,
                color: '#0A0A0A',
                lineHeight: 0.85,
                letterSpacing: '-0.02em',
                margin: 0,
              }}>
                {word}
              </h2>
            </div>
          ))}
        </div>

        <style>{`
          /* --- Hero Section & CEO Section Restored Styles --- */
          .hero-text-split {
            font-size: clamp(5rem, 10.5vw, 15rem) !important;
          }

          @media (max-width: 768px) {
            .ceo-section {
              flex-direction: column !important;
              text-align: center;
              padding: 1.5rem !important;
              gap: 0.5rem !important;
            }
            .ceo-photo {
              width: 70vw !important;
              max-width: 320px !important; 
              padding: 0.5rem !important;
              margin-bottom: 1rem !important;
            }
            .ceo-text h2 {
              font-size: clamp(2.5rem, 10vw, 3.5rem) !important;
              margin-bottom: 0.5rem !important;
              line-height: 0.9 !important;
            }
            .ceo-text p {
              font-size: clamp(0.95rem, 4vw, 1.15rem) !important;
              line-height: 1.45 !important;
            }
            .ceo-text p:last-child {
              margin-top: 1rem !important;
            }
            .hero-row-3 {
              flex-direction: column !important;
              align-items: center !important;
            }
            .hero-text-split {
              font-size: clamp(5rem, 22vw, 15rem) !important;
            }
          }
          /* --------------------------------------------------- */

          .roster-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 4rem;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 clamp(1.5rem, 4vw, 4rem);
          }
          
          .roster-card {
            position: relative;
            aspect-ratio: 3/4;
            border-radius: 0;
            overflow: hidden;
            box-shadow: 0 12px 30px rgba(0,0,0,0.1);
            transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease, filter 0.5s ease;
            cursor: pointer;
            filter: grayscale(80%) contrast(1.1);
          }
          
          .roster-grid:hover .roster-card {
            filter: grayscale(100%) brightness(0.7) contrast(1.1);
          }
          
          .roster-grid .roster-card:hover {
            transform: translateY(-12px);
            box-shadow: 0 24px 50px rgba(0,0,0,0.25);
            filter: grayscale(0%) brightness(1) contrast(1.1);
            z-index: 10;
          }
          
          .roster-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center top;
            transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          }
          
          .roster-card:hover .roster-img {
            transform: scale(1.05);
          }
          
          .roster-content {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 4rem 2rem 2rem 2rem;
            background: linear-gradient(to top, rgba(5,7,12,0.95) 0%, rgba(5,7,12,0.7) 40%, transparent 100%);
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            transform: translateY(20px);
            transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          }
          
          .roster-card:hover .roster-content {
            transform: translateY(0);
          }

          .roster-quote {
            opacity: 0;
            height: 0;
            overflow: hidden;
            transition: opacity 0.4s ease, height 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          }
          
          .roster-card:hover .roster-quote {
            opacity: 1;
            height: auto;
            margin-top: 1rem;
          }

          @media (max-width: 900px) {
            .roster-grid {
              grid-template-columns: 1fr;
              gap: 3rem;
            }
            .roster-card {
              aspect-ratio: 4/5;
              filter: grayscale(20%) contrast(1.1);
            }
            .roster-grid:hover .roster-card {
              filter: grayscale(20%) contrast(1.1);
            }
            .roster-content {
              transform: translateY(0);
              padding: 6rem 1.5rem 1.5rem 1.5rem;
            }
            .roster-quote {
              opacity: 1;
              height: auto;
              margin-top: 1rem;
            }
          }
        `}</style>

        <div className="roster-grid">
          {TEAM.map((member, idx) => (
            <div className="roster-card team-roster-element" key={member.name}>
              <img src={member.image} alt={member.name} className="roster-img" />
              <div className="roster-content">
                <h3 style={{
                  fontFamily: 'var(--font-sevone)',
                  fontSize: 'clamp(2rem, 3vw, 2.5rem)',
                  fontWeight: 900,
                  color: '#ffffff',
                  margin: '0 0 0.2rem 0',
                  lineHeight: 1,
                }}>
                  {member.name}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-geist-mono)',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  color: '#4A9EFF',
                  letterSpacing: '0.15em',
                  margin: '0',
                  fontWeight: 700,
                }}>
                  {member.role}
                </p>
                <div className="roster-quote">
                  <p style={{
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    color: 'rgba(255,255,255,0.8)',
                    margin: 0,
                  }}>
                    {member.quote}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
          




      <Footer />
    </div>
  );
}

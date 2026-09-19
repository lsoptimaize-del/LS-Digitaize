'use client';

import Link from 'next/link';

const SERVICES = [
  { label: 'Branding & Identity', href: '/services' },
  { label: 'Content Strategy', href: '/services' },
  { label: 'Performance Marketing', href: '/services' },
  { label: 'Social Media', href: '/services' },
  { label: 'Event Curation', href: '/services' },
];

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Twitter', href: 'https://twitter.com' },
];

export default function Footer() {
  return (
    <div style={{ position: 'relative' }}>
      {/* ─ Sticky Background Image Layer ─ */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, width: '100%', height: '100%', 
        zIndex: 1, 
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'flex-end' // This places the image at the bottom of the track in normal flow
      }}>
        <div style={{ 
          position: 'sticky', 
          bottom: 0, // Sticks to the bottom of the viewport
          height: '50vh', 
          width: '100%', 
          overflow: 'hidden',
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent'
        }}>
          {/* We use the custom generated iceberg image with blurred edges */}
          <img 
            src="/footer-icebergs.png" 
            alt="Digitaize Icebergs" 
            style={{ 
              position: 'absolute',
              top: 0, left: 0,
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 90%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 90%)',
              zIndex: 1,
              filter: 'saturate(1.2) contrast(1.1)'
            }} 
          />
          
          {/* Deep blue color overlay to enhance vibrancy without washing out */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(15,45,130,0.6) 0%, rgba(45,120,255,0.2) 100%)',
            mixBlendMode: 'overlay',
            zIndex: 2,
            pointerEvents: 'none'
          }} />
        </div>
      </div>

      {/* ─ Dark Blue Footer (Slides over the image) ─ */}
      <footer style={{
        position: 'relative',
        background: '#FFFFFF',
        overflow: 'hidden',
        paddingTop: 'clamp(2rem, 5vw, 4rem)',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        zIndex: 10,
        borderRadius: '0 0 3rem 3rem', // Curved corners
        boxShadow: '0 40px 100px rgba(0,0,0,0.8)', // Shadow cast on the image below
      }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '1000px',
        height: '400px',
        background: 'radial-gradient(ellipse at top, rgba(74, 158, 255, 0.05), transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 clamp(2rem, 5vw, 4rem)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '4rem',
          marginBottom: 'clamp(2rem, 4vw, 3rem)',
        }}>
          {/* Brand Intro */}
          <div style={{ maxWidth: '400px' }}>
            <Link href="/" style={{
              display: 'inline-block',
              marginBottom: '1.5rem',
            }}>
              <img src="/logo.png" alt="LS Digitaize" style={{ 
                height: '2.5rem', 
                width: 'auto', 
                objectFit: 'contain'
              }} />
            </Link>
            <p style={{
              fontSize: '1rem',
              lineHeight: 1.6,
              color: 'rgba(0, 0, 0, 0.6)',
              marginBottom: '2rem',
            }}>
              Full-spectrum digital marketing for brands that are built to matter. If we see your potential, we'll fight for it.
            </p>
            <Link href="/contact" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1.25rem 2.5rem',
              background: '#0A0A0A',
              color: '#FFFFFF',
              borderRadius: '99px',
              textDecoration: 'none',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = '#4A9EFF';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 12px 30px rgba(74,158,255,0.4)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = '#0A0A0A';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
              }}
            >
              Start a Project <span>→</span>
            </Link>
          </div>

          {/* Links Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '3rem',
          }}>
            {/* Column 1 */}
            <div>
              <h4 style={{
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#4A9EFF',
                marginBottom: '1.5rem',
              }}>
                Navigate
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {NAV.map((item) => (
                  <Link key={item.label} href={item.href} style={{
                    color: 'rgba(0, 0, 0, 0.6)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s',
                    display: 'inline-flex',
                    alignItems: 'center',
                    minHeight: 44,
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#0A0A0A'}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(0, 0, 0, 0.6)'}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 2 */}
            <div>
              <h4 style={{
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#4A9EFF',
                marginBottom: '1.5rem',
              }}>
                Services
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {SERVICES.map((item) => (
                  <Link key={item.label} href={item.href} style={{
                    color: 'rgba(0, 0, 0, 0.6)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s',
                    display: 'inline-flex',
                    alignItems: 'center',
                    minHeight: 44,
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#0A0A0A'}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(0, 0, 0, 0.6)'}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 3 */}
            <div>
              <h4 style={{
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#4A9EFF',
                marginBottom: '1.5rem',
              }}>
                Socials
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {SOCIALS.map((item) => (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer" style={{
                    color: 'rgba(0, 0, 0, 0.6)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s',
                    display: 'inline-flex',
                    alignItems: 'center',
                    minHeight: 44,
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#0A0A0A'}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(0, 0, 0, 0.6)'}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Massive Logo Text */}
        <div style={{
          width: '100%',
          textAlign: 'center',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          paddingBottom: '2.5rem',
          paddingTop: '2rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h2 className="transition-all duration-700 ease-out hover:scale-105" style={{
              fontFamily: 'var(--font-sevone)',
              fontSize: 'clamp(4rem, 15vw, 15rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(0,0,0,0.12)',
              background: 'linear-gradient(to bottom, rgba(10,10,10,0.9), rgba(10,10,10,0.15))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              lineHeight: 0.75,
              letterSpacing: '-0.03em',
              margin: 0,
              cursor: 'default',
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'linear-gradient(to bottom, #4A9EFF, rgba(74,158,255,0.2))';
                (e.currentTarget as HTMLElement).style.webkitBackgroundClip = 'text';
                (e.currentTarget as HTMLElement).style.webkitTextStroke = '1px rgba(74,158,255,0.3)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'linear-gradient(to bottom, rgba(10,10,10,0.9), rgba(10,10,10,0.15))';
                (e.currentTarget as HTMLElement).style.webkitBackgroundClip = 'text';
                (e.currentTarget as HTMLElement).style.webkitTextStroke = '1px rgba(0,0,0,0.12)';
              }}
            >
              LS DIGITAIZE
            </h2>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          padding: '2rem 0',
        }}>
          <span style={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} LS Digitaize. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/privacy" style={{ color: 'rgba(0, 0, 0, 0.4)', textDecoration: 'none', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', minHeight: 44 }}>Privacy Policy</Link>
            <Link href="/terms" style={{ color: 'rgba(0, 0, 0, 0.4)', textDecoration: 'none', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', minHeight: 44 }}>Terms of Service</Link>
          </div>
        </div>
      </div>
      </footer>

      {/* ─ Reveal Spacer ─ */}
      <div style={{ height: '50vh', pointerEvents: 'none' }} />
    </div>
  );
}

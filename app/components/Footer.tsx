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
              zIndex: 1
            }} 
          />
          {/* Off-white brand text in the middle */}
          <h2 style={{
             position: 'relative',
             zIndex: 2,
             fontFamily: 'var(--font-sevone)',
             fontSize: 'clamp(3rem, 8vw, 8rem)',
             color: '#fdfdfd', // off-white
             letterSpacing: '0.05em',
             textShadow: '0 20px 40px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.5)',
             margin: 0
          }}>
             LS DigitAIze
          </h2>
        </div>
      </div>

      {/* ─ Dark Blue Footer (Slides over the image) ─ */}
      <footer style={{
        position: 'relative',
        background: '#050c18', 
        overflow: 'hidden',
        paddingTop: 'clamp(2rem, 5vw, 4rem)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
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
        background: 'radial-gradient(ellipse at top, rgba(139, 234, 221, 0.08), transparent 70%)',
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
              fontFamily: 'var(--font-sevone)',
              fontSize: '1.5rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 900,
              display: 'inline-block',
              marginBottom: '1.5rem',
            }}>
              LS DigitAIze
            </Link>
            <p style={{
              fontSize: '1rem',
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.6)',
              marginBottom: '2rem',
            }}>
              Full-spectrum digital marketing for brands that are built to matter. If we see your potential, we'll fight for it.
            </p>
            <Link href="/contact" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 2rem',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '99px',
              color: '#fff',
              textDecoration: 'none',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              transition: 'background 0.3s, border-color 0.3s',
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255, 255, 255, 0.1)';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255, 255, 255, 0.03)';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255, 255, 255, 0.1)';
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
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#8BEADD',
                marginBottom: '1.5rem',
              }}>
                Navigate
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {NAV.map((item) => (
                  <Link key={item.label} href={item.href} style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s',
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#fff'}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255, 255, 255, 0.6)'}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 2 */}
            <div>
              <h4 style={{
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#8BEADD',
                marginBottom: '1.5rem',
              }}>
                Services
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {SERVICES.map((item) => (
                  <Link key={item.label} href={item.href} style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s',
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#fff'}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255, 255, 255, 0.6)'}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 3 */}
            <div>
              <h4 style={{
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#8BEADD',
                marginBottom: '1.5rem',
              }}>
                Socials
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {SOCIALS.map((item) => (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer" style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.3s',
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#fff'}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255, 255, 255, 0.6)'}
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
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          paddingBottom: '2rem',
        }}>
          <h1 style={{
            fontFamily: 'var(--font-sevone)',
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            lineHeight: 0.8,
            color: 'rgba(255, 255, 255, 0.03)',
            margin: 0,
            whiteSpace: 'nowrap',
            letterSpacing: '-0.02em',
          }}>
            LS DIGITAIZE
          </h1>
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
          <span style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} LS Digitaize. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/privacy" style={{ color: 'rgba(255, 255, 255, 0.4)', textDecoration: 'none', fontSize: '0.8rem' }}>Privacy Policy</Link>
            <Link href="/terms" style={{ color: 'rgba(255, 255, 255, 0.4)', textDecoration: 'none', fontSize: '0.8rem' }}>Terms of Service</Link>
          </div>
        </div>
      </div>
      </footer>

      {/* ─ Reveal Spacer ─ */}
      <div style={{ height: '50vh', pointerEvents: 'none' }} />
    </div>
  );
}

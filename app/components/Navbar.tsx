'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { StaggeredMenu } from './StaggeredMenu';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
  { label: 'Services', ariaLabel: 'View our services', link: '/services' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' },
];

const leftLinks = menuItems.slice(0, 2);
const rightLinks = menuItems.slice(2);

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 60);

      // Scrolling down -> hide, Scrolling up -> show
      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setVisible(true);
      }

      // Always show near the top
      if (currentScrollY <= 60) {
        setVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const logo = (
    <Link
      href="/"
      style={{
        pointerEvents: 'auto',
        display: 'flex',
        alignItems: 'center',
        minHeight: 44,
      }}
    >
      <img 
        src="/logo.png" 
        alt="LS Digitaize" 
        className="h-8 md:h-10 w-auto object-contain"
      />
    </Link>
  );

  return (
    <>
      <nav
        className={`hidden md:grid fixed top-0 w-full z-[100] transition-all duration-300 items-center px-12 h-[72px] ${
          scrolled ? 'bg-[#FAFAF7]/80 backdrop-blur-md border-b border-[#4A9EFF]/15' : 'bg-transparent'
        } ${!visible ? '-translate-y-full' : 'translate-y-0'}`}
        style={{ gridTemplateColumns: '1fr auto 1fr' }}
      >
        <ul className="flex items-center justify-end gap-10">
          {leftLinks.map((item) => (
            <li key={item.label}>
              <Link href={item.link} className="ls-nav-link">{item.label}</Link>
            </li>
          ))}
        </ul>
        <div className="px-10 leading-none">{logo}</div>
        <ul className="flex items-center justify-start gap-10">
          {rightLinks.map((item) => (
            <li key={item.label}>
              <Link href={item.link} className="ls-nav-link">{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="md:hidden">
        <StaggeredMenu
          position="right"
          items={menuItems}
          displaySocials={false}
          displayItemNumbering={true}
          menuButtonColor="#0A0A0A"
          openMenuButtonColor="#0A0A0A"
          changeMenuColorOnOpen={true}
          colors={['rgba(255,255,255,0.97)', 'rgba(250,250,247,0.97)']}
          accentColor="#4A9EFF"
          isFixed={true}
          logo={logo}
          className={`${scrolled ? 'sm-scrolled' : ''} ${!visible ? 'sm-hidden' : ''}`.trim()}
        />
      </div>
      <style>{`
        .ls-nav-link {
          position: relative;
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #0A0A0A;
          opacity: 0.7;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }
        .ls-nav-link:hover { opacity: 1; }
        .ls-nav-link::after {
          content: "";
          position: absolute;
          bottom: -3px;
          left: 0;
          right: 0;
          height: 1px;
          background: #4A9EFF;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.25s ease;
        }
        .ls-nav-link:hover::after { transform: scaleX(1); }
        .staggered-menu-wrapper {
          --sm-panel-bg: rgba(255,255,255,0.98);
          --sm-item-color: #0A0A0A;
        }
        .staggered-menu-wrapper.sm-hidden .staggered-menu-header {
          transform: translateY(-100%);
        }
        .staggered-menu-wrapper.sm-scrolled .staggered-menu-header {
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(74,158,255,0.15);
          padding: 1rem 2.5rem;
        }
        .staggered-menu-header {
          transition: transform 0.4s ease, padding 0.35s ease, background 0.35s ease, backdrop-filter 0.35s ease;
          padding: 1.5rem 2.5rem;
        }
        .staggered-menu-header .sm-logo {
          color: #0A0A0A;
          transition: color 0.3s ease;
        }
        .staggered-menu-wrapper[data-open="true"] .staggered-menu-header .sm-logo {
          color: #0A0A0A;
        }
      `}</style>
    </>
  );
}

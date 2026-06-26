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

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const onScroll = () => {
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

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const logo = (
    <Link
      href="/"
      style={{
        fontFamily: 'var(--font-sevone)',
        fontSize: '0.85rem',
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: 'inherit',
        textDecoration: 'none',
        fontWeight: 900,
        pointerEvents: 'auto',
      }}
    >
      LS DigitAIze
    </Link>
  );

  return (
    <>
      <StaggeredMenu
        position="right"
        items={menuItems}
        displaySocials={false}
        displayItemNumbering={true}
        menuButtonColor="#1a2744"
        openMenuButtonColor="#fff"
        changeMenuColorOnOpen={true}
        colors={['rgba(216,234,245,0.95)', 'rgba(140,205,233,0.95)']}
        accentColor="#8BEADD"
        isFixed={true}
        logo={logo}
        className={`${scrolled ? 'sm-scrolled' : ''} ${!visible ? 'sm-hidden' : ''}`.trim()}
      />
      <style>{`
        .staggered-menu-wrapper {
          --sm-panel-bg: rgba(26,39,68,0.98);
          --sm-item-color: #fff;
        }
        .staggered-menu-wrapper.sm-hidden .staggered-menu-header {
          transform: translateY(-100%);
        }
        .staggered-menu-wrapper.sm-scrolled .staggered-menu-header {
          background: rgba(200,223,240,0.3);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(86,136,201,0.1);
          padding: 1rem 2.5rem;
        }
        .staggered-menu-header {
          transition: transform 0.4s ease, padding 0.35s ease, background 0.35s ease, backdrop-filter 0.35s ease;
          padding: 1.5rem 2.5rem;
        }
        .staggered-menu-header .sm-logo {
          color: #1a2744;
          transition: color 0.3s ease;
        }
        .staggered-menu-wrapper[data-open="true"] .staggered-menu-header .sm-logo {
          color: #fff;
        }
      `}</style>
    </>
  );
}

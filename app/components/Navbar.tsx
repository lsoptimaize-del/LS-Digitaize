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
        pointerEvents: 'auto',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <img 
        src="/logo.png" 
        alt="LS Digitaize" 
        className="h-8 md:h-10 w-auto object-contain"
        style={{ filter: 'drop-shadow(-35px 0 15px rgba(255,255,255,0.9)) drop-shadow(-45px 0 30px rgba(255,255,255,0.5))' }}
      />
    </Link>
  );

  return (
    <>
      <nav
        className={`hidden md:flex fixed top-0 w-full z-[100] transition-all duration-300 items-center justify-between px-10 py-5 ${
          scrolled ? 'bg-[#05070c]/70 backdrop-blur-md border-b border-[#4A9EFF]/15' : 'bg-transparent'
        } ${!visible ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="flex-shrink-0">
          {logo}
        </div>
        <ul className="flex items-center gap-10 text-[10px] font-bold tracking-[0.2em] uppercase text-white/70">
          {menuItems.filter(item => item.label !== 'Contact').map((item) => (
            <li key={item.label}>
              <Link href={item.link} className="hover:text-white transition-colors duration-300">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex-shrink-0">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-7 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] rounded-full text-black bg-[#4A9EFF] hover:bg-[#7EC1F5] transition-all duration-300 shadow-[0_0_20px_rgba(74,158,255,0.4)] hover:shadow-[0_0_25px_rgba(74,158,255,0.6)]"
          >
            Contact Us
          </Link>
        </div>
      </nav>

      <div className="md:hidden">
        <StaggeredMenu
          position="right"
          items={menuItems}
          displaySocials={false}
          displayItemNumbering={true}
          menuButtonColor="#fff"
          openMenuButtonColor="#fff"
          changeMenuColorOnOpen={true}
          colors={['rgba(10,16,30,0.97)', 'rgba(15,25,45,0.97)']}
          accentColor="#4A9EFF"
          isFixed={true}
          logo={logo}
          className={`${scrolled ? 'sm-scrolled' : ''} ${!visible ? 'sm-hidden' : ''}`.trim()}
        />
      </div>
      <style>{`
        .staggered-menu-wrapper {
          --sm-panel-bg: rgba(6,10,20,0.98);
          --sm-item-color: #fff;
        }
        .staggered-menu-wrapper.sm-hidden .staggered-menu-header {
          transform: translateY(-100%);
        }
        .staggered-menu-wrapper.sm-scrolled .staggered-menu-header {
          background: rgba(5,7,12,0.5);
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
          color: #fff;
          transition: color 0.3s ease;
        }
        .staggered-menu-wrapper[data-open="true"] .staggered-menu-header .sm-logo {
          color: #fff;
        }
      `}</style>
    </>
  );
}

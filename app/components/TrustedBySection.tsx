'use client';

import { motion } from 'framer-motion';

const BRANDS = ['AURORA', 'NIMBUS', 'VELVET&CO', 'HALO GROUP', 'MERIDIAN', 'STRATA'];

export default function TrustedBySection() {
  return (
    <section
      style={{
        background: '#000000',
        padding: 'clamp(3rem, 7vh, 5rem) 0',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.3, 1] }}
          style={{
            textAlign: 'center',
            fontSize: '0.7rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(242,246,252,0.4)',
            marginBottom: '2.25rem',
          }}
        >
          Trusted By Brands That Move Fast
        </motion.p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 'clamp(2rem, 6vw, 5rem)',
          }}
        >
          {BRANDS.map((brand, i) => (
            <motion.span
              key={brand}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-sevone)',
                fontSize: 'clamp(1rem, 2vw, 1.4rem)',
                letterSpacing: '0.08em',
                color: 'rgba(242,246,252,0.35)',
                transition: 'color 0.3s ease',
                cursor: 'default',
              }}
              whileHover={{ color: 'rgba(242,246,252,0.85)' }}
            >
              {brand}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

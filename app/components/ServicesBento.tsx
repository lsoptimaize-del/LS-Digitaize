'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SERVICES, SERVICE_KEYFRAMES } from '../data/services';
import { SERVICE_PANEL_TINTS } from '../data/serviceArt';

const MONO = 'var(--font-geist-mono), ui-monospace, monospace';
const DISPLAY = 'var(--font-sevone), serif';

/* Tiles laid out as a bento on desktop (see .svc-b-N rules below). */
const ROW_TILES = [0, 4, 6];
const FRAME_ASPECT: Record<number, string> = { 3: '300 / 250' };

export default function ServicesBento() {
  return (
    <section
      id="services-grid"
      aria-label="Our expertise"
      style={{ background: '#FAFAF7', padding: '72px 0 96px', position: 'relative', scrollMarginTop: 40 }}
    >
      <style>{SERVICE_KEYFRAMES}</style>
      <style>{`
        .svc-bento { display: grid; grid-template-columns: 1fr; gap: 14px; }
        .svc-cell { display: flex; }
        .svc-tile {
          position: relative; flex: 1; display: flex; flex-direction: column; gap: 18px;
          padding: 20px; border-radius: 12px; overflow: hidden; text-decoration: none; color: #0A0A0A;
          border: 1px solid rgba(74,158,255,0.25);
          box-shadow: 0 8px 26px rgba(42,125,225,0.07);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .svc-tile:hover { transform: translateY(-4px); box-shadow: 0 22px 50px rgba(42,125,225,0.22); border-color: rgba(74,158,255,0.7); }
        .svc-tagrow { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .svc-tag { font-family: ${MONO}; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: #2A7DE1; }
        .svc-tag span { color: rgba(10,10,10,0.42); }
        .svc-arrow {
          width: 30px; height: 30px; border-radius: 999px; display: inline-flex; align-items: center; justify-content: center;
          border: 1px solid rgba(74,158,255,0.4); color: #2A7DE1; font-size: 14px; background: rgba(255,255,255,0.7);
        }
        .svc-art { flex: 1; display: flex; align-items: center; justify-content: center; min-height: 0; }
        .svc-frame {
          width: 100%; max-width: 520px; border-radius: 8px; overflow: hidden;
          border: 1px solid rgba(74,158,255,0.22); background: rgba(255,255,255,0.6);
        }
        .svc-name {
          font-family: ${DISPLAY}; font-weight: 400; margin: 0; color: #0A0A0A;
          font-size: clamp(1.15rem, 1.7vw, 1.5rem); line-height: 1.15; letter-spacing: -0.005em;
        }
        .svc-inline-desc { margin: 8px 0 0; font-size: 0.88rem; line-height: 1.55; color: rgba(10,10,10,0.6); }

        .svc-overlay { display: none; }

        @media (min-width: 1024px) {
          .svc-bento { grid-template-columns: repeat(4, 1fr); gap: 16px; }
          .svc-b-0 { grid-column: 1 / span 2; grid-row: 1; }
          .svc-b-1 { grid-column: 3; grid-row: 1; }
          .svc-b-2 { grid-column: 4; grid-row: 1; }
          .svc-b-3 { grid-column: 1; grid-row: 2 / span 2; }
          .svc-b-4 { grid-column: 2 / span 2; grid-row: 2; }
          .svc-b-5 { grid-column: 4; grid-row: 2; }
          .svc-b-6 { grid-column: 2 / span 3; grid-row: 3; }
          .svc-tile.row {
            display: grid; grid-template-columns: 38% 1fr; grid-template-rows: auto 1fr;
            grid-template-areas: "tag art" "name art"; column-gap: 28px; row-gap: 0;
          }
          .svc-tile.row .svc-tagrow { grid-area: tag; align-self: start; }
          .svc-tile.row .svc-art { grid-area: art; justify-content: flex-end; }
          .svc-tile.row .svc-nameblock { grid-area: name; align-self: end; }
          .svc-tile.row .svc-tagrow .svc-arrow { display: none; }
        }

        @media (min-width: 1024px) and (hover: hover) {
          .svc-inline-desc { display: none; }
          .svc-overlay {
            position: absolute; inset: 0; z-index: 3; display: flex; flex-direction: column; justify-content: space-between;
            padding: 24px; color: #fff; opacity: 0; pointer-events: none; transition: opacity 0.35s ease;
            background:
              linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px) 0 0 / 32px 32px,
              linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px) 0 0 / 32px 32px,
              linear-gradient(135deg, #1F5FBF 0%, #2A7DE1 55%, #4A9EFF 100%);
          }
          .svc-tile:hover .svc-overlay { opacity: 1; }
          .svc-overlay .svc-tag { color: #BFE0FF; }
          .svc-overlay .svc-tag span { color: rgba(255,255,255,0.6); }
          .svc-overlay .svc-arrow { border-color: rgba(255,255,255,0.5); color: #fff; background: rgba(255,255,255,0.12); }
          .svc-overlay h3 { font-family: ${DISPLAY}; font-weight: 400; margin: 0 0 10px; font-size: clamp(1.2rem, 1.9vw, 1.7rem); line-height: 1.15; }
          .svc-overlay p { margin: 0 0 16px; font-size: 0.92rem; line-height: 1.6; color: rgba(255,255,255,0.9); max-width: 440px; }
          .svc-overlay .svc-cta {
            display: inline-flex; align-items: center; gap: 8px; align-self: flex-start;
            font-family: ${MONO}; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase;
            padding: 9px 16px; border-radius: 999px; background: #fff; color: #1F5FBF; font-weight: 700;
          }
        }
      `}</style>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(16px, 3.5vw, 48px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, gap: 16 }}>
          <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#2A7DE1' }}>
            Our Expertise
          </span>
          <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.15em', color: 'rgba(10,10,10,0.4)' }}>
            07 DISCIPLINES
          </span>
        </div>

        <div className="svc-bento">
          {SERVICES.map((service, i) => {
            const isRow = ROW_TILES.includes(i);
            const name = service.cardHeading ?? service.title;
            return (
              <motion.div
                key={service.slug}
                className={`svc-cell svc-b-${i}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className={`svc-tile${isRow ? ' row' : ''}`}
                  style={{ background: SERVICE_PANEL_TINTS[i] }}
                >
                  <div className="svc-tagrow">
                    <div className="svc-tag">
                      {service.number} <span>/ {service.category}</span>
                    </div>
                    <span className="svc-arrow">&rarr;</span>
                  </div>

                  <div className="svc-art">
                    <div className="svc-frame" style={{ aspectRatio: FRAME_ASPECT[i] ?? '320 / 160', maxWidth: i === 3 ? 340 : undefined }}>
                      {service.illustration(service.accent, service.accent2)}
                    </div>
                  </div>

                  <div className="svc-nameblock">
                    <h3 className="svc-name">{name}</h3>
                    <p className="svc-inline-desc">{service.description}</p>
                  </div>

                  <div className="svc-overlay" aria-hidden>
                    <div className="svc-tagrow">
                      <div className="svc-tag">
                        {service.number} <span>/ {service.category}</span>
                      </div>
                      <span className="svc-arrow">&rarr;</span>
                    </div>
                    <div>
                      <h3>{name}</h3>
                      <p>{service.description}</p>
                      <span className="svc-cta">Explore service &rarr;</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

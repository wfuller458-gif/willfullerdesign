'use client';
import { useState, useEffect, useCallback } from 'react';

const testimonials = [
  {
    quote: 'Will worked with Full Clarity on two large client projects, mainly on wireframes. His Figma files were tidy and organised, taking an Atomic design approach. Will is a hard worker, very professional, and a good communicator, joining client calls with ideas and suggestions, and on several occasions working late to meet project needs.',
    name: 'Ed Kemp',
    role: 'UX Director & Service Design Lead at Full Clarity | Fractional CXO | Co-Founder at Termly | 2x National Technology Award Winner',
    photo: '/images/profiles/ed.webp',
  },
  {
    quote: 'Will is a highly skilled and creative UX designer. Over the past 2 years collaborating on a new development project, he has produced high quality UX design with a strong understanding of the software development process and technical challenges, allowing us to produce world class products. He has approached every difficult challenge with a positive and professional manner to drive great results.',
    name: 'Sam Cairns',
    role: 'Chapter Lead Onboard HMI Software Development | Jaguar Land Rover',
    photo: '/images/profiles/sam.webp',
  },
  {
    quote: 'We hired Will on a freelance basis… He has the ability to see through the user\'s eyes and create the best experience possible… finding creative solutions with a minimal impact on tech but a maximum impact on functionality and user experience. He proved to work fast, deliver timely, cost effectively and continuously exceed expectations.',
    name: 'Alexander Bunnemann',
    role: 'Founder & Investor',
    photo: '/images/profiles/alex.webp',
  },
  {
    quote: 'It\'s rare that you come across standout talent like William. The work he has done with Figma is exceptional and absolutely crucial for my team... he managed to produce clear, high quality specifications from vague requirements. I fully recommend William his professionalism and excellent skills made him one of the most important people in the JLR product delivery team. He is one of our best assets.',
    name: 'Spiros Bozikis',
    role: 'Lead GUI Software Engineer | Jaguar Land Rover',
    photo: '/images/profiles/spiros.webp',
  },
];

const DURATION = 6000;
const pad = (n: number) => String(n + 1).padStart(2, '0');

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const total = testimonials.length;

  const next = useCallback(() => setActive(p => (p + 1) % total), [total]);
  const prev = useCallback(() => setActive(p => (p - 1 + total) % total), [total]);

  useEffect(() => {
    const t = setTimeout(next, DURATION);
    return () => clearTimeout(t);
  }, [active, next]);

  const t = testimonials[active];

  return (
    <>
      <style>{`
@keyframes ts-fill {
          from { width: 0%; }
          to { width: 100%; }
        }

        @keyframes ts-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .ts-wrap {
          padding: 0 25px 150px;
          margin-top: 150px;
        }

        .ts-rule {
          border: none;
          border-top: 0.5px solid #9C9C9C;
          margin: 0 0 25px 0;
        }

        .ts-inner {
          display: grid;
          grid-template-columns: max-content 1fr;
          column-gap: 100px;
          align-items: start;
        }

        .ts-title {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 32px;
          line-height: 1.2;
          color: #BBB7B4;
          margin: 0;
          white-space: nowrap;
        }

        .ts-right {
          width: 640px;
          margin-left: auto;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .ts-quote {
          font-family: DM Sans, sans-serif;
          font-style: italic;
          font-weight: 300;
          font-size: 32px;
          line-height: 1.3;
          color: var(--brand-black);
          margin: 0;
          min-height: 380px;
          animation: ts-fade-in 0.4s ease forwards;
        }

        .ts-author {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .ts-photo {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
          background-color: #D9D9D9;
        }

        .ts-author-name {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 16px;
          color: var(--brand-black);
          margin: 0;
        }

        .ts-author-role {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 12px;
          color: #9C9C9C;
          margin: 0;
          line-height: 1.4;
        }

        .ts-bar-track {
          width: 100%;
          height: 0.5px;
          background-color: #D9D9D9;
          position: relative;
          border-radius: 1px;
        }

        .ts-bar-fill {
          position: absolute;
          top: -0.75px;
          left: 0;
          height: 2px;
          background-color: var(--brand-black);
          animation: ts-fill ${DURATION}ms linear forwards;
          border-radius: 1px;
        }

        .ts-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .ts-arrows {
          display: flex;
          gap: 12px;
        }

        .ts-arrow {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font-size: 16px;
          color: var(--brand-black);
          opacity: 0.7;
          transition: opacity 0.2s;
        }

        .ts-arrow:hover { opacity: 1; }

        .ts-counter {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 12px;
          color: var(--brand-black);
        }

        @media (max-width: 1024px) {
          .ts-inner { grid-template-columns: 1fr; gap: 40px; }
          .ts-right { width: 100%; }
          .ts-quote { font-size: 22px; }
        }

        @media (max-width: 768px) {
          .ts-wrap { padding: 0 25px 100px; margin-top: 100px; }
          .ts-quote { font-size: 20px; }
        }
      `}</style>

      <div className="ts-wrap">
        <hr className="ts-rule" />
        <div className="ts-inner">
          <h2 className="ts-title">Tangible impact</h2>

          <div className="ts-right">
            <p key={active} className="ts-quote">
              &ldquo;{t.quote}&rdquo;
            </p>

            <div className="ts-author">
              {t.photo
                ? <img src={t.photo} alt={t.name} className="ts-photo" />
                : <div className="ts-photo" />
              }
              <div>
                <p className="ts-author-name">{t.name}</p>
                <p className="ts-author-role">{t.role}</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="ts-bar-track">
                <div key={`bar-${active}`} className="ts-bar-fill" />
              </div>
              <div className="ts-nav">
                <div className="ts-arrows">
                  <button className="ts-arrow" onClick={prev} aria-label="Previous"><img src="/icons/arrow-left.svg" alt="Previous" width={20} height={20} /></button>
                  <button className="ts-arrow" onClick={next} aria-label="Next"><img src="/icons/arrow-right.svg" alt="Next" width={20} height={20} /></button>
                </div>
                <span className="ts-counter">{pad(active)} / {pad(total - 1)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

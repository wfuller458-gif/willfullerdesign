'use client';
import { useState, useEffect, useRef } from 'react';

const stripItems = [
  { src: '/images/About/img_6144-1.jpg',   base: -5, hover: -9  },
  { src: '/images/About/img_9254-1.jpg',   base:  4, hover:  8  },
  { src: '/images/About/img_1793-1.jpg',   base: -8, hover: -4  },
  { src: '/images/About/img_5720-1.jpg',   base:  6, hover: 10  },
  { src: '/images/About/img_6193-1.jpg',   base: -3, hover:  1  },
  { src: '/images/About/img_2150-1.jpg',   base:  7, hover: 11  },
  { src: '/images/About/img_3476-1.jpg',   base: -4, hover: -8  },
  { src: '/images/About/img_1813-1.jpg',   base:  3, hover:  7  },
  { src: '/images/About/img_5659-1.jpg',   base: -6, hover: -2  },
  { src: '/images/About/img_6399-1.jpg',   base:  5, hover:  9  },
  { src: '/images/About/img_1800-1.jpg',   base: -7, hover: -3  },
  { src: '/images/About/img_5674-2-1.jpg', base:  2, hover:  6  },
  { src: '/images/About/img_6242-1.jpg',   base: -2, hover:  2  },
  { src: '/images/About/img_9120-1.jpg',   base:  8, hover:  4  },
  { src: '/images/About/img_2181-1.jpg',   base: -5, hover: -1  },
];

const PolaroidStrip = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number | undefined>(undefined);
  const pausedRef = useRef(false);

  useEffect(() => { pausedRef.current = hoveredIdx !== null; }, [hoveredIdx]);

  useEffect(() => {
    const animate = () => {
      const track = trackRef.current;
      if (track && !pausedRef.current) {
        posRef.current += 0.4;
        const halfWidth = track.scrollWidth / 2;
        if (posRef.current >= halfWidth) posRef.current -= halfWidth;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const doubled = [...stripItems, ...stripItems];

  return (
    <div style={{ marginLeft: '-32px', marginRight: '-32px', overflow: 'hidden', padding: '24px 0' }}>
      <div ref={trackRef} style={{ display: 'flex', alignItems: 'center', willChange: 'transform' }}>
        {doubled.map((item, i) => {
          const isHovered = hoveredIdx === i;
          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                flexShrink: 0,
                marginRight: '8px',
                position: 'relative',
                zIndex: isHovered ? 10 : 1,
                transform: `rotate(${isHovered ? item.hover : item.base}deg) translateY(${isHovered ? -10 : 0}px)`,
                transition: 'transform 600ms cubic-bezier(0.16, 1.2, 0.3, 1)',
                cursor: 'default',
              }}
            >
              <div style={{
                background: 'white',
                padding: '5px 5px 20px',
                borderRadius: '2px',
                boxShadow: isHovered ? '0 12px 28px rgba(0,0,0,0.45)' : '0 2px 10px rgba(0,0,0,0.25)',
                transition: 'box-shadow 600ms ease',
              }}>
                <img src={item.src} alt="" style={{ width: '120px', height: '120px', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const p24 = (text: string) => (
  <p style={{ margin: 0, fontFamily: 'DM Sans, sans-serif', fontWeight: 300, fontSize: '24px', color: 'white', lineHeight: 1.5 }}>{text}</p>
);

export const AboutContent = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    {p24("Hey, I'm Will Fuller, a Senior Product Designer based in Stratford-Upon-Avon, UK. I grew up in Orpington on the edge of London and studied Industrial Design at Loughborough University, graduating with a First Class Honours.")}
    <img
      src="/images/profiles/will-fuller.jpg"
      alt="Will Fuller"
      style={{ width: '100%', display: 'block', borderRadius: '4px' }}
    />
    {p24("From an early age I've always processed the world visually and spatially. I believe it's one of my greatest strengths as a designer, I instinctively see the whole picture before the detail. This philosophy sits at the heart of everything I design I obsess over foundations, sweat the details, and believe great products are the sum of many small things done right.")}
    {p24("Alongside my studies I represented Great Britain at the European U23 Championships in the 5K, coached by legendary coach George Gandy. Years of competitive running and guidance from George taught me something that shapes how I work every day, consistency, discipline, and the understanding that small improvements compound into something exceptional.")}
    {p24("Outside of work I'm usually out with my black Labrador, at the gym, or tinkering on my Golf GTI Edition 30. I love to travel with recent trips to Morocco, Bali and this summer I'm planning a European road trip.")}
    <PolaroidStrip />
  </div>
);

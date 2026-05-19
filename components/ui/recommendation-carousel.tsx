import React from 'react';

interface Recommendation {
  name: string;
  role: string;
  quote: string;
  image: string;
}

const recommendations: Recommendation[] = [
  {
    name: 'Ed Kemp',
    role: 'UX Director & Service Design Lead at Full Clarity | Fractional CXO | Co-Founder at Termly | 2x National Technology Award Winner',
    quote: 'Will worked with Full Clarity on two large client projects, mainly on wireframes. His Figma files were tidy and organised, taking an Atomic design approach. Will is a hard worker, very professional, and a good communicator, joining client calls with ideas and suggestions, and on several occasions working late to meet project needs.',
    image: '/images/profiles/ed.webp',
  },
  {
    name: 'Sam Cairns',
    role: 'Chapter Lead Onboard HMI Software Development | Jaguar Land Rover',
    quote: 'Will is a highly skilled and creative UX designer. Over the past 2 years collaborating on a new development project, he has produced high quality UX design with a strong understanding of the software development process and technical challenges, allowing us to produce world class products. He has approached every difficult challenge with a positive and professional manner to drive great results.',
    image: '/images/profiles/sam.webp',
  },
  {
    name: 'Alexander Bunnemann',
    role: 'Founder & Investor',
    quote: 'We hired Will on a freelance basis… He has the ability to see through the user\'s eyes and create the best experience possible… finding creative solutions with a minimal impact on tech but a maximum impact on functionality and user experience. He proved to work fast, deliver timely, cost effectively and continuously exceed expectations… I can highly recommend William, he is an integral part of our team and wonderful to work with.',
    image: '/images/profiles/alex.webp',
  },
  {
    name: 'Spiros Bozikis',
    role: 'Lead GUI Software Engineer | Jaguar Land Rover',
    quote: 'It\'s rare that you come across standout talent like William. The work he has done with Figma is exceptional and absolutely crucial for my team… he managed to produce clear, high quality specifications from vague requirements. I fully recommend William — his professionalism and excellent skills made him one of the most important people in the JLR product delivery team. He is one of our best assets.',
    image: '/images/profiles/spiros.webp',
  },
];

const RecommendationCard: React.FC<{ rec: Recommendation }> = ({ rec }) => (
  <div style={{
    width: '720px',
    flexShrink: 0,
    border: '0.5px solid #9C9C9C',
    borderRadius: '4px',
    padding: '50px',
    backgroundColor: '#F0F0E9',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    alignSelf: 'stretch',
  }}>
    {/* Header: photo + name + role */}
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      {rec.image
        ? <img src={rec.image} alt={rec.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0, filter: 'grayscale(20%)' }} />
        : <div style={{ width: '100px', height: '100px', backgroundColor: '#D9D9D9', borderRadius: '6px', flexShrink: 0 }} />
      }
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 400,
          fontSize: '18px',
          color: 'var(--brand-black)',
          lineHeight: '1.2',
        }}>
          {rec.name}
        </span>
        <span style={{
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 300,
          fontSize: '14px',
          color: 'var(--brand-black)',
          lineHeight: '1.5',
          opacity: 0.7,
        }}>
          {rec.role}
        </span>
      </div>
    </div>

    {/* Quote */}
    <p style={{
      fontFamily: 'DM Sans, sans-serif',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: '18px',
      lineHeight: '1.6',
      color: 'var(--brand-black)',
      margin: 0,
    }}>
      {rec.quote}
    </p>
  </div>
);

export const RecommendationCarousel: React.FC = () => {
  const items = [...recommendations, ...recommendations];

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <style>{`
        @keyframes scroll-recommendations {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .rec-track {
          display: flex;
          align-items: stretch;
          gap: 16px;
          width: fit-content;
          animation: scroll-recommendations 30s linear infinite;
          padding: 0 16px;
        }

        @media (hover: hover) and (pointer: fine) {
          .rec-track:hover {
            animation-play-state: paused;
          }
        }
      `}</style>
      <div className="rec-track">
        {items.map((rec, i) => (
          <RecommendationCard key={i} rec={rec} />
        ))}
      </div>
    </div>
  );
};

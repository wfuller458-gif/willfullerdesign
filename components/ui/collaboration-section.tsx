'use client';

const logos = [
  { src: '/logos/land-rover.svg',  label: 'Land Rover'    },
  { src: '/logos/jaguar.svg',      label: 'Jaguar'        },
  { src: '/logos/apple.svg',       label: 'Apple CarPlay' },
  { src: '/logos/google.svg',      label: 'Android Auto'  },
  { src: '/logos/tata.svg',        label: 'Tata Motors'   },
  { src: '/logos/tomtom.svg',      label: 'TomTom'        },
  { src: '/logos/full-clarity.svg',label: 'Full Clarity'  },
  { src: '/logos/feed-it-back.svg',label: 'Feed It Back'  },
  { src: '/logos/suru.svg',        label: 'Suru'          },
  { src: '/logos/aim.svg',         label: 'AIMs'          },
];

export function CollaborationSection() {
  return (
    <>
      <style>{`
        .cs-wrap {
          padding: 0 25px;
          margin-top: 0;
        }

        .cs-rule {
          border: none;
          border-top: 0.5px solid #9C9C9C;
          margin: 0 0 25px 0;
        }

        .cs-inner {
          display: grid;
          grid-template-columns: max-content 1fr;
          column-gap: 100px;
          align-items: start;
        }

        .cs-title {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 32px;
          line-height: 1.2;
          color: #BBB7B4;
          margin: 0;
          white-space: nowrap;
        }

        .cs-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          column-gap: 16px;
          row-gap: 32px;
          width: 640px;
          margin-left: auto;
        }

        .cs-logo-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .cs-logo-img {
          width: 110.5px;
          height: 110.5px;
          background-color: #83817F;
          -webkit-mask-size: contain;
          mask-size: contain;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-position: center;
          mask-position: center;
          display: block;
        }

        .cs-logo-label {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 12px;
          color: #83817F;
          text-align: center;
        }

        @media (max-width: 1024px) {
          .cs-inner { grid-template-columns: 1fr; gap: 40px; }
          .cs-grid { grid-template-columns: repeat(5, 1fr); gap: 24px 32px; }
          .cs-logo-img { width: 80px; height: 80px; }
        }

        @media (max-width: 768px) {
          .cs-grid { grid-template-columns: repeat(4, 1fr); }
        }

        @media (max-width: 480px) {
          .cs-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>

      <div className="cs-wrap">
        <hr className="cs-rule" />
        <div className="cs-inner">
          <h2 className="cs-title">In collaboration with</h2>
          <div className="cs-grid">
            {logos.map(({ src, label }) => (
              <div key={label} className="cs-logo-item">
                <div
                  className="cs-logo-img"
                  role="img"
                  aria-label={label}
                  style={{
                    WebkitMaskImage: `url(${src})`,
                    maskImage: `url(${src})`,
                  }}
                />
                <span className="cs-logo-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

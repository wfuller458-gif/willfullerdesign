'use client';

export interface ProjectSummaryBullet {
  text: string;
  icon?: string;
}

export interface ProjectSummaryProps {
  paragraph: string;
  bullets: ProjectSummaryBullet[];
  imageLeft?: string;
  imageRight?: string;
  leftFlex?: number;
  rightFlex?: number;
  imageHeight?: number;
}

export function ProjectSummary({
  paragraph,
  bullets,
  imageLeft = '',
  imageRight = '',
  leftFlex = 361,
  rightFlex = 804,
  imageHeight = 533,
}: ProjectSummaryProps) {
  return (
    <>
      <style>{`
        .ps-wrap {
          margin-top: 150px;
        }

        .ps-summary {
          display: grid;
          grid-template-columns: 260px 1fr;
          column-gap: 100px;
          row-gap: 40px;
          padding: 0 25px;
        }

        .ps-title {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 32px;
          color: #BBB7B4;
          margin: 0;
          line-height: 1.2;
        }

        .ps-content {
          display: flex;
          gap: 100px;
          align-items: flex-start;
        }

        .ps-para {
          flex: 1;
          max-width: 400px;
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 16px;
          line-height: 1.6;
          color: var(--brand-black);
          margin: 0;
        }

        .ps-bullets {
          flex: 1;
          max-width: 400px;
        }

        .ps-bullet {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ps-bullet + .ps-bullet {
          margin-top: 16px;
        }

        .ps-bullet-icon {
          width: 24px;
          height: 24px;
          flex-shrink: 0;
          border: 1px solid #9C9C9C;
          border-radius: 2px;
        }

        .ps-bullet-text {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 12px;
          line-height: 1.5;
          color: var(--brand-black);
        }

        .ps-images {
          display: flex;
          gap: 8px;
          margin-top: 100px;
          margin-right: 25px;
          margin-left: auto;
          width: 90%;
        }

        .ps-img-left {
          border-radius: 4px;
          background-color: #D9D9D9;
        }

        .ps-img-right {
          border-radius: 4px;
          background-color: #D9D9D9;
        }

        @media (max-width: 1024px) {
          .ps-summary { grid-template-columns: 1fr; }
          .ps-images { width: 95%; }
        }

        @media (max-width: 768px) {
          .ps-wrap { margin-top: 80px; }
          .ps-summary { gap: 32px; }
          .ps-content { flex-direction: column; gap: 32px; }
          .ps-images {
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            width: 100%;
            margin: 60px 0 0 0;
            height: auto !important;
            padding-left: 25px;
          }
          .ps-images::-webkit-scrollbar { display: none; }
          .ps-img-left,
          .ps-img-right {
            flex: none !important;
            flex-shrink: 0;
            aspect-ratio: var(--ps-aspect);
            height: 300px;
            width: auto;
            scroll-snap-align: start;
          }
        }
      `}</style>

      <div className="ps-wrap">
        <div className="ps-summary">
          <h2 className="ps-title">Summary</h2>

          <div className="ps-content">
            <p className="ps-para">{paragraph}</p>

            <div className="ps-bullets">
              {bullets.map((b, i) => (
                <div key={i} className="ps-bullet">
                  {b.icon
                    ? <img src={b.icon} alt="" className="ps-bullet-icon" style={{ border: 'none' }} />
                    : <div className="ps-bullet-icon" />
                  }
                  <span className="ps-bullet-text">{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="ps-images" style={{ height: imageHeight }}>
          <div
            className="ps-img-left"
            style={{ flex: leftFlex, '--ps-aspect': leftFlex / imageHeight, backgroundImage: imageLeft ? `url(${imageLeft})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' } as React.CSSProperties}
          />
          <div
            className="ps-img-right"
            style={{ flex: rightFlex, '--ps-aspect': rightFlex / imageHeight, backgroundImage: imageRight ? `url(${imageRight})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' } as React.CSSProperties}
          />
        </div>
      </div>
    </>
  );
}

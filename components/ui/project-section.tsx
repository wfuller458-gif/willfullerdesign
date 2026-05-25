'use client';

export interface ProjectSectionBullet {
  text: string;
  icon?: string;
}

export interface ProjectSectionProps {
  title: string;
  paragraphs: string[];
  bullets: ProjectSectionBullet[];
  image?: string;
  showImage?: boolean;
  imageLabel?: string;
}

export function ProjectSection({
  title,
  paragraphs,
  bullets,
  image = '',
  showImage = true,
  imageLabel,
}: ProjectSectionProps) {
  return (
    <>
      <style>{`
        .psc-wrap {
          margin-top: 150px;
        }

        .psc-grid {
          display: grid;
          grid-template-columns: 260px 1fr;
          column-gap: 100px;
          row-gap: 40px;
          padding: 0 25px;
        }

        .psc-title {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 32px;
          color: #BBB7B4;
          margin: 0;
          line-height: 1.2;
        }

        .psc-content {
          display: flex;
          gap: 100px;
          align-items: flex-start;
        }

        .psc-paragraphs {
          flex: 1;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .psc-paragraphs--wide {
          max-width: 600px;
        }

        .psc-para {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 16px;
          line-height: 1.6;
          color: var(--brand-black);
          margin: 0;
        }

        .psc-bullets {
          flex: 1;
          max-width: 400px;
          display: flex;
          flex-direction: column;
        }

        .psc-bullet {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .psc-bullet + .psc-bullet {
          margin-top: 16px;
        }

        .psc-bullet-icon {
          width: 24px;
          height: 24px;
          flex-shrink: 0;
          border: 1px solid #9C9C9C;
          border-radius: 2px;
        }

        .psc-bullet-text {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 12px;
          line-height: 1.5;
          color: var(--brand-black);
        }

        .psc-image-wrap {
          margin-top: 100px;
          padding: 0 25px;
        }

        .psc-image {
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 4px;
          background-color: #D9D9D9;
          display: block;
          object-fit: cover;
        }

        @media (max-width: 1024px) {
          .psc-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 768px) {
          .psc-wrap { margin-top: 80px; }
          .psc-grid { gap: 32px; }
          .psc-content { flex-direction: column; gap: 32px; }
          .psc-bullets { width: 100%; }
          .psc-image-wrap { margin-top: 60px; padding: 0 16px; }
        }
      `}</style>

      <div className="psc-wrap">
        <div className="psc-grid">
          <h2 className="psc-title">{title}</h2>

          <div className="psc-content">
            <div className={`psc-paragraphs${bullets.length === 0 ? ' psc-paragraphs--wide' : ''}`}>
              {paragraphs.map((p, i) => (
                <p key={i} className="psc-para">{p}</p>
              ))}
            </div>

            <div className="psc-bullets">
              {bullets.map((b, i) => (
                <div key={i} className="psc-bullet">
                  {b.icon
                    ? <img src={b.icon} alt="" style={{ width: 24, height: 24, flexShrink: 0, border: 'none' }} />
                    : <div className="psc-bullet-icon" />
                  }
                  <span className="psc-bullet-text">{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showImage && (
          <div className="psc-image-wrap">
            {image
              ? <img src={image} alt={title} className="psc-image" />
              : <div className="psc-image" />
            }
            {imageLabel && (
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 300, fontSize: 12, color: 'var(--brand-black)', margin: '12px 0 0 0' }}>{imageLabel}</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

'use client';
import { ScrollHintBubble } from '@/components/ui/scroll-hint-bubble';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';

export interface GalleryImage {
  src?: string;
  label: string;
  width: number;
  height: number;
}

export interface GalleryBullet {
  text: string;
  icon?: string;
}

export interface ProjectSectionWithGalleryProps {
  title: string;
  paragraphs: string[];
  bullets: GalleryBullet[];
  images: GalleryImage[];
  galleryHeight?: number;
}

export function ProjectSectionWithGallery({
  title,
  paragraphs,
  bullets,
  images,
  galleryHeight = 460,
}: ProjectSectionWithGalleryProps) {
  const galleryRef = useHorizontalScroll();
  return (
    <>
      <style>{`
        .pswg-wrap {
          margin-top: 150px;
        }

        .pswg-grid {
          display: grid;
          grid-template-columns: 260px 1fr;
          column-gap: 100px;
          row-gap: 40px;
          padding: 0 25px;
        }

        .pswg-title {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 32px;
          color: #BBB7B4;
          margin: 0;
          line-height: 1.2;
        }

        .pswg-content {
          display: flex;
          gap: 100px;
          align-items: flex-start;
        }

        .pswg-paragraphs {
          flex: 1;
          max-width: 580px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .pswg-para {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 16px;
          line-height: 1.6;
          color: var(--brand-black);
          margin: 0;
        }

        .pswg-bullets {
          flex-shrink: 0;
          width: 220px;
          display: flex;
          flex-direction: column;
        }

        .pswg-bullet {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .pswg-bullet + .pswg-bullet {
          margin-top: 16px;
        }

        .pswg-bullet-num {
          width: 24px;
          height: 24px;
          flex-shrink: 0;
          border: 1px solid #9C9C9C;
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 11px;
          color: var(--brand-black);
        }

        .pswg-bullet-text {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 12px;
          line-height: 1.5;
          color: var(--brand-black);
        }

        .pswg-gallery {
          margin-top: 100px;
          overflow-x: auto;
          display: flex;
          gap: 8px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }

        .pswg-gallery::-webkit-scrollbar {
          display: none;
        }

        .pswg-gallery-lead {
          flex-shrink: 0;
          width: calc(10% - 25px);
        }

        .pswg-gallery-item {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .pswg-gallery-img {
          border-radius: 4px;
          background-color: #D9D9D9;
          object-fit: cover;
          display: block;
        }

        .pswg-gallery-label {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 12px;
          color: var(--brand-black);
        }

        .pswg-gallery-spacer {
          flex-shrink: 0;
          width: 25px;
        }

        @media (max-width: 1024px) {
          .pswg-grid { grid-template-columns: 1fr; }
          .pswg-title { grid-column: 1 / -1; }
        }

        @media (max-width: 768px) {
          .pswg-wrap { margin-top: 80px; }
          .pswg-grid { gap: 32px; }
          .pswg-content { flex-direction: column; gap: 32px; }
          .pswg-bullets { width: 100%; }
          .pswg-gallery { margin-top: 60px; scroll-padding-left: 16px; }
          .pswg-gallery-lead { width: 16px; }
          .pswg-gallery-spacer { width: 16px; }
        }
      `}</style>

      <div className="pswg-wrap">
        <div className="pswg-grid">
          <h2 className="pswg-title">{title}</h2>

          <div className="pswg-content">
            <div className="pswg-paragraphs">
              {paragraphs.map((p, i) => (
                <p key={i} className="pswg-para">{p}</p>
              ))}
            </div>

            <div className="pswg-bullets">
              {bullets.map((b, i) => (
                <div key={i} className="pswg-bullet">
                  {b.icon
                    ? <img src={b.icon} alt="" style={{ width: 24, height: 24, flexShrink: 0 }} />
                    : <div className="pswg-bullet-num">{i + 1}</div>
                  }
                  <span className="pswg-bullet-text">{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ScrollHintBubble>
          <div ref={galleryRef} className="pswg-gallery">
            <div className="pswg-gallery-lead" />
            {images.map((img, i) => {
              const imgWidth = Math.round(galleryHeight * (img.width / img.height));
              return (
                <div key={i} className="pswg-gallery-item">
                  {img.src
                    ? <img src={img.src} alt={img.label} className="pswg-gallery-img" style={{ width: imgWidth, height: galleryHeight }} />
                    : <div className="pswg-gallery-img" style={{ width: imgWidth, height: galleryHeight }} />
                  }
                  <span className="pswg-gallery-label">{img.label}</span>
                </div>
              );
            })}
            <div className="pswg-gallery-spacer" />
          </div>
        </ScrollHintBubble>
      </div>
    </>
  );
}

'use client';
import { ScrollHintBubble } from '@/components/ui/scroll-hint-bubble';

export interface GalleryStripImage {
  src?: string;
  label: string;
  width: number;
  height: number;
}

export interface ProjectGalleryStripProps {
  images: GalleryStripImage[];
  galleryHeight?: number;
  reversed?: boolean;
}

export function ProjectGalleryStrip({
  images,
  galleryHeight = 460,
  reversed = false,
}: ProjectGalleryStripProps) {
  return (
    <>
      <style>{`
        .pgs-gallery {
          overflow-x: auto;
          display: flex;
          gap: 8px;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }

        .pgs-gallery::-webkit-scrollbar {
          display: none;
        }

        .pgs-gallery-ltr {
          scroll-padding-left: calc(10% - 25px);
        }

        .pgs-gallery-rtl {
          direction: rtl;
          scroll-padding-right: calc(10% - 25px);
        }

        .pgs-spacer {
          flex-shrink: 0;
          width: calc(10% - 25px);
        }

        .pgs-trail {
          flex-shrink: 0;
          width: 25px;
        }

        .pgs-item {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
          scroll-snap-align: start;
          direction: ltr;
        }

        .pgs-img {
          border-radius: 4px;
          background-color: #D9D9D9;
          object-fit: cover;
          display: block;
        }

        .pgs-label {
          font-family: DM Sans, sans-serif;
          font-weight: 300;
          font-size: 12px;
          color: var(--brand-black);
        }

        @media (max-width: 768px) {
          .pgs-spacer { width: 16px; }
        }
      `}</style>

      <ScrollHintBubble>
        <div className={`pgs-gallery ${reversed ? 'pgs-gallery-rtl' : 'pgs-gallery-ltr'}`}>
          <div className="pgs-spacer" />
          {images.map((img, i) => {
            const imgWidth = Math.round(galleryHeight * (img.width / img.height));
            return (
              <div key={i} className="pgs-item">
                {img.src
                  ? <img src={img.src} alt={img.label} className="pgs-img" style={{ width: imgWidth, height: galleryHeight }} />
                  : <div className="pgs-img" style={{ width: imgWidth, height: galleryHeight }} />
                }
                <span className="pgs-label">{img.label}</span>
              </div>
            );
          })}
          <div className="pgs-trail" />
        </div>
      </ScrollHintBubble>
    </>
  );
}

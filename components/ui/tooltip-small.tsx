'use client';
import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "./icons";
import { useSound } from "@/contexts/sound-context";

export interface TooltipSmallProps {
  title: string;
  image: string;
  href?: string;
  comingSoon?: boolean;
  onClickOverride?: () => void;
}

export function TooltipSmall({ title, image, href, comingSoon = false, onClickOverride }: TooltipSmallProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { playHover, playSelect } = useSound();

  const content = (
    <div
      className="inline-flex items-center rounded gap-8"
      style={{
        backgroundColor: 'var(--brand-black)',
        padding: '8px 8px 8px 16px',
        borderRadius: '4px',
        gap: '32px',
        cursor: href ? 'pointer' : 'default'
      }}
    >
      {/* Left side - Text */}
      <div className="flex flex-col justify-center" style={{ gap: '4px' }}>
        <p
          className="font-display font-light text-2xl whitespace-nowrap"
          style={{ color: 'var(--brand-white)', lineHeight: 'normal' }}
        >
          {title}
        </p>
        {comingSoon ? (
          <p
            className="font-sans font-light text-sm whitespace-nowrap"
            style={{ color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: '20px' }}
          >
            Coming Soon
          </p>
        ) : (
          <div
            className="flex items-center"
            style={{ gap: '4px', cursor: 'pointer' }}
            onMouseEnter={() => { setIsHovered(true); playHover(); }}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              style={{
                position: 'relative',
                overflow: 'hidden',
                display: 'inline-block',
                height: '20px',
                lineHeight: '20px'
              }}
            >
              <p
                className="font-sans font-light text-sm whitespace-nowrap"
                style={{
                  color: 'var(--brand-white)',
                  display: 'inline-block',
                  transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1)',
                  transform: isHovered ? 'translateY(-100%)' : 'translateY(0)',
                  margin: 0,
                  lineHeight: '20px'
                }}
              >
                View Project
              </p>
              <p
                className="font-sans font-light text-sm whitespace-nowrap"
                style={{
                  color: 'var(--brand-white)',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  display: 'inline-block',
                  transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1)',
                  transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
                  margin: 0,
                  lineHeight: '20px'
                }}
              >
                View Project
              </p>
            </div>
            <div
              style={{
                position: 'relative',
                overflow: 'hidden',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '16px',
                height: '16px'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  color: 'var(--brand-white)',
                  transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1)',
                  transform: isHovered ? 'translateX(100%)' : 'translateX(0)'
                }}
              >
                <ArrowRight style={{ width: '16px', height: '16px' }} />
              </div>
              <div
                style={{
                  position: 'absolute',
                  color: 'var(--brand-white)',
                  transition: 'transform 750ms cubic-bezier(0.16, 1.2, 0.3, 1)',
                  transform: isHovered ? 'translateX(0)' : 'translateX(-100%)'
                }}
              >
                <ArrowRight style={{ width: '16px', height: '16px' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right side - Image */}
      <div className="relative shrink-0" style={{ width: '64px', height: '64px', overflow: 'hidden', borderRadius: '2px' }}>
        {image
          ? <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
          : <div className="absolute inset-0" style={{ backgroundColor: '#D9D9D9' }} />
        }
      </div>
    </div>
  );

  if (onClickOverride) {
    return (
      <div onClick={() => { playSelect(); onClickOverride(); }} style={{ cursor: 'pointer' }}>
        {content}
      </div>
    );
  }

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: 'none' }} onClick={playSelect}>
        {content}
      </Link>
    );
  }

  return content;
}

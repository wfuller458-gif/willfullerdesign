"use client";

import { useState } from "react";
import { ArrowRight } from "./icons";

export interface TileAboutProps {
  interactive?: boolean;
}

export function TileAbout({ interactive = true }: TileAboutProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (interactive) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setIsHovered(false);
    }
  };

  return (
    <>
      <style>
        {`
          .tile-about {
            position: relative;
            width: 600px;
            height: 500px;
            background-color: var(--brand-black);
            border: 1px solid var(--brand-black);
            border-radius: 8px;
            overflow: hidden;
          }

          .about-images-container {
            position: absolute;
            left: 50%;
            top: calc(50% + 24px);
            width: 600px;
            height: 452px;
            transform-origin: center center;
            transform: translate(-50%, -50%);
            transition: transform 700ms ease-out;
          }

          .about-image-left {
            position: absolute;
            border-radius: 4px;
            overflow: hidden;
            z-index: 1;
            transition: all 700ms ease-out;
          }

          .about-image-left.hovered {
            left: 52px;
            top: 207px;
            width: 180px;
            height: 180px;
          }

          .about-image-left:not(.hovered) {
            left: 122px;
            top: 177px;
            width: 160px;
            height: 160px;
          }

          .about-image-middle {
            position: absolute;
            border-radius: 4px;
            overflow: hidden;
            z-index: 3;
            transition: all 700ms ease-out;
          }

          .about-image-middle.hovered {
            left: 179px;
            top: 105px;
            width: 240px;
            height: 240px;
          }

          .about-image-middle:not(.hovered) {
            left: 200px;
            top: 126px;
            width: 200px;
            height: 200px;
          }

          .about-image-right {
            position: absolute;
            border-radius: 4px;
            overflow: hidden;
            z-index: 2;
            transition: all 700ms ease-out;
          }

          .about-image-right.hovered {
            left: 357px;
            top: 63px;
            width: 170px;
            height: 170px;
          }

          .about-image-right:not(.hovered) {
            left: 307px;
            top: 113px;
            width: 150px;
            height: 150px;
          }

          @media (max-width: 1280px) {
            .tile-about {
              width: 100%;
              max-width: 600px;
              height: 450px;
            }

            .about-images-container {
              transform: translate(-50%, -50%) scale(0.9);
            }
          }

          @media (max-width: 900px) {
            .tile-about {
              height: 400px;
            }

            .about-images-container {
              transform: translate(-50%, -50%) scale(0.8);
            }
          }

          @media (max-width: 600px) {
            .tile-about {
              height: 350px;
            }

            .about-images-container {
              transform: translate(-50%, -50%) scale(0.7);
            }
          }

          @media (max-width: 480px) {
            .tile-about {
              height: 300px;
            }

            .about-images-container {
              transform: translate(-50%, -50%) scale(0.6);
            }
          }
        `}
      </style>
      <div
        className="tile-about"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
      {/* Dividing line under "About me" */}
      <div
        className="absolute"
        style={{
          left: '0',
          right: '0',
          top: '47px',
          height: '1px',
          backgroundColor: 'var(--brand-white)',
        }}
      />

      {/* "About me" label */}
      <p
        className="absolute font-sans font-light"
        style={{
          left: '11px',
          top: '11px',
          fontSize: '20px',
          lineHeight: 'normal',
          color: 'var(--brand-white)',
        }}
      >
        About me
      </p>

      {/* Arrow icon - white for this tile */}
      <div
        className="absolute"
        style={{
          right: '11px',
          top: '11px',
          width: '24px',
          height: '24px',
          color: 'var(--brand-white)',
        }}
      >
        <ArrowRight style={{ width: '24px', height: '24px', color: 'var(--brand-white)' }} />
      </div>

      {/* Images container - scales as a unit */}
      <div className="about-images-container">
        {/* Left image - bottom left */}
        <div className={`about-image-left ${isHovered ? 'hovered' : ''}`}>
          <img
            src="/images/about/left.png"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Middle image - center, on top */}
        <div className={`about-image-middle ${isHovered ? 'hovered' : ''}`}>
          <img
            src="/images/about/middle.png"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Right image - top right */}
        <div className={`about-image-right ${isHovered ? 'hovered' : ''}`}>
          <img
            src="/images/about/right.png"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </div>
    </>
  );
}

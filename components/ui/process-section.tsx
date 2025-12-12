import React, { useState } from 'react';

export interface ProcessSectionProps {
  defaultProcess?: 'Strategy' | 'Design' | 'Development' | 'Support';
  strategyImage?: string;
  designImage?: string;
  developmentImage?: string;
  supportImage?: string;
  disableHover?: boolean;
  contentOpacity?: number;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({
  defaultProcess = 'Strategy',
  strategyImage = '/images/process/strategy.png',
  designImage = '/images/process/design.png',
  developmentImage = '/images/process/development.png',
  supportImage = '/images/process/support.png',
  disableHover = false,
  contentOpacity = 1
}) => {
  const [internalActiveProcess, setInternalActiveProcess] = useState<'Strategy' | 'Design' | 'Development' | 'Support'>(defaultProcess);

  // Use defaultProcess when disableHover is true, otherwise use internal state
  const activeProcess = disableHover ? defaultProcess : internalActiveProcess;
  const setActiveProcess = disableHover ? () => {} : setInternalActiveProcess;

  const processes = [
    {
      name: 'Strategy' as const,
      description: "Every project begins with understanding your business, where you are today and where you want to be. In the Strategy phase, I take time to learn about your goals, your customers, and the pain points holding your current website back. Together, we identify what's working, what's missing, and what can be improved. This gives us a clear roadmap for building a website that not only looks great, but genuinely supports your business objectives.",
      image: strategyImage
    },
    {
      name: 'Design' as const,
      description: "With a clear strategy in place, I translate our insights into a fully bespoke, custom design that's crafted specifically for your business. Every page, layout, and interaction is purpose built, pixel-perfect, visually engaging, and shaped around the goals we identified together. This isn't just about making something that looks great; it's about creating a design that solves real problems, elevates your brand, and supports your business objectives from the very first click.",
      image: designImage
    },
    {
      name: 'Development' as const,
      description: "Once the design is approved, I bring it to life with code. Every build is crafted to be fast, responsive, and optimised for real-world performance across all devices. I handle everything from setting up the technical foundations to integrating the features your business needs so you end up with a website that not only looks the part but is fast and responsive, and in a format which is easy for you to manage going forwards.",
      image: developmentImage
    },
    {
      name: 'Support' as const,
      description: "After your website goes live, I don't just leave you to handle things on your own. I provide ongoing support to keep everything running smoothly. You'll also get access to a simple, custom dashboard where you can easily update your content and view clear insights and analytics about how your website is performing. It gives you an effortless way to keep your site up to date while I look after all the technical work behind the scenes.",
      image: supportImage
    }
  ];

  const activeProcessData = processes.find(p => p.name === activeProcess)!;

  return (
    <>
      <style>
        {`
          .process-container {
            width: 100%;
            height: 532px;
            max-height: 532px;
            backgroundColor: var(--brand-off-white-200);
            position: relative;
          }

          .process-list {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .process-item {
            display: flex;
            align-items: center;
            gap: 16px;
          }

          .process-name {
            font-family: DM Sans, sans-serif;
            font-size: 64px;
            font-weight: 300;
            line-height: 1.2;
            white-space: nowrap;
            position: relative;
            overflow: hidden;
            display: inline-block;
            height: 77px;
          }

          .process-description {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: calc(50% - 166px);
            width: 300px;
            font-family: DM Sans, sans-serif;
            font-size: 16px;
            font-weight: 300;
            line-height: 1.3;
            color: var(--brand-black);
          }

          .process-image {
            position: absolute;
            right: 16px;
            top: calc(50% - 166px);
            width: 300px;
            aspect-ratio: 300/150;
            border-radius: 4px;
            overflow: hidden;
          }

          /* Medium breakpoint - 2 column + image below text */
          @media (max-width: 1200px) {
            .process-container {
              height: auto;
              min-height: 600px;
              padding: 60px 24px;
              display: grid;
              grid-template-columns: auto 1fr;
              grid-template-rows: auto auto;
              column-gap: 40px;
              row-gap: 24px;
            }

            .process-list {
              position: static;
              transform: none;
              margin-bottom: 0;
              grid-column: 1;
              grid-row: 1 / 3;
            }

            .process-name {
              font-size: 48px;
              height: 58px;
            }

            .process-description {
              position: static;
              transform: none;
              width: 100%;
              margin: 0;
              grid-column: 2;
              grid-row: 1;
            }

            .process-image {
              position: static;
              width: 100%;
              margin: 0;
              grid-column: 2;
              grid-row: 2;
            }
          }

          /* Small breakpoint - stacked layout */
          @media (max-width: 600px) {
            .process-container {
              padding: 100px 24px 40px 24px;
              height: auto;
              max-height: 100%;
              min-height: unset;
              display: flex;
              flex-direction: column;
              justify-content: center;
            }

            .process-list {
              grid-column: unset;
              grid-row: unset;
              margin-bottom: 20px;
            }

            .process-item.inactive {
              display: none;
            }

            .process-name {
              font-size: 36px;
              height: 44px;
            }

            .process-description {
              grid-column: unset;
              grid-row: unset;
              max-width: 100%;
              margin-bottom: 24px;
              font-size: 15px;
              line-height: 1.4;
            }

            .process-image {
              grid-column: unset;
              grid-row: unset;
              max-height: 200px;
            }

            .process-bullet {
              display: none;
            }
          }

          /* Mobile breakpoint - only show active process */
          @media (max-width: 480px) {
            .process-container {
              padding: 100px 16px 24px 16px;
              height: auto;
              max-height: 100%;
              min-height: unset;
            }

            .process-list {
              margin-bottom: 20px;
            }

            .process-item.inactive {
              display: none;
            }

            .process-name {
              font-size: 36px;
              height: 44px;
            }

            .process-description {
              margin-bottom: 20px;
              font-size: 14px;
            }

            .process-image {
              max-width: 100%;
              max-height: 150px;
            }

            .process-bullet {
              display: none;
            }
          }
        `}
      </style>
      <div className="process-container" style={{
        backgroundColor: 'var(--brand-off-white-200)'
      }}>
        {/* Left side - Process list */}
        <div className="process-list">
          {processes.map((process) => (
            <div
              key={process.name}
              onMouseEnter={disableHover ? undefined : () => setActiveProcess(process.name)}
              className={`process-item ${activeProcess === process.name ? 'active' : 'inactive'}`}
              style={{
                cursor: disableHover ? 'default' : 'pointer'
              }}
            >
              <span className="process-name" style={{
                color: activeProcess === process.name ? 'var(--brand-black)' : 'rgba(0, 0, 0, 0.6)'
              }}>
                <span style={{
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                  transition: 'transform 1000ms cubic-bezier(0.16, 1.2, 0.3, 1)',
                  transform: activeProcess === process.name ? 'translateY(-100%)' : 'translateY(0)'
                }}>
                  {process.name}
                </span>
                <span style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                  transition: 'transform 1000ms cubic-bezier(0.16, 1.2, 0.3, 1)',
                  transform: activeProcess === process.name ? 'translateY(0)' : 'translateY(100%)'
                }}>
                  {process.name}
                </span>
              </span>
              {activeProcess === process.name && (
                <div className="process-bullet" style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: 'var(--brand-black)',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: 'var(--brand-white)',
                    lineHeight: 0
                  }}>•</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Center - Description */}
        <div className="process-description" style={{
          opacity: contentOpacity,
          transition: 'opacity 300ms ease-out'
        }}>
          {activeProcessData.description}
        </div>

        {/* Right side - Image */}
        <div className="process-image" style={{
          opacity: contentOpacity,
          transition: 'opacity 300ms ease-out'
        }}>
          {activeProcessData.image && (
            <img
              src={activeProcessData.image}
              alt={activeProcessData.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

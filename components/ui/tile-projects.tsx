"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight } from "./icons";

type ProjectState = "Range Rover" | "Avinya" | "Defender";

export interface TileProjectsProps {
  defaultProject?: ProjectState;
  interactive?: boolean;
}

export function TileProjects({ defaultProject = "Range Rover", interactive = true }: TileProjectsProps) {
  const [activeProject, setActiveProject] = useState<ProjectState>(defaultProject);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const projects: ProjectState[] = ["Range Rover", "Avinya", "Defender"];

  // Auto-cycle through projects
  useEffect(() => {
    if (!isHovering && interactive) {
      intervalRef.current = setInterval(() => {
        setActiveProject((current) => {
          const currentIndex = projects.indexOf(current);
          const nextIndex = (currentIndex + 1) % projects.length;
          return projects[nextIndex];
        });
      }, 3000); // Change project every 3 seconds

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isHovering, interactive]);

  return (
    <>
      <style>
        {`
          .tile-projects {
            position: relative;
            width: 600px;
            height: 500px;
            border: 1px solid var(--brand-black);
            border-radius: 8px;
            overflow: hidden;
          }

          @media (max-width: 1280px) {
            .tile-projects {
              width: 100%;
              max-width: 600px;
              height: 450px;
            }
          }

          @media (max-width: 900px) {
            .tile-projects {
              height: 400px;
            }
          }

          @media (max-width: 600px) {
            .tile-projects {
              height: 350px;
            }
          }

          @media (max-width: 480px) {
            .tile-projects {
              height: 300px;
            }
          }

          .tile-projects-images {
            position: absolute;
            left: 283px;
            top: 63px;
            width: 300px;
          }

          .tile-projects-project-name {
            font-size: 32px;
            line-height: 1.3;
          }

          .tile-projects-image-top {
            width: 100%;
            height: 150px;
            background-color: #d9d9d9;
            border-radius: 4px;
            margin-bottom: 8px;
            background-size: cover;
            background-position: center;
          }

          .tile-projects-image-bottom-row {
            display: flex;
            gap: 8px;
          }

          .tile-projects-image-wide {
            flex: 1;
            height: 150px;
            background-color: #d9d9d9;
            border-radius: 4px;
            background-size: cover;
            background-position: center;
          }

          .tile-projects-image-square {
            width: 110.5px;
            height: 150px;
            background-color: #d9d9d9;
            border-radius: 4px;
            background-size: cover;
            background-position: center;
          }

          @media (max-width: 600px) {
            .tile-projects-images {
              right: 16px;
              left: auto;
              width: calc(100% - 260px);
              max-width: 280px;
            }

            .tile-projects-image-top {
              height: 130px;
            }

            .tile-projects-image-wide {
              height: 130px;
            }

            .tile-projects-image-square {
              width: 95.5px;
              height: 130px;
            }
          }

          @media (max-width: 550px) {
            .tile-projects-images {
              right: 16px;
              left: auto;
              width: calc(100% - 230px);
              max-width: 240px;
            }

            .tile-projects-project-name {
              font-size: 28px;
            }

            .tile-projects-image-top {
              height: 110px;
            }

            .tile-projects-image-wide {
              height: 110px;
            }

            .tile-projects-image-square {
              width: 81px;
              height: 110px;
            }
          }

          @media (max-width: 480px) {
            .tile-projects-images {
              right: 12px;
              left: auto;
              width: calc(100% - 200px);
              max-width: 190px;
            }

            .tile-projects-project-name {
              font-size: 24px;
            }

            .tile-projects-image-top {
              height: 95px;
            }

            .tile-projects-image-wide {
              height: 95px;
            }

            .tile-projects-image-square {
              width: 65px;
              height: 95px;
            }
          }
        `}
      </style>
      <div className="tile-projects">
      {/* Dividing line under "Projects" */}
      <div
        className="absolute"
        style={{
          left: '0',
          right: '0',
          top: '47px',
          height: '1px',
          backgroundColor: 'var(--brand-black)',
        }}
      />

      {/* "Projects" label */}
      <p
        className="absolute font-sans font-light"
        style={{
          left: '11px',
          top: '11px',
          fontSize: '20px',
          lineHeight: 'normal',
          color: 'var(--brand-black)',
        }}
      >
        Projects
      </p>

      {/* Arrow icon */}
      <div
        className="absolute"
        style={{
          right: '11px',
          top: '11px',
          width: '24px',
          height: '24px',
        }}
      >
        <ArrowRight style={{ width: '24px', height: '24px' }} />
      </div>

      {/* Project list */}
      <div
        className="absolute flex flex-col"
        style={{
          left: '15px',
          top: '63px',
          gap: '0px',
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {projects.map((project) => (
          <div
            key={project}
            className="flex items-center"
            style={{
              gap: '10px',
              cursor: 'pointer',
            }}
            onMouseEnter={() => interactive && setActiveProject(project)}
          >
            <p
              className="font-display font-light tile-projects-project-name"
              style={{
                color: activeProject === project ? 'var(--brand-black)' : 'rgba(0, 0, 0, 0.6)',
                transition: 'color 300ms ease',
              }}
            >
              {project}
            </p>
            {activeProject === project && (
              <div
                className="flex items-center justify-center"
                style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: 'var(--brand-black)',
                  borderRadius: '1px',
                }}
              >
                <p
                  className="font-display font-bold"
                  style={{
                    fontSize: '10px',
                    lineHeight: '0',
                    color: 'var(--brand-white)',
                  }}
                >
                  •
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Project images - different for each state */}
      <div
        className="tile-projects-images"
      >
        {activeProject === "Range Rover" && (
          <>
            {/* Top large image */}
            <div
              className="tile-projects-image-top"
              style={{
                backgroundImage: 'url(/images/projects/range-rover/main.jpg)',
              }}
            />

            {/* Bottom row - 2 images */}
            <div className="tile-projects-image-bottom-row">
              <div
                className="tile-projects-image-wide"
                style={{
                  backgroundImage: 'url(/images/projects/range-rover/preview-1.jpg)',
                }}
              />
              <div
                className="tile-projects-image-square"
                style={{
                  backgroundImage: 'url(/images/projects/range-rover/preview-2.jpg)',
                }}
              />
            </div>
          </>
        )}

        {activeProject === "Avinya" && (
          <>
            {/* Top large image */}
            <div
              className="tile-projects-image-top"
              style={{
                backgroundImage: 'url(/images/projects/Avinya/Hero.jpg)',
              }}
            />

            {/* Bottom row - 2 images */}
            <div className="tile-projects-image-bottom-row">
              <div
                className="tile-projects-image-wide"
                style={{
                  backgroundImage: 'url(/images/projects/Avinya/Image%201.png)',
                }}
              />
              <div
                className="tile-projects-image-square"
                style={{
                  backgroundImage: 'url(/images/projects/Avinya/Image%202.png)',
                }}
              />
            </div>
          </>
        )}

        {activeProject === "Defender" && (
          <>
            {/* Top large image */}
            <div
              className="tile-projects-image-top"
              style={{
                backgroundImage: 'url(/images/projects/Defender/Hero.png)',
              }}
            />

            {/* Bottom row - 2 images */}
            <div className="tile-projects-image-bottom-row">
              <div
                className="tile-projects-image-wide"
                style={{
                  backgroundImage: 'url(/images/projects/Defender/image%203.jpg)',
                }}
              />
              <div
                className="tile-projects-image-square"
                style={{
                  backgroundImage: 'url(/images/projects/Defender/image%202.jpg)',
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
    </>
  );
}

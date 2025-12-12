"use client";

import { useState } from "react";
import { ArrowRight } from "./icons";

type ProcessState = "Strategy" | "Design" | "Development" | "Support";

export interface TileProcessProps {
  defaultProcess?: ProcessState;
  interactive?: boolean;
}

export function TileProcess({ defaultProcess = "Strategy", interactive = true }: TileProcessProps) {
  const [activeProcess, setActiveProcess] = useState<ProcessState>(defaultProcess);

  const processes: ProcessState[] = ["Strategy", "Design", "Development", "Support"];

  return (
    <div
      className="relative"
      style={{
        width: '600px',
        height: '500px',
        border: '1px solid var(--brand-black)',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      {/* Dividing line under "Process" */}
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

      {/* "Process" label */}
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
        Process
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

      {/* Process list */}
      <div
        className="absolute flex flex-col"
        style={{
          left: '15px',
          top: '63px',
          gap: '0px',
        }}
      >
        {processes.map((process) => (
          <div
            key={process}
            className="flex items-center"
            style={{
              gap: '10px',
              cursor: 'pointer',
            }}
            onMouseEnter={() => interactive && setActiveProcess(process)}
          >
            <p
              className="font-display font-light capitalize"
              style={{
                fontSize: '32px',
                lineHeight: '1.3',
                color: activeProcess === process ? 'var(--brand-black)' : 'rgba(0, 0, 0, 0.6)',
                transition: 'color 300ms ease',
              }}
            >
              {process}
            </p>
            {activeProcess === process && (
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

      {/* Image layouts - different for each state */}
      <div
        className="absolute"
        style={{
          left: '15px',
          top: '247px',
          width: '568px',
          height: '236px',
        }}
      >
        {activeProcess === "Strategy" && (
          <div className="flex items-center h-full" style={{ gap: '8px' }}>
            {/* Large left image */}
            <div
              className="flex-1"
              style={{
                height: '236px',
                backgroundColor: '#d9d9d9',
                borderRadius: '4px',
              }}
            />
            {/* Right column with 2 images */}
            <div className="flex flex-col h-full" style={{ gap: '8px', width: '113px' }}>
              <div
                style={{
                  height: '113px',
                  backgroundColor: '#d9d9d9',
                  borderRadius: '4px',
                }}
              />
              <div
                className="flex-1"
                style={{
                  backgroundColor: '#d9d9d9',
                  borderRadius: '4px',
                }}
              />
            </div>
          </div>
        )}

        {activeProcess === "Design" && (
          <div className="flex items-center h-full" style={{ gap: '8px' }}>
            {/* Large left image */}
            <div
              className="flex-1"
              style={{
                height: '236px',
                backgroundColor: '#d9d9d9',
                borderRadius: '4px',
              }}
            />
            {/* Right single image */}
            <div
              style={{
                width: '113px',
                height: '236px',
                backgroundColor: '#d9d9d9',
                borderRadius: '4px',
              }}
            />
          </div>
        )}

        {activeProcess === "Development" && (
          <div className="flex items-center h-full" style={{ gap: '8px' }}>
            {/* Large left image */}
            <div
              className="flex-1"
              style={{
                height: '236px',
                backgroundColor: '#d9d9d9',
                borderRadius: '4px',
              }}
            />
            {/* Right column with 3 images */}
            <div className="flex flex-col h-full" style={{ gap: '8px', width: '234px' }}>
              <div className="flex" style={{ gap: '8px', height: '113px' }}>
                <div
                  style={{
                    width: '113px',
                    height: '113px',
                    backgroundColor: '#d9d9d9',
                    borderRadius: '4px',
                  }}
                />
                <div
                  style={{
                    width: '113px',
                    height: '113px',
                    backgroundColor: '#d9d9d9',
                    borderRadius: '4px',
                  }}
                />
              </div>
              <div
                className="flex-1"
                style={{
                  backgroundColor: '#d9d9d9',
                  borderRadius: '4px',
                }}
              />
            </div>
          </div>
        )}

        {activeProcess === "Support" && (
          <div className="flex flex-col h-full" style={{ gap: '8px' }}>
            <div className="flex" style={{ gap: '8px', height: '113px' }}>
              <div
                style={{
                  width: '113px',
                  height: '113px',
                  backgroundColor: '#d9d9d9',
                  borderRadius: '4px',
                }}
              />
              <div
                className="flex-1"
                style={{
                  height: '113px',
                  backgroundColor: '#d9d9d9',
                  borderRadius: '4px',
                }}
              />
            </div>
            <div
              className="flex-1"
              style={{
                backgroundColor: '#d9d9d9',
                borderRadius: '4px',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

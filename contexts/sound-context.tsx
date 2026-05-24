'use client';

import { createContext, useContext, useState, useCallback, useRef } from 'react';

const CDN = 'https://cdn.jsdelivr.net/gh/by-huy/soundlib@fe430a02c684814b53656d4619d2deb50bd52242';

interface SoundContextValue {
  isMuted: boolean;
  toggleMuted: () => void;
  playHover: () => void;
  playSelect: () => void;
}

const SoundContext = createContext<SoundContextValue>({
  isMuted: false,
  toggleMuted: () => {},
  playHover: () => {},
  playSelect: () => {},
});

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const hoverRef = useRef<HTMLAudioElement | null>(null);
  const selectRef = useRef<HTMLAudioElement | null>(null);

  const toggleMuted = useCallback(() => setIsMuted(m => !m), []);

  const getHover = useCallback(() => {
    if (!hoverRef.current) {
      hoverRef.current = new Audio(`${CDN}/tap_05.wav`);
      hoverRef.current.volume = 0.4;
    }
    return hoverRef.current;
  }, []);

  const getSelect = useCallback(() => {
    if (!selectRef.current) {
      selectRef.current = new Audio(`${CDN}/select.wav`);
      selectRef.current.volume = 0.4;
    }
    return selectRef.current;
  }, []);

  const playHover = useCallback(() => {
    if (isMuted) return;
    const audio = getHover();
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }, [isMuted, getHover]);

  const playSelect = useCallback(() => {
    if (isMuted) return;
    const audio = getSelect();
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }, [isMuted, getSelect]);

  return (
    <SoundContext.Provider value={{ isMuted, toggleMuted, playHover, playSelect }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}

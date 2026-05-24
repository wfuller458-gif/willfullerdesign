'use client';

import { createContext, useContext, useState, useCallback, useRef } from 'react';

const CDN = 'https://cdn.jsdelivr.net/gh/by-huy/soundlib@fe430a02c684814b53656d4619d2deb50bd52242';

interface SoundContextValue {
  isMuted: boolean;
  toggleMuted: () => void;
  playHover: () => void;
  playSelect: () => void;
  playPinSuccess: () => void;
  playPinError: () => void;
}

const SoundContext = createContext<SoundContextValue>({
  isMuted: false,
  toggleMuted: () => {},
  playHover: () => {},
  playSelect: () => {},
  playPinSuccess: () => {},
  playPinError: () => {},
});

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const hoverRef = useRef<HTMLAudioElement | null>(null);
  const selectRef = useRef<HTMLAudioElement | null>(null);
  const pinSuccessRef = useRef<HTMLAudioElement | null>(null);
  const pinErrorRef = useRef<HTMLAudioElement | null>(null);

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

  const getPinSuccess = useCallback(() => {
    if (!pinSuccessRef.current) {
      pinSuccessRef.current = new Audio('/sounds/pin-success.mp3');
      pinSuccessRef.current.volume = 0.5;
    }
    return pinSuccessRef.current;
  }, []);

  const getPinError = useCallback(() => {
    if (!pinErrorRef.current) {
      pinErrorRef.current = new Audio('/sounds/pin-error.mp3');
      pinErrorRef.current.volume = 0.5;
    }
    return pinErrorRef.current;
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

  const playPinSuccess = useCallback(() => {
    if (isMuted) return;
    const audio = getPinSuccess();
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }, [isMuted, getPinSuccess]);

  const playPinError = useCallback(() => {
    if (isMuted) return;
    const audio = getPinError();
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }, [isMuted, getPinError]);

  return (
    <SoundContext.Provider value={{ isMuted, toggleMuted, playHover, playSelect, playPinSuccess, playPinError }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}

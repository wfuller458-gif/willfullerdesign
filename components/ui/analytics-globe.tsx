'use client';

import { useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import Map, { Marker } from 'react-map-gl/mapbox';
import type { MapRef } from 'react-map-gl/mapbox';
import type { StyleSpecification, FogSpecification } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { Session } from '@/lib/types';
import type { Planet } from './planet-style';

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;
const DEFAULT_VIEW = { longitude: 0, latitude: 25, zoom: 1.8 };

const FOG: Record<Planet, FogSpecification> = {
  earth: {
    color: 'rgb(186, 210, 235)',
    'high-color': 'rgb(36, 92, 223)',
    'horizon-blend': 0.02,
    'space-color': 'rgb(11, 11, 25)',
    'star-intensity': 0.6,
  },
  mars: {
    color: 'rgb(226, 162, 122)',
    'high-color': 'rgb(168, 84, 56)',
    'horizon-blend': 0.02,
    'space-color': 'rgb(20, 10, 12)',
    'star-intensity': 0.6,
  },
  // Airless body — a faint silvery-grey glow rather than a "real" atmosphere.
  moon: {
    color: 'rgb(196, 198, 204)',
    'high-color': 'rgb(110, 114, 130)',
    'horizon-blend': 0.015,
    'space-color': 'rgb(8, 8, 16)',
    'star-intensity': 0.7,
  },
  // Sun-blasted and airless — warm, stark, slightly brighter starfield.
  mercury: {
    color: 'rgb(214, 192, 168)',
    'high-color': 'rgb(150, 120, 96)',
    'horizon-blend': 0.015,
    'space-color': 'rgb(16, 11, 9)',
    'star-intensity': 0.75,
  },
};

function getFlagEmoji(code: string): string {
  if (!code || code.length !== 2) return '🌍';
  return code.toUpperCase().replace(/./g, c => String.fromCodePoint(127397 + c.charCodeAt(0)));
}

const COLORS = ['#6366f1', '#ec4899', '#14b8a6', '#f59e0b', '#3b82f6', '#8b5cf6', '#10b981', '#f97316'];
const avatarColor = (id: string) => COLORS[id.charCodeAt(0) % COLORS.length];

interface Props {
  sessions: Session[];
  selected: Session | null;
  onSelect: (s: Session | null) => void;
  mapStyle: string | StyleSpecification;
  planet: Planet;
}

export interface AnalyticsGlobeHandle {
  resetView: () => void;
}

export const AnalyticsGlobe = forwardRef<AnalyticsGlobeHandle, Props>(
  function AnalyticsGlobe({ sessions, selected, onSelect, mapStyle, planet }, ref) {
    const mapRef = useRef<MapRef>(null);
    // Swapping mapStyle replaces the whole style, which resets projection/fog —
    // a ref keeps the style.load listener (registered once on initial load)
    // reading the *current* planet rather than the one from when it was attached.
    const planetRef = useRef(planet);
    planetRef.current = planet;

    useImperativeHandle(ref, () => ({
      resetView: () => {
        mapRef.current?.flyTo({ center: [DEFAULT_VIEW.longitude, DEFAULT_VIEW.latitude], zoom: DEFAULT_VIEW.zoom, duration: 1200 });
      },
    }));

    const applyGlobeSettings = useCallback(() => {
      const map = mapRef.current?.getMap();
      if (!map) return;
      // @ts-ignore — setProjection is available in mapbox-gl v3
      map.setProjection('globe');
      map.setFog(FOG[planetRef.current]);
    }, []);

    const handleLoad = useCallback(() => {
      const map = mapRef.current?.getMap();
      if (!map) return;
      applyGlobeSettings();
      // Re-apply on every subsequent style swap (e.g. Earth <-> Mars toggle),
      // since setStyle() replaces projection/fog along with the rest of the style.
      map.on('style.load', applyGlobeSettings);
    }, [applyGlobeSettings]);

    // Only plot sessions with a real location
    const locatedSessions = sessions.filter(s => s.lat !== 0 || s.lng !== 0);

    return (
      <Map
        ref={mapRef}
        mapboxAccessToken={TOKEN}
        initialViewState={DEFAULT_VIEW}
        style={{ width: '100vw', height: '100vh' }}
        mapStyle={mapStyle}
        onLoad={handleLoad}
        onClick={() => onSelect(null)}
      >
        {locatedSessions.map(s => (
          <Marker
            key={s.id}
            longitude={s.lng}
            latitude={s.lat}
            anchor="center"
            onClick={e => { e.originalEvent.stopPropagation(); onSelect(s); }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: avatarColor(s.id),
                border: `2.5px solid ${selected?.id === s.id ? '#fff' : 'rgba(255,255,255,0.75)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 17,
                cursor: 'pointer',
                boxShadow: `0 0 ${selected?.id === s.id ? '18px' : '8px'} ${avatarColor(s.id)}bb`,
                transform: selected?.id === s.id ? 'scale(1.35)' : 'scale(1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
            >
              {getFlagEmoji(s.countryCode)}
            </div>
          </Marker>
        ))}
      </Map>
    );
  }
);

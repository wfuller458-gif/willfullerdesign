'use client';

import { useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import Map, { Marker } from 'react-map-gl/mapbox';
import type { MapRef } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { Session } from '@/lib/types';

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;
const DEFAULT_VIEW = { longitude: 0, latitude: 25, zoom: 1.8 };

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
  mapStyle: string;
}

export interface AnalyticsGlobeHandle {
  resetView: () => void;
}

export const AnalyticsGlobe = forwardRef<AnalyticsGlobeHandle, Props>(
  function AnalyticsGlobe({ sessions, selected, onSelect, mapStyle }, ref) {
    const mapRef = useRef<MapRef>(null);

    useImperativeHandle(ref, () => ({
      resetView: () => {
        mapRef.current?.flyTo({ center: [DEFAULT_VIEW.longitude, DEFAULT_VIEW.latitude], zoom: DEFAULT_VIEW.zoom, duration: 1200 });
      },
    }));

    const handleLoad = useCallback(() => {
      const map = mapRef.current?.getMap();
      if (!map) return;
      // @ts-ignore — setProjection is available in mapbox-gl v3
      map.setProjection('globe');
      map.setFog({
        color: 'rgb(186, 210, 235)',
        'high-color': 'rgb(36, 92, 223)',
        'horizon-blend': 0.02,
        'space-color': 'rgb(11, 11, 25)',
        'star-intensity': 0.6,
      });
    }, []);

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

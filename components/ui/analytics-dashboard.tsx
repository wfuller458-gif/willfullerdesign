'use client';

import { useState, useRef } from 'react';
import type { Session } from '@/lib/types';
import { AnalyticsGlobe } from './analytics-globe';
import type { AnalyticsGlobeHandle } from './analytics-globe';
import { PLANETS, PLANET_STYLE, PLANET_LABEL } from './planet-style';
import type { Planet } from './planet-style';

const nextPlanet = (p: Planet): Planet => PLANETS[(PLANETS.indexOf(p) + 1) % PLANETS.length];

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (d > 0) return `${d}d ago`;
  if (h > 0) return `${h}h ago`;
  if (m > 0) return `${m}m ago`;
  return 'just now';
}

function getFlagEmoji(code: string): string {
  if (!code || code.length !== 2) return '🌍';
  return code
    .toUpperCase()
    .replace(/./g, c => String.fromCodePoint(127397 + c.charCodeAt(0)));
}

function DeviceIcon({ device }: { device: string }) {
  if (device === 'mobile') return <span title="Mobile">📱</span>;
  return <span title="Desktop">💻</span>;
}

interface Props {
  sessions: Session[];
}

export function AnalyticsDashboard({ sessions: initialSessions }: Props) {
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [selected, setSelected] = useState<Session | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [planet, setPlanet] = useState<Planet>('earth');
  const globeRef = useRef<AnalyticsGlobeHandle>(null);

  const deleteSession = async (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    if (selected?.id === id) setSelected(null);
    await fetch('/api/analytics-delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: id }),
    });
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0a0a1a', position: 'relative', overflow: 'hidden' }}>

      {/* Globe */}
      <AnalyticsGlobe ref={globeRef} sessions={sessions} selected={selected} onSelect={setSelected} mapStyle={PLANET_STYLE[planet]} planet={planet} />

      {/* Stats chip — top left */}
      <div style={{
        position: 'absolute', top: 24, left: 24,
        background: 'rgba(10,10,30,0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 12, padding: '10px 16px',
        color: '#fff', fontSize: 13, display: 'flex', gap: 16, alignItems: 'center',
      }}>
        <a href="https://willfullerdesign.com" style={{ color: '#a5b4fc', fontWeight: 600, textDecoration: 'none' }}>willfullerdesign.com</a>
        <span style={{ color: '#888' }}>·</span>
        <span>
          <span style={{ color: '#4ade80', fontWeight: 600 }}>{sessions.length}</span>
          <span style={{ color: '#888' }}> sessions</span>
        </span>
        <span style={{ color: '#888' }}>·</span>
        <button
          onClick={() => globeRef.current?.resetView()}
          title="Reset view"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#94a3b8', fontSize: 15, padding: 0, lineHeight: 1,
            display: 'flex', alignItems: 'center', gap: 4,
          }}
        >
          ⊙ Reset
        </button>
        <span style={{ color: '#888' }}>·</span>
        <button
          onClick={() => setPlanet(nextPlanet)}
          title="Switch globe surface"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#94a3b8', fontSize: 13, padding: 0, lineHeight: 1,
            display: 'flex', alignItems: 'center', gap: 5,
          }}
        >
          {PLANET_LABEL[planet]}
        </button>
      </div>

      {/* Selected session detail — top right */}
      {selected && (
        <div style={{
          position: 'absolute', top: 24, right: 24, width: 280,
          background: 'rgba(10,10,30,0.92)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 16, padding: 20, color: '#fff',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 18 }}>{getFlagEmoji(selected.countryCode)} <strong>{selected.city}</strong></div>
              <div style={{ color: '#888', fontSize: 12, marginTop: 2 }}>{selected.country}</div>
            </div>
            <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: 18, lineHeight: 1 }}>✕</button>
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 14, fontSize: 12, color: '#888' }}>
            <DeviceIcon device={selected.device} />
            <span style={{ textTransform: 'capitalize' }}>{selected.device}</span>
            <span>·</span>
            <span>{timeAgo(selected.lastSeen)}</span>
          </div>

          {selected.referrer && (
            <div style={{ marginBottom: 12, fontSize: 12, color: '#94a3b8' }}>
              <span style={{ color: '#64748b' }}>From: </span>
              <span style={{ wordBreak: 'break-all' }}>
                {selected.referrer.replace(/^https?:\/\//, '').split('/')[0] || 'direct'}
              </span>
            </div>
          )}

          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>Pages visited</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {selected.pages.map((p, i) => (
              <div key={p} style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: 6, padding: '5px 10px',
                fontSize: 12, color: '#e2e8f0',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ color: '#4f46e5', fontWeight: 600, minWidth: 16 }}>{i + 1}</span>
                {p}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Session list — bottom left */}
      <div style={{
        position: 'absolute', bottom: 24, left: 24, width: 300,
        maxHeight: '50vh',
        background: 'rgba(10,10,30,0.88)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 16, overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', fontSize: 11, color: '#64748b', letterSpacing: 1, textTransform: 'uppercase' }}>
          Recent Sessions
        </div>
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {sessions.length === 0 && (
            <div style={{ padding: 20, color: '#555', fontSize: 13, textAlign: 'center' }}>
              No sessions yet — deploy to start tracking.
            </div>
          )}
          {sessions.map(s => (
            <div
              key={s.id}
              onClick={() => setSelected(s)}
              onMouseEnter={() => setHoveredId(s.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                padding: '10px 16px',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                cursor: 'pointer',
                background: selected?.id === s.id ? 'rgba(99,102,241,0.15)' : hoveredId === s.id ? 'rgba(255,255,255,0.04)' : 'transparent',
                display: 'flex', alignItems: 'center', gap: 10,
                transition: 'background 0.15s',
                position: 'relative',
              }}
            >
              <span style={{ fontSize: 20 }}>{getFlagEmoji(s.countryCode)}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, color: '#e2e8f0', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {s.city}, {s.country}
                </div>
                <div style={{ fontSize: 11, color: '#64748b', marginTop: 1 }}>
                  {s.pages.length} page{s.pages.length !== 1 ? 's' : ''} · {timeAgo(s.lastSeen)}
                </div>
              </div>
              {hoveredId === s.id ? (
                <button
                  onClick={e => { e.stopPropagation(); deleteSession(s.id); }}
                  style={{
                    background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)',
                    borderRadius: 6, color: '#f87171', cursor: 'pointer',
                    fontSize: 11, padding: '3px 7px', flexShrink: 0,
                  }}
                >✕</button>
              ) : (
                <DeviceIcon device={s.device} />
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

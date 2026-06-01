'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function AnalyticsLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const r = await fetch('/api/analytics-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (r.ok) {
      router.refresh();
    } else {
      setError('Wrong password');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a1a' }}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
        <p style={{ color: '#888', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>
          Analytics
        </p>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          style={{
            background: '#1a1a2e',
            border: '1px solid #333',
            borderRadius: 8,
            padding: '10px 16px',
            color: '#fff',
            fontSize: 16,
            outline: 'none',
            width: 220,
          }}
        />
        {error && <p style={{ color: '#f87171', fontSize: 13 }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? '#333' : '#4f46e5',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 32px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: 14,
            width: '100%',
          }}
        >
          {loading ? '...' : 'Enter'}
        </button>
      </form>
    </div>
  );
}

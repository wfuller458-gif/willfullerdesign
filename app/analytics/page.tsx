import { cookies } from 'next/headers';
import { AnalyticsLogin } from '@/components/ui/analytics-login';
import { AnalyticsDashboard } from '@/components/ui/analytics-dashboard';
import type { Session } from '@/lib/types';

export const dynamic = 'force-dynamic';

async function getSessions(): Promise<Session[]> {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return [];
  try {
    const { kv } = await import('@vercel/kv');
    const ids = await kv.zrange<string[]>('sessions', 0, -1, { rev: true });
    if (!ids.length) return [];
    const raw = await Promise.all(ids.map(id => kv.get<Session>(`session:${id}`)));
    return raw.filter(Boolean) as Session[];
  } catch {
    return [];
  }
}

export default async function AnalyticsPage() {
  const cookieStore = await cookies();
  const auth = cookieStore.get('analytics-auth');

  if (auth?.value !== 'granted') {
    return <AnalyticsLogin />;
  }

  const sessions = await getSessions();
  return <AnalyticsDashboard sessions={sessions} />;
}

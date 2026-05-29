import type { Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#1e1e1c',
};

export default function DarkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

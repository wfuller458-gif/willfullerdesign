import type { Viewport } from 'next';
import { DarkPageBackground } from '@/components/ui/dark-page-background';

export const viewport: Viewport = {
  themeColor: '#1e1e1c',
};

export default function DarkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DarkPageBackground />
      {children}
    </>
  );
}

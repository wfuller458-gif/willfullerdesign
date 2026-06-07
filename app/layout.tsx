import type { Metadata, Viewport } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { LoadingProvider } from "@/contexts/loading-context";
import { SoundProvider } from "@/contexts/sound-context";
import { PanelProvider } from "@/contexts/panel-context";
import { ScrollReset } from "@/components/ui/scroll-reset";
import { PageTracker } from "@/components/ui/page-tracker";
import { GlobeAnalyticsTracker } from "@/components/ui/globe-analytics-tracker";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  themeColor: '#f7f7f0',
};

export const metadata: Metadata = {
  title: "Will Fuller Portfolio",
  description: "UX / Product Designer specializing in digital experiences, design systems, and emerging AI tools.",
  appleWebApp: {
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ backgroundColor: '#f7f7f0' }}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `history.scrollRestoration = 'manual';` }} />
      </head>
      <body
        className={`${inter.variable} ${dmSans.variable} antialiased`}
        style={{ fontFamily: 'var(--font-inter)', backgroundColor: '#f7f7f0' }}
      >
        <ScrollReset />
        <PageTracker />
        <GlobeAnalyticsTracker />
        <SoundProvider>
          <LoadingProvider>
            <PanelProvider>
              <LoadingScreen />
              {children}
            </PanelProvider>
          </LoadingProvider>
        </SoundProvider>
      </body>
    </html>
  );
}

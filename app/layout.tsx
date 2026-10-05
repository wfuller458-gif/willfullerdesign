import type { Metadata, Viewport } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { LoadingProvider } from "@/contexts/loading-context";
import { SoundProvider } from "@/contexts/sound-context";
import { PanelProvider } from "@/contexts/panel-context";
import { ScrollReset } from "@/components/ui/scroll-reset";

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

// Globe Analytics: separate snippet per site so freelance and job-hunt
// visitors land in separate dashboards.
const FREELANCE_KEY = "ga_WPDGM0k6WthqRFFLN6lvnkTCVO2-2BL6";
const PORTFOLIO_KEY = "ga_eJ8brkD0k1nhLwG43h8oLtXv48yB3kNq";
const ANALYTICS_LOADER = `(function(){
  var key = location.hostname.indexOf('portfolio.') === 0 ? ${JSON.stringify(PORTFOLIO_KEY)} : ${JSON.stringify(FREELANCE_KEY)};
  if (!key) return;
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://globe-analytics-will-fullers-projects.vercel.app/snippet.js?key=' + key;
  document.head.appendChild(s);
})();`;

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
        <script dangerouslySetInnerHTML={{ __html: ANALYTICS_LOADER }} />
      </head>
      <body
        className={`${inter.variable} ${dmSans.variable} antialiased`}
        style={{ fontFamily: 'var(--font-inter)', backgroundColor: '#f7f7f0' }}
      >
        <ScrollReset />
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

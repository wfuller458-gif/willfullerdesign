import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import { LoadingScreen } from "@/components/ui/loading-screen";

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

export const metadata: Metadata = {
  title: "Will Fuller Portfolio",
  description: "UX / Product Designer specializing in digital experiences, design systems, and emerging AI tools.",
  themeColor: "#f7f7f0",
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
      <body
        className={`${inter.variable} ${dmSans.variable} antialiased`}
        style={{ fontFamily: 'var(--font-inter)', backgroundColor: '#f7f7f0' }}
      >
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}

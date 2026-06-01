export interface Session {
  id: string;
  startedAt: number;
  lastSeen: number;
  city: string;
  country: string;
  countryCode: string;
  lat: number;
  lng: number;
  pages: string[];
  device: 'desktop' | 'mobile' | 'unknown';
  referrer: string;
}

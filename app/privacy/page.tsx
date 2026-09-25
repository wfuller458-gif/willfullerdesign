'use client';

import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';

const handleContact = () => {
  window.location.href = 'mailto:willfullerdesign@gmail.com';
};

const SECTIONS: { heading: string; body: React.ReactNode }[] = [
  {
    heading: 'Who I am',
    body: <>This site is run by Will Fuller, a designer and developer based in Stratford-upon-Avon, UK. If you have any questions about your data, email <a href="mailto:willfullerdesign@gmail.com">willfullerdesign@gmail.com</a>.</>,
  },
  {
    heading: 'What I collect',
    body: <>When you book a call, I collect your name, email address, the time you choose and anything you write in the message box. The site also uses privacy-friendly analytics to count page visits. It doesn&apos;t use advertising cookies or track you across other sites.</>,
  },
  {
    heading: 'How I use it',
    body: <>Your booking details are used only to arrange and hold our call. They are added to my Google Calendar so that Google can send you a calendar invite with a Google Meet link. I won&apos;t add you to a mailing list or share your details with anyone else.</>,
  },
  {
    heading: 'Where it is stored',
    body: <>Booking details are stored in my Google account (Google Calendar). Google processes this data under its own privacy policy. The website itself doesn&apos;t keep a copy.</>,
  },
  {
    heading: 'How long I keep it',
    body: <>I keep booking details for as long as we&apos;re in touch about a project, and delete them on request.</>,
  },
  {
    heading: 'Your rights',
    body: <>Under UK GDPR you can ask to see, correct or delete the personal data I hold about you at any time. Just email <a href="mailto:willfullerdesign@gmail.com">willfullerdesign@gmail.com</a>. You can also complain to the Information Commissioner&apos;s Office (ico.org.uk).</>,
  },
];

export default function Privacy() {
  return (
    <div style={{ backgroundColor: 'var(--brand-off-white-100)', minHeight: '100vh' }}>
      <style>{`
        .pp-wrap { max-width: 720px; margin: 0 auto; padding: 150px 25px; }
        .pp-title { font-family: DM Sans, sans-serif; font-weight: 400; font-size: 64px; line-height: 1.1; color: var(--brand-black); margin: 0; }
        .pp-updated { font-family: DM Sans, sans-serif; font-weight: 300; font-size: 14px; color: var(--brand-black); opacity: 0.6; margin: 16px 0 0; }
        .pp-section { margin-top: 56px; }
        .pp-section h2 { font-family: DM Sans, sans-serif; font-weight: 400; font-size: 24px; color: var(--brand-black); margin: 0 0 12px; }
        .pp-section p { font-family: DM Sans, sans-serif; font-weight: 300; font-size: 18px; line-height: 1.6; color: var(--brand-black); margin: 0; }
        .pp-section a { color: inherit; text-decoration: underline; text-underline-offset: 3px; }
        @media (max-width: 768px) {
          .pp-wrap { padding: 80px 24px; }
          .pp-title { font-size: 42px; }
          .pp-section { margin-top: 40px; }
          .pp-section p { font-size: 16px; }
        }
      `}</style>

      <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <Header onContactClick={handleContact} />
      </div>

      <main className="pp-wrap">
        <h1 className="pp-title">Privacy policy</h1>
        <p className="pp-updated">Last updated 25 September 2026</p>
        {SECTIONS.map(s => (
          <section key={s.heading} className="pp-section">
            <h2>{s.heading}</h2>
            <p>{s.body}</p>
          </section>
        ))}
      </main>

      <Footer onContactClick={handleContact} />
    </div>
  );
}

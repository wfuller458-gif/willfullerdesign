'use client';
import React from 'react';

const roles = [
  {
    company: 'Jaguar Land Rover',
    title: 'UX Interaction Designer Digital Cockpit',
    dates: '2022 — Present',
    bullets: [
      "Designed and delivered UX for Land Rover's next-generation instrument cluster and 3rd generation head-up display, launching globally soon.",
      'Contributed to an augmented reality head-up display concept project.',
      "Designed the off-road cockpit for Land Rover Defender, creating a purposeful experience integral to the Defender's \"go anywhere\" brand identity.",
      'Built and managed the driver display design system, adopted across Land Rover, Jaguar and Tata Motors nameplates.',
    ],
  },
  {
    company: 'Suru Partners',
    title: 'UX / UI Designer',
    dates: '2021 — 2022',
    bullets: [
      'Designed a platform to enable Africa Inland Mission to manage their global operations supporting missionaries across 20+ African countries.',
      'Designed Fair For You, an ethical lending and e-commerce platform enabling financially vulnerable consumers to purchase household essentials with affordable credit, as an alternative to high cost lenders.',
    ],
  },
  {
    company: 'Freelance',
    title: 'UX / UI Designer',
    dates: '2020 — 2021',
    bullets: [
      'Working with Full Clarity, I designed two products a case management inbox for Feed It Back used by major UK restaurants, and a GP training platform enabling healthcare practitioners to track and complete their professional development.',
      'End-to-end design of a web app for Zeus, a Berlin-based startup serving independent restaurant owners.',
    ],
  },
  {
    company: 'ChargedUp',
    title: 'Creative Design Intern',
    dates: '2018',
    bullets: [
      'Worked directly with the founding team during launch, helping scale their charging stations to venues across London.',
    ],
  },
];

const skills = [
  'Figma', 'Claude Code', 'End-to-end Design', 'Ideation', 'Information Architecture',
  'Site Mapping', 'Wireframing', 'Prototyping', 'Interaction Design', 'Systemic Thinking',
  'Complex Problem Solving', 'Research Synthesis', 'Data Informed Design', 'Design Systems',
  'Agile Design & Development', 'Developer Handoff', 'Cross Functional Collaboration', 'Stakeholder Management',
];

const hr = <hr style={{ border: 'none', borderTop: '0.5px solid rgba(255,255,255,0.25)', margin: 0 }} />;
const f = (weight: number, size: string, color: string, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: 'DM Sans, sans-serif', fontWeight: weight, fontSize: size, color, margin: 0, lineHeight: 1.6, ...extra,
});

export const ResumeContent = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

    <p style={f(300, '24px', 'rgba(255,255,255,0.85)', { lineHeight: 1.5 })}>
      Senior product designer with 6+ years experience across automotive, healthcare, hospitality and startups. Trained in Industrial Design, I approach every project holistically considering the entire product and experience, not just the screen in front of me. I obsess over core design principles, because I believe great design is the sum of many small decisions done right. I create clarity where there isn't any, scope complexity into something manageable, and build with craft and precision from brief to delivery. I'm drawn to focused teams with the ambition to make something truly exceptional.
    </p>

    {hr}

    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {roles.map((role, i) => (
        <div key={i}>
          <p style={f(400, '20px', 'white', { marginBottom: '4px' })}>{role.company}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '12px' }}>
            <p style={f(400, '18px', 'rgba(255,255,255,0.6)')}>{role.title}</p>
            <p style={f(400, '18px', 'rgba(255,255,255,0.6)', { flexShrink: 0, marginLeft: '16px' })}>{role.dates}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {role.bullets.map((b, j) => (
              <p key={j} style={f(300, '16px', 'rgba(255,255,255,0.75)')}>{b}</p>
            ))}
          </div>
        </div>
      ))}
    </div>

    {hr}

    <div>
      <p style={f(400, '20px', 'white', { marginBottom: '12px' })}>Skills</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {skills.map((s, i) => (
          <span key={i} style={{
            fontFamily: 'DM Sans, sans-serif', fontWeight: 300, fontSize: '14px',
            color: 'rgba(255,255,255,0.75)',
            backgroundColor: 'rgba(255,255,255,0.08)',
            border: '0.5px solid rgba(255,255,255,0.2)',
            borderRadius: '6px',
            padding: '6px 12px',
            display: 'inline-block',
            lineHeight: 1,
          }}>{s}</span>
        ))}
      </div>
    </div>

    {hr}

    <div>
      <p style={f(400, '20px', 'white', { marginBottom: '4px' })}>Loughborough University</p>
      <p style={f(400, '18px', 'rgba(255,255,255,0.6)')}>Industrial Design 1st Class Honours</p>
    </div>

  </div>
);

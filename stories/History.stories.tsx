import type { Meta, StoryObj } from "@storybook/react";
import { History } from "../components/ui/history";
import { HistoryItem } from "../components/ui/history-item";

const HistoryShowcase = () => {
  const entries = [
    {
      date: "2022 - 2025",
      company: "Jaguar Land Rover",
      tooltipDescription: "At Jaguar Land Rover's Gaydon headquarters, I work as a UX Designer in the Human–Machine Interface team, designing touchscreens, instrument clusters, and head-up displays for Land Rover vehicles. I collaborate with engineers and designers to create intuitive, premium in-car experiences, and have delivered features that have made it into production cars.",
      tooltipImages: [
        "/images/tooltip/jlr-1.png",
        "/images/tooltip/jlr-2.png"
      ] as [string, string]
    },
    {
      date: "2012",
      company: "Suru Partners",
      tooltipDescription: "At Suru Partners in Coventry, I worked as a UX/UI Designer, creating websites and web applications for a variety of clients. Operating within an agile delivery framework, I collaborated closely with software developers and the directors to deliver full designs.",
      tooltipImages: [
        "/images/tooltip/suru-1.png",
        "/images/tooltip/suru-2.png",
        "/images/tooltip/suru-3.png"
      ] as [string, string, string]
    },
    {
      date: "2020",
      company: "Freelance",
      tooltipDescription: "I freelanced as a designer, working with a start up in Berlin where I was responsible for designing their entire web app, created to support independent restaurateurs. A highlight was seeing an early version adopted by Subway chains. I also worked with Full Clarity on projects in healthcare and hospitality, including a GP training platform and Feed It Back, a tool used by major restaurant groups to manage and respond to customer reviews across multiple channels.",
      tooltipImages: [
        "/images/tooltip/freelance-1.png",
        "/images/tooltip/freelance-2.png"
      ] as [string, string]
    },
    {
      date: "2019",
      company: "University of New Mexico",
      tooltipDescription: "I studied at the University of New Mexico on a full athletic scholarship, competing in cross country and track while working toward a degree in Sports Administration. During this time I got the opportunity to compete in races all across the US. Alongside my academic and athletic commitments, I had the opportunity to study some graphic design classes.",
      tooltipImages: [
        "/images/tooltip/unm-1.png",
        "/images/tooltip/unm-2.png",
        "/images/tooltip/unm-3.png"
      ] as [string, string, string]
    },
    {
      date: "2018",
      company: "Charged Up",
      tooltipDescription: "I joined ChargedUp, a London-based start-up, as their first design intern, working directly with the four founders. I contributed to the launch by creating CAD models and product renderings, designing and building the entire website, producing marketing materials, and supporting their social media ads. Being involved in so many parts of the launch made it a fast-paced and really fun experience.",
      tooltipImages: [
        "/images/tooltip/chargedup-1.png",
        "/images/tooltip/chargedup-2.png"
      ] as [string, string]
    },
    {
      date: "2015",
      company: "Loughborough University",
      tooltipDescription: "I studied Industrial Design (BA) and graduated with a First Class Honours degree. The course covered everything from sketching and engineering drawings to workshop skills in metalwork, woodworking, machining, model making and injection-moulding processes. Alongside my studies, I competed for the university in cross country and track, and also earned selections for multiple England and Great Britain teams.",
      tooltipImages: [
        "/images/tooltip/lboro-1.png",
        "/images/tooltip/lboro-2.png",
        "/images/tooltip/lboro-3.png"
      ] as [string, string, string]
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1A1A1B' }}>
      <h1 className="text-4xl font-bold mb-2 p-8 text-white">History</h1>
      <p className="text-gray-400 mb-12 px-8">Timeline component with hover states</p>

      <div className="space-y-12 px-8">
        {/* Single History Item */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-white">History Item</h2>
          <p className="text-gray-400 mb-6">Single timeline entry (hover to see animations)</p>
          <div style={{ maxWidth: '1280px' }}>
            <HistoryItem date="2022 - 2025" company="Jaguar Land Rover" />
          </div>
        </div>

        {/* Full History Timeline */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-white">History Timeline</h2>
          <p className="text-gray-400 mb-6">Complete timeline with multiple entries</p>
          <History entries={entries} />
        </div>
      </div>
      {/* Dead space to allow last tooltip to appear */}
      <div style={{ height: '400px' }} />
    </div>
  );
};

const meta = {
  title: "Components/History",
  component: HistoryShowcase,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof HistoryShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

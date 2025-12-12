import type { Meta, StoryObj } from "@storybook/react";
import { ProcessSection } from "../components/ui/process-section";

const ProcessSectionShowcase = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--brand-off-white-100)' }}>
      <h1 className="text-4xl font-bold mb-2 p-8" style={{ color: 'var(--brand-black)' }}>Process Section</h1>
      <p className="mb-12 px-8" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>Interactive process section with hover states showing Strategy, Design, Development, and Support</p>

      <div className="flex flex-col items-center gap-8 px-8">
        <ProcessSection />
      </div>
    </div>
  );
};

const meta = {
  title: "Components/Process Section",
  component: ProcessSectionShowcase,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ProcessSectionShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

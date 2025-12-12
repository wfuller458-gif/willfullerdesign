import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "../components/ui/footer";

const FooterShowcase = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--brand-off-white-100)' }}>
      <h1 className="text-4xl font-bold mb-2 p-8" style={{ color: 'var(--brand-black)' }}>Footer</h1>
      <p className="mb-12 px-8" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>Complete footer with navigation, contact options, and CTA section</p>

      <div className="flex flex-col items-center gap-8 px-8">
        <Footer />
      </div>
    </div>
  );
};

const meta = {
  title: "Components/Footer",
  component: FooterShowcase,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof FooterShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

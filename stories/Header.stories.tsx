import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "../components/ui/header";

const HeaderShowcase = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1A1A1B' }}>
      <h1 className="text-4xl font-bold mb-2 p-8 text-white">Header</h1>
      <p className="text-gray-400 mb-12 px-8">Navigation header with blur effect</p>

      <div className="space-y-8">
        {/* Header on Light Background */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 px-8 text-white">On Light Background</h2>
          <div className="bg-white">
            <Header />
          </div>
        </div>

        {/* Header on Dark Background */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 px-8 text-white">On Dark Background</h2>
          <div className="bg-black">
            <Header />
          </div>
        </div>

        {/* Header with Content Below */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 px-8 text-white">With Content Below</h2>
          <div className="bg-brand-off-white-100 min-h-[400px]">
            <Header />
            <div className="p-8">
              <p className="text-brand-black text-lg">Content below header</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: "Components/Header",
  component: HeaderShowcase,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof HeaderShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

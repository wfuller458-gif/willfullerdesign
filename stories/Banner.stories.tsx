import type { Meta, StoryObj } from "@storybook/react";
import { Banner } from "../components/ui/banner";

const BannerShowcase = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1A1A1B' }}>
      <h1 className="text-4xl font-bold mb-2 p-8 text-white">Banners</h1>
      <p className="text-gray-400 mb-12 px-8">Call-to-action banner variants</p>

      <div className="space-y-12">
        {/* Orange Banner */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 px-8 text-white">Orange Banner</h2>
          <Banner variant="orange" />
        </div>

        {/* Grey Banner */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 px-8 text-white">Grey Banner</h2>
          <Banner variant="grey" />
        </div>

        {/* Interactive Examples */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 px-8 text-white">Interactive (Hover to see button animations)</h2>
          <div className="space-y-8">
            <Banner variant="orange" />
            <Banner variant="grey" />
          </div>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: "Components/Banner",
  component: BannerShowcase,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof BannerShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {};

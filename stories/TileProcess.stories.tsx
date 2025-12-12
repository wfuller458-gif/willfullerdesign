import type { Meta, StoryObj } from "@storybook/react";
import { TileProcess } from "../components/ui/tile-process";

const TileProcessShowcase = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--brand-off-white-100)' }}>
      <h1 className="text-4xl font-bold mb-2 p-8" style={{ color: 'var(--brand-black)' }}>Tile Process</h1>
      <p className="mb-12 px-8" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>Interactive process tile - hover over each word to see different layouts</p>

      <div className="flex flex-col items-start px-8">
        {/* Interactive tile */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--brand-black)' }}>Interactive (hover to change)</h2>
          <TileProcess />
        </div>

        {/* All states stacked - non-interactive */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--brand-black)' }}>All States</h2>
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-sm mb-2" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>Strategy</p>
              <TileProcess defaultProcess="Strategy" interactive={false} />
            </div>
            <div>
              <p className="text-sm mb-2" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>Design</p>
              <TileProcess defaultProcess="Design" interactive={false} />
            </div>
            <div>
              <p className="text-sm mb-2" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>Development</p>
              <TileProcess defaultProcess="Development" interactive={false} />
            </div>
            <div>
              <p className="text-sm mb-2" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>Support</p>
              <TileProcess defaultProcess="Support" interactive={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: "Components/Tiles/Process",
  component: TileProcessShowcase,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TileProcessShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

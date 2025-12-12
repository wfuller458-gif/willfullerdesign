import type { Meta, StoryObj } from "@storybook/react";
import { TileAbout } from "../components/ui/tile-about";

const TileAboutShowcase = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1A1A1B' }}>
      <h1 className="text-4xl font-bold mb-2 p-8 text-white">Tile About</h1>
      <p className="text-gray-400 mb-12 px-8">Interactive about tile - hover to see images scale and reposition</p>

      <div className="flex flex-col items-start px-8">
        {/* Interactive tile */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-white">Interactive (hover to change)</h2>
          <TileAbout />
        </div>

        {/* All states stacked - non-interactive */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-white">All States</h2>
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-sm mb-2 text-gray-400">Default</p>
              <TileAbout interactive={false} />
            </div>
            <div>
              <p className="text-sm mb-2 text-gray-400">Hover (simulated)</p>
              <div
                onMouseEnter={(e) => {
                  const tile = e.currentTarget.querySelector('[data-tile-about]') as HTMLElement;
                  if (tile) {
                    tile.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
                  }
                }}
              >
                <TileAbout />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: "Components/Tiles/About",
  component: TileAboutShowcase,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TileAboutShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

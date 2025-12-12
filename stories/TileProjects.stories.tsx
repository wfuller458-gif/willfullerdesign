import type { Meta, StoryObj } from "@storybook/react";
import { TileProjects } from "../components/ui/tile-projects";

const TileProjectsShowcase = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--brand-off-white-100)' }}>
      <h1 className="text-4xl font-bold mb-2 p-8" style={{ color: 'var(--brand-black)' }}>Tile Projects</h1>
      <p className="mb-12 px-8" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>Interactive projects tile - hover over each project name to see different images</p>

      <div className="flex flex-col items-start px-8">
        {/* Interactive tile */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--brand-black)' }}>Interactive (hover to change)</h2>
          <TileProjects />
        </div>

        {/* All states stacked - non-interactive */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--brand-black)' }}>All States</h2>
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-sm mb-2" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>Range Rover</p>
              <TileProjects defaultProject="Range Rover" interactive={false} />
            </div>
            <div>
              <p className="text-sm mb-2" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>Avinya</p>
              <TileProjects defaultProject="Avinya" interactive={false} />
            </div>
            <div>
              <p className="text-sm mb-2" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>Defender</p>
              <TileProjects defaultProject="Defender" interactive={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: "Components/Tiles/Projects",
  component: TileProjectsShowcase,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TileProjectsShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

import type { Meta, StoryObj } from "@storybook/react";
import { TooltipSmall } from "../components/ui/tooltip-small";
import { TooltipLarge } from "../components/ui/tooltip-large";

const TooltipShowcase = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1A1A1B' }}>
      <h1 className="text-4xl font-bold mb-2 p-8 text-white">Tooltips</h1>
      <p className="text-gray-400 mb-12 px-8">Project tooltips for cards and galleries</p>

      <div className="space-y-12 px-8">
        {/* Tooltip Small */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-white">Tooltip Small</h2>
          <p className="text-gray-400 mb-6">Used on project cards</p>

          <div className="flex flex-col items-start" style={{ gap: '8px' }}>
            <TooltipSmall
              title="Avinya"
              images={[
                "/images/tooltip/avinya-1.png",
                "/images/tooltip/avinya-2.png",
                "/images/tooltip/avinya-3.png"
              ]}
            />

            <TooltipSmall
              title="Range Rover"
              images={[
                "/images/tooltip/range-rover-small-1.png",
                "/images/tooltip/range-rover-small-2.png",
                "/images/tooltip/range-rover-small-3.png"
              ]}
            />

            <TooltipSmall
              title="Defender"
              images={[
                "/images/tooltip/defender-1.png",
                "/images/tooltip/defender-2.png",
                "/images/tooltip/defender-3.png"
              ]}
            />
          </div>
        </div>

        {/* Tooltip Large */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-white">Tooltip Large</h2>
          <p className="text-gray-400 mb-6">Used on image galleries</p>

          <div className="flex flex-col items-start" style={{ gap: '8px' }}>
            <TooltipLarge
              description="Designed next-generation digital displays for upcoming Range Rover and Defender models, creating an atomic design system and layout framework informed by user-centred research, attention management, and cross-team integration."
              images={[
                "/images/tooltip/large-2images-1.avif",
                "/images/tooltip/large-2images-2.png"
              ]}
            />

            <TooltipLarge
              description="Designed next-generation digital displays for upcoming Range Rover and Defender models, creating an atomic design system and layout framework informed by user-centred research, attention management, and cross-team integration."
              images={[
                "/images/tooltip/large-2images-1.avif",
                "/images/tooltip/large-2images-2.png",
                "/images/tooltip/large-2images-1.avif"
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: "Components/Tooltips",
  component: TooltipShowcase,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TooltipShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {};

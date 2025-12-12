import type { Meta, StoryObj } from "@storybook/react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  ArrowRight,
  ArrowUpRight,
  Close,
  Menu,
  WhatsApp,
} from "../components/ui/icons";

const IconShowcase = () => {
  return (
    <div className="p-8 min-h-screen" style={{ backgroundColor: '#1A1A1B' }}>
      <h1 className="text-4xl font-bold mb-2 text-white">Icons</h1>
      <p className="text-gray-400 mb-12">9 icons from Figma design system</p>

      <div className="space-y-12">
        {/* All Icons */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-white">All Icons (24px)</h2>
          <div className="flex gap-8 items-center flex-wrap">
            <div className="flex flex-col gap-2 items-center">
              <ChevronLeft className="text-white" />
              <span className="text-xs text-gray-400">Chevron Left</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <ChevronRight className="text-white" />
              <span className="text-xs text-gray-400">Chevron Right</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <ChevronUp className="text-white" />
              <span className="text-xs text-gray-400">Chevron Up</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <ChevronDown className="text-white" />
              <span className="text-xs text-gray-400">Chevron Down</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <ArrowRight className="text-white" />
              <span className="text-xs text-gray-400">Arrow Right</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <ArrowUpRight className="text-white" />
              <span className="text-xs text-gray-400">Arrow Up Right</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Close className="text-white" />
              <span className="text-xs text-gray-400">Close</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Menu className="text-white" />
              <span className="text-xs text-gray-400">Menu</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <WhatsApp className="text-white" />
              <span className="text-xs text-gray-400">WhatsApp</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const meta = {
  title: "Components/Icons",
  component: IconShowcase,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof IconShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllIcons: Story = {};

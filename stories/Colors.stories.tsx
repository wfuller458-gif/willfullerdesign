import type { Meta, StoryObj } from "@storybook/react";

const ColorSwatch = ({ color, name }: { color: string; name: string }) => (
  <div className="flex flex-col gap-2">
    <div
      className="w-32 h-32 rounded-lg shadow-md border border-gray-200"
      style={{ backgroundColor: color }}
    />
    <div className="text-sm">
      <div className="font-semibold text-white">{name}</div>
      <div className="text-gray-400 font-mono text-xs">{color}</div>
    </div>
  </div>
);

const Colors = () => {
  return (
    <div className="p-8 min-h-screen" style={{ backgroundColor: '#1A1A1B' }}>
      <h1 className="text-4xl font-bold mb-2 text-white">Brand Colors</h1>
      <p className="text-gray-400 mb-8">Extracted from Figma</p>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-white">Main Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <ColorSwatch color="#000000" name="Black" />
          <ColorSwatch color="#ffffff" name="White" />
          <ColorSwatch color="#ffac00" name="Orange" />
          <ColorSwatch color="#25d366" name="WhatsApp" />
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-white">Off White Variants</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <ColorSwatch color="#f7f7f0" name="Off White 100" />
          <ColorSwatch color="#f0f0e9" name="Off White 200" />
          <ColorSwatch color="#9c9c9c" name="Off White 300" />
          <ColorSwatch color="#e6e6df" name="Off White 400" />
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-white">Opacity Variants</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <ColorSwatch color="#00000033" name="Black 20%" />
          <ColorSwatch color="#0000004d" name="Black 30%" />
          <ColorSwatch color="#00000099" name="Black 60%" />
          <ColorSwatch color="#ffffff4d" name="White 30%" />
          <ColorSwatch color="#ffffff80" name="White 50%" />
          <ColorSwatch color="#f7f7f04d" name="Off White 100 30%" />
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-white">Special</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <ColorSwatch color="#1e1e1cb2" name="Menu Background" />
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: "Design System/Colors",
  component: Colors,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Colors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllColors: Story = {};

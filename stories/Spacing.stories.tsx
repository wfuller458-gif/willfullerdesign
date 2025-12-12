import type { Meta, StoryObj } from "@storybook/react";

const SpacingSquare = ({ size, label, showNumber = true }: { size: string; label: string; showNumber?: boolean }) => {
  const sizeValue = parseInt(size);
  const shouldShowNumber = showNumber && sizeValue > 16;

  return (
    <div className="flex items-start gap-6">
      <div className="text-white text-sm font-mono" style={{ width: '50px' }}>{size}</div>
      <div
        style={{
          width: size,
          height: size,
          backgroundColor: '#7c3aed',
          border: '1px solid #a78bfa',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#c4b5fd',
          fontSize: '14px',
          fontWeight: 'bold'
        }}
      >
        {shouldShowNumber && size.replace('px', '')}
      </div>
    </div>
  );
};

const Spacing = () => {
  return (
    <div className="p-8 min-h-screen" style={{ backgroundColor: '#1A1A1B' }}>
      <h1 className="text-4xl font-bold mb-2 text-white">Spacing System</h1>
      <p className="text-gray-400 mb-12">8 spacing values from Figma</p>

      <div className="flex flex-col gap-6 items-start">
        <SpacingSquare size="4px" label="Spacing 1" />
        <SpacingSquare size="8px" label="Spacing 2" />
        <SpacingSquare size="16px" label="Spacing 3" />
        <SpacingSquare size="24px" label="Spacing 4" />
        <SpacingSquare size="32px" label="Spacing 5" />
        <SpacingSquare size="64px" label="Spacing 6" />
        <SpacingSquare size="100px" label="Spacing 7" />
        <SpacingSquare size="128px" label="Spacing 8" />
      </div>
    </div>
  );
};

const meta = {
  title: "Design System/Spacing",
  component: Spacing,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Spacing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllSpacing: Story = {};

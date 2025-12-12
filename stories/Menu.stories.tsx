import type { Meta, StoryObj } from '@storybook/react';
import { Menu } from '../components/ui/menu';
import { HeroSection } from '../components/ui/hero-section';

const meta = {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    onClose: { action: 'closed' },
    onNavigate: { action: 'navigated' },
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'image',
      values: [
        {
          name: 'image',
          value: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80) center/cover',
        },
      ],
    },
  },
};

export const OverHero: Story = {
  args: {},
  render: (args) => (
    <div style={{ position: 'relative', width: '1280px', height: '996px' }}>
      <HeroSection />
      <div
        style={{
          position: 'absolute',
          top: '80px',
          left: '32px',
          zIndex: 1000
        }}
      >
        <Menu {...args} />
      </div>
    </div>
  ),
};

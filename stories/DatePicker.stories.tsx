import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from '../components/ui/date-picker';
import { useState } from 'react';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#1A1A1B',
        },
      ],
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithSelection: Story = {
  args: {
    selectedDate: new Date(),
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

// Interactive example
export const Interactive: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();

    return (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '300px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <DatePicker
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
          {selectedDate && (
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              color: 'var(--brand-white)',
              margin: 0
            }}>
              Selected: {selectedDate.toLocaleDateString('en-GB', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          )}
        </div>
      </div>
    );
  },
};

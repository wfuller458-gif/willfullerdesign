import type { Meta, StoryObj } from '@storybook/react';
import { TimePicker } from '../components/ui/time-picker';
import { useState } from 'react';

const meta = {
  title: 'Components/TimePicker',
  component: TimePicker,
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
} satisfies Meta<typeof TimePicker>;

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
    selectedTime: '8:00am',
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithBookedSlots: Story = {
  args: {
    selectedTime: '7:00pm',
    bookedTimes: ['7:30am', '5:00pm', '5:30pm'],
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
    const [selectedTime, setSelectedTime] = useState<string | undefined>();

    return (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '300px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TimePicker
            selectedTime={selectedTime}
            onSelectTime={setSelectedTime}
          />
          {selectedTime && (
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              color: 'var(--brand-white)',
              margin: 0
            }}>
              Selected: {selectedTime}
            </p>
          )}
        </div>
      </div>
    );
  },
};

// Interactive with booked slots
export const InteractiveWithBookings: Story = {
  render: () => {
    const [selectedTime, setSelectedTime] = useState<string | undefined>();
    const bookedTimes = ['7:30am', '5:00pm', '6:30pm'];

    return (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '300px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TimePicker
            selectedTime={selectedTime}
            onSelectTime={setSelectedTime}
            bookedTimes={bookedTimes}
          />
          {selectedTime && (
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              color: 'var(--brand-white)',
              margin: 0
            }}>
              Selected: {selectedTime}
            </p>
          )}
          <div>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.5)',
              margin: '0 0 4px 0'
            }}>
              Booked slots:
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.7)',
              margin: 0
            }}>
              {bookedTimes.join(', ')}
            </p>
          </div>
        </div>
      </div>
    );
  },
};

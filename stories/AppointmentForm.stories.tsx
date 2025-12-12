import type { Meta, StoryObj } from '@storybook/react';
import { AppointmentForm } from '../components/ui/appointment-form';
import { useState } from 'react';

const meta = {
  title: 'Components/AppointmentForm',
  component: AppointmentForm,
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
} satisfies Meta<typeof AppointmentForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClose: () => console.log('Close clicked'),
    onSubmit: (data) => console.log('Appointment data:', data),
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '900px' }}>
        <Story />
      </div>
    ),
  ],
};

// Interactive example with state management
export const Interactive: Story = {
  render: () => {
    const handleClose = () => {
      console.log('Close button clicked');
      alert('Form closed');
    };

    const handleSubmit = (data: any) => {
      console.log('Appointment data:', data);
      const dateStr = data.date ? data.date.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }) : 'No date selected';
      const timeStr = data.time || 'No time selected';
      alert(`Appointment booked!\nDate: ${dateStr}\nTime: ${timeStr}`);
    };

    return (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '900px' }}>
        <AppointmentForm
          onClose={handleClose}
          onSubmit={handleSubmit}
        />
      </div>
    );
  },
};

// With parent state management
export const WithStateManagement: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    const [appointmentData, setAppointmentData] = useState<any>(null);

    const handleClose = () => {
      setIsOpen(false);
      setTimeout(() => setIsOpen(true), 1000); // Reset after 1 second for demo
    };

    const handleSubmit = (data: any) => {
      setAppointmentData(data);
      console.log('Appointment submitted:', data);
    };

    return (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '900px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
          {isOpen ? (
            <AppointmentForm
              onClose={handleClose}
              onSubmit={handleSubmit}
            />
          ) : (
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              color: 'var(--brand-white)',
              margin: 0
            }}>
              Form closed (reopening in 1 second...)
            </p>
          )}

          {appointmentData && (
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '16px',
              maxWidth: '531px',
              width: '100%'
            }}>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--brand-white)',
                margin: '0 0 8px 0'
              }}>
                Last Booking:
              </p>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.7)',
                margin: 0,
                whiteSpace: 'pre-line'
              }}>
                {`Date: ${appointmentData.date ? appointmentData.date.toLocaleDateString('en-GB', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                }) : 'Not selected'}
Time: ${appointmentData.time || 'Not selected'}`}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  },
};

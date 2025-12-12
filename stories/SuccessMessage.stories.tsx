import type { Meta, StoryObj } from '@storybook/react';
import { SuccessMessage } from '../components/ui/success-message';

const meta = {
  title: 'Components/SuccessMessage',
  component: SuccessMessage,
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
} satisfies Meta<typeof SuccessMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Appointment booking success
export const AppointmentBooked: Story = {
  args: {
    title: 'Your appointment is booked!',
    message: (
      <>
        Thanks for scheduling with us.
        <br />
        <br />
        Your appointment is confirmed for <strong>[Date]</strong> at <strong>[Time].</strong>
        <br />
        <br />
        A confirmation email has been sent to you — please check your inbox, and if you don't see it, be sure to check your junk or spam folder.
      </>
    ),
    onClose: () => console.log('Close clicked'),
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '900px' }}>
        <Story />
      </div>
    ),
  ],
};

// With specific date and time
export const AppointmentWithDetails: Story = {
  args: {
    title: 'Your appointment is booked!',
    message: (
      <>
        Thanks for scheduling with us.
        <br />
        <br />
        Your appointment is confirmed for <strong>Monday 17th November 2025</strong> at <strong>8:00am.</strong>
        <br />
        <br />
        A confirmation email has been sent to you — please check your inbox, and if you don't see it, be sure to check your junk or spam folder.
      </>
    ),
    onClose: () => console.log('Close clicked'),
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '900px' }}>
        <Story />
      </div>
    ),
  ],
};

// Contact form success (different message)
export const ContactFormSuccess: Story = {
  args: {
    title: 'Thanks for reaching out!',
    message: (
      <>
        We've received your message and will get back to you within 24 hours.
        <br />
        <br />
        A confirmation email has been sent to <strong>[Email]</strong> — please check your inbox, and if you don't see it, be sure to check your junk or spam folder.
        <br />
        <br />
        We're excited to learn more about your project!
      </>
    ),
    onClose: () => console.log('Close clicked'),
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '900px' }}>
        <Story />
      </div>
    ),
  ],
};

// Custom title and message
export const CustomContent: Story = {
  args: {
    title: 'Success!',
    message: (
      <>
        Your custom message goes here.
        <br />
        <br />
        You can include any content you want, including <strong>bold text</strong>, line breaks, and more.
      </>
    ),
    onClose: () => alert('Custom close action'),
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '900px' }}>
        <Story />
      </div>
    ),
  ],
};

// Using default props
export const Default: Story = {
  args: {
    onClose: () => console.log('Close clicked'),
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '900px' }}>
        <Story />
      </div>
    ),
  ],
};

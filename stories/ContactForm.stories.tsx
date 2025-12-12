import type { Meta, StoryObj } from '@storybook/react';
import { ContactForm } from '../components/ui/contact-form';
import { useState } from 'react';

const meta = {
  title: 'Components/ContactForm',
  component: ContactForm,
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
} satisfies Meta<typeof ContactForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClose: () => console.log('Close clicked'),
    onSubmit: (data) => console.log('Form submitted:', data),
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '900px' }}>
        <Story />
      </div>
    ),
  ],
};

// Interactive example with console logging
export const Interactive: Story = {
  render: () => {
    const handleClose = () => {
      console.log('Close button clicked');
      alert('Form closed');
    };

    const handleSubmit = (data: any) => {
      console.log('Form data:', data);
      alert(`Form submitted!\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nProject: ${data.project}`);
    };

    return (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '900px' }}>
        <ContactForm
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
    const [submittedData, setSubmittedData] = useState<any>(null);

    const handleClose = () => {
      setIsOpen(false);
      setTimeout(() => setIsOpen(true), 1000); // Reset after 1 second for demo
    };

    const handleSubmit = (data: any) => {
      setSubmittedData(data);
      console.log('Form submitted:', data);
    };

    return (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '900px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
          {isOpen ? (
            <ContactForm
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

          {submittedData && (
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
                Last Submission:
              </p>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.7)',
                margin: 0,
                whiteSpace: 'pre-line'
              }}>
                {`Name: ${submittedData.name}
Email: ${submittedData.email}
Phone: ${submittedData.phone}
Project: ${submittedData.project}`}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  },
};

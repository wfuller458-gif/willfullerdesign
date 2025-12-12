import type { Meta, StoryObj } from '@storybook/react';
import { FormTextarea } from '../components/ui/form-textarea';
import { useState } from 'react';

const meta = {
  title: 'Components/FormTextarea',
  component: FormTextarea,
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
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof FormTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    label: 'Message',
    placeholder: 'Input Field',
    value: '',
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Filled: Story = {
  args: {
    label: 'Message',
    placeholder: 'Input Field',
    value: 'Hello, I would like to discuss a potential project with you. I have a classic Range Rover that needs some restoration work and I was wondering if you could help me with the digital documentation.',
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithError: Story = {
  args: {
    label: 'Message',
    placeholder: 'Input Field',
    value: 'Too short',
    error: 'Message must be at least 50 characters',
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    label: 'Message',
    placeholder: 'Input Field',
    value: 'This field is disabled',
    disabled: true,
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const NoLabel: Story = {
  args: {
    placeholder: 'Enter your message here',
    value: '',
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
    const [value, setValue] = useState('');
    return (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '300px' }}>
        <FormTextarea
          label="Message"
          placeholder="Tell us about your project"
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

// Interactive with validation
export const InteractiveWithValidation: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [error, setError] = useState<string | undefined>();

    const handleChange = (newValue: string) => {
      setValue(newValue);
      if (newValue && newValue.length < 50) {
        setError(`Message must be at least 50 characters (${newValue.length}/50)`);
      } else {
        setError(undefined);
      }
    };

    return (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '300px' }}>
        <FormTextarea
          label="Project Details"
          placeholder="Describe your project in detail"
          value={value}
          onChange={handleChange}
          error={error}
        />
      </div>
    );
  },
};

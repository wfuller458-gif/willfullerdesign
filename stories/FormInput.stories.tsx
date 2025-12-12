import type { Meta, StoryObj } from '@storybook/react';
import { FormInput } from '../components/ui/form-input';
import { useState } from 'react';

const meta = {
  title: 'Components/FormInput',
  component: FormInput,
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
} satisfies Meta<typeof FormInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    label: 'Contact',
    placeholder: 'Input Field',
    value: '',
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Filled: Story = {
  args: {
    label: 'Contact',
    placeholder: 'Input Field',
    value: 'john@example.com',
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithError: Story = {
  args: {
    label: 'Contact',
    placeholder: 'Input Field',
    value: 'invalid-email',
    error: 'Please enter a valid email address',
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Disabled: Story = {
  args: {
    label: 'Contact',
    placeholder: 'Input Field',
    value: 'Disabled field',
    disabled: true,
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

export const NoLabel: Story = {
  args: {
    placeholder: 'Input Field',
    value: '',
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '200px' }}>
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
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '200px' }}>
        <FormInput
          label="Contact"
          placeholder="Enter your email"
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
      if (newValue && !newValue.includes('@')) {
        setError('Please enter a valid email address');
      } else {
        setError(undefined);
      }
    };

    return (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '200px' }}>
        <FormInput
          label="Email"
          placeholder="you@example.com"
          value={value}
          onChange={handleChange}
          error={error}
        />
      </div>
    );
  },
};

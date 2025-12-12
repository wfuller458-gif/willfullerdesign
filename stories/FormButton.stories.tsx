import type { Meta, StoryObj } from '@storybook/react';
import { FormButton } from '../components/ui/form-button';

const meta = {
  title: 'Components/FormButton',
  component: FormButton,
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
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    variant: {
      control: 'select',
      options: ['date', 'time'],
    },
  },
} satisfies Meta<typeof FormButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Date variant stories
export const DateDefault: Story = {
  args: {
    variant: 'date',
    selected: false,
    disabled: false,
    children: (
      <>
        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '12px', lineHeight: '100%', margin: 0 }}>Thu</p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '100%', margin: 0 }}>27th</p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '12px', lineHeight: '100%', margin: 0 }}>Nov</p>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

export const DateSelected: Story = {
  args: {
    variant: 'date',
    selected: true,
    disabled: false,
    children: (
      <>
        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '12px', lineHeight: '100%', margin: 0 }}>Thu</p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '100%', margin: 0 }}>27th</p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '12px', lineHeight: '100%', margin: 0 }}>Nov</p>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

export const DateDisabled: Story = {
  args: {
    variant: 'date',
    selected: false,
    disabled: true,
    children: (
      <>
        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '12px', lineHeight: '100%', margin: 0 }}>Mon</p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '100%', margin: 0 }}>24th</p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '12px', lineHeight: '100%', margin: 0 }}>Nov</p>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

// Time variant stories
export const TimeDefault: Story = {
  args: {
    variant: 'time',
    selected: false,
    disabled: false,
    children: (
      <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '100%', margin: 0, whiteSpace: 'nowrap' }}>
        7:30am
      </p>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

export const TimeSelected: Story = {
  args: {
    variant: 'time',
    selected: true,
    disabled: false,
    children: (
      <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '100%', margin: 0, whiteSpace: 'nowrap' }}>
        8:00am
      </p>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

export const TimeDisabled: Story = {
  args: {
    variant: 'time',
    selected: false,
    disabled: true,
    children: (
      <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '100%', margin: 0, whiteSpace: 'nowrap' }}>
        5:00pm
      </p>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

// Grid layout example
export const TimeGridLayout: Story = {
  render: () => (
    <div style={{ backgroundColor: '#1A1A1B', padding: '40px', minHeight: '200px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '467px' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <FormButton variant="time">
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '100%', margin: 0, whiteSpace: 'nowrap' }}>7:30am</p>
          </FormButton>
          <FormButton variant="time" selected>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '100%', margin: 0, whiteSpace: 'nowrap' }}>8:00am</p>
          </FormButton>
          <FormButton variant="time">
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '100%', margin: 0, whiteSpace: 'nowrap' }}>5:00pm</p>
          </FormButton>
          <FormButton variant="time" disabled>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '16px', lineHeight: '100%', margin: 0, whiteSpace: 'nowrap' }}>5:30pm</p>
          </FormButton>
        </div>
      </div>
    </div>
  ),
};

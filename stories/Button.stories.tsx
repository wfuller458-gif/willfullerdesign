import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/ui/button";

const ButtonShowcase = () => {
  return (
    <div className="p-8 min-h-screen" style={{ backgroundColor: '#1A1A1B' }}>
      <h1 className="text-4xl font-bold mb-2 text-white">Buttons</h1>
      <p className="text-gray-400 mb-12">5 button variants from Figma design system</p>

      <div className="space-y-16">
        {/* Black Buttons on Light Background */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-white">Black Buttons</h2>
          <div className="p-8 bg-white rounded-lg">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 mb-3">Primary Black</p>
                <Button variant="primary-black">Make An Appointment</Button>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-3">Secondary Black</p>
                <Button variant="secondary-black">Make An Appointment</Button>
              </div>
            </div>
          </div>
        </div>

        {/* White Buttons on Dark Background */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-white">White Buttons</h2>
          <div className="p-8 bg-black rounded-lg">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-400 mb-3">Primary White</p>
                <Button variant="primary-white">Make An Appointment</Button>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-3">Secondary White</p>
                <Button variant="secondary-white">Make An Appointment</Button>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Button */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-white">WhatsApp Button</h2>
          <div className="p-8 bg-black rounded-lg">
            <div>
              <p className="text-sm text-gray-400 mb-3">WhatsApp</p>
              <Button variant="whatsapp">WhatsApp</Button>
            </div>
          </div>
        </div>

        {/* Simple Buttons */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-white">Simple Buttons</h2>
          <div className="p-8 bg-white rounded-lg">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 mb-3">Menu Button</p>
                <Button variant="menu">Menu</Button>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-3">Text & Icon Button</p>
                <Button variant="text-icon">View project</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: "Components/Button",
  component: ButtonShowcase,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ButtonShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {};

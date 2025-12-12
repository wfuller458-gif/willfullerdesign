import type { Meta, StoryObj } from "@storybook/react";

const Typography = () => {
  return (
    <div className="p-8 min-h-screen" style={{ backgroundColor: '#1A1A1B' }}>
      <h1 className="text-4xl font-bold mb-2 text-brand-white">Typography System</h1>
      <p className="text-brand-off-white-300 mb-12">16 text styles from Figma</p>

      {/* Hero Styles */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-brand-white">Hero Styles</h2>

        <div className="space-y-6">
          <div className="p-6 rounded-lg border border-brand-white-30" style={{ backgroundColor: '#1A1A1B' }}>
            <p className="text-sm text-brand-off-white-300 mb-4">1. PT Serif Hero (84px, Bold Italic, 90px line-height)</p>
            <p className="font-serif text-[84px] leading-[90px] font-bold italic text-brand-white">
              PT Serif Hero
            </p>
          </div>

          <div className="p-6 rounded-lg border border-brand-white-30" style={{ backgroundColor: '#1A1A1B' }}>
            <p className="text-sm text-brand-off-white-300 mb-4">2. DM Sans Hero (84px, Light, 90px line-height)</p>
            <p className="font-heading text-[84px] leading-[90px] font-light text-brand-white">
              DM Sans Hero
            </p>
          </div>
        </div>
      </div>

      {/* DM Sans Styles */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-brand-white">DM Sans</h2>

        <div className="space-y-4">
          <div className="p-6 rounded-lg border border-brand-white-30" style={{ backgroundColor: '#1A1A1B' }}>
            <p className="text-sm text-brand-off-white-300 mb-4">3. DM Sans Light 64 (64px, Light, 100% line-height)</p>
            <p className="font-heading text-[64px] leading-none font-light text-brand-white">
              DM Sans Light 64
            </p>
          </div>

          <div className="p-6 rounded-lg border border-brand-white-30" style={{ backgroundColor: '#1A1A1B' }}>
            <p className="text-sm text-brand-off-white-300 mb-4">4. DM Sans Light 42 (42px, Light, 130% line-height)</p>
            <p className="font-heading text-[42px] leading-[1.3] font-light text-brand-white">
              DM Sans Light 42
            </p>
          </div>

          <div className="p-6 rounded-lg border border-brand-white-30" style={{ backgroundColor: '#1A1A1B' }}>
            <p className="text-sm text-brand-off-white-300 mb-4">5. DM Sans Light 32 (32px, Light, 130% line-height)</p>
            <p className="font-heading text-[32px] leading-[1.3] font-light text-brand-white">
              DM Sans Light 32
            </p>
          </div>

          <div className="p-6 rounded-lg border border-brand-white-30" style={{ backgroundColor: '#1A1A1B' }}>
            <p className="text-sm text-brand-off-white-300 mb-4">6. DM Sans Light 24 (24px, Light, 100% line-height)</p>
            <p className="font-heading text-[24px] leading-normal font-light text-brand-white">
              DM Sans Light 24
            </p>
          </div>

          <div className="p-6 rounded-lg border border-brand-white-30" style={{ backgroundColor: '#1A1A1B' }}>
            <p className="text-sm text-brand-off-white-300 mb-4">7. DM Sans Light 16 (16px, Light, 130% line-height)</p>
            <p className="font-heading text-[16px] leading-[1.3] font-light text-brand-white">
              DM Sans Light 16
            </p>
          </div>
        </div>
      </div>

      {/* Inter 20px */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-brand-white">Inter 20px</h2>

        <div className="space-y-4">
          <div className="p-6 rounded-lg border border-brand-white-30" style={{ backgroundColor: '#1A1A1B' }}>
            <p className="text-sm text-brand-off-white-300 mb-4">7. Inter Bold 20 (20px, Bold, 140% line-height)</p>
            <p className="font-sans text-[20px] leading-[1.4] font-bold text-brand-white">
              Inter Bold 20
            </p>
          </div>

          <div className="p-6 rounded-lg border border-brand-white-30" style={{ backgroundColor: '#1A1A1B' }}>
            <p className="text-sm text-brand-off-white-300 mb-4">8. Inter Regular 20 (20px, Regular, 140% line-height)</p>
            <p className="font-sans text-[20px] leading-[1.4] font-normal text-brand-white">
              Inter Regular 20
            </p>
          </div>

          <div className="p-6 rounded-lg border border-brand-white-30" style={{ backgroundColor: '#1A1A1B' }}>
            <p className="text-sm text-brand-off-white-300 mb-4">9. Inter Light 20 (20px, Light, 140% line-height)</p>
            <p className="font-sans text-[20px] leading-[1.4] font-light text-brand-white">
              Inter Light 20
            </p>
          </div>
        </div>
      </div>

      {/* Inter 16px */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-brand-white">Inter 16px</h2>

        <div className="space-y-4">
          <div className="p-6 rounded-lg border border-brand-white-30" style={{ backgroundColor: '#1A1A1B' }}>
            <p className="text-sm text-brand-off-white-300 mb-4">10. Inter Semi Bold 16 (16px, Semi Bold, 140% line-height)</p>
            <p className="font-sans text-[16px] leading-[1.4] font-semibold text-brand-white">
              Inter Semi Bold 16
            </p>
          </div>

          <div className="p-6 rounded-lg border border-brand-white-30" style={{ backgroundColor: '#1A1A1B' }}>
            <p className="text-sm text-brand-off-white-300 mb-4">11. Inter Medium 16 (16px, Medium, 140% line-height)</p>
            <p className="font-sans text-[16px] leading-[1.4] font-medium text-brand-white">
              Inter Medium 16
            </p>
          </div>

          <div className="p-6 rounded-lg border border-brand-white-30" style={{ backgroundColor: '#1A1A1B' }}>
            <p className="text-sm text-brand-off-white-300 mb-4">12. Inter Regular 16 (16px, Regular, 140% line-height)</p>
            <p className="font-sans text-[16px] leading-[1.4] font-normal text-brand-white">
              Inter Regular 16
            </p>
          </div>

          <div className="p-6 rounded-lg border border-brand-white-30" style={{ backgroundColor: '#1A1A1B' }}>
            <p className="text-sm text-brand-off-white-300 mb-4">13. Inter Light 16 (16px, Light, 140% line-height)</p>
            <p className="font-sans text-[16px] leading-[1.4] font-light text-brand-white">
              Inter Light 16
            </p>
          </div>
        </div>
      </div>

      {/* Inter Small Sizes */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-brand-white">Inter Small</h2>

        <div className="space-y-4">
          <div className="p-6 rounded-lg border border-brand-white-30" style={{ backgroundColor: '#1A1A1B' }}>
            <p className="text-sm text-brand-off-white-300 mb-4">14. Inter Regular 14 (14px, Regular, 140% line-height)</p>
            <p className="font-sans text-[14px] leading-[1.4] font-normal text-brand-white">
              Inter Regular 14
            </p>
          </div>

          <div className="p-6 rounded-lg border border-brand-white-30" style={{ backgroundColor: '#1A1A1B' }}>
            <p className="text-sm text-brand-off-white-300 mb-4">15. Inter Bold 12 (12px, Bold, 140% line-height)</p>
            <p className="font-sans text-[12px] leading-[1.4] font-bold text-brand-white">
              Inter Bold 12
            </p>
          </div>

          <div className="p-6 rounded-lg border border-brand-white-30" style={{ backgroundColor: '#1A1A1B' }}>
            <p className="text-sm text-brand-off-white-300 mb-4">16. Inter Light 12 (12px, Light, 140% line-height)</p>
            <p className="font-sans text-[12px] leading-[1.4] font-light text-brand-white">
              Inter Light 12
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: "Design System/Typography",
  component: Typography,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllStyles: Story = {};

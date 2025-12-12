import type { Meta, StoryObj } from "@storybook/react";
import { ProjectPreview } from "../components/ui/project-preview";

const ProjectPreviewShowcase = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--brand-off-white-100)' }}>
      <h1 className="text-4xl font-bold mb-2 p-8" style={{ color: 'var(--brand-black)' }}>Project Preview</h1>
      <p className="mb-12 px-8" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>Project preview component with title, description, images, and view project link</p>

      <div className="flex flex-col items-start gap-8 px-8">
        <ProjectPreview
          title="Avinya"
          description="I create bespoke solutions and tools for automotive specialists who value trust, precision, and attention to detail. No templates — just refined experiences, tailored to your needs and built around how your business works."
          mainImage="/images/project/hero.png"
          previewImage1="/images/project/preview-1.png"
          previewImage2="/images/project/preview-2.png"
          projectLink="/projects/avinya"
        />
      </div>
    </div>
  );
};

const meta = {
  title: "Components/Project Preview",
  component: ProjectPreviewShowcase,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ProjectPreviewShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

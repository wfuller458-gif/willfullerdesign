import type { Meta, StoryObj } from "@storybook/react";
import { ProjectCarousel } from "../components/ui/project-carousel";

const ProjectCarouselShowcase = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--brand-off-white-100)' }}>
      <h1 className="text-4xl font-bold mb-2 p-8" style={{ color: 'var(--brand-black)' }}>Project Carousel</h1>
      <p className="mb-12 px-8" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>Infinite scrolling carousel of project images - hovers to pause</p>

      <div className="flex flex-col items-center gap-8">
        <ProjectCarousel />
      </div>
    </div>
  );
};

const meta = {
  title: "Components/Project Carousel",
  component: ProjectCarouselShowcase,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ProjectCarouselShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

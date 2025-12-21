import { Button } from "./button";

export interface BannerProps {
  variant: "orange" | "grey";
  onContactClick?: () => void;
}

export function Banner({ variant, onContactClick }: BannerProps) {
  const isOrange = variant === "orange";

  return (
    <>
      <style>
        {`
          .banner-container {
            padding: 32px 0;
          }

          .banner-content {
            gap: 64px;
            padding-left: 16px;
            padding-right: 16px;
          }

          .banner-text {
            font-size: 32px;
            line-height: 1.3;
          }

          @media (max-width: 900px) {
            .banner-container {
              padding: 24px 0;
            }

            .banner-content {
              gap: 32px;
            }

            .banner-text {
              font-size: 24px;
            }
          }

          @media (max-width: 600px) {
            .banner-container {
              padding: 20px 0;
            }

            .banner-content {
              flex-direction: column;
              align-items: flex-start;
              gap: 20px;
            }

            .banner-text {
              font-size: 20px;
            }
          }

          @media (max-width: 480px) {
            .banner-container {
              padding: 16px 0;
            }

            .banner-content {
              gap: 16px;
            }

            .banner-text {
              font-size: 18px;
            }
          }
        `}
      </style>
      <div
        className="banner-container w-full"
        style={{
          backgroundColor: isOrange ? 'var(--brand-orange)' : 'var(--brand-off-white-200)'
        }}
      >
        <div className="banner-content w-full flex items-center">
          <p
            className="banner-text flex-1 min-w-0 font-display font-light"
            style={{ color: 'var(--brand-black)' }}
          >
            {isOrange
              ? "Let's talk about it in more detail. Request a free initial consultation now."
              : "There's more where that came from!"}
          </p>
          <Button
            variant="secondary-black"
            className="shrink-0"
            onClick={isOrange ? onContactClick : undefined}
          >
            {isOrange ? "Get In Touch" : "View All Projects"}
          </Button>
        </div>
      </div>
    </>
  );
}

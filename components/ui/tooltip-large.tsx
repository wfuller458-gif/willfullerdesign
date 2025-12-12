export interface TooltipLargeProps {
  description: string;
  images: [string, string] | [string, string, string];
}

export function TooltipLarge({ description, images }: TooltipLargeProps) {
  return (
    <div
      className="flex items-start"
      style={{
        backgroundColor: 'var(--brand-black)',
        padding: '16px',
        borderRadius: '8px',
        gap: '32px',
        width: '100%',
        maxWidth: '964px'
      }}
    >
      {/* Left side - Description */}
      <p
        className="font-display font-light shrink-0"
        style={{
          color: 'var(--brand-white)',
          fontSize: '16px',
          lineHeight: '1.3',
          width: '300px'
        }}
      >
        {description}
      </p>

      {/* Right side - Images */}
      <div
        className="flex-1 flex items-center"
        style={{
          gap: '8px',
          aspectRatio: '520/200'
        }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="flex-1 h-full relative"
            style={{ minWidth: '0' }}
          >
            <img
              src={src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

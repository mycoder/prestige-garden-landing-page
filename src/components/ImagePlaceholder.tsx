import { useState } from "react";

interface ImagePlaceholderProps {
  src: string;
  alt: string;
  label: string;
  className?: string;
  aspect?: string; // tailwind aspect-ratio class
  priority?: boolean;
}

/**
 * Tries to render the real image from /public/images.
 * If the image file doesn't exist yet, falls back to an elegant,
 * clearly-labelled placeholder so the layout never breaks.
 */
export default function ImagePlaceholder({
  src,
  alt,
  label,
  className = "",
  aspect = "aspect-square",
  priority = false,
}: ImagePlaceholderProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`${aspect} ${className} flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/70 p-4 text-center`}
        role="img"
        aria-label={alt}
      >
        <span className="text-3xl" aria-hidden="true">
          🍚
        </span>
        <span className="text-xs font-medium leading-snug text-emerald-700 sm:text-sm">
          {label}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={`${aspect} ${className} object-cover`}
    />
  );
}

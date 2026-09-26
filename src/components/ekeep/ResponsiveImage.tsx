import type { ImgHTMLAttributes } from "react";

const sources = import.meta.glob<string>("../../assets/responsive/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  asset: "hero-warehouse" | "office-assets" | "stock-operator" | "worried-executive";
};

// Width descriptors let the browser select an asset using actual viewport/DPR.
// The original image remains a fallback, including in environments without WebP.
export function ResponsiveImage({ asset, sizes = "100vw", ...props }: Props) {
  const widths = asset === "hero-warehouse" ? [480, 960, 1920] : [320, 640, 1024];
  const srcSet = widths
    .map((width) => `${sources[`../../assets/responsive/${asset}-${width}.webp`]} ${width}w`)
    .join(", ");
  return (
    <picture className="contents">
      <source type="image/webp" srcSet={srcSet} sizes={sizes} />
      <img {...props} sizes={sizes} decoding="async" />
    </picture>
  );
}

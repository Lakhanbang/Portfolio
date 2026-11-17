import Image, { type ImageProps } from "next/image";
import imageSizes from "@/data/image-sizes.json";

/** Intrinsic dimensions prevent layout shifts while images load lazily. */
export default function PortfolioImage({ src, alt, sizes = "(max-width: 768px) 90vw, 900px", ...props }: Omit<ImageProps, "src" | "width" | "height"> & { src: string }) {
  const dimensions = imageSizes[src as keyof typeof imageSizes];
  return <Image src={src} alt={alt} width={dimensions.width} height={dimensions.height} sizes={sizes} {...props} />;
}

import { brandImage, ogSize } from "@/components/og/BrandImage";
import { site } from "@/content/site";
import { ogImageAlt } from "@/lib/metadata";

export const alt = ogImageAlt;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return brandImage({ title: site.name, subtitle: site.slogan });
}

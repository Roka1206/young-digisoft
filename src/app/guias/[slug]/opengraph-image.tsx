import { notFound } from "next/navigation";
import { brandImage, ogSize } from "@/components/og/BrandImage";
import { guides, guidesPageText } from "@/content/guides";
import { site } from "@/content/site";
import { findGuide } from "@/lib/guides";

export const alt = `${guidesPageText.breadcrumb} de ${site.name}`;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return guides.map(({ slug }) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const guide = findGuide(guides, (await params).slug);
  if (!guide) notFound();
  return brandImage({ title: guide.title, subtitle: `${guidesPageText.breadcrumb} · ${site.name}` });
}

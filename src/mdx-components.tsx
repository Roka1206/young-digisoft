import type { MDXComponents } from "mdx/types";
import Link from "next/link";

const linkClasses = "font-medium text-action underline underline-offset-4 hover:no-underline";

// Required by @next/mdx in the App Router: brand styles for the elements used in guides.
const components: MDXComponents = {
  h2: (props) => <h2 className="mt-12 text-2xl/8 font-bold text-foreground" {...props} />,
  h3: (props) => <h3 className="mt-8 text-xl/7 font-bold text-foreground" {...props} />,
  p: (props) => <p className="mt-4 leading-relaxed text-foreground" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-foreground" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-6 leading-relaxed text-foreground" {...props} />,
  strong: (props) => <strong className="font-bold" {...props} />,
  a: ({ href = "", ...props }) =>
    href.startsWith("/") ? (
      <Link href={href} className={linkClasses} {...props} />
    ) : (
      <a href={href} className={linkClasses} rel="noopener noreferrer" {...props} />
    ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}

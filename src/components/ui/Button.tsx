import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-95";

const variants = {
  primary:
    "bg-brand text-brand-foreground shadow-sm hover:shadow-md hover:brightness-110",
  secondary:
    "bg-surface text-foreground border border-border hover:border-brand hover:text-brand",
  ghost: "bg-transparent text-foreground hover:bg-brand/10 hover:text-brand",
} satisfies Record<string, string>;

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-13 px-8 text-lg",
} satisfies Record<string, string>;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", className, children, href, ...rest } = props as ButtonAsLink;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    const isExternal = /^https?:\/\//.test(href);
    return (
      <Link
        href={href}
        className={classes}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(rest as ComponentPropsWithoutRef<"a">)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ComponentPropsWithoutRef<"button">)}>
      {children}
    </button>
  );
}

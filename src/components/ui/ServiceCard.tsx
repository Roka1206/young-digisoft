import type { Service } from "@/content/site";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <div className="group flex h-full flex-col gap-4 rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-lg">
      <div className="inline-flex size-11 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
        <Icon size={22} />
      </div>
      <h3 className="font-heading text-lg text-foreground">{service.title}</h3>
      <p className="text-sm text-muted">{service.description}</p>
    </div>
  );
}

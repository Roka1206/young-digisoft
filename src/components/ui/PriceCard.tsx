import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { launchOffer, priceText, prices } from "@/content/pricing";
import type { Plan } from "@/content/services";
import { formatPrice, hasLaunchDiscount } from "@/lib/pricing";
import { Badge } from "./Badge";
import { Card } from "./Card";

export function PriceCard({ plan, children }: { plan: Plan; children?: ReactNode }) {
  const price = prices[plan.id];
  const discounted = hasLaunchDiscount(price);

  return (
    <Card className="flex h-full flex-col gap-5">
      <h3 className="text-xl/7 font-medium text-foreground">{plan.name}</h3>
      <div>
        {discounted && <Badge>{priceText.launch}</Badge>}
        <p className="mt-2 text-3xl font-bold text-foreground">
          {formatPrice(price.launch, price.unit)}{" "}
          <span className="text-sm font-normal text-muted">{priceText.vatIncluded}</span>
        </p>
        {discounted && (
          <p className="mt-1 text-sm text-muted">
            {priceText.regular}: {formatPrice(price.regular, price.unit)} · {priceText.until} {launchOffer.endsOn}
          </p>
        )}
      </div>
      <ul className="flex flex-1 flex-col gap-2">
        {plan.includes.map((feature) => (
          <li key={feature} className="flex gap-2 text-foreground">
            <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-action" />
            {feature}
          </li>
        ))}
      </ul>
      {plan.timeline && (
        <p className="font-mono text-[13px]/5 text-muted">
          {priceText.timeline}: {plan.timeline}
        </p>
      )}
      {children}
    </Card>
  );
}

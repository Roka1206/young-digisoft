import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { launchOffer, priceText, prices } from "@/content/pricing";
import type { Plan } from "@/content/services";
import { cn } from "@/lib/cn";
import { formatPrice, hasLaunchDiscount } from "@/lib/pricing";
import { Badge } from "./Badge";
import { Card } from "./Card";

export function PriceCard({
  plan,
  headingLevel: Heading = "h3",
  className,
  children,
}: {
  plan: Plan;
  headingLevel?: "h3" | "h4";
  className?: string;
  children?: ReactNode;
}) {
  const price = prices[plan.id];
  const discounted = hasLaunchDiscount(price);

  return (
    <Card className={cn("flex h-full flex-col gap-5", className)}>
      <Heading className="text-xl/7 font-bold text-foreground">{plan.name}</Heading>
      <div>
        {discounted && <Badge>{priceText.launch}</Badge>}
        <p className="mt-2 text-3xl font-bold text-foreground">
          {formatPrice(price.launch, price.unit)}{" "}
          <span className="text-sm font-normal whitespace-nowrap text-muted">{priceText.vatIncluded}</span>
        </p>
        {discounted && (
          <p className="mt-1 text-sm text-muted">
            {priceText.regular}: <s>{formatPrice(price.regular, price.unit)}</s> · {priceText.until}{" "}
            {launchOffer.endsOn}
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
        <p className="text-sm text-muted">
          {priceText.timeline}: {plan.timeline}
        </p>
      )}
      {children}
    </Card>
  );
}

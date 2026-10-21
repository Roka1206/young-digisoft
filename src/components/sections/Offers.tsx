import Link from "next/link";
import { offers } from "@/content/home";
import { launchOffer, priceText } from "@/content/pricing";
import { services } from "@/content/services";
import { PriceCard } from "@/components/ui/PriceCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

const conditions = new Intl.ListFormat("es", { type: "conjunction" }).format(launchOffer.conditions);

export function Offers() {
  return (
    <Section id="servicios" title={offers.title} description={offers.description}>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.flatMap((service) =>
          service.plans.map((plan) => (
            <Reveal key={plan.id}>
              <PriceCard plan={plan}>
                {service.note && <p className="text-sm text-muted">{service.note}</p>}
                <Link
                  href={`/servicios/${service.slug}`}
                  className="font-medium text-action underline hover:text-action-hover"
                >
                  {offers.detailsLink}
                </Link>
              </PriceCard>
            </Reveal>
          )),
        )}
      </div>
      <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-muted">
        <strong className="font-medium text-foreground">{priceText.launch}:</strong> {launchOffer.audience},{" "}
        {offers.launchNote} {conditions}. {priceText.until} {launchOffer.endsOn}.
      </p>
    </Section>
  );
}

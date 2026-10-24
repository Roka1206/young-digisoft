import Link from "next/link";
import { offers } from "@/content/home";
import { launchOffer, priceText } from "@/content/pricing";
import { services } from "@/content/services";
import { plansByBilling } from "@/lib/services";
import { PriceCard } from "@/components/ui/PriceCard";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

const conditions = new Intl.ListFormat("es", { type: "conjunction" }).format(launchOffer.conditions);
const groups = plansByBilling(services);

export function Offers() {
  return (
    <Section id="servicios" title={offers.title} description={offers.description}>
      <div className="flex flex-col gap-12">
        {(["oneOff", "recurring"] as const).map((billing) => (
          <div key={billing}>
            <h3 className="mb-6 text-lg font-bold text-foreground">{offers.groups[billing]}</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {groups[billing].map(({ service, plan }) => (
                <Reveal key={plan.id}>
                  {/* On phones the card lists the first three items; the rest are on the service page. */}
                  <PriceCard plan={plan} headingLevel="h4" className="max-sm:[&_li:nth-child(n+4)]:hidden">
                    {service.note && <p className="text-sm text-muted">{service.note}</p>}
                    <Link
                      href={`/servicios/${service.slug}`}
                      className="font-medium text-action underline hover:text-action-hover"
                    >
                      {offers.detailsLink}
                      <span className="sr-only">: {service.name}</span>
                    </Link>
                  </PriceCard>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-muted">
        <strong className="font-medium text-foreground">{priceText.launch}:</strong> {launchOffer.audience},{" "}
        {offers.launchNote} {conditions}. {priceText.until} {launchOffer.endsOn}.
      </p>
    </Section>
  );
}

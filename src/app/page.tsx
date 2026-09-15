import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

const BackToTop = dynamic(() =>
  import("@/components/layout/BackToTop").then((mod) => mod.BackToTop)
);
const ExitIntentModal = dynamic(() =>
  import("@/components/forms/ExitIntentModal").then((mod) => mod.ExitIntentModal)
);

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <WhyUs />
        <div className="py-20">
          <CtaBanner
            heading="¿Listo para digitalizar tu negocio?"
            description="Escríbenos y te preparamos una propuesta a medida, sin compromiso."
          />
        </div>
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <ExitIntentModal />
    </>
  );
}

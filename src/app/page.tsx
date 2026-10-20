import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Contact } from "@/components/sections/Contact";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Offers } from "@/components/sections/Offers";
import { Portfolio } from "@/components/sections/Portfolio";
import { Problems } from "@/components/sections/Problems";
import { Process } from "@/components/sections/Process";
import { WhyUs } from "@/components/sections/WhyUs";

const BackToTop = dynamic(() => import("@/components/layout/BackToTop").then((mod) => mod.BackToTop));
const ExitIntentModal = dynamic(() =>
  import("@/components/forms/ExitIntentModal").then((mod) => mod.ExitIntentModal)
);

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Problems />
        <Offers />
        <Process />
        <WhyUs />
        <Portfolio />
        <Faq />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <ExitIntentModal />
    </>
  );
}

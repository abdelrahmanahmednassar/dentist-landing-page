import Hero from "@/components/Hero";
import CasesFull from "@/components/CasesFull";
import AboutClinic from "@/components/AboutClinic";
import Testimonials from "@/components/Testimonials";
import Services from "@/components/Services";

export default function Home() {
  return (
    <>
      <Hero />
      <CasesFull />
      <AboutClinic />
      <Testimonials />
      <Services />
    </>
  );
}

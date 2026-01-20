import { Metadata } from "next";
import { getMessages } from "next-intl/server";
import ServiceDetail from "@/components/ServiceDetail";

export async function generateMetadata(): Promise<Metadata> {
  const t = (await getMessages()) as any;
  const service = t.servicePages.teethBeautification;

  return {
    title: `${service.title} | Dr. Fayed Dental Clinic`,
    description: service.lead,
  };
}

export default function TeethBeautificationPage() {
  return <ServiceDetail serviceKey="teethBeautification" />;
}

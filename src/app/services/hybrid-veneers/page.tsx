import { Metadata } from "next";
import { getMessages } from "next-intl/server";
import ServiceDetail from "@/components/ServiceDetail";

export async function generateMetadata(): Promise<Metadata> {
  const t = (await getMessages()) as any;
  const service = t.servicePages.hybridVeneers;

  return {
    title: `${service.title} | Dr. Fayed Dental Clinic`,
    description: service.lead,
  };
}

export default function HybridVeneersPage() {
  return <ServiceDetail serviceKey="hybridVeneers" />;
}

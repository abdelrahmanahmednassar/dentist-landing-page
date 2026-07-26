"use client";

import { Link } from "@/i18n/navigation";

import Image from "next/image";
import { useMessages, useLocale } from "next-intl";
import styles from "@/styles/service-detail.module.css";

interface ServiceItem {
  title: string;
  desc: string;
}

interface ServiceData {
  category: string;
  title: string;
  lead: string;
  imageAlt: string;
  whatIs?: {
    title: string;
    p1: string;
    p2: string;
  };
  benefits?: {
    title: string;
    [key: string]: string | ServiceItem;
  };
  steps?: {
    title: string;
    [key: string]: string | ServiceItem;
  };
  services?: {
    title: string;
    [key: string]: string | ServiceItem;
  };
  dsd?: {
    title: string;
    intro: string;
    [key: string]: string | ServiceItem;
  };
  whyUs?: {
    title: string;
    [key: string]: string | ServiceItem;
  };
  features?: {
    title: string;
    [key: string]: string | ServiceItem;
  };
  comparison?: {
    title: string;
    vsTraditional?: {
      title: string;
      hybridPros: string;
      traditionalPros: string;
    };
    vsLumineers?: {
      title: string;
      hybridPros: string;
      lumineersPros: string;
    };
    whoNeedsIt?: {
      title: string;
      desc: string;
    };
  };
  cta: {
    title: string;
    text: string;
    button: string;
  };
}

interface ServiceDetailProps {
  serviceKey:
    | "teethImplants"
    | "teethBeautification"
    | "hybridVeneers"
    | "threeNVeneers";
}

export default function ServiceDetail({ serviceKey }: ServiceDetailProps) {
  const messages = useMessages() as any;
  const language = useLocale();
  const service = messages.servicePages[serviceKey] as ServiceData;

  // Map service keys to Unsplash images (from original service-content.js)
  const serviceImages: Record<string, string> = {
    teethImplants:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&h=600&fit=crop",
    teethBeautification:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1200&h=600&fit=crop",
    hybridVeneers:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&h=600&fit=crop",
    threeNVeneers:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&h=600&fit=crop",
  };

  // Helper function to extract numbered items from an object
  const extractItems = (
    obj: Record<string, string | ServiceItem>,
    prefix: string,
  ): ServiceItem[] => {
    const items: ServiceItem[] = [];
    let i = 1;
    while (obj[`${prefix}${i}`]) {
      const item = obj[`${prefix}${i}`];
      if (typeof item === "object") {
        items.push(item);
      }
      i++;
    }
    return items;
  };

  const benefitItems = service.benefits
    ? extractItems(service.benefits, "item")
    : [];
  const stepItems = service.steps ? extractItems(service.steps, "step") : [];
  const serviceItems = service.services
    ? extractItems(service.services, "item")
    : [];
  const dsdSteps = service.dsd ? extractItems(service.dsd, "step") : [];
  const whyUsItems = service.whyUs ? extractItems(service.whyUs, "item") : [];
  const featureItems = service.features
    ? extractItems(service.features, "item")
    : [];

  return (
    <article className={styles.serviceDetail}>
      <div className={styles.serviceDetailContainer}>
        {/* Header */}
        <div className={styles.serviceHeader}>
          <Link href="/services" className={styles.backButton}>
            <i className="bx bx-right-arrow-alt"></i>
            {language === "ar" ? "العودة للخدمات" : "Back to Services"}
          </Link>
          <h1 className={styles.serviceTitle}>{service.title}</h1>
          <p className={styles.serviceLead}>{service.lead}</p>
        </div>

        {/* Service Image */}
        <div className={styles.serviceImage}>
          <Image
            src={serviceImages[serviceKey]}
            alt={service.imageAlt}
            width={1200}
            height={600}
            priority
          />
        </div>

        <div className={styles.serviceContent}>
          {/* What Is Section */}
          {service.whatIs && (
            <section className={styles.serviceSection}>
              <h2>{service.whatIs.title}</h2>
              <p>{service.whatIs.p1}</p>
              <p>{service.whatIs.p2}</p>
            </section>
          )}

          {/* Services List (for beautification) */}
          {service.services && serviceItems.length > 0 && (
            <section className={styles.serviceSection}>
              <h2>{service.services.title}</h2>
              <div className={styles.benefitsGrid}>
                {serviceItems.map((item: ServiceItem, index: number) => (
                  <div key={index} className={styles.benefitItem}>
                    <i className="bx bx-check-circle"></i>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Benefits Section */}
          {service.benefits && benefitItems.length > 0 && (
            <section className={styles.serviceSection}>
              <h2>{service.benefits.title}</h2>
              <div className={styles.benefitsGrid}>
                {benefitItems.map((item: ServiceItem, index: number) => (
                  <div key={index} className={styles.benefitItem}>
                    <i className="bx bx-check-circle"></i>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Features Section */}
          {service.features && featureItems.length > 0 && (
            <section className={styles.serviceSection}>
              <h2>{service.features.title}</h2>
              <div className={styles.benefitsGrid}>
                {featureItems.map((item: ServiceItem, index: number) => (
                  <div key={index} className={styles.benefitItem}>
                    <i className="bx bx-star"></i>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Steps/Process Section */}
          {service.steps && stepItems.length > 0 && (
            <section className={styles.serviceSection}>
              <h2>{service.steps.title}</h2>
              <div className={styles.processSteps}>
                {stepItems.map((step: ServiceItem, index: number) => (
                  <div key={index} className={styles.stepItem}>
                    <div className={styles.stepNumber}>{index + 1}</div>
                    <div className={styles.stepContent}>
                      <h4>{step.title}</h4>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* DSD Section (for beautification) */}
          {service.dsd && dsdSteps.length > 0 && (
            <section className={styles.serviceSection}>
              <h2>{service.dsd.title}</h2>
              <p>{service.dsd.intro}</p>
              <div className={styles.processSteps}>
                {dsdSteps.map((step: ServiceItem, index: number) => (
                  <div key={index} className={styles.stepItem}>
                    <div className={styles.stepNumber}>{index + 1}</div>
                    <div className={styles.stepContent}>
                      <h4>{step.title}</h4>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Why Us Section (for beautification) */}
          {service.whyUs && whyUsItems.length > 0 && (
            <section className={styles.serviceSection}>
              <h2>{service.whyUs.title}</h2>
              <div className={styles.benefitsGrid}>
                {whyUsItems.map((item: ServiceItem, index: number) => (
                  <div key={index} className={styles.benefitItem}>
                    <i className="bx bx-heart"></i>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Comparison Section (for veneers) */}
          {service.comparison && (
            <section className={styles.serviceSection}>
              <h2>{service.comparison.title}</h2>

              {service.comparison.vsTraditional && (
                <div className={styles.comparisonBlock}>
                  <h3>{service.comparison.vsTraditional.title}</h3>
                  <div className={styles.comparisonGrid}>
                    <div className={styles.comparisonItem}>
                      <strong>
                        {language === "ar"
                          ? "مميزات الهايبرد:"
                          : "Hybrid Advantages:"}
                      </strong>
                      <p>{service.comparison.vsTraditional.hybridPros}</p>
                    </div>
                    <div className={styles.comparisonItem}>
                      <strong>
                        {language === "ar"
                          ? "مميزات البورسلين التقليدي:"
                          : "Traditional Porcelain Advantages:"}
                      </strong>
                      <p>{service.comparison.vsTraditional.traditionalPros}</p>
                    </div>
                  </div>
                </div>
              )}

              {service.comparison.vsLumineers && (
                <div className={styles.comparisonBlock}>
                  <h3>{service.comparison.vsLumineers.title}</h3>
                  <div className={styles.comparisonGrid}>
                    <div className={styles.comparisonItem}>
                      <strong>
                        {language === "ar"
                          ? "مميزات الهايبرد:"
                          : "Hybrid Advantages:"}
                      </strong>
                      <p>{service.comparison.vsLumineers.hybridPros}</p>
                    </div>
                    <div className={styles.comparisonItem}>
                      <strong>
                        {language === "ar"
                          ? "مميزات اللومينير:"
                          : "Lumineers Advantages:"}
                      </strong>
                      <p>{service.comparison.vsLumineers.lumineersPros}</p>
                    </div>
                  </div>
                </div>
              )}

              {service.comparison.whoNeedsIt && (
                <div className={styles.comparisonBlock}>
                  <h3>{service.comparison.whoNeedsIt.title}</h3>
                  <p>{service.comparison.whoNeedsIt.desc}</p>
                </div>
              )}
            </section>
          )}

          {/* CTA Section */}
          <section className={styles.serviceCta}>
            <h3>{service.cta.title}</h3>
            <p>{service.cta.text}</p>
            <Link
              href="https://wa.me/201002507882"
              className={styles.ctaButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              {service.cta.button}
            </Link>
          </section>
        </div>
      </div>
    </article>
  );
}

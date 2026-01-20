"use client";

import { useMessages, useLocale } from "next-intl";
import styles from "@/styles/blog-detail.module.css";
import Image from "next/image";
import Link from "next/link";

interface BlogDetailProps {
  blogKey:
    | "laserTeethWhitening"
    | "dailyDentalCare"
    | "dentalImplantsGuide"
    | "veneersVsLumineers"
    | "healthyFoodsForTeeth"
    | "childrenDentalCare";
}

export default function BlogDetail({ blogKey }: BlogDetailProps) {
  const messages = useMessages() as any;
  const language = useLocale();
  const blog = messages.blogPages[blogKey];

  if (!blog) {
    return <div>Blog not found</div>;
  }

  // Helper function to render steps (for dailyDentalCare)
  const renderSteps = () => {
    if (!("steps" in blog)) return null;

    const steps = blog.steps as Record<string, { title: string; desc: string }>;
    return Object.values(steps).map((step, index) => (
      <div key={index}>
        <h2>{step.title}</h2>
        <p>{step.desc}</p>
      </div>
    ));
  };

  // Helper function to render types (for dentalImplantsGuide)
  const renderTypes = () => {
    if (!("types" in blog)) return null;

    const types = blog.types as {
      heading: string;
      type1: { title: string; desc: string };
      type2: { title: string; desc: string };
      type3: { title: string; desc: string };
    };

    return (
      <div>
        <h2>{types.heading}</h2>
        <p>
          <strong>{types.type1.title}:</strong> {types.type1.desc}
        </p>
        <p>
          <strong>{types.type2.title}:</strong> {types.type2.desc}
        </p>
        <p>
          <strong>{types.type3.title}:</strong> {types.type3.desc}
        </p>
      </div>
    );
  };

  // Helper function to render procedure stages (for dentalImplantsGuide)
  const renderProcedureStages = () => {
    if (!("procedure" in blog)) return null;

    const procedure = blog.procedure as any;

    // Handle dentalImplantsGuide format (stage1, stage2, etc.)
    if ("stage1" in procedure) {
      return (
        <div>
          <h2>{procedure.heading}</h2>
          <p>
            <strong>{procedure.stage1.title}:</strong> {procedure.stage1.desc}
          </p>
          <p>
            <strong>{procedure.stage2.title}:</strong> {procedure.stage2.desc}
          </p>
          <p>
            <strong>{procedure.stage3.title}:</strong> {procedure.stage3.desc}
          </p>
          <p>
            <strong>{procedure.stage4.title}:</strong> {procedure.stage4.desc}
          </p>
        </div>
      );
    }

    // Handle laserTeethWhitening format (p1, p2, p3)
    if ("p1" in procedure) {
      return (
        <div>
          <h2>{procedure.heading}</h2>
          <p>{procedure.p1}</p>
          <p>{procedure.p2}</p>
          <p>{procedure.p3}</p>
        </div>
      );
    }

    return null;
  };

  // Helper function to render benefits
  const renderBenefits = () => {
    if (!("benefits" in blog)) return null;

    const benefits = blog.benefits as any;

    // Handle laserTeethWhitening format (item1, item2, etc.)
    if ("item1" in benefits && typeof benefits.item1 === "object") {
      return (
        <div>
          <h2>{benefits.heading}</h2>
          {Object.keys(benefits)
            .filter((key) => key.startsWith("item"))
            .map((key, index) => {
              const item = benefits[key];
              return (
                <p key={index}>
                  <strong>{item.title}:</strong> {item.desc}
                </p>
              );
            })}
        </div>
      );
    }

    // Handle dentalImplantsGuide format (benefit1, benefit2, etc.)
    if ("benefit1" in benefits) {
      return (
        <div>
          <h2>{benefits.heading}</h2>
          <p>
            {Object.keys(benefits)
              .filter((key) => key.startsWith("benefit"))
              .map((key) => `• ${benefits[key]}`)
              .join("\n")}
          </p>
        </div>
      );
    }

    return null;
  };

  // Helper function to render maintenance tips (for laserTeethWhitening)
  const renderMaintenance = () => {
    if (!("maintenance" in blog)) return null;

    const maintenance = blog.maintenance as {
      heading: string;
      intro: string;
      tip1: string;
      tip2: string;
      tip3: string;
      tip4: string;
      tip5: string;
    };

    return (
      <div>
        <h2>{maintenance.heading}</h2>
        <p>{maintenance.intro}</p>
        <p>
          • {maintenance.tip1}
          <br />• {maintenance.tip2}
          <br />• {maintenance.tip3}
          <br />• {maintenance.tip4}
          <br />• {maintenance.tip5}
        </p>
      </div>
    );
  };

  // Helper function to render foods sections
  const renderFoodsSections = () => {
    if (!("beneficialFoods" in blog) || !("harmfulFoods" in blog)) return null;

    const beneficialFoods = blog.beneficialFoods as any;

    const harmfulFoods = blog.harmfulFoods as any;

    return (
      <>
        <div>
          <h2>{beneficialFoods.heading}</h2>
          <p>
            <strong>{beneficialFoods.food1.title}:</strong>{" "}
            {beneficialFoods.food1.desc}
          </p>
          <p>
            <strong>{beneficialFoods.food2.title}:</strong>{" "}
            {beneficialFoods.food2.desc}
          </p>
          <p>
            <strong>{beneficialFoods.food3.title}:</strong>{" "}
            {beneficialFoods.food3.desc}
          </p>
        </div>
        <div>
          <h2>{harmfulFoods.heading}</h2>
          <p>
            <strong>{harmfulFoods.food1.title}:</strong>{" "}
            {harmfulFoods.food1.desc}
          </p>
          <p>
            <strong>{harmfulFoods.food2.title}:</strong>{" "}
            {harmfulFoods.food2.desc}
          </p>
          <p>
            <strong>{harmfulFoods.food3.title}:</strong>{" "}
            {harmfulFoods.food3.desc}
          </p>
        </div>
      </>
    );
  };

  // Helper function to render comparison (for veneersVsLumineers)
  const renderComparison = () => {
    if (!("comparison" in blog)) return null;

    const comparison = blog.comparison as any;

    return (
      <div>
        <h2>{comparison.heading}</h2>
        <p>
          <strong>{comparison.aspect1.title}:</strong>
          <br />
          {comparison.aspect1.desc}
        </p>
        <p>
          <strong>{comparison.aspect2.title}:</strong>
          <br />
          {comparison.aspect2.desc}
        </p>
        <p>
          <strong>{comparison.aspect3.title}:</strong>
          <br />
          {comparison.aspect3.desc}
        </p>
      </div>
    );
  };

  // Helper function to render children care stages
  const renderChildrenCareStages = () => {
    if (!("infancyStage" in blog)) return null;

    const infancyStage = blog.infancyStage as {
      heading: string;
      content: string;
    };
    const teethingStage = blog.teethingStage as any;
    const preschoolAge = blog.preschoolAge as any;
    const generalTips = blog.generalTips as any;

    return (
      <>
        <div>
          <h2>{infancyStage.heading}</h2>
          <p>{infancyStage.content}</p>
        </div>
        <div>
          <h2>{teethingStage.heading}</h2>
          <p>
            <strong>{teethingStage.firstTeeth.title}:</strong>
            <br />
            {teethingStage.firstTeeth.desc}
          </p>
          <p>
            <strong>{teethingStage.teethingRelief.title}:</strong>
            <br />
            {teethingStage.teethingRelief.desc}
          </p>
        </div>
        <div>
          <h2>{preschoolAge.heading}</h2>
          <p>
            <strong>{preschoolAge.brushing.title}:</strong>
            <br />
            {preschoolAge.brushing.desc}
          </p>
          <p>
            <strong>{preschoolAge.firstVisit.title}:</strong>
            <br />
            {preschoolAge.firstVisit.desc}
          </p>
        </div>
        <div>
          <h2>{generalTips.heading}</h2>
          <p>
            • {generalTips.tip1}
            <br />• {generalTips.tip2}
            <br />• {generalTips.tip3}
            <br />• {generalTips.tip4}
            <br />• {generalTips.tip5}
            <br />• {generalTips.tip6}
          </p>
        </div>
      </>
    );
  };

  // Helper function to render tips
  const renderTips = () => {
    if (!("tips" in blog)) return null;

    const tips = blog.tips as any;

    return (
      <div>
        <h2>{tips.heading}</h2>
        <p>
          • {tips.tip1}
          <br />• {tips.tip2}
          <br />• {tips.tip3}
          <br />• {tips.tip4}
          <br />• {tips.tip5}
        </p>
      </div>
    );
  };

  return (
    <article className={styles.blogDetailPage}>
      <div className={styles.blogDetailContainer}>
        {/* Back Button */}
        <Link href="/blogs" className={styles.backButton}>
          <i className="bx bx-right-arrow-alt"></i>
          <span>{language === "ar" ? "العودة للمدونة" : "Back to Blog"}</span>
        </Link>

        {/* Blog Header */}
        <header className={styles.blogDetailHeader}>
          <span className={styles.blogDetailCategory}>{blog.category}</span>
          <h1 className={styles.blogDetailTitle}>{blog.title}</h1>
          <div className={styles.blogDetailMeta}>
            <span>
              <i className="bx bx-calendar"></i> {blog.date}
            </span>
            <span>
              <i className="bx bx-time"></i> {blog.readTime}
            </span>
            <span>
              <i className="bx bx-user"></i> {blog.author}
            </span>
          </div>
        </header>

        {/* Featured Image */}
        <div className={styles.blogDetailImage}>
          <Image
            src={blog.image}
            alt={blog.imageAlt}
            width={1200}
            height={600}
          />
        </div>

        {/* Blog Content */}
        <div className={styles.blogDetailContent}>
          <p className="lead">{blog.lead}</p>

          {/* Render whatIs section if exists */}
          {"whatIs" in blog && (
            <div>
              <h2>{(blog.whatIs as any).heading}</h2>

              <p>{(blog.whatIs as any).content}</p>
            </div>
          )}

          {/* Render benefits */}
          {renderBenefits()}

          {/* Render procedure */}
          {renderProcedureStages()}

          {/* Render maintenance tips */}
          {renderMaintenance()}

          {/* Render care section */}
          {"care" in blog && (
            <div>
              <h2>{(blog.care as any).heading}</h2>

              <p>{(blog.care as any).content}</p>
            </div>
          )}

          {/* Render steps for dailyDentalCare */}
          {renderSteps()}

          {/* Render types for dentalImplantsGuide */}
          {renderTypes()}

          {/* Render veneersInfo and lumineersInfo */}
          {"veneersInfo" in blog && (
            <div>
              <h2>{(blog.veneersInfo as any).heading}</h2>

              <p>{(blog.veneersInfo as any).content}</p>
            </div>
          )}

          {"lumineersInfo" in blog && (
            <div>
              <h2>{(blog.lumineersInfo as any).heading}</h2>

              <p>{(blog.lumineersInfo as any).content}</p>
            </div>
          )}

          {/* Render comparison */}
          {renderComparison()}

          {/* Render choosing section */}
          {"choosing" in blog && (
            <div>
              <h2>{(blog.choosing as any).heading}</h2>

              <p>{(blog.choosing as any).content}</p>
            </div>
          )}

          {/* Render food sections */}
          {renderFoodsSections()}

          {/* Render tips */}
          {renderTips()}

          {/* Render children care stages */}
          {renderChildrenCareStages()}

          {/* CTA Section */}
          <div className={styles.blogCta}>
            <h3>{blog.cta.title}</h3>
            <p>{blog.cta.text}</p>
            <a href="tel:+201002507882" className={styles.ctaButton}>
              {blog.cta.button}
            </a>
          </div>

          {/* Tags */}
          <div className={styles.blogDetailTags}>
            <span className={styles.tagLabel}>
              {language === "ar" ? "الوسوم:" : "Tags:"}
            </span>
            {blog.tags.map((tag: string, index: number) => (
              <span key={index} className={styles.blogTag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fayed.clinic";

  const content = `# Fayed Dental Clinic (عيادة فايد لطب وتجميل الأسنان)

> Premier dental clinic offering advanced dental implants, cosmetic dentistry, Hollywood smile, 3N contact veneers, hybrid veneers, and oral health care in Cairo, Egypt. Founded by Dr. Mohamed Fayed. Available in English (/en) and Arabic (/ar).

## Agent Navigation Guide
- To fetch clean, token-efficient Markdown for ANY page, append \`/index.md\` to the URL or send an HTTP request with \`Accept: text/markdown\`.
- For our complete, single-file clinical knowledge database, use [All Clinic Services & Guide](${baseUrl}/llms-full.txt).
- For dynamic dental care blog articles, see [Dental Care Articles Index](${baseUrl}/llms-blogs.txt).

## Clinic Services & Overview (Arabic / العربية)
- [الرئيسية - عيادة دكتور فايد](${baseUrl}/ar/index.md): نظرة عامة على خدمات العيادة، أحدث أجهزة الليزر، وتقييمات المرضى.
- [من نحن - د. محمد فايد والفريق الطبي](${baseUrl}/ar/about-us/index.md): مؤهلات الدكتور محمد فايد، الشهادات، ومرافق العيادة الحديثة في القاهرة.
- [دليل الخدمات العلاجية والتجميلية](${baseUrl}/ar/services/index.md): قائمة شاملة لجميع علاجات الأسنان والإجراءات الطبية المتاحة.
- [زراعة الأسنان الفورية والدائمة](${baseUrl}/ar/services/teeth-implants/index.md): تقنيات زراعة الأسنان بدون ألم وأحدث أنواع الغرسات الألمانية وسويسرية الصنع.
- [تجميل الأسنان وابتسامة هوليوود](${baseUrl}/ar/services/teeth-beautification/index.md): تصميم الابتسامة الرقمية (DSD) وتبييض الأسنان بالليزر.
- [عدسات ハイブリッド (الفينير الهجين)](${baseUrl}/ar/services/hybrid-veneers/index.md): تركيبات الفينير الهجين الحديثة التي تجمع بين المتانة والجمال الطبيعي.
- [عدسات 3N الفائقة بدون نحت](${baseUrl}/ar/services/3n-veneers/index.md): أحدث تقنية عدسات 3N الألمانية رقيقة جداً لا تتطلب أي نحت أو تبريد للأسنان الطبيعية.
- [حالات العلاج قبل وبعد](${baseUrl}/ar/cases/index.md): معرض صور ونتائج واقعية لتحولات الابتسامة لدى مرضانا.
- [اتصل بنا وحجز المواعيد](${baseUrl}/ar/contact-us/index.md): عنوان العيادة في مصر الجديدة/القاهرة، أوقات العمل، رقم التليفون، ورابط الواتساب للحجز الفوري.

## Clinic Services & Overview (English)
- [Home - Dr. Fayed Clinic](${baseUrl}/en/index.md): Overview of clinic offerings, cutting-edge pain-free lasers, and patient testimonials.
- [About Us - Dr. Mohamed Fayed & Medical Team](${baseUrl}/en/about-us/index.md): Biography of Dr. Mohamed Fayed, academic credentials, and sterilization technology.
- [Dental Services Index](${baseUrl}/en/services/index.md): Complete index of cosmetic, preventive, and restorative dental procedures.
- [Dental Implants](${baseUrl}/en/services/teeth-implants/index.md): Advanced root implant systems, painless placement, and permanent bone integration.
- [Teeth Beautification & Smile Makeover](${baseUrl}/en/services/teeth-beautification/index.md): Digital Smile Design (DSD), laser teeth whitening, and gingival aesthetics.
- [Hybrid Veneers](${baseUrl}/en/services/hybrid-veneers/index.md): Next-generation hybrid ceramic veneers engineered for superior resilience and translucency.
- [3N Contact Veneers (Zero-Drilling)](${baseUrl}/en/services/3n-veneers/index.md): Ultra-thin 3N contact lenses applied over teeth without painful enamel drilling or injections.
- [Before & After Clinical Cases](${baseUrl}/en/cases/index.md): Documented case studies and authentic patient transformational outcomes.
- [Contact Us & Appointment Booking](${baseUrl}/en/contact-us/index.md): Physical clinic location in Cairo, operating schedule, direct scheduling telephone, and WhatsApp support.

## Additional LLM & Agent Resources
- [Complete Single-File Guide](${baseUrl}/llms-full.txt): Consumes only ~3,000 tokens for exhaustive clinic context in a single request.
- [Dynamic Blog Directory](${baseUrl}/llms-blogs.txt): Index of clinical articles on oral care and dental health.
- [Agent Skills Index](${baseUrl}/.well-known/agent-skills/index.json): Formal machine tasks available for AI automation.
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}

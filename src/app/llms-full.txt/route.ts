import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fayed.clinic";

  const content = `# Complete Clinical Guide & Agent Knowledge Base: Fayed Dental Clinic
> Single-file comprehensive knowledge base designed for LLM context window ingestion. Consumes approximately 3,500 tokens.
> Website: ${baseUrl} | Founded & Led by: Dr. Mohamed Fayed | Location: Cairo, Egypt.

---

## 1. Clinic Overview & Mission
Fayed Dental Clinic is one of Egypt's preeminent dental centers, specializing in surgical implantation, cosmetic architecture, pain-free laser treatments, and conservative dentistry. Our philosophy blends state-of-the-art European and American medical technology with uncompromising patient comfort and aesthetic realism.

### Why Choose Fayed Dental Clinic?
- **Painless Dentistry & Laser Technology**: Equipped with advanced laser ablation systems, allowing cavity preparation and gum therapy without vibration, heat, or distressing drills.
- **Digital Smile Design (DSD)**: Using 3D facial scanning and CAD/CAM modeling to predictively sculpt customized smiles before any physical procedure begins.
- **Zero-Drilling Veneers**: Exclusive certified providers of German 3N Contact Veneers, which bond directly to natural teeth without cutting enamel or requiring dental anesthetics.
- **World-Class Sterilization**: Strict Hospital-grade B autoclaving and individual single-use instruments guaranteeing absolute sterilization safety.

---

## 2. Specialized Treatments & Services

### 2.1 Dental Implants (زراعة الأسنان)
- **Overview**: Permanent titanium and zirconia biocompatible tooth roots surgically placed into the jawbone to restore chewing function and bone preservation.
- **Systems Used**: German, Swiss, and American CE/FDA-certified implant systems with optimal osseointegration coatings.
- **Immediate vs. Conventional**: Offering immediate placement (same-day post-extraction implants) as well as conventional guided implant surgery.
- **Benefits**: Fixed permanent feel, prevents jawbone atrophy, preserves adjacent teeth without cutting bridge pillars, 15+ year clinical survival rates exceeding 98%.

### 2.2 3N Contact Veneers (عدسات 3N الفائقة بدون نحت)
- **Overview**: Ultra-thin high-strength German lithium disilicate lenses engineered at microscopic thicknesses (approx. 0.2mm).
- **Zero Drilling Guarantee**: applied directly over existing natural teeth without grinding, filing, or drilling tooth enamel.
- **Reversibility**: Because natural enamel remains completely undisturbed beneath the lenses, the procedure is theoretically reversible without structural harm.
- **Ideal Candidates**: Patients desiring whiter, permanently stain-resistant teeth, correcting minor tooth spacing or discolorations without permanent altering of tooth anatomy.

### 2.3 Hybrid Veneers (الفينير الهجين)
- **Overview**: Next-generation ceramic-polymer hybrid cosmetic laminates combining the exceptional fracture toughness of composite resin with the brilliant gloss and stain resistance of porcelain.
- **Advantages**: Shock-absorbing durability preventing chipping under mastication forces, natural opalescence, and rapid lab-assisted fabrication.

### 2.4 Teeth Beautification & Hollywood Smile (تجميل الأسنان)
- **Procedures**: Comprehensive smile makeover integrating laser gum contouring (removing gummy smiles), professional in-office laser whitening (up to 8 shades lighter in 45 minutes), and aesthetic ceramic crown transformations.
- **Digital Planning**: Co-creating the tooth shape, shade, and dimensions directly with patient preference and facial proportion analysis.

### 2.5 General, Preventive & Pediatric Care (الرعاية الشاملة)
- **Services**: Root canal therapy using rotary nickel-titanium instrumentation and apex locators, periodontium care, ultrasonic calculus debulking, child-friendly pediatric care, and invisible orthodontics (aligners).

---

## 3. Meet Dr. Mohamed Fayed & Medical Team
- **Founder**: Dr. Mohamed Fayed, prominent dental surgeon and cosmetic dentistry leader in Cairo.
- **Team**: Multidisciplinary clinical specialists spanning maxillofacial surgery, prosthodontics, endodontics, and orthodontic correction.
- **Continuing Education**: Regularly participating in European and global dental congresses to integrate advanced biological dentistry techniques into Egyptian practice.

---

## 4. Location, Operating Hours & Appointment Booking
- **City & Country**: Cairo, Egypt (مصر).
- **Primary Telephone / WhatsApp**: Direct scheduling available at $+201034317813$.
- **Online Booking**: Patients can schedule consultation visits directly via [Contact Page](${baseUrl}/contact-us) or via WhatsApp messaging.
- **Consultation Procedure**: Includes intraoral clinical examination, digital panoramic radiology screening, and an interactive personalized treatment roadmap.

---

## 5. Bilingual Navigation Summary
- English Homepage: [${baseUrl}/en/index.md](${baseUrl}/en/index.md)
- Arabic Homepage: [${baseUrl}/ar/index.md](${baseUrl}/ar/index.md)
- English Services Directory: [${baseUrl}/en/services/index.md](${baseUrl}/en/services/index.md)
- Arabic Services Directory: [${baseUrl}/ar/services/index.md](${baseUrl}/ar/services/index.md)
- Contact & Directions (EN): [${baseUrl}/en/contact-us/index.md](${baseUrl}/en/contact-us/index.md)
- Contact & Directions (AR): [${baseUrl}/ar/contact-us/index.md](${baseUrl}/ar/contact-us/index.md)
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Lightbulb, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";
import InvoiceEditor from "@/components/InvoiceEditor";
import { getProfession, professions } from "@/lib/professions";

const siteUrl = "https://freelance-invoice-generator.vercel.app";

export const dynamicParams = false;

export function generateStaticParams() {
  return professions.map((profession) => ({ profession: `invoice-generator-for-${profession.slug}` }));
}

export function generateMetadata({ params }: { params: { profession: string } }): Metadata {
  const profession = getProfession(params.profession.replace(/^invoice-generator-for-/, ""));
  if (!profession) return {};
  const title = `Free Invoice Generator for ${profession.name}s`;
  const description = `Create a professional ${profession.name.toLowerCase()} invoice with prefilled ${profession.unit} pricing, automatic totals, tax, discounts and instant PDF export.`;
  const path = `/invoice-generator-for-${profession.slug}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: `${siteUrl}${path}`, images: [] },
    twitter: { card: "summary", title, description, images: [] },
  };
}

export default function ProfessionInvoicePage({ params }: { params: { profession: string } }) {
  const profession = getProfession(params.profession.replace(/^invoice-generator-for-/, ""));
  if (!profession) notFound();

  const faq = [
    {
      question: `What should a ${profession.name} invoice include?`,
      answer: `Include both parties’ contact details, a unique invoice number, issue and due dates, a clear description of each ${profession.service.toLowerCase()} deliverable, quantity, rate, applicable tax, discounts and payment terms.`,
    },
    {
      question: `Can I bill ${profession.unit} rates with this template?`,
      answer: `Yes. The template starts with a realistic ${profession.unit} example, but the quantity, description and rate are fully editable for hourly, fixed-price, milestone or recurring work.`,
    },
    {
      question: "Is my client and payment data uploaded?",
      answer: "No. The generator runs entirely in your browser. Your entries are not sent to a server or stored in an account.",
    },
    {
      question: "How do I save the invoice as a PDF?",
      answer: "Select Download PDF / Print Invoice, choose Save as PDF in your browser’s print dialog, confirm paper size A4 or Letter, and save the finished document.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const applicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${profession.name} Invoice Generator`,
    url: `${siteUrl}/invoice-generator-for-${profession.slug}`,
    description: `Free online invoice and contract generator for ${profession.name.toLowerCase()} professionals.`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const related = professions.filter((item) => item.slug !== profession.slug).slice(0, 8);

  return (
    <main>
      <header className="print-hide border-b border-white/10 bg-evergreen text-white">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold"><ArrowLeft className="h-4 w-4" /> InvoiceCraft</Link>
          <a href="#generator" className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold transition hover:bg-white/10">Start this template</a>
        </div>
      </header>

      <section className="hero-grid print-hide bg-evergreen pb-28 pt-14 text-white lg:pb-32 lg:pt-20">
        <div className="mx-auto max-w-[1500px] px-5 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Free profession-specific template</p>
          <h1 className="mt-5 max-w-5xl font-serif text-5xl leading-[1.06] tracking-tight sm:text-6xl">Invoice Generator for {profession.name}s</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-emerald-50/75">Start with a realistic {profession.service.toLowerCase()} line item, customize every detail, and export a polished PDF your client can process with confidence.</p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-emerald-50/80"><span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-gold" /> Prefilled {profession.unit} rate</span><span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-gold" /> Automatic calculations</span><span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-gold" /> Print-ready PDF</span></div>
        </div>
      </section>

      <section className="mx-auto -mt-16 max-w-[1500px] px-4 pb-14 sm:px-6 lg:px-8">
        <InvoiceEditor profession={profession.name} defaultItem={{ description: profession.service, quantity: profession.quantity, rate: profession.rate }} />
      </section>

      <section className="print-hide border-y border-stone-200 bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[1fr_0.8fr] lg:px-8">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-evergreen">Simple workflow</p><h2 className="mt-3 font-serif text-4xl tracking-tight">How to invoice your {profession.name.toLowerCase()} clients</h2><div className="mt-8 space-y-7">{[
            ["Describe the outcome", `Replace the sample “${profession.service}” with a specific deliverable, phase or time period your client recognizes.`],
            ["Confirm the commercial details", `Set the quantity and ${profession.unit} rate, choose the agreed currency, then add tax or a negotiated discount.`],
            ["Make payment easy", "Use an unambiguous due date and add transfer instructions, late-payment terms or a purchase-order reference in the notes."],
            ["Export and send", "Print to PDF, name the file with your client and invoice number, and keep a copy with your project records."],
          ].map(([title, text], index) => <div key={title} className="flex gap-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-evergreen text-xs font-bold text-white">{index + 1}</span><div><h3 className="font-bold text-ink">{title}</h3><p className="mt-1 leading-7 text-stone-600">{text}</p></div></div>)}</div></div>
          <aside className="self-start rounded-3xl bg-paper p-7"><Lightbulb className="h-7 w-7 text-gold" /><h2 className="mt-5 font-serif text-2xl">A stronger invoice gets paid faster.</h2><ul className="mt-5 space-y-4 text-sm leading-6 text-stone-600"><li>Match the invoice number and client name to your agreement or purchase order.</li><li>Use concrete line-item descriptions instead of a vague “services rendered.”</li><li>State the currency explicitly for cross-border clients.</li><li>Check your local tax and invoice-record requirements before sending.</li></ul><div className="mt-7 flex gap-3 rounded-xl border border-evergreen/15 bg-white p-4 text-sm text-evergreen"><ShieldCheck className="h-5 w-5 shrink-0" /><p>Your entries stay on this device and disappear when you leave or refresh.</p></div></aside>
        </div>
      </section>

      <section className="print-hide py-16"><div className="mx-auto max-w-5xl px-5 lg:px-8"><p className="text-xs font-bold uppercase tracking-[0.18em] text-evergreen">Common questions</p><h2 className="mt-3 font-serif text-4xl tracking-tight">{profession.name} invoice FAQ</h2><div className="mt-8 divide-y divide-stone-200 border-y border-stone-200">{faq.map((item) => <div key={item.question} className="py-6"><h3 className="font-bold text-ink">{item.question}</h3><p className="mt-2 leading-7 text-stone-600">{item.answer}</p></div>)}</div></div></section>

      <section className="print-hide bg-ink py-14 text-white"><div className="mx-auto max-w-[1500px] px-5 lg:px-8"><h2 className="font-serif text-3xl">More freelance invoice templates</h2><div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{related.map((item) => <Link key={item.slug} href={`/invoice-generator-for-${item.slug}`} className="group flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-stone-200 transition hover:bg-white/10">{item.name}<ArrowRight className="h-4 w-4 text-gold transition group-hover:translate-x-1" /></Link>)}</div></div></section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema).replace(/</g, "\\u003c") }} />
    </main>
  );
}

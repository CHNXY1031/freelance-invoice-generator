import Link from "next/link";
import { ArrowRight, BadgeCheck, FileCheck2, LockKeyhole, Sparkles } from "lucide-react";
import InvoiceEditor from "@/components/InvoiceEditor";
import { professions } from "@/lib/professions";

const BASE_URL = "https://freelance-invoice-generator-alpha.vercel.app";

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "InvoiceCraft Freelance Invoice & Contract Generator",
  url: BASE_URL,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: ["Invoice PDF export", "Service contract creation", "Tax and discount calculation", "Multi-currency billing"],
};

export default function HomePage() {
  return (
    <main>
      <header className="print-hide border-b border-white/10 bg-evergreen text-white">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5 font-serif text-xl font-bold tracking-tight"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold text-sm text-evergreen">IC</span>InvoiceCraft</Link>
          <a href="#generator" className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold transition hover:bg-white/10">Open free generator</a>
        </div>
      </header>

      <section className="hero-grid print-hide overflow-hidden bg-evergreen text-white">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-16 lg:grid-cols-[1fr_0.72fr] lg:px-8 lg:py-24">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-50"><Sparkles className="h-3.5 w-3.5 text-gold" />Built for independent work, everywhere</div>
            <h1 className="max-w-4xl font-serif text-5xl font-medium leading-[1.04] tracking-[-0.035em] sm:text-6xl lg:text-7xl">Professional invoices & contracts, <span className="text-[#e3bd73]">ready in minutes.</span></h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-emerald-50/80">Create a globally polished business document, calculate every total automatically, and download a client-ready PDF. Free, private, and built for freelancers.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href="#generator" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3.5 font-bold text-evergreen transition hover:bg-[#d8ad61]">Create your document <ArrowRight className="h-4 w-4" /></a><a href="#profession-templates" className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3.5 font-bold transition hover:bg-white/10">Browse profession templates</a></div>
          </div>
          <div className="self-end rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">One browser. Zero friction.</p>
            <div className="mt-6 space-y-5">
              {[{ icon: FileCheck2, title: "Invoice + contract modes", text: "Switch formats without re-entering your details." }, { icon: LockKeyhole, title: "Private by design", text: "Your business data stays entirely in your browser." }, { icon: BadgeCheck, title: "Print-perfect PDF", text: "A clean A4 document with no web page clutter." }].map(({ icon: Icon, title, text }) => <div key={title} className="flex gap-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10"><Icon className="h-5 w-5 text-gold" /></span><div><h2 className="font-bold">{title}</h2><p className="mt-1 text-sm leading-6 text-emerald-50/65">{text}</p></div></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="print-hide mb-8 max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-evergreen">Live document studio</p><h2 className="mt-3 font-serif text-3xl tracking-tight sm:text-4xl">Fill in the details. We’ll handle the arithmetic and layout.</h2><p className="mt-3 leading-7 text-stone-600">Choose invoice or contract, add your services, then use your browser’s print dialog to save a crisp PDF.</p></div>
        <InvoiceEditor />
      </section>

      <section id="profession-templates" className="print-hide border-y border-stone-200 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1500px] px-5 lg:px-8">
          <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-evergreen">Profession-ready starting points</p><h2 className="mt-3 font-serif text-4xl tracking-tight">Invoice templates shaped around your work.</h2><p className="mt-4 leading-7 text-stone-600">Open a prefilled generator with a realistic service, billing unit and rate. Every field remains editable.</p></div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {professions.map((profession) => (
              <Link key={profession.slug} href={`/invoice-generator-for-${profession.slug}`} className="group flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-4 transition hover:-translate-y-0.5 hover:border-evergreen/40 hover:bg-white hover:shadow-soft">
                <span><span className="block font-bold text-ink">{profession.name}</span><span className="mt-1 block text-xs text-stone-500">Prefilled {profession.unit} pricing</span></span><ArrowRight className="h-4 w-4 text-stone-400 transition group-hover:translate-x-1 group-hover:text-evergreen" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="print-hide bg-ink py-10 text-stone-300"><div className="mx-auto flex max-w-[1500px] flex-col gap-4 px-5 sm:flex-row sm:items-center sm:justify-between lg:px-8"><div><p className="font-serif text-xl font-bold text-white">InvoiceCraft</p><p className="mt-1 text-sm text-stone-400">Global documents for independent professionals.</p></div><p className="text-xs text-stone-500">No signup · No uploads · No hidden fees</p><a href="https://uptime-pulse-saas.vercel.app/?utm_source=freelance-invoice-generator&amp;utm_medium=referral&amp;utm_campaign=protected_by" target="_blank" rel="noopener noreferrer nofollow" className="text-xs text-stone-500 underline decoration-stone-700 underline-offset-4 transition hover:text-white">Protected by UptimePulse — Free Website &amp; SSL Monitor</a></div></footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema).replace(/</g, "\\u003c") }} />
    </main>
  );
}

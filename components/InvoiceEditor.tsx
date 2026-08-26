"use client";

import { useMemo, useState } from "react";
import {
  BadgeCheck,
  Clipboard,
  Download,
  FileSignature,
  Globe2,
  Plus,
  ReceiptText,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type CurrencyCode = "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "JPY";
type DocumentType = "invoice" | "contract";

type LineItem = {
  id: string;
  description: string;
  quantity: number;
  rate: number;
};

type Party = {
  name: string;
  email: string;
  address: string;
};

type InvoiceEditorProps = {
  profession?: string;
  defaultItem?: {
    description: string;
    quantity: number;
    rate: number;
  };
};

const currencies: Array<{ code: CurrencyCode; label: string }> = [
  { code: "USD", label: "USD $" },
  { code: "EUR", label: "EUR €" },
  { code: "GBP", label: "GBP £" },
  { code: "CAD", label: "CAD $" },
  { code: "AUD", label: "AUD $" },
  { code: "JPY", label: "JPY ¥" },
];

const inputClass =
  "mt-2 w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-stone-400 focus:border-evergreen focus:ring-4 focus:ring-evergreen/10";

function isoDate(offset = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block text-xs font-semibold uppercase tracking-[0.12em] text-stone-500", className)}>
      {label}
      {children}
    </label>
  );
}

export default function InvoiceEditor({ profession, defaultItem }: InvoiceEditorProps) {
  const [documentType, setDocumentType] = useState<DocumentType>("invoice");
  const [number, setNumber] = useState(`INV-${new Date().getFullYear()}-001`);
  const [issueDate, setIssueDate] = useState(isoDate());
  const [dueDate, setDueDate] = useState(isoDate(30));
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [sender, setSender] = useState<Party>({ name: "", email: "", address: "" });
  const [client, setClient] = useState<Party>({ name: "", email: "", address: "" });
  const [items, setItems] = useState<LineItem[]>([
    {
      id: "initial",
      description: defaultItem?.description ?? "Professional services",
      quantity: defaultItem?.quantity ?? 1,
      rate: defaultItem?.rate ?? 1200,
    },
  ]);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState("Net 30 payment terms. Thank you for your business.");
  const [copied, setCopied] = useState(false);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
    const taxAmount = subtotal * (tax / 100);
    const discountAmount = subtotal * (discount / 100);
    return { subtotal, taxAmount, discountAmount, total: Math.max(0, subtotal + taxAmount - discountAmount) };
  }, [items, tax, discount]);

  const money = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: currency === "JPY" ? 0 : 2,
    }).format(value);

  const updateParty = (party: "sender" | "client", key: keyof Party, value: string) => {
    const setter = party === "sender" ? setSender : setClient;
    setter((current) => ({ ...current, [key]: value }));
  };

  const updateItem = (id: string, key: keyof Omit<LineItem, "id">, value: string | number) => {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, [key]: value } : item)));
  };

  const addItem = () => {
    setItems((current) => [
      ...current,
      { id: `${Date.now()}-${current.length}`, description: "", quantity: 1, rate: 0 },
    ]);
  };

  const removeItem = (id: string) => {
    setItems((current) => (current.length === 1 ? current : current.filter((item) => item.id !== id)));
  };

  const copySummary = async () => {
    const summary = [
      `${documentType === "invoice" ? "INVOICE" : "SERVICE AGREEMENT"} ${number}`,
      `From: ${sender.name || "Your Business"}${sender.email ? ` (${sender.email})` : ""}`,
      `For: ${client.name || "Client"}${client.email ? ` (${client.email})` : ""}`,
      `Issued: ${issueDate} | Due: ${dueDate}`,
      "",
      ...items.map(
        (item) => `${item.description || "Service"} — ${item.quantity} × ${money(item.rate)} = ${money(item.quantity * item.rate)}`,
      ),
      "",
      `Subtotal: ${money(totals.subtotal)}`,
      `Tax (${tax}%): ${money(totals.taxAmount)}`,
      `Discount (${discount}%): -${money(totals.discountAmount)}`,
      `TOTAL DUE: ${money(totals.total)}`,
      notes ? `Terms: ${notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(summary);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = summary;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="generator" className="scroll-mt-6">
      <div className="print-hide mb-6 flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex w-fit rounded-xl bg-stone-100 p-1" aria-label="Document type">
          <button
            type="button"
            onClick={() => setDocumentType("invoice")}
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition",
              documentType === "invoice" ? "bg-white text-evergreen shadow-sm" : "text-stone-500",
            )}
          >
            <ReceiptText className="h-4 w-4" /> Invoice
          </button>
          <button
            type="button"
            onClick={() => setDocumentType("contract")}
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition",
              documentType === "contract" ? "bg-white text-evergreen shadow-sm" : "text-stone-500",
            )}
          >
            <FileSignature className="h-4 w-4" /> Contract
          </button>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button type="button" onClick={copySummary} className="secondary-button">
            {copied ? <BadgeCheck className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
            {copied ? "Copied to clipboard" : "Copy Invoice Summary"}
          </button>
          <button type="button" onClick={() => window.print()} className="primary-button">
            <Download className="h-4 w-4" /> Download PDF / Print Invoice
          </button>
        </div>
      </div>

      <div className="editor-grid grid gap-7 xl:grid-cols-[minmax(0,0.88fr)_minmax(620px,1.12fr)]">
        <div className="print-hide space-y-5">
          <div className="editor-panel">
            <div className="panel-heading">
              <span>01</span>
              <div><h2>Document details</h2><p>Reference, schedule and billing currency.</p></div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={documentType === "invoice" ? "Invoice #" : "Contract #"}>
                <input className={inputClass} value={number} onChange={(event) => setNumber(event.target.value)} />
              </Field>
              <Field label="Currency">
                <select className={inputClass} value={currency} onChange={(event) => setCurrency(event.target.value as CurrencyCode)}>
                  {currencies.map((option) => <option key={option.code} value={option.code}>{option.label}</option>)}
                </select>
              </Field>
              <Field label={documentType === "invoice" ? "Issue date" : "Effective date"}>
                <input type="date" className={inputClass} value={issueDate} onChange={(event) => setIssueDate(event.target.value)} />
              </Field>
              <Field label="Payment due">
                <input type="date" className={inputClass} value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
              </Field>
            </div>
          </div>

          <div className="editor-panel">
            <div className="panel-heading">
              <span>02</span>
              <div><h2>Business & client</h2><p>The parties shown on your document.</p></div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-3">
                <p className="text-sm font-bold text-evergreen">From</p>
                <Field label="Your business name"><input className={inputClass} placeholder="Northstar Studio" value={sender.name} onChange={(e) => updateParty("sender", "name", e.target.value)} /></Field>
                <Field label="Email"><input type="email" className={inputClass} placeholder="hello@studio.com" value={sender.email} onChange={(e) => updateParty("sender", "email", e.target.value)} /></Field>
                <Field label="Address"><textarea className={cn(inputClass, "min-h-20 resize-y")} placeholder="Street, city, country" value={sender.address} onChange={(e) => updateParty("sender", "address", e.target.value)} /></Field>
              </div>
              <div className="space-y-3">
                <p className="text-sm font-bold text-evergreen">Bill to</p>
                <Field label="Client name"><input className={inputClass} placeholder="Acme Company" value={client.name} onChange={(e) => updateParty("client", "name", e.target.value)} /></Field>
                <Field label="Email"><input type="email" className={inputClass} placeholder="accounts@client.com" value={client.email} onChange={(e) => updateParty("client", "email", e.target.value)} /></Field>
                <Field label="Address"><textarea className={cn(inputClass, "min-h-20 resize-y")} placeholder="Street, city, country" value={client.address} onChange={(e) => updateParty("client", "address", e.target.value)} /></Field>
              </div>
            </div>
          </div>

          <div className="editor-panel">
            <div className="panel-heading">
              <span>03</span>
              <div><h2>Services & fees</h2><p>Add deliverables, hours or project milestones.</p></div>
            </div>
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={item.id} className="rounded-xl border border-stone-200 bg-stone-50/70 p-3">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Item {index + 1}</span>
                    <button type="button" onClick={() => removeItem(item.id)} disabled={items.length === 1} className="rounded-lg p-1.5 text-stone-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-30" aria-label={`Remove item ${index + 1}`}><Trash2 className="h-4 w-4" /></button>
                  </div>
                  <Field label="Description"><input className={inputClass} placeholder="Service or deliverable" value={item.description} onChange={(e) => updateItem(item.id, "description", e.target.value)} /></Field>
                  <div className="mt-3 grid grid-cols-3 gap-3">
                    <Field label="Qty / Hours"><input type="number" min="0" step="any" className={inputClass} value={item.quantity} onChange={(e) => updateItem(item.id, "quantity", Number(e.target.value))} /></Field>
                    <Field label="Unit rate"><input type="number" min="0" step="any" className={inputClass} value={item.rate} onChange={(e) => updateItem(item.id, "rate", Number(e.target.value))} /></Field>
                    <div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">Subtotal</p><p className="mt-2 rounded-xl bg-white px-3 py-2.5 text-right text-sm font-bold text-ink">{money(item.quantity * item.rate)}</p></div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={addItem} className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-evergreen/40 py-3 text-sm font-bold text-evergreen transition hover:border-evergreen hover:bg-evergreen/5"><Plus className="h-4 w-4" /> Add line item</button>
            </div>
          </div>

          <div className="editor-panel">
            <div className="panel-heading">
              <span>04</span>
              <div><h2>Totals & terms</h2><p>Apply tax, discounts and payment instructions.</p></div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Tax %"><input type="number" min="0" step="any" className={inputClass} value={tax} onChange={(e) => setTax(Number(e.target.value))} /></Field>
              <Field label="Discount %"><input type="number" min="0" max="100" step="any" className={inputClass} value={discount} onChange={(e) => setDiscount(Number(e.target.value))} /></Field>
              <Field label="Payment terms / Notes" className="sm:col-span-2"><textarea className={cn(inputClass, "min-h-24 resize-y")} value={notes} onChange={(e) => setNotes(e.target.value)} /></Field>
            </div>
          </div>
        </div>

        <article className="invoice-document self-start overflow-hidden bg-white shadow-paper xl:sticky xl:top-5">
          <div className="h-2 bg-evergreen" />
          <div className="document-body p-8 sm:p-12 lg:p-14">
            <header className="flex items-start justify-between gap-6 border-b border-stone-200 pb-9">
              <div>
                <div className="mb-4 flex items-center gap-2 text-evergreen"><Globe2 className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-[0.24em]">Global business document</span></div>
                <h2 className="font-serif text-4xl tracking-tight text-ink sm:text-5xl">{documentType === "invoice" ? "Invoice" : "Service Agreement"}</h2>
                {profession && <p className="mt-2 text-sm text-stone-500">Prepared for {profession} services</p>}
              </div>
              <div className="text-right text-sm">
                <p className="font-bold text-ink">{number || "INV-001"}</p>
                <p className="mt-2 text-stone-500">{documentType === "invoice" ? "Issued" : "Effective"}: {issueDate}</p>
                <p className="text-stone-500">Payment due: {dueDate}</p>
              </div>
            </header>

            <section className="grid grid-cols-2 gap-8 py-9">
              <div><p className="document-label">From</p><p className="mt-3 font-bold text-ink">{sender.name || "Your Business Name"}</p><p className="mt-1 whitespace-pre-line text-sm leading-6 text-stone-500">{sender.email || "you@business.com"}{"\n"}{sender.address || "Business address"}</p></div>
              <div><p className="document-label">{documentType === "invoice" ? "Bill to" : "Client"}</p><p className="mt-3 font-bold text-ink">{client.name || "Client Name"}</p><p className="mt-1 whitespace-pre-line text-sm leading-6 text-stone-500">{client.email || "client@company.com"}{"\n"}{client.address || "Client address"}</p></div>
            </section>

            {documentType === "contract" && (
              <section className="mb-8 rounded-xl bg-stone-50 p-5 text-sm leading-6 text-stone-600">
                <p className="font-bold text-ink">Agreement overview</p>
                <p className="mt-2">This Service Agreement is entered into by {sender.name || "the Service Provider"} and {client.name || "the Client"}. The Service Provider will deliver the scope below according to the listed fees and payment terms.</p>
              </section>
            )}

            <section>
              <table className="w-full table-fixed text-left">
                <thead><tr className="border-b-2 border-evergreen text-[10px] font-bold uppercase tracking-[0.14em] text-stone-500"><th className="w-[52%] py-3">{documentType === "invoice" ? "Description" : "Scope / Deliverable"}</th><th className="w-[14%] py-3 text-right">Qty</th><th className="w-[17%] py-3 text-right">Rate</th><th className="w-[17%] py-3 text-right">Amount</th></tr></thead>
                <tbody>{items.map((item) => <tr key={item.id} className="border-b border-stone-100 text-sm"><td className="break-words py-4 pr-3 font-medium text-ink">{item.description || "Professional service"}</td><td className="py-4 text-right text-stone-500">{item.quantity}</td><td className="py-4 text-right text-stone-500">{money(item.rate)}</td><td className="py-4 text-right font-semibold text-ink">{money(item.quantity * item.rate)}</td></tr>)}</tbody>
              </table>
            </section>

            <section className="ml-auto mt-7 w-full max-w-xs space-y-3 text-sm">
              <div className="flex justify-between text-stone-500"><span>Subtotal</span><span>{money(totals.subtotal)}</span></div>
              <div className="flex justify-between text-stone-500"><span>Tax ({tax}%)</span><span>{money(totals.taxAmount)}</span></div>
              <div className="flex justify-between text-stone-500"><span>Discount ({discount}%)</span><span>− {money(totals.discountAmount)}</span></div>
              <div className="flex items-end justify-between border-t-2 border-ink pt-4"><span className="font-bold uppercase tracking-wider text-ink">Total due</span><span className="font-serif text-2xl font-bold text-evergreen">{money(totals.total)}</span></div>
            </section>

            <section className="mt-10 border-t border-stone-200 pt-7"><p className="document-label">Payment terms & notes</p><p className="mt-3 whitespace-pre-line text-sm leading-6 text-stone-600">{notes || "Payment terms will appear here."}</p></section>

            {documentType === "contract" && (
              <section className="mt-12 grid grid-cols-2 gap-10">
                <div className="border-t border-stone-400 pt-3 text-xs text-stone-500">Service Provider signature / date</div>
                <div className="border-t border-stone-400 pt-3 text-xs text-stone-500">Client signature / date</div>
              </section>
            )}

            <footer className="mt-12 flex items-center justify-between border-t border-stone-100 pt-5 text-[10px] uppercase tracking-[0.16em] text-stone-400"><span>Generated securely in your browser</span><span>{currency} · {number}</span></footer>
          </div>
        </article>
      </div>
    </section>
  );
}

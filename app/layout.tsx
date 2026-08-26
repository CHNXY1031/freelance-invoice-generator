import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = "https://freelance-invoice-generator-alpha.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Free Invoice & Contract Generator for Freelancers",
    template: "%s | InvoiceCraft",
  },
  description:
    "Create polished freelance invoices and service contracts in minutes. Calculate tax and discounts, then print or download a professional PDF — free and private.",
  keywords: [
    "freelance invoice generator",
    "invoice PDF",
    "contract generator",
    "free invoice template",
    "independent contractor invoice",
  ],
  alternates: { canonical: "/" },
  verification: { google: "google4bf79fc737f0ba77" },
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "InvoiceCraft",
    title: "Free Invoice & Contract Generator for Freelancers",
    description: "Create a polished invoice or service contract and export it as a professional PDF — no account required.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "InvoiceCraft invoice and contract generator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Invoice & Contract Generator for Freelancers",
    description: "Create, calculate and export a polished business document in minutes.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

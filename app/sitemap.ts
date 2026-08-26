import type { MetadataRoute } from "next";
import { professions } from "@/lib/professions";

const siteUrl = "https://freelance-invoice-generator.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...professions.map((profession) => ({
      url: `${siteUrl}/invoice-generator-for-${profession.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

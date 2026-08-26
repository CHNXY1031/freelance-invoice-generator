import type { MetadataRoute } from "next";
import { professions } from "@/lib/professions";

const BASE_URL = "https://freelance-invoice-generator-alpha.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...professions.map((profession) => ({
      url: `${BASE_URL}/invoice-generator-for-${profession.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

import { siteMeta } from "@/data/resumeContent";

export const dynamic = "force-static";

export default function sitemap() {
  return [
    {
      url: siteMeta.siteUrl,
      lastModified: "2026-05-30",
      changeFrequency: "weekly",
      priority: 1
    }
  ];
}

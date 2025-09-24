import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"], // Block private routes
      },
    ],
    sitemap: "https://careers.padhneai.com/sitemap.xml",
    host: "https://careers.padhneai.com",
  };
}

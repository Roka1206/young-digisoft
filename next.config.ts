import type { NextConfig } from "next";

const googleAnalytics =
  "https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com";

// Dev only: React needs eval, and Vercel Analytics/Speed Insights load their debug scripts from this host.
const devScripts = process.env.NODE_ENV === "development" ? " 'unsafe-eval' https://va.vercel-scripts.com" : "";

// Without nonces so pages stay static; 'unsafe-inline' covers Next's and the cookie banner's inline scripts.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${devScripts} https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: ${googleAnalytics}`,
  "font-src 'self'",
  `connect-src 'self' ${googleAnalytics}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "young-digisoft.vercel.app" }],
        destination: "https://youngdigisoft.es/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

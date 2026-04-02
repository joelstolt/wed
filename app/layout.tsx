import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nathalie & Markus — 5 September 2026",
  description:
    "Vi gifter oss! Följ med oss och fira kärleken den 5 september 2026 i Gamla Uppsala Kyrka.",
  openGraph: {
    title: "Nathalie & Markus — Bröllop 5 September 2026",
    description:
      "Vi gifter oss! Följ med oss och fira kärleken den 5 september 2026.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Great+Vibes&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}

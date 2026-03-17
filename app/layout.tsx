import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Natalie & Markus — 23 Augusti 2026",
  description:
    "Vi gifter oss! Följ med oss när vi firar kärleken den 23 augusti 2026 på Norrvikens Trädgårdar, Båstad.",
  openGraph: {
    title: "Natalie & Markus — Bröllop 23 Augusti 2026",
    description:
      "Vi gifter oss! Följ med oss när vi firar kärleken den 23 augusti 2026.",
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
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Outfit:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}

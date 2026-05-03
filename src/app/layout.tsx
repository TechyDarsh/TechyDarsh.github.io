import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sri Darshan C S - SDE | INDIA",
  description:
    "Software Development Engineer specializing in AI/ML, Cloud Architecture, Cybersecurity, and Full-Stack Development.",
  authors: [{ name: "Sri Darshan C S" }],
  icons: {
    icon: "/favicon.svg",
  },
};

import MetaMaskSuppressor from "@/components/MetaMaskSuppressor";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Outfit:wght@400;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <MetaMaskSuppressor />
        {children}
      </body>
    </html>
  );
}

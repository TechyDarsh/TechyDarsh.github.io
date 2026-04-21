import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sri Darshan C S — Software Development Engineer",
  description:
    "Software Development Engineer specializing in AI/ML, Cloud Architecture, Cybersecurity, and Full-Stack Development.",
  authors: [{ name: "Sri Darshan C S" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

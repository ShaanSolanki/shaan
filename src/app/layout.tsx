import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shaan Solanki — Full-Stack & AI Product Builder",
  description:
    "Shaan Solanki builds futuristic, automation-driven digital experiences with the MERN stack and AI — voice systems, real-time apps, SaaS, and intelligent interfaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="has-cursor">{children}</body>
    </html>
  );
}

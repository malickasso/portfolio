import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import { adminEnabled } from "@/lib/admin";
import KeystaticApp from "./keystatic";
import "./admin.css";

const space = Space_Grotesk({ variable: "--font-space", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function KeystaticLayout() {
  if (!adminEnabled) notFound();
  return (
    <html lang="fr" className={`${space.variable} ${jetbrains.variable}`}>
      <body>
        <KeystaticApp />
      </body>
    </html>
  );
}

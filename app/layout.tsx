import type { Metadata } from "next";
import { playfair, cormorant, inter } from "./fonts";
import "./globals.css";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SocialProof } from "@/components/ui/SocialProof";
import { ScentFinder } from "@/components/sections/ScentFinder";
import { CartHydrator } from "@/components/providers/CartHydrator";
import { Analytics } from "@/components/Analytics";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nexkogroup.com"
).replace(/\/+$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NEXKO PARFUM — El lujo que hueles. El precio que mereces.",
    template: "%s | NEXKO PARFUM",
  },
  description:
    "Perfumería premium y alternativas de autor: árabes, orientales, masculinos, femeninos, body sprays y sets. Envío a toda Colombia.",
  keywords: [
    "perfumes",
    "perfumería",
    "árabes",
    "Lattafa",
    "Armaf",
    "Colombia",
    "fragancias premium",
  ],
  openGraph: {
    title: "NEXKO PARFUM",
    description: "El lujo que hueles. El precio que mereces.",
    type: "website",
    locale: "es_CO",
    url: siteUrl,
    siteName: "NEXKO PARFUM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-CO"
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-void text-ink-primary">
        <CartHydrator />
        <ScrollProgress />
        <CustomCursor />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <WhatsAppButton />
        <SocialProof />
        <ScentFinder />
        <Analytics />
      </body>
    </html>
  );
}

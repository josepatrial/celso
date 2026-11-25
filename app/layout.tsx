import { Suspense } from "react";
import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ConsentBanner } from "@/components/ConsentBanner";
import { DOCTOR_INFO } from "@/lib/constants";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${DOCTOR_INFO.name} | Hematologia e Transplante de Medula Óssea`,
    template: `%s | ${DOCTOR_INFO.name}`,
  },
  description:
    "Dr. Celso Massumoto — Hematologista e Diretor Clínico da Oncocenter. Doutor e Mestre pela FMUSP. Hematology Fellow no Fred Hutchinson Cancer Research Center (Seattle, EUA). Atendimento humanizado em São Paulo/SP.",
  keywords: [
    "Dr. Celso Massumoto",
    "Hematologista São Paulo",
    "Transplante de Medula Óssea",
    "TMO",
    "Hematologia FMUSP",
    "Anemia",
    "Hemograma",
    "Oncocenter",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: `${DOCTOR_INFO.name} | Hematologia e Transplante de Medula Óssea`,
    description:
      "Atuação especializada em Hematologia e Transplante de Medula Óssea, com compromisso com a ciência, a qualidade assistencial e o cuidado humano.",
    siteName: DOCTOR_INFO.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const physicianJsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: DOCTOR_INFO.name,
    medicalSpecialty: "Hematology",
    description:
      "Médico Hematologista, Especialista em Transplante de Medula Óssea (TMO) e Doutor pela FMUSP.",
    address: {
      "@type": "PostalAddress",
      streetAddress: DOCTOR_INFO.address.street,
      addressLocality: "São Paulo",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    sameAs: [DOCTOR_INFO.instagramUrl, DOCTOR_INFO.institutionUrl],
  };

  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${plusJakarta.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-white text-text-main antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianJsonLd) }}
        />
        <Suspense fallback={<div className="h-[106px]" />}>
          <Header />
        </Suspense>
        <main className="flex-1 pt-[106px]">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <ConsentBanner />
      </body>
    </html>
  );
}

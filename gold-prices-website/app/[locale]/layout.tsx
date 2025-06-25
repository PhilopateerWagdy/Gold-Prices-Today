import Navbar from "@/components/NavBar";
import "./globals.css";
import type { Metadata } from "next";
import { getTranslations } from "@/i18n/request";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollTop from "@/components/ScrollTop";
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXX";

export const metadata: Metadata = {
  title: "Gold Prices Today",
  description: "Gold Prices Today Website",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: "en" | "ar" }>;
}) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  // Determine direction based on locale
  const direction = locale === "ar" ? "rtl" : "ltr";
  const translations = {
    navSite: t("site-name"),
    navHome: t("nav-home"),
    navIngots: t("nav-ingots"),
    navCoins: t("nav-coins"),
    navNews: t("nav-news"),
    navCompany: t("nav-company"),
    navContact: t("nav-contact"),
    header: t("under-header"),
    footer: t("about"),
  };

  return (
    <html lang={locale} dir={direction} className={locale === "ar" ? "ar" : ""}>
      <head>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        ></Script>
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_ID}');`}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col">
        <ScrollTop />
        <Navbar locale={locale} translations={translations} />
        <Header header={translations.header} locale={locale} />

        <main className="flex-grow px-4 py-6">
          <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md border border-gray-200 p-6 text-center">
            {children}
          </div>
        </main>

        <Footer locale={locale} />
      </body>
    </html>
  );
}

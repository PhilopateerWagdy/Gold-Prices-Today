import SelectedIngot from "@/components/SelectedIngot";
import { getTranslations } from "@/i18n/request";
import { getCompanies } from "@/lib/getCompanies";
import { getIngots } from "@/lib/getIngots";
import { getLocalizedMetadata } from "@/lib/getMetadata";
import { Company } from "@/types";
import { Ingot } from "@/types";
import Script from "next/script";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "en" | "ar" }>;
}) {
  const { locale } = await params;

  return getLocalizedMetadata({
    locale: locale,
    path: "/gold-ingots-prices",
  });
}

export default async function Ingots({
  params,
}: {
  params: Promise<{ locale: "en" | "ar" }>;
}) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  const translations = {
    all_sizes: t("all-sizes"),
    i_size: t("i_size"),
    factory: t("factory"),
    cashback: t("cashback"),
    sel_price: t("sel-price"),
    pur_price: t("pur-price"),
    not_found: t("not_found"),
  };

  const companies: Company[] = await getCompanies();
  const initialCompany: Company = companies[0];
  const initialCompanyIngots: Ingot[] = await getIngots(initialCompany);

  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GAD_ID}`}
        crossOrigin="anonymous"
      ></Script>

      <h1 className="text-2xl font-bold pb-7">{t("ingots-title")}</h1>
      <h1 className="text-xl font-bold pb-5">{t("i_compare")}</h1>
      <hr className="border border-dark mb-5"></hr>

      <div className="text-sm text-center mt-2 mb-4">
        <p>{t("ingot_sell_desc")}</p>
        <p>{t("ingot_buy_desc")}</p>
      </div>

      <SelectedIngot
        companies={companies}
        translations={translations}
        initialCompany={initialCompany}
        initialCompanyIngots={initialCompanyIngots}
      />
    </>
  );
}

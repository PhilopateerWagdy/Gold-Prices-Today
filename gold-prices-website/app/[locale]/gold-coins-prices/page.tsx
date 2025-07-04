import SelectedCoin from "@/components/SelectedCoin";
import { getTranslations } from "@/i18n/request";
import { getCoins } from "@/lib/getCoins";
import { getCompanies } from "@/lib/getCompanies";
import { getLocalizedMetadata } from "@/lib/getMetadata";
import { Company } from "@/types";
import { Coin } from "@/types";
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
    path: "/gold-coins-prices",
  });
}

export default async function Coins({
  params,
}: {
  params: Promise<{ locale: "en" | "ar" }>;
}) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  const translations = {
    all_sizes: t("all-sizes"),
    c_size: t("c_size"),
    factory: t("factory"),
    cashback: t("cashback"),
    sel_price: t("sel-price"),
    pur_price: t("pur-price"),
    not_found: t("not_found"),
  };

  const companies: Company[] = await getCompanies();
  const initialCompany: Company = companies[0];
  const initialCompanyCoins: Coin[] = await getCoins(initialCompany);

  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GAD_ID}`}
        crossOrigin="anonymous"
      ></Script>

      <h1 className="text-2xl font-bold pb-7">{t("coins-title")}</h1>
      <h1 className="text-xl font-bold pb-5">{t("c_compare")}</h1>
      <hr className="border border-dark mb-5"></hr>

      <div className="text-sm text-center mt-2 mb-4">
        <p>{t("coin_sell_desc")}</p>
        <p>{t("coin_buy_desc")}</p>
      </div>

      <SelectedCoin
        companies={companies}
        translations={translations}
        initialCompany={initialCompany}
        initialCompanyCoins={initialCompanyCoins}
      />

      <p className="text-sm text-gray-600 mt-4">{t("c_text")}</p>
    </>
  );
}

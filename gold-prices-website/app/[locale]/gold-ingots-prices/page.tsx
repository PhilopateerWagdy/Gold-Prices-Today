import SelectedIngot from "@/components/SelectedIngot";
import { getTranslations } from "@/i18n/request";
import { getLocalizedMetadata } from "@/lib/getMetadata";

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
    title: "Gold Ingots Prices Page",
    desc: "Gold Ingots Prices Page In Gold Prices Today Website.",
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

  return (
    <>
      <h1 className="text-2xl font-bold pb-7">{t("ingots-title")}</h1>
      <h1 className="text-xl font-bold pb-5">{t("i_compare")}</h1>
      <hr className="border border-dark mb-5"></hr>

      <div className="text-sm text-center mt-2 mb-4">
        <p>{t("ingot_sell_desc")}</p>
        <p>{t("ingot_buy_desc")}</p>
      </div>

      <SelectedIngot translations={translations} />
    </>
  );
}

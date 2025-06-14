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
    path: "/about",
    title: "About Page",
    desc: "About Page In Gold Prices Today Website.",
  });
}

export default async function About({
  params,
}: {
  params: Promise<{ locale: "en" | "ar" }>;
}) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return (
    <>
      <h1 className="text-2xl font-bold pb-10">{t("about")}</h1>
      <p className="text-lg pb-6">{t("who")}</p>
      <p className="text-lg pb-4">{t("who2")}</p>
    </>
  );
}

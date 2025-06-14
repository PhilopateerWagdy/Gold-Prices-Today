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
    path: "/privacy-policy",
    title: "Privacy Policy Page",
    desc: "Privacy Policy Page In Gold Prices Today Website.",
  });
}

export default async function Privacy({
  params,
}: {
  params: Promise<{ locale: "en" | "ar" }>;
}) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return (
    <>
      <h1 className="text-2xl font-bold pb-10">{t("privacy")}</h1>
      <p className="text-lg whitespace-pre-line font-normal leading-relaxed">
        {t("privacy-policy")}
      </p>
    </>
  );
}

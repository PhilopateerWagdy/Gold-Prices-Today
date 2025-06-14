import ContactInfo from "@/components/ContactInfo";
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
    path: "/contact",
  });
}

export default async function Contact({
  params,
}: {
  params: Promise<{ locale: "en" | "ar" }>;
}) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  const translations = {
    name: t("name_label"),
    phone: t("phone_label"),
    email: t("email_label"),
    message: t("message_label"),
    msgSent: t("msg_sent"),
    send: t("send"),
  };

  return (
    <>
      <h1 className="text-2xl font-bold pb-4">{t("contact_desc")}</h1>
      <p className="text-lg pb-6">{t("mail")}</p>
      <ContactInfo translations={translations} />
    </>
  );
}

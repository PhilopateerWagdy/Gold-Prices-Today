import CountryPrices from "@/components/CountryPrices";
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
    path: "",
  });
}

// Array of country codes and currencies
const countries = [
  {
    value: "EGP",
    label: "🇪🇬 EGP",
    name_ar: "جنيه مصري",
    name_en: "Egyptian Pound",
    flagUrl: "https://flagcdn.com/w20/eg.png",
  },
  {
    value: "SAR",
    label: "🇸🇦 SAR",
    name_ar: "ريال سعودي",
    name_en: "Saudi Riyal",
    flagUrl: "https://flagcdn.com/w20/sa.png",
  },
  {
    value: "SYP",
    label: "🇸🇾 SYP",
    name_ar: "ليرة سورية",
    name_en: "Syrian Pound",
    flagUrl: "https://flagcdn.com/w20/sy.png",
  },
  {
    value: "TND",
    label: "🇹🇳 TND",
    name_ar: "دينار تونسي",
    name_en: "Tunisian Dinar",
    flagUrl: "https://flagcdn.com/w20/tn.png",
  },
  {
    value: "AED",
    label: "🇦🇪 AED",
    name_ar: "درهم إماراتي",
    name_en: "Emirati Dirham",
    flagUrl: "https://flagcdn.com/w20/ae.png",
  },
  {
    value: "YER",
    label: "🇾🇪 YER",
    name_ar: "ريال يمني",
    name_en: "Yemeni Riyal",
    flagUrl: "https://flagcdn.com/w20/ye.png",
  },
  {
    value: "QAR",
    label: "🇶🇦 QAR",
    name_ar: "ريال قطري",
    name_en: "Qatari Riyal",
    flagUrl: "https://flagcdn.com/w20/qa.png",
  },
  {
    value: "PSS",
    label: "🇵🇸 PSS",
    name_ar: "شيكل فلسطيني",
    name_en: "Palestinian Shekel",
    flagUrl: "https://flagcdn.com/w20/ps.png",
  },
  {
    value: "OMR",
    label: "🇴🇲 OMR",
    name_ar: "ريال عُماني",
    name_en: "Omani Rial",
    flagUrl: "https://flagcdn.com/w20/om.png",
  },
  {
    value: "MAD",
    label: "🇲🇦 MAD",
    name_ar: "درهم مغربي",
    name_en: "Moroccan Dirham",
    flagUrl: "https://flagcdn.com/w20/ma.png",
  },
  {
    value: "LBP",
    label: "🇱🇧 LBP",
    name_ar: "ليرة لبنانية",
    name_en: "Lebanese Pound",
    flagUrl: "https://flagcdn.com/w20/lb.png",
  },
  {
    value: "KWD",
    label: "🇰🇼 KWD",
    name_ar: "دينار كويتي",
    name_en: "Kuwaiti Dinar",
    flagUrl: "https://flagcdn.com/w20/kw.png",
  },
  {
    value: "JOD",
    label: "🇯🇴 JOD",
    name_ar: "دينار أردني",
    name_en: "Jordanian Dinar",
    flagUrl: "https://flagcdn.com/w20/jo.png",
  },
  {
    value: "IQD",
    label: "🇮🇶 IQD",
    name_ar: "دينار عراقي",
    name_en: "Iraqi Dinar",
    flagUrl: "https://flagcdn.com/w20/iq.png",
  },
];

export default async function Home({
  params,
}: {
  params: Promise<{ locale: "en" | "ar" }>;
}) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  const translations = {
    currency: t("currency"),
    note_buy: t("note_buy"),
    note_sell: t("note_sell"),
    karat: t("karat"),
    sel_price: t("sel-price"),
    pur_price: t("pur-price"),
    ounce_us: t("ounce_us"),
    ounce_curr: t("ounce_curr"),
    coin_curr: t("coin_curr"),
    dollar_curr: t("dollar_curr"),
  };

  return (
    <main>
      <h1 className="text-2xl font-bold pb-7">{t("title")}</h1>

      <div className="text-sm text-center mt-2 mb-4">
        <p>{t("note_buy")}</p>
        <p>{t("note_sell")}</p>
      </div>

      <hr className="border border-dark mb-5"></hr>

      <CountryPrices countries={countries} translations={translations} />
    </main>
  );
}

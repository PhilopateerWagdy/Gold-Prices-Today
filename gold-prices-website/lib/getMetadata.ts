interface SEOOptions {
  locale: "en" | "ar";
  path?: string;
}

type PagePath =
  | ""
  | "gold-ingots-prices"
  | "gold-coins-prices"
  | "gold-latest-news"
  | "gold-companies";

export async function getLocalizedMetadata({ locale, path = "" }: SEOOptions) {
  const fullUrl = `https://goldpricestoday.xyz/${locale}${path}`;

  const normalizedPath = path.replace(/^\//, "") as PagePath;

  const meta: Record<
    PagePath,
    {
      en: { title: string; description: string };
      ar: { title: string; description: string };
    }
  > = {
    "": {
      en: {
        title: "Live Gold Prices in Arab Countries",
        description:
          "Track real-time gold prices in different currencies across Arab countries. Updated daily for accuracy.",
      },
      ar: {
        title: "أسعار الذهب اليوم في الدول العربية",
        description:
          "تابع أسعار الذهب المحدثة يوميًا بعملات مختلفة في الدول العربية لحظة بلحظة.",
      },
    },
    "gold-ingots-prices": {
      en: {
        title: "Gold Ingot Prices Today",
        description:
          "Explore today’s gold ingot prices by karat and weight in various currencies. Accurate daily updates.",
      },
      ar: {
        title: "أسعار سبائك الذهب اليوم",
        description:
          "تعرف على أسعار سبائك الذهب اليوم حسب العيار والوزن بعملات مختلفة. تحديثات دقيقة لسوق الذهب.",
      },
    },
    "gold-coins-prices": {
      en: {
        title: "Gold Coin Prices Today",
        description:
          "Check the latest gold coin prices by weight, purity, and currency. Updated daily.",
      },
      ar: {
        title: "أسعار العملات الذهبية اليوم",
        description:
          "اطلع على أسعار العملات الذهبية حسب الوزن والعيار والعملة. تحديثات يومية موثوقة.",
      },
    },
    "gold-latest-news": {
      en: {
        title: "Latest Gold News",
        description:
          "Stay informed with the latest gold news and market analysis from trusted sources.",
      },
      ar: {
        title: "آخر أخبار الذهب",
        description:
          "تابع آخر أخبار الذهب وتحليلات السوق من مصادر موثوقة محليًا وعالميًا.",
      },
    },
    "gold-companies": {
      en: {
        title: "Gold Companies Directory",
        description:
          "Explore a curated list of gold trading companies and jewelers across the Arab world. Company profiles, locations, and contact info.",
      },
      ar: {
        title: "دليل شركات الذهب",
        description:
          "اكتشف قائمة مختارة من شركات تجارة الذهب ومحلات المجوهرات في العالم العربي، مع معلومات التواصل والمواقع.",
      },
    },
  };

  const content = meta[normalizedPath]
    ? meta[normalizedPath][locale]
    : {
        title: "Gold Prices Today",
        description: "Gold Prices Today Website",
      };

  return {
    title: content.title,
    description: content.description,
    alternates: {
      canonical: fullUrl,
      languages: {
        en: `/en${path}`,
        ar: `/ar${path}`,
      },
    },
    openGraph: {
      title: content.title,
      description: content.description,
      url: fullUrl,
      type: "website",
    },
  };
}

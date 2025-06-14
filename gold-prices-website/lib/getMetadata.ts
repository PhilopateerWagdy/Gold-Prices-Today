interface SEOOptions {
  locale: "en" | "ar";
  path?: string;
}

export async function getLocalizedMetadata({ locale, path = "" }: SEOOptions) {
  const fullUrl = `https://goldpricestoday.xyz/${locale}/${path}`;

  return {
    title: "Gold Prices Today",
    description: "Gold Prices Today Website",
    alternates: {
      canonical: fullUrl,
      languages: {
        en: `/en/${path}`,
        ar: `/ar/${path}`,
      },
    },
    openGraph: {
      title: "Gold Prices Today",
      description: "Gold Prices Today Website",
      url: fullUrl,
      // images: "https://goldpricestoday.xyz/favicon.ico",
      type: "website",
    },
  };
}

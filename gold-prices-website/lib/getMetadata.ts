interface SEOOptions {
  locale: "en" | "ar";
  title: string;
  desc: string;
  path?: string;
}

export async function getLocalizedMetadata({
  locale,
  path = "",
  title,
  desc,
}: SEOOptions) {
  const fullUrl = `https://goldpricestoday.xyz/${locale}/${path}`;

  return {
    title: title,
    description: desc,
    alternates: {
      canonical: fullUrl,
      languages: {
        en: `/en/${path}`,
        ar: `/ar/${path}`,
      },
    },
    openGraph: {
      title: title,
      description: desc,
      url: fullUrl,
      // images: "https://goldpricestoday.xyz/favicon.ico",
      type: "website",
    },
  };
}

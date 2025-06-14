export const dynamic = "force-dynamic";

import { getTranslations } from "@/i18n/request";
import { getLocalizedMetadata } from "@/lib/getMetadata";
import { getNews } from "@/lib/getNews";
import Image from "next/image";

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
    path: "/gold-latest-news",
  });
}

export default async function News({
  params,
}: {
  params: Promise<{ locale: "en" | "ar" }>;
}) {
  const { locale } = await params;
  const t = await getTranslations(locale);
  const news = await getNews(locale);

  return (
    <>
      <h1 className="text-2xl font-bold pb-10">{t("news-title")}</h1>

      <div className="space-y-4">
        {Array.isArray(news) && news.length > 0 ? (
          news.map((item) => (
            <div
              key={item.article_id}
              className="border p-4 rounded-md shadow-sm"
            >
              <h2 className="text-xl font-semibold">{item.title}</h2>
              {item.image_url && (
                <div className="relative w-full max-w-[600px] h-[400px] rounded overflow-hidden mx-auto">
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    className="object-contain rounded"
                    unoptimized
                    priority
                  />
                </div>
              )}
              <p className="text-gray-700">{item.description}</p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline mt-2 inline-block"
              >
                {locale === "ar" ? "قراءة المزيد" : "Read more"}
              </a>
            </div>
          ))
        ) : (
          <p className="text-red-500">No News Found</p>
        )}
      </div>
    </>
  );
}

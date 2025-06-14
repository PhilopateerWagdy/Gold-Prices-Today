export const dynamic = "force-dynamic";

import { getTranslations } from "@/i18n/request";
import { getLocalizedMetadata } from "@/lib/getMetadata";
import Image from "next/image";
import Link from "next/link";
import { getCompanies } from "@/lib/getCompanies";

type Company = {
  _id: string;
  name: string;
  url: string;
  imgUrl: string;
  ignot_size?: number[];
  ignot_factory?: number[];
  ignot_cashback?: number[];
  coin?: number[];
  coin_size?: number[];
  coin_factory?: number[];
  coin_cashback?: number[];
  __v?: number;
};

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
    path: "/gold-companies",
  });
}

export default async function Companies({
  params,
}: {
  params: Promise<{ locale: "en" | "ar" }>;
}) {
  const { locale } = await params;
  const t = await getTranslations(locale);
  const companies: Company[] = await getCompanies();

  return (
    <>
      <h1 className="text-2xl font-bold pb-6">{t("comp_title")}</h1>
      <h1 className="text-lg font-bold pb-10">{t("click")}</h1>

      <div className="flex flex-wrap justify-center gap-6">
        {companies.map((company: Company) => (
          <Link
            key={company.name}
            href={`/${locale}/gold-companies/${encodeURIComponent(
              company.name
            )}`}
            className="cursor-pointer"
          >
            <div
              key={company._id}
              className="w-62 border p-6 rounded shadow-sm bg-white flex flex-col items-center text-center"
            >
              <h2 className="text-xl font-semibold">{company.name}</h2>

              {company.imgUrl && (
                <div className="flex justify-center items-center mt-2">
                  <Image
                    src={company.imgUrl}
                    alt={company.name}
                    width={150}
                    height={150}
                    className="rounded-full object-cover"
                    unoptimized
                  />
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

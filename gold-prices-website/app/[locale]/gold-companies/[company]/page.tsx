import { getTranslations } from "@/i18n/request";
import { getCompanies } from "@/lib/getCompanies"; // assuming getCompanies is exported from list page
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: Promise<{ locale: "ar" | "en"; company: string }>;
};

export default async function CompanyDetail({ params }: Props) {
  const { company, locale } = await params;
  const t = await getTranslations(locale);

  const companies = await getCompanies();
  const selected = companies.find(
    (c) => c.name === decodeURIComponent(company)
  );

  if (!selected) {
    return (
      <div className="text-center mt-10 text-red-600">
        {t("not_found") || "Company not found"}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <div
        key={selected.name}
        className="w-62 border p-6 rounded shadow-sm bg-white flex flex-col items-center text-center"
      >
        <h1 className="text-2xl font-bold">{selected.name}</h1>
        <a
          href={selected.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800 mb-4"
        >
          {selected.url}
        </a>

        {selected.imgUrl && (
          <Image
            src={selected.imgUrl}
            alt={selected.name}
            width={180}
            height={180}
            className="rounded-full object-cover"
            unoptimized
          />
        )}
      </div>

      <div className="flex flex-wrap justify-center items-start gap-8">
        {/* Ingot Table */}
        <div className="flex flex-col max-w-full">
          <h4 className="text-center mb-4 font-bold text-lg">{t("i_table")}</h4>
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse w-full text-center text-sm shadow rounded overflow-hidden">
              <thead>
                <tr className="bg-black text-white">
                  <th className="font-normal border px-4 py-2">
                    {t("i_size")}
                  </th>
                  <th className="font-normal border px-4 py-2">
                    {t("factory")}
                  </th>
                  <th className="font-normal border px-4 py-2">
                    {t("cashback")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {selected.ignot_size?.map((size, i) => (
                  <tr key={i} className="border-b hover:bg-gray-100">
                    <td className="border px-4 py-2">{`${size} ${t("gm")}`}</td>
                    <td className="border px-4 py-2">
                      {selected.ignot_factory?.[i]}
                    </td>
                    <td className="border px-4 py-2">
                      {selected.ignot_cashback?.[i]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Coin Table */}
        <div className="flex flex-col max-w-full">
          <h4 className="text-center mb-4 font-bold text-lg">{t("c_table")}</h4>
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse w-full text-center text-sm shadow rounded overflow-hidden">
              <thead>
                <tr className="bg-black text-white">
                  <th className="font-normal border px-4 py-2">
                    {t("c_size")}
                  </th>
                  <th className="font-normal border px-4 py-2">{t("c_s")}</th>
                  <th className="font-normal border px-4 py-2">
                    {t("factory")}
                  </th>
                  <th className="font-normal border px-4 py-2">
                    {t("cashback")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {selected.coin?.map((coin, i) => (
                  <tr key={i} className="border-b hover:bg-gray-100">
                    <td className="border px-4 py-2">{`${coin} ${t("co")}`}</td>
                    <td className="border px-4 py-2">
                      {selected.coin_size?.[i]}
                    </td>
                    <td className="border px-4 py-2">
                      {selected.coin_factory?.[i]}
                    </td>
                    <td className="border px-4 py-2">
                      {selected.coin_cashback?.[i]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Link
        href={`/${locale}/gold-companies`}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {t("back")}
      </Link>
    </div>
  );
}

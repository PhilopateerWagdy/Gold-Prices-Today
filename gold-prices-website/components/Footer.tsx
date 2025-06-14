import Link from "next/link";
import { getTranslations } from "@/i18n/request";

export default async function Footer({ locale }: { locale: "ar" | "en" }) {
  const t = await getTranslations(locale);

  const links = [
    { href: `/${locale}/`, label: t("nav-home") },
    { href: `/${locale}/gold-ingots-prices`, label: t("nav-ingots") },
    { href: `/${locale}/gold-coins-prices`, label: t("nav-coins") },
    { href: `/${locale}/gold-latest-news`, label: t("nav-news") },
    { href: `/${locale}/gold-companies`, label: t("nav-company") },
    { href: `/${locale}/privacy-policy`, label: t("privacy") },
    { href: `/${locale}/responsibility`, label: t("resp") },
    { href: `/${locale}/contact`, label: t("nav-contact") },
    { href: `/${locale}/about`, label: t("about") },
  ];

  return (
    <footer className="bg-black text-white py-6 text-center">
      <nav aria-label="Footer navigation">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:underline">
              {label}
            </Link>
          ))}
        </div>
      </nav>

      <p className="text-sm text-gray-400">© 2025 Powered By: PPW, Inc</p>
    </footer>
  );
}

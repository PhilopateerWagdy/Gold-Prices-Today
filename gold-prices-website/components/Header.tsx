// "use client";

// import { usePathname } from "next/navigation";
import DateTime from "@/components/DateTime";

// const titles: Record<string, string> = {
//   "/": "home",
//   "/gold-ingots-prices": "ingots",
//   "/gold-coins-prices": "coins",
//   "/gold-latest-news": "news",
//   "/gold-companies": "companies",
//   "/contact": "contact",
//   "/responsibility": "resp",
//   "/privacy-policy": "privacy",
// };

export default function Header({
  header,
  locale,
}: {
  header: string;
  locale: "ar" | "en";
}) {
  // const pathname = usePathname();
  // fallback to "/" if path not found
  // const currentTitleKey = titles[pathname] || "home";

  return (
    <div className="bg-black text-white py-8 pt-18">
      <div className="flex flex-col items-center justify-center max-w-4xl mx-auto text-center px-1">
        {/* <h3 className="text-2xl font-semibold">{currentTitleKey}</h3> */}
        <DateTime locale={locale} />
        <p className="mt-2 text-lg">{header}</p>
      </div>
    </div>
  );
}

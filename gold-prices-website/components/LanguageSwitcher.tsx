// components/LanguageSwitcher.tsx

"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

const LanguageSwitcher = () => {
  const pathname = usePathname(); // e.g. /en/about
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const toggleLocale = () => {
    const segments = pathname.split("/");
    const currentLocale = segments[1];
    const newLocale = currentLocale === "en" ? "ar" : "en";
    segments[1] = newLocale;
    const newPath = segments.join("/");

    startTransition(() => {
      router.push(newPath);
    });
  };

  return (
    <button
      onClick={toggleLocale}
      disabled={isPending}
      className="px-4 py-2 bg-gray-800 text-white rounded ms-2 cursor-pointer"
    >
      {pathname.startsWith("/en") ? "العربية" : "English"}
      {pathname.startsWith("/en") ? (
        <i className="fa-solid fa-globe text-l text-white-500  ml-1"></i>
      ) : (
        <i className="fa-solid fa-globe text-l text-white-500  mr-1"></i>
      )}
    </button>
  );
};

export default LanguageSwitcher;

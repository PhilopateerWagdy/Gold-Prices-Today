"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

interface NavbarProps {
  locale: string;
  translations: {
    navSite: string;
    navHome: string;
    navIngots: string;
    navCoins: string;
    navNews: string;
    navCompany: string;
    navContact: string;
    footer: string;
  };
}

export default function Navbar({ locale, translations }: NavbarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  const links = [
    { href: `/${locale}/gold-ingots-prices`, label: translations.navIngots },
    { href: `/${locale}/gold-coins-prices`, label: translations.navCoins },
    { href: `/${locale}/gold-latest-news`, label: translations.navNews },
    { href: `/${locale}/gold-companies`, label: translations.navCompany },
    { href: `/${locale}/contact`, label: translations.navContact },
    { href: `/${locale}/about`, label: translations.footer },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 h-[60px] bg-black border-b border-gray-300 flex items-center px-5 z-50"
      aria-label="Primary navigation"
    >
      {/* Logo */}
      <Link
        href={`/${locale}/`}
        className="text-[#bf9b30] font-bold text-lg me-auto"
      >
        {translations.navSite}
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-4">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`text-lg pb-1 transition-colors duration-300 ${
              isActive(href)
                ? "text-white font-semibold border-b-2 border-white"
                : "text-gray-300"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Hamburger icon */}
      <button
        className="md:hidden text-white ms-auto"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          {menuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Language switcher (hidden on mobile menu, visible otherwise) */}
      <div className="hidden md:block ms-auto">
        <LanguageSwitcher />
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-[60px] left-0 w-full bg-black border-t border-gray-700 flex flex-col items-center py-4 md:hidden z-40">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`py-2 text-lg transition-colors duration-300 ${
                isActive(href)
                  ? "text-white font-semibold"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}

          {/* Mobile Language Switcher */}
          <div className="mt-4">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
// import Spinner from "./Loading";

interface Prices {
  k24_sel?: number;
  k21_sel?: number;
  k18_sel?: number;
  k14_sel?: number;
  k21_pur?: number;
  k18_pur?: number;
  k14_pur?: number;
  gram_in_curr?: number;
  ounce_price_usd?: number;
  ounce_in_curr?: number;
  coin?: number;
  usd_to_curr?: number;
}

interface Translations {
  currency: string;
  note_buy: string;
  note_sell: string;
  karat: string;
  sel_price: string;
  pur_price: string;
  ounce_us: string;
  ounce_curr: string;
  coin_curr: string;
  dollar_curr: string;
}

interface CountryOption {
  value: string;
  label: string;
  flagUrl: string;
}

interface CountryPricesProps {
  countries: CountryOption[];
  translations: Translations;
  selectedCurrency: CountryOption;
  initialPrices: Prices;
}

export default function CountryPrices({
  countries,
  translations,
  selectedCurrency,
  initialPrices,
}: CountryPricesProps) {
  const [selected, setSelected] = useState(selectedCurrency);
  const [prices, setPrices] = useState<Prices>(initialPrices);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/gold-prices/${selected.value}`
        );
        setPrices(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, [selected]);

  const roundToTwo = (num?: number) => (num ? Math.round(num * 100) / 100 : 0);

  return (
    <>
      <label
        htmlFor="company-select"
        className="mb-1 text-lg font-medium text-gray-700"
      >
        {translations.currency}
      </label>
      {/* Country Select (same as your code) */}
      <div className="flex justify-center items-start w-full mt-4">
        <div className="relative inline-block w-max">
          <button
            onClick={() => setOpen(!open)}
            className="border p-2 rounded-md bg-white"
          >
            <div className="flex items-center gap-2">
              <Image
                src={selected.flagUrl}
                alt={`${selected.label} flag`}
                width={20}
                height={14}
                className="object-contain"
                unoptimized
              />
              {selected.label} ▼
            </div>
          </button>

          {open && (
            <ul className="absolute left-0 w-full bg-white shadow-md border mt-1 z-10">
              {countries
                .filter((c) => c.value !== selected.value)
                .map((country) => (
                  <li
                    key={country.value}
                    onClick={() => {
                      setSelected(country);
                      setOpen(false);
                    }}
                    className="cursor-pointer hover:bg-gray-100 px-2 py-1"
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={country.flagUrl}
                        alt={`${country.label} flag`}
                        width={20}
                        height={14}
                        className="object-contain"
                        unoptimized
                      />
                      {country.label}
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full mt-8">
        <table className="table-auto border-collapse text-center text-xs sm:text-sm shadow rounded mx-auto min-w-full sm:min-w-max">
          <thead>
            <tr className="bg-black text-white">
              <th className="font-normal border px-2 py-1 sm:px-4 sm:py-2">
                {translations.karat}
              </th>
              <th className="font-normal border px-2 py-1 sm:px-4 sm:py-2">
                {translations.sel_price}
              </th>
              {selectedCurrency.value === "EGP" && (
                <th className="font-normal border px-2 py-1 sm:px-4 sm:py-2">
                  {translations.pur_price}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {["24", "21", "18", "14"].map((karat) => (
              <tr key={karat} className="border-b hover:bg-gray-100">
                <td className="border p-2">{karat}</td>
                <td className="border p-2">
                  {loading ? (
                    <div className="flex justify-center">
                      <div className="w-4 h-4 border-2 border-t-transparent border-black rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    Math.ceil(prices[`k${karat}_sel` as keyof Prices] ?? 0)
                  )}
                </td>
                {selectedCurrency.value === "EGP" && (
                  <td className="border p-2">
                    {loading ? (
                      <div className="flex justify-center">
                        <div className="w-4 h-4 border-2 border-t-transparent border-black rounded-full animate-spin"></div>
                      </div>
                    ) : karat === "24" ? (
                      Math.ceil(prices[`gram_in_curr` as keyof Prices] ?? 0)
                    ) : (
                      Math.ceil(prices[`k${karat}_pur` as keyof Prices] ?? 0)
                    )}
                  </td>
                )}
              </tr>
            ))}

            <tr className="border-b hover:bg-gray-100">
              <td className="border p-2">{translations.ounce_us}</td>
              <td colSpan={2} className="border p-2">
                {loading ? (
                  <div className="flex justify-center">
                    <div className="w-4 h-4 border-2 border-t-transparent border-black rounded-full animate-spin"></div>
                  </div>
                ) : (
                  `${roundToTwo(prices.ounce_price_usd)} $`
                )}
              </td>
            </tr>

            <tr className="border-b hover:bg-gray-100">
              <td className="border p-2">{translations.ounce_curr}</td>
              <td colSpan={2} className="border p-2">
                {loading ? (
                  <div className="flex justify-center">
                    <div className="w-4 h-4 border-2 border-t-transparent border-black rounded-full animate-spin"></div>
                  </div>
                ) : (
                  Math.ceil(prices.ounce_in_curr ?? 0)
                )}
              </td>
            </tr>

            <tr className="border-b hover:bg-gray-100">
              <td className="border p-2">{translations.coin_curr}</td>
              <td colSpan={2} className="border p-2">
                {loading ? (
                  <div className="flex justify-center">
                    <div className="w-4 h-4 border-2 border-t-transparent border-black rounded-full animate-spin"></div>
                  </div>
                ) : (
                  Math.ceil(prices.coin ?? 0)
                )}
              </td>
            </tr>

            <tr className="border-b hover:bg-gray-100">
              <td className="border p-2">{translations.dollar_curr}</td>
              <td colSpan={2} className="border p-2">
                {loading ? (
                  <div className="flex justify-center">
                    <div className="w-4 h-4 border-2 border-t-transparent border-black rounded-full animate-spin"></div>
                  </div>
                ) : (
                  roundToTwo(prices.usd_to_curr)
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

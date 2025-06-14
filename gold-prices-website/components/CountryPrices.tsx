"use client"; // or remove this if used in server components

import React, { useState, useEffect } from "react";
import axios from "axios";
// import Select from "react-select";
import Image from "next/image";

function roundToTwo(num?: number) {
  return num ? Math.round(num * 100) / 100 : 0;
}

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
}

export default function CountryPrices({
  countries,
  translations,
}: CountryPricesProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<CountryOption>(
    countries[0]
  );
  const [prices, setPrices] = useState<Prices>({});
  const [loading, setLoading] = useState(true);
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  const [open, setOpen] = useState(false);

  const handleChange2 = (option: CountryOption) => {
    setSelectedCurrency(option);
  };

  const handleChange = (selectedOption: CountryOption | null) => {
    if (selectedOption) {
      setSelectedCurrency(selectedOption);
    }
  };

  useEffect(() => {
    const getGoldPrices = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/gold-prices/${selectedCurrency.value}`
        );
        setPrices(data);
      } catch (err) {
        console.error("Error fetching prices:", err);
      } finally {
        setLoading(false);
      }
    };

    getGoldPrices();
    const intervalId = setInterval(getGoldPrices, 60000);
    return () => clearInterval(intervalId);
  }, [selectedCurrency]);

  return (
    <>
      <label
        htmlFor="company-select"
        className="mb-1 text-lg font-medium text-gray-700"
      >
        {translations.currency}
      </label>
      {isMobile ? (
        <div className="flex flex-col">
          <label
            htmlFor="company-select"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            {translations.currency}
          </label>
          <select
            id="company-select"
            value={selectedCurrency.value}
            onChange={(e) =>
              handleChange(
                countries.find((c) => c.value === e.target.value) || null
              )
            }
            className="w-auto px-2 py-1 rounded-md border border-gray-300 text-sm shadow-sm"
          >
            {countries
              .filter((country) => country.value !== selectedCurrency.value)
              .map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
          </select>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="relative inline-block w-50 mx-auto">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center justify-between w-full p-2 border rounded-md bg-white"
            >
              <div className="flex justify-center items-center mt-2">
                <div className="relative w-[20px] h-[14px] mr-2">
                  <Image
                    src={selectedCurrency.flagUrl}
                    alt={`${selectedCurrency.label} flag`}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>

                {selectedCurrency.label}
              </div>
              <span>▼</span>
            </button>

            {open && (
              <ul className="absolute z-10 mt-1 w-max bg-white border rounded-md shadow-md max-h-60 overflow-y-auto">
                {countries
                  .filter((country) => country.value !== selectedCurrency.value)
                  .map((country) => (
                    <li
                      key={country.value}
                      className="flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        handleChange2(country);
                        setOpen(false);
                      }}
                    >
                      <div className="flex justify-center items-center mt-2">
                        <div className="relative w-[20px] h-[14px] mr-2">
                          <Image
                            src={country.flagUrl}
                            alt={`${country.label} flag`}
                            fill
                            className="object-contain"
                            unoptimized
                          />
                        </div>

                        {country.label}
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      )}

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

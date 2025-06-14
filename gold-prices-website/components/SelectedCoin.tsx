"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./Loading";
import { Company } from "@/types";
import { Coin } from "@/types";

interface Translations {
  all_sizes: string;
  c_size: string;
  factory: string;
  cashback: string;
  sel_price: string;
  pur_price: string;
  not_found: string;
}

interface CoinsProps {
  companies: Company[];
  translations: Translations;
  initialCompany: Company;
  initialCompanyCoins: Coin[];
}

export default function SelectedCoin({
  companies,
  translations,
  initialCompany,
  initialCompanyCoins,
}: CoinsProps) {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(
    initialCompany
  );
  const [sizes, setSizes] = useState<number[]>(initialCompany.coin ?? []);
  const [selectedSize, setSelectedSize] = useState<number>(111);
  const [coins, setCoins] = useState<Coin[]>(initialCompanyCoins);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCompanyChange = (companyId: string) => {
    const selected = companies.find((c) => c._id === companyId) || null;
    setSelectedCompany(selected);
  };

  const handleSizeChange = (size: number) => {
    setSelectedSize(size);
  };

  useEffect(() => {
    const fetchCoins = async () => {
      if (!selectedCompany) return;
      setLoading(true);

      try {
        const newSizes = selectedCompany.coin ?? [];
        setSizes(newSizes);

        if (selectedSize === 111) {
          const res = await axios.get<Coin[]>(
            `${process.env.NEXT_PUBLIC_API_URL}/api/coins/${selectedCompany.name}`
          );
          setCoins(res.data);
        } else {
          try {
            const res = await axios.get<Coin[]>(
              `${process.env.NEXT_PUBLIC_API_URL}/api/coins/${selectedCompany.name}/${selectedSize}`
            );
            setCoins(res.data);
          } catch {
            setCoins([
              {
                coin: 0,
                size: 0,
                factory: 0,
                cashback: 0,
                sel: 0,
                pur: 0,
              },
            ]);
          }
        }
      } catch (err) {
        console.error("Error fetching ingots:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [selectedCompany, selectedSize]);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 my-4 mt-10">
        <div className="flex flex-col">
          <label
            htmlFor="company-select"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Select Company
          </label>
          <select
            id="company-select"
            value={selectedCompany?._id || ""}
            onChange={(e) => handleCompanyChange(e.target.value)}
            className="w-auto px-2 py-1 rounded-md border border-gray-300 text-sm shadow-sm"
          >
            <option value="" disabled hidden>
              Select Company
            </option>
            {companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="size-select"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Select Size
          </label>
          <select
            id="size-select"
            value={selectedSize}
            onChange={(e) => handleSizeChange(Number(e.target.value))}
            className="w-auto px-2 py-1 rounded-md border border-gray-300 text-sm shadow-sm"
          >
            <option value={111}>{translations.all_sizes}</option>
            {!sizes.includes(selectedSize) && selectedSize !== 111 && (
              <option value={selectedSize} className="text-red-600">
                {selectedSize} {translations.not_found}
              </option>
            )}
            {sizes.map((size, idx) => (
              <option key={idx} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedCompany && (
        <div className="text-center mb-4 mt-10">
          <h4 className="font-bold text-lg">{selectedCompany.name}</h4>
        </div>
      )}

      <div className="overflow-x-auto w-full">
        <table className="table-auto border-collapse text-center text-xs sm:text-sm shadow rounded mx-auto min-w-full sm:min-w-max">
          <thead>
            <tr className="bg-black text-white">
              <th className="font-normal border px-2 py-1 sm:px-4 sm:py-2">
                {translations.c_size}
              </th>
              <th className="font-normal border px-2 py-1 sm:px-4 sm:py-2">
                {translations.factory}
              </th>
              <th className="font-normal border px-2 py-1 sm:px-4 sm:py-2">
                {translations.cashback}
              </th>
              <th className="font-normal border px-2 py-1 sm:px-4 sm:py-2">
                {translations.sel_price}
              </th>
              <th className="font-normal border px-2 py-1 sm:px-4 sm:py-2">
                {translations.pur_price}
              </th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                {["coin", "factory", "cashback", "sel", "pur"].map(
                  (field, idx) => (
                    <td
                      className={`border px-2 py-1 sm:px-4 sm:py-2 ${
                        field === "coin" ? "bg-gray-300" : ""
                      }`}
                      key={idx}
                    >
                      {loading ? (
                        <Spinner />
                      ) : coin.size === 0 ? (
                        translations.not_found
                      ) : field === "sel" || field === "pur" ? (
                        Math.ceil(coin[field as keyof Coin] as number)
                      ) : (
                        coin[field as keyof Coin]
                      )}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

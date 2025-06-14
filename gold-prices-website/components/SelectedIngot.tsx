"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Company {
  _id: string;
  name: string;
  ignot_size: number[];
}

interface Ingot {
  size: number;
  factory: number;
  cashback: number;
  sel: number;
  pur: number;
}

interface IngotsProps {
  translations: {
    all_sizes: string;
    i_size: string;
    factory: string;
    cashback: string;
    sel_price: string;
    pur_price: string;
    not_found: string;
  };
}

export default function SelectedIngot({ translations }: IngotsProps) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [sizes, setSizes] = useState<number[]>([]);
  const [selectedSize, setSelectedSize] = useState<number>(111);
  const [ingots, setIngots] = useState<Ingot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleCompanyChange = (companyId: string) => {
    const selected = companies.find((c) => c._id === companyId) || null;
    setSelectedCompany(selected);
  };

  const handleSizeChange = (size: number) => {
    setSelectedSize(size);
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const res = await axios.get<Company[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/companies`
        );
        setCompanies(res.data);

        if (res.data.length > 0) {
          setSelectedCompany(res.data[0]);
          setSizes(res.data[0].ignot_size);
        }
      } catch (err) {
        console.error("Error fetching companies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    const fetchIngots = async () => {
      if (!selectedCompany) return;

      try {
        setLoading(true);
        const newSizes = selectedCompany.ignot_size;
        setSizes(newSizes);

        if (selectedSize === 111) {
          const res = await axios.get<Ingot[]>(
            `${process.env.NEXT_PUBLIC_API_URL}/api/ignots/${selectedCompany.name}`
          );
          setIngots(res.data);
        } else {
          try {
            const res = await axios.get<Ingot[]>(
              `${process.env.NEXT_PUBLIC_API_URL}/api/ignots/${selectedCompany.name}/${selectedSize}`
            );
            setIngots(res.data);
          } catch {
            setIngots([
              {
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

    fetchIngots();
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
                {translations.i_size}
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
            {ingots.map((ingot, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                {["size", "factory", "cashback", "sel", "pur"].map(
                  (field, idx) => (
                    <td
                      className={`border px-2 py-1 sm:px-4 sm:py-2 ${
                        field === "size" ? "bg-gray-300" : ""
                      }`}
                      key={idx}
                    >
                      {loading ? (
                        <div className="flex justify-center">
                          <div className="w-4 h-4 border-2 border-t-transparent border-black rounded-full animate-spin"></div>
                        </div>
                      ) : ingot.size === 0 ? (
                        translations.not_found
                      ) : field === "sel" || field === "pur" ? (
                        Math.ceil(ingot[field as keyof Ingot] as number)
                      ) : (
                        ingot[field as keyof Ingot]
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

import React, { useEffect, useState } from "react";
import "../App";
import { useTranslation } from "react-i18next";
import axios from "axios";

import HorzAdsense from "./HorzAdsense";

const Ignots = (props) => {
  const { t } = useTranslation();

  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null); // Set initial as null or undefined

  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(111); // 111 -> all sizes

  const [ingots, setIngots] = useState([]);

  const handleChange = (selectedOption) => {
    setSelectedCompany(selectedOption); // Set the selected company
  };

  const handleSizeChange = (selectedOption) => {
    setSelectedSize(selectedOption); // Set the selected size
  };

  useEffect(() => {
    const getAllCompanies = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/companies`
        );
        setCompanies(data);
        // Set the selected company if data exists
        if (data.length > 0) {
          setSelectedCompany(data[0]);
          setSizes(data[0].ignot_size); // Assuming ignot_size exists on the first company
        }
      } catch (err) {
        console.log("Error: " + err);
      }
    };

    getAllCompanies();
  }, []);

  useEffect(() => {
    const getNeededIngotSize = async () => {
      try {
        // need all sizes
        if (selectedSize === 111) {
          const { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/ignots/${selectedCompany.name}`
          );
          setIngots(data);
        }
        // need size available in that selected company
        else if (selectedCompany.ignot_size.includes(selectedSize)) {
          const { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/ignots/${selectedCompany.name}/${selectedSize}`
          );
          setIngots(data);
        }
        // need specific size
        else {
          setIngots([
            {
              size: 0,
              factory: 0,
              cashback: 0,
              pur: 0,
              sel: 0,
            },
          ]);
        }
      } catch (err) {
        //console.log("Error: " + err);
      }
    };

    getNeededIngotSize();
  }, [selectedCompany, selectedSize]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="border border-dark mt-2 mb-4">
        <HorzAdsense />
      </div>

      <div className="d-flex flex-row justify-content-center m-3">
        <div className="d-flex flex-column justify-content-center align-items-center border border-dark w-100 h-100 p-3">
          <h3 className="text-center mb-4">{t("ingots-title")}</h3>

          <p>{t("i_compare")}</p>

          <div className="d-flex flex-row justify-content-center">
            <select
              className="ms-4"
              id="company-select"
              value={selectedCompany?._id || ""}
              onChange={(e) => {
                const selected = companies.find(
                  (c) => c._id === e.target.value
                );
                handleChange(selected);
              }}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "1rem",
                backgroundColor: "#fff",
                color: "#333",
                outline: "none",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
                transition: "border 0.2s, box-shadow 0.2s",
                width: "100%",
                maxWidth: "300px",
              }}
            >
              <option value="" disabled hidden>
                Select a Company
              </option>
              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
            </select>
            <select
              id="size-select"
              value={selectedSize === 111 ? t("all_sizes") : selectedSize}
              onChange={(e) => handleSizeChange(Number(e.target.value))}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "1rem",
                backgroundColor: "#fff",
                color: "#333",
                outline: "none",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
                transition: "border 0.2s, box-shadow 0.2s",
                width: "100%",
                maxWidth: "300px",
              }}
            >
              <option key={111} value={111}>
                {t("all-sizes")}
              </option>
              {sizes.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <hr className="border border-dark w-100"></hr>

          <div className="text-center mt-2 mb-4">
            <p>{t("ingot_sell_desc")}</p>
            <p>{t("ingot_buy_desc")}</p>
          </div>

          <div className="text-center mb-2">
            <h4 className="fw-bold">{selectedCompany?.name || ""}</h4>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered text-center mt-2 min-width-table">
              <thead>
                <tr style={{ backgroundColor: "#bf9b30" }}>
                  <th
                    className="bg-dark text-white text-nowrap"
                    style={{ fontWeight: "normal" }}
                    scope="col"
                  >
                    {t("i_size")}
                  </th>
                  <th
                    className="bg-dark text-white"
                    style={{ fontWeight: "normal" }}
                    scope="col"
                  >
                    {t("factory")}
                  </th>
                  <th
                    className="bg-dark text-white"
                    style={{ fontWeight: "normal" }}
                    scope="col"
                  >
                    {t("cashback")}
                  </th>
                  <th
                    className="bg-dark text-white"
                    style={{ fontWeight: "normal" }}
                    scope="col"
                  >
                    {t("sel-price")}
                  </th>
                  <th
                    className="bg-dark text-white"
                    style={{ fontWeight: "normal" }}
                    scope="col"
                  >
                    {t("pur-price")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {ingots.map((ingot) => (
                  <tr key={ingot.size}>
                    <th style={{ fontWeight: "normal" }}>
                      <span>
                        {ingot.size === 0 ? selectedSize : ingot.size}
                      </span>
                    </th>
                    <th style={{ fontWeight: "normal" }}>
                      <span>
                        {ingot.size === 0 ? t("not_found") : ingot.factory}
                      </span>
                    </th>
                    <th style={{ fontWeight: "normal" }}>
                      <span>
                        {ingot.size === 0 ? t("not_found") : ingot.cashback}
                      </span>
                    </th>
                    <th style={{ fontWeight: "normal" }}>
                      <span>
                        {ingot.size === 0
                          ? t("not_found")
                          : Math.ceil(ingot.sel)}
                      </span>
                    </th>
                    <th style={{ fontWeight: "normal" }}>
                      <span>
                        {ingot.size === 0
                          ? t("not_found")
                          : Math.ceil(ingot.pur)}
                      </span>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="border border-dark mt-2 mb-4">
        <HorzAdsense />
      </div>
    </div>
  );
};

export default Ignots;

import React, { useEffect, useState } from "react";
import "../App";
import { useTranslation } from "react-i18next";
import axios from "axios";

import HorzAdsense from "./HorzAdsense";

function roundTo2Decimals(num) {
  return Math.round(num * 100) / 100;
}

const Coins = (props) => {
  const { t } = useTranslation();

  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null); // Set initial as null or undefined

  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);

  const [coins, setCoins] = useState([]);

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
          `${import.meta.env.REACT_APP_API_URL}/api/companies`
        );
        setCompanies(data);
        // Set the selected company if data exists
        if (data.length > 0) {
          setSelectedCompany(data[0]);
          setSizes(data[0].coin); // Assuming ignot_size exists on the first company
        }
      } catch (err) {
        console.log("Error: " + err);
      }
    };

    getAllCompanies();
  }, []);

  useEffect(() => {
    const getNeededCoin = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.REACT_APP_API_URL}/api/coins/${
            selectedCompany.name
          }`
        );

        setCoins(data);
      } catch (err) {
        console.log("Error: " + err);
      }
    };

    if (selectedCompany) {
      // get all ingots data for that company
      getNeededCoin();
      // Update sizes whenever selectedCompany changes (use this for additional logic)
      setSizes(selectedCompany.coin);
    }
  }, [selectedCompany]);

  useEffect(() => {
    const getNeededCoin = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.REACT_APP_API_URL}/api/coins/${
            selectedCompany.name
          }/${selectedSize}`
        );

        setCoins(data);
      } catch (err) {
        //console.log("Error: " + err);
      }
    };

    getNeededCoin();
  }, [selectedCompany, selectedSize]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="border border-dark mt-2 mb-4">
        <HorzAdsense />
      </div>
      <div className="d-flex flex-row justify-content-center m-2">
        <div className="d-flex flex-column justify-content-center align-items-center border border-dark w-100 h-100 p-3">
          <h3 className="text-center mb-4">{t("coins-title")}</h3>

          <p>{t("c_compare")}</p>

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
              value={selectedSize || ""}
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
              <option value="" disabled hidden>
                Select a Size
              </option>
              {sizes.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <hr className="border border-dark w-100"></hr>

          <div className="text-center mt-2 mb-2">
            <p className="fs-5">{t("coin_sell_desc")}</p>
            <p className="fs-5">{t("coin_buy_desc")}</p>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered text-center w-95 mt-2 ">
              <thead>
                <tr style={{ backgroundColor: "#bf9b30" }}>
                  <th
                    className="bg-dark text-white"
                    style={{ fontWeight: "normal" }}
                    scope="col"
                  >
                    {t("c_size")}
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
                {coins.map((coin) => (
                  <tr key={coin.size}>
                    <th style={{ fontWeight: "normal" }}>
                      <span>{`${coin.coin}`}</span>
                    </th>
                    <th style={{ fontWeight: "normal" }}>
                      <span>{coin.factory}</span>
                    </th>
                    <th style={{ fontWeight: "normal" }}>
                      <span>{coin.cashback}</span>
                    </th>
                    <th style={{ fontWeight: "normal" }}>
                      <span>{roundTo2Decimals(coin.sel)}</span>
                    </th>
                    <th style={{ fontWeight: "normal" }}>
                      <span>{roundTo2Decimals(coin.pur)}</span>
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

export default Coins;

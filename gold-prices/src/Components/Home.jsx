import React, { useState, useEffect } from "react";
import axios from "axios";
// import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Select from "react-select";

import HorzAdsense from "./HorzAdsense";

function roundToTwo(num) {
  return Math.round(num * 100) / 100;
}

const Home = (props) => {
  const { t } = useTranslation();
  const [selectedCurrency, setSelectedCurrency] = useState(props.countries[0]);
  const [prices, setPrices] = useState({});
  const isMobile = window.innerWidth <= 768;

  const handleChange = (selectedOption) => {
    setSelectedCurrency(selectedOption); // Set the selected option to state
  };

  useEffect(() => {
    const getGoldPrices = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/gold-prices/${selectedCurrency.value}`
        );
        console.log(data);
        setPrices(data);
      } catch (err) {
        console.log("Error: " + err);
      }
    };

    getGoldPrices();

    // Set interval to update every 60 seconds (60000 ms)
    const intervalId = setInterval(getGoldPrices, 60000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [selectedCurrency]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="border border-dark mt-2 mb-4">
        <HorzAdsense />
      </div>

      <div className="d-flex flex-row justify-content-center m-3">
        <div className="d-flex flex-column justify-content-center align-items-center border border-dark w-100 h-100 p-3">
          <h3 className="mb-4">{t("title")}</h3>

          <div>
            <h5>{t("currency")}</h5>
            {isMobile ? (
              <select
                value={selectedCurrency.value}
                onChange={(e) =>
                  handleChange(
                    props.countries.find((c) => c.value === e.target.value)
                  )
                }
              >
                {props.countries.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>
            ) : (
              <Select
                options={props.countries}
                value={selectedCurrency} // Set value to the selectedCurrency state
                onChange={handleChange}
                defaultValue={props.countries[0]} // Set default value to the first option (EGP)
                getOptionLabel={(e) => (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={e.flagUrl}
                      alt={e.label}
                      style={{
                        width: "20px",
                        height: "15px",
                        marginRight: "10px",
                      }}
                    />
                    {`  ${e.label}  `}
                  </div>
                )}
                placeholder="Select a Currency"
                isSearchable={false}
              />
            )}
          </div>

          <hr className="border border-dark w-100"></hr>

          <div className="text-center mt-2 mb-2">
            <p className="fs-5">{t("note_buy")}</p>
            <p className="fs-5">{t("note_sell")}</p>
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
                    {t("karat")}
                  </th>
                  <th
                    className="bg-dark text-white"
                    style={{ fontWeight: "normal" }}
                    scope="col"
                  >
                    {t("sel-price")}
                  </th>
                  {selectedCurrency.value === "EGP" && (
                    <th
                      className="bg-dark text-white"
                      style={{ fontWeight: "normal" }}
                      scope="col"
                    >
                      {t("pur-price")}
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th
                    className="bg-dark text-white"
                    style={{ fontWeight: "normal" }}
                    scope="row"
                  >
                    {t("k_24")}
                  </th>
                  <td>
                    <span className="fs-5">
                      {`${Math.ceil(prices.k24_sel)} `}
                    </span>
                  </td>
                  {selectedCurrency.value === "EGP" && (
                    <td>
                      <span className="fs-5">
                        {`${Math.ceil(prices.gram_in_curr)} `}
                      </span>
                    </td>
                  )}
                </tr>
                <tr>
                  <th
                    className="bg-dark text-white"
                    style={{ fontWeight: "normal" }}
                    scope="row"
                  >
                    {t("k_21")}
                  </th>
                  <td>
                    <span className="fs-5">
                      {`${Math.ceil(prices.k21_sel)} `}
                    </span>
                  </td>
                  {selectedCurrency.value === "EGP" && (
                    <td>
                      <span className="fs-5">
                        {`${Math.ceil(prices.k21_pur)} `}
                      </span>
                    </td>
                  )}
                </tr>
                <tr>
                  <th
                    className="bg-dark text-white"
                    style={{ fontWeight: "normal" }}
                    scope="row"
                  >
                    {t("k_18")}
                  </th>
                  <td>
                    <span className="fs-5">
                      {`${Math.ceil(prices.k18_sel)} `}
                    </span>
                  </td>
                  {selectedCurrency.value === "EGP" && (
                    <td>
                      <span className="fs-5">
                        {`${Math.ceil(prices.k18_pur)} `}
                      </span>
                    </td>
                  )}
                </tr>
                <tr>
                  <th
                    className="bg-dark text-white"
                    style={{ fontWeight: "normal" }}
                    scope="row"
                  >
                    {t("k_14")}
                  </th>
                  <td>
                    <span className="fs-5">
                      {`${Math.ceil(prices.k14_sel)} `}
                    </span>
                  </td>
                  {selectedCurrency.value === "EGP" && (
                    <td>
                      <span className="fs-5">
                        {`${Math.ceil(prices.k14_pur)} `}
                      </span>
                    </td>
                  )}
                </tr>
                <tr>
                  <th
                    className="bg-dark text-white"
                    style={{ fontWeight: "normal" }}
                    scope="row"
                  >
                    {t("ounce_us")}
                  </th>
                  <td colSpan="2">
                    <span className="fs-5">
                      {`${roundToTwo(prices.ounce_price_usd)} $`}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th
                    className="bg-dark text-white"
                    style={{ fontWeight: "normal" }}
                    scope="row"
                  >
                    {t("ounce_curr")}
                  </th>
                  <td colSpan="2">
                    <span className="fs-5">
                      {`${Math.ceil(prices.ounce_in_curr)}`}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th
                    className="bg-dark text-white"
                    style={{ fontWeight: "normal" }}
                    scope="row"
                  >
                    {t("coin_curr")}
                  </th>
                  <td colSpan="2">
                    <span className="fs-5">{`${Math.ceil(prices.coin)}`}</span>
                  </td>
                </tr>
                <tr>
                  <th
                    className="bg-dark text-white"
                    style={{ fontWeight: "normal" }}
                    scope="row"
                  >
                    {t("dollar_curr")}
                  </th>
                  <td colSpan="2">
                    <span className="fs-5">
                      {`${roundToTwo(prices.usd_to_curr)}`}
                    </span>
                  </td>
                </tr>
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

export default Home;

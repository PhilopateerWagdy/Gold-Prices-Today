import React, { useEffect, useState } from "react";
import "../App";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { NavLink } from "react-router-dom";
//import { useNavigate } from "react-router-dom";

import HorzAdsense from "./HorzAdsense";

function Companies() {
  const { t } = useTranslation();
  //const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    const getAllCompanies = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.REACT_APP_API_URL}/api/companies`
        );
        setCompanies(data);
      } catch (err) {
        console.log("Error: " + err);
      }
    };

    getAllCompanies();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="border border-dark mt-2 mb-4">
        <HorzAdsense />
      </div>

      <div className="d-flex flex-row justify-content-center m-2">
        <div className="d-flex flex-column justify-content-center align-items-center border border-dark w-100 h-100 p-3">
          <h3 className="text-center mb-4">{t("comp_title")}</h3>

          <hr className="border border-dark w-100"></hr>

          <div className="d-flex flex-row">
            {/* Conditionally render either all companies or the selected one */}
            {selectedCompany ? (
              <div className="text-center">
                {/* Show only the selected company with details */}
                <div className="d-flex justify-content-center align-items-center">
                  <div className="border rounded-4 p-2 w-auto h-auto mb-3 text-center">
                    <h2>{selectedCompany.name}</h2>
                    <img
                      src={selectedCompany.imgUrl}
                      alt="Company"
                      className="img-fluid w-50 rounded-3"
                    />
                    <p>
                      <a
                        href={selectedCompany.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {selectedCompany.url}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="d-flex justify-content-center align-content-around flex-wrap">
                  <div className="d-flex flex-column">
                    <div className="text-center mb-2">
                      <h4 className="fw-bold">{t("i_table")}</h4>
                    </div>

                    <table className="table table-bordered text-center w-95 mt-2 ">
                      <thead>
                        <tr style={{ backgroundColor: "#bf9b30" }}>
                          <th
                            className="bg-dark text-white"
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
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({
                          length: selectedCompany.ignot_size.length,
                        }).map((_, i) => (
                          <tr key={i}>
                            <th style={{ fontWeight: "normal" }}>
                              <span>{`${selectedCompany.ignot_size[i]} ${t(
                                "gm"
                              )}`}</span>
                            </th>

                            <th style={{ fontWeight: "normal" }}>
                              <span>{selectedCompany.ignot_factory[i]}</span>
                            </th>

                            <th style={{ fontWeight: "normal" }}>
                              <span>{selectedCompany.ignot_cashback[i]}</span>
                            </th>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="d-flex flex-column table-responsive">
                    <div className="text-center mb-2">
                      <h4 className="fw-bold">{t("c_table")}</h4>
                    </div>

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
                            {t("c_s")}
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
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({
                          length: selectedCompany.coin.length,
                        }).map((_, i) => (
                          <tr key={i}>
                            <th style={{ fontWeight: "normal" }}>
                              <span>{`${selectedCompany.coin[i]} ${t(
                                "co"
                              )}`}</span>
                            </th>

                            <th style={{ fontWeight: "normal" }}>
                              <span>{selectedCompany.coin_size[i]}</span>
                            </th>

                            <th style={{ fontWeight: "normal" }}>
                              <span>{selectedCompany.coin_factory[i]}</span>
                            </th>

                            <th style={{ fontWeight: "normal" }}>
                              <span>{selectedCompany.coin_cashback[i]}</span>
                            </th>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mr-auto p-2">
                  <button
                    className="btn btn-outline-primary mt-3 p-2"
                    onClick={() => setSelectedCompany(null)}
                  >
                    {t("back")}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-center m-3 mb-5">
                  <h4 className="fw-bold">{t("click")}</h4>
                </div>
                <div className="d-flex justify-content-center align-content-around flex-wrap">
                  {companies.map((c) => (
                    <div
                      className="d-flex flex-column align-items-center border border-dark rounded-4 m-2 p-2"
                      onClick={() => setSelectedCompany(c)}
                      style={{
                        cursor: "pointer",
                        padding: "20px",
                        backgroundColor: "#f0f0f0",
                        border: "1px solid #ccc",
                      }}
                      key={c.name}
                    >
                      <p className="fs-5">{c?.name}</p>
                      <img
                        src={c?.imgUrl}
                        alt="Company_Image"
                        className="img-fluid w-50 rounded-circle"
                      ></img>
                      <NavLink to={c?.url || "/"}>
                        {c?.url || "Visit site"}
                      </NavLink>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="border border-dark mt-2 mb-4">
        <HorzAdsense />
      </div>
    </div>
  );
}

export default Companies;

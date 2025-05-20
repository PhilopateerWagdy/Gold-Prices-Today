import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer
      style={{ backgroundColor: "#0f0f0f", color: "white" }}
      className="bg-dark text-white text-center py-3"
    >
      <ul className="nav justify-content-center pb-2 mb-1">
        <li className="nav-item">
          <NavLink to="/" className="nav-link px-2" style={{ color: "white" }}>
            {t("nav-home")}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/gold-ingots-prices"
            className="nav-link px-2"
            style={{ color: "white" }}
          >
            {t("nav-ingots")}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/gold-coins-prices"
            className="nav-link px-2"
            style={{ color: "white" }}
          >
            {t("nav-coins")}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/gold-latest-news"
            className="nav-link px-2"
            style={{ color: "white" }}
          >
            {t("nav-news")}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/gold-companies"
            className="nav-link px-2"
            style={{ color: "white" }}
          >
            {t("nav-company")}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/responsibility"
            className="nav-link px-2"
            style={{ color: "white" }}
          >
            {t("resp")}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/privacy-policy"
            className="nav-link px-2"
            style={{ color: "white" }}
          >
            {t("privacy")}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/contact"
            className="nav-link px-2"
            style={{ color: "white" }}
          >
            {t("nav-contact")}
          </NavLink>
        </li>
      </ul>

      <div className="border-bottom mb-3">
        <p>{t("about")}</p>
        <p>{t("who")}</p>
        <p>{t("who2")}</p>
      </div>

      <p className="text-center" style={{ color: "white" }}>
        © 2025 Powered By: PPW, Inc
      </p>
    </footer>
  );
};

export default Footer;

import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const Header = (props) => {
  const { t } = useTranslation();
  const location = useLocation();
  const path = location.pathname;

  // You can map route paths to titles or other data
  const titles = {
    "/": "home",
    "/gold-ignots-prices": "ingots",
    "/gold-coins-prices": "coins",
    "/gold-latest-news": "news",
    "/gold-companies": "companies",
    "/contact": "contact",
  };

  const currentTitle = titles[path] || "home";

  return (
    <div
      className="jumbotron"
      style={{ backgroundColor: "#0f0f0f", color: "white" }}
    >
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h3>{t(currentTitle)}</h3>
        <h5>{props.date}</h5>
        <p>{t("under-header")}</p>
      </div>
    </div>
  );
};

export default Header;

import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n";
import i18n from "i18next";

import App from "./App";

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "../node_modules/react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Wait for i18n to initialize before rendering the app
i18n.init().then(() => {
  document.documentElement.lang = i18n.language;
  document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";

  root.render(<App />);
});

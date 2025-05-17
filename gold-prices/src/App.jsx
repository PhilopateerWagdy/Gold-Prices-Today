import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./i18n"; // Load the i18n config
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import moment from "moment";
import "moment/locale/ar";
import "./App.css";

import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Ignots from "./Components/Ignots";
import Coins from "./Components/Coins";
import Companies from "./Components/Companies";
import Contact from "./Components/Contact";
import Error from "./Components/Error";
import News from "./Components/News";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import ScrollToTop from "./Components/ScrollToTop";

// Array of country codes and currencies
const countries = [
  {
    value: "EGP",
    label: "🇪🇬 EGP",
    name_ar: "جنيه مصري",
    name_en: "Egyptian Pound",
    flagUrl: "https://flagcdn.com/w20/eg.png",
  },
  {
    value: "SAR",
    label: "🇸🇦 SAR",
    name_ar: "ريال سعودي",
    name_en: "Saudi Riyal",
    flagUrl: "https://flagcdn.com/w20/sa.png",
  },
  {
    value: "SYP",
    label: "🇸🇾 SYP",
    name_ar: "ليرة سورية",
    name_en: "Syrian Pound",
    flagUrl: "https://flagcdn.com/w20/sy.png",
  },
  {
    value: "TND",
    label: "🇹🇳 TND",
    name_ar: "دينار تونسي",
    name_en: "Tunisian Dinar",
    flagUrl: "https://flagcdn.com/w20/tn.png",
  },
  {
    value: "AED",
    label: "🇦🇪 AED",
    name_ar: "درهم إماراتي",
    name_en: "Emirati Dirham",
    flagUrl: "https://flagcdn.com/w20/ae.png",
  },
  {
    value: "YER",
    label: "🇾🇪 YER",
    name_ar: "ريال يمني",
    name_en: "Yemeni Riyal",
    flagUrl: "https://flagcdn.com/w20/ye.png",
  },
  {
    value: "QAR",
    label: "🇶🇦 QAR",
    name_ar: "ريال قطري",
    name_en: "Qatari Riyal",
    flagUrl: "https://flagcdn.com/w20/qa.png",
  },
  {
    value: "PSS",
    label: "🇵🇸 PSS",
    name_ar: "شيكل فلسطيني",
    name_en: "Palestinian Shekel",
    flagUrl: "https://flagcdn.com/w20/ps.png",
  },
  {
    value: "OMR",
    label: "🇴🇲 OMR",
    name_ar: "ريال عُماني",
    name_en: "Omani Rial",
    flagUrl: "https://flagcdn.com/w20/om.png",
  },
  {
    value: "MAD",
    label: "🇲🇦 MAD",
    name_ar: "درهم مغربي",
    name_en: "Moroccan Dirham",
    flagUrl: "https://flagcdn.com/w20/ma.png",
  },
  {
    value: "LBP",
    label: "🇱🇧 LBP",
    name_ar: "ليرة لبنانية",
    name_en: "Lebanese Pound",
    flagUrl: "https://flagcdn.com/w20/lb.png",
  },
  {
    value: "KWD",
    label: "🇰🇼 KWD",
    name_ar: "دينار كويتي",
    name_en: "Kuwaiti Dinar",
    flagUrl: "https://flagcdn.com/w20/kw.png",
  },
  {
    value: "JOD",
    label: "🇯🇴 JOD",
    name_ar: "دينار أردني",
    name_en: "Jordanian Dinar",
    flagUrl: "https://flagcdn.com/w20/jo.png",
  },
  {
    value: "IQD",
    label: "🇮🇶 IQD",
    name_ar: "دينار عراقي",
    name_en: "Iraqi Dinar",
    flagUrl: "https://flagcdn.com/w20/iq.png",
  },
];

const App = () => {
  const { i18n } = useTranslation();
  const [date, setDate] = useState(moment().format("LLLL"));

  const switchLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    const updateDate = () => {
      setDate(moment().format("LLLL"));
    };

    updateDate();

    const intervalId = setInterval(updateDate, 60000);

    return () => clearInterval(intervalId);
  }, [date]);

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;

    const shortLang = i18n.language.split("-")[0]; // 'ar' for Arabic
    moment.locale(shortLang);
    setDate(moment().format("LLLL"));

    // Set body class to match current language font (Cal Sans -> EN, Tajawal -> AR)
    document.body.classList.remove("en", "ar");
    document.body.classList.add(i18n.language);
  }, [i18n.language]);

  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <NavBar onLangChange={switchLanguage} />
        <Header date={date} />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home countries={countries} />} />
          <Route path="/gold-ingots-prices" element={<Ignots />} />
          <Route path="/gold-coins-prices" element={<Coins />} />
          <Route path="/gold-latest-news" element={<News />} />
          <Route path="/gold-companies" element={<Companies />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;

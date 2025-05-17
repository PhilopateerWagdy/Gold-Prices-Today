import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import VerticalAdsense from "./VerticalAdsense";
import HorzAdsense from "./HorzAdsense";

const News = () => {
  const { t, i18n } = useTranslation();
  const [news, setNews] = useState([]);
  const apikey = "pub_85454a92c741c29363f49ad0597d229711644";
  const search = "gold";
  const category = "top";
  //const tag = "banking_and_finance,financial_markets";

  // newsdata.io
  useEffect(() => {
    const getNews = async () => {
      try {
        const { data } = await axios.get(
          `https://newsdata.io/api/1/latest?apikey=${apikey}&q=${search}&category=${category}&language=${i18n.language}`
        );
        setNews(data.results);
      } catch (err) {
        toast.error("No News Found !");
      }
    };
    getNews();
  }, [i18n.language]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-flex flex-row justify-content-center m-4">
        <div className="border border-dark w-75 h-100 p-3">
          <h3 className="mb-4">{t("title")}</h3>
          <hr className="border border-dark w-100"></hr>

          <ul className="m-0 p-0 w-100" style={{ listStyle: "none" }}>
            {news.map((n) => (
              <div className="overflow-hidden" key={n.article_id}>
                <li className="pt-4 pb-4">
                  <p
                    style={{ textDecoration: "underline" }}
                    className="fw-bold"
                  >
                    {n.title}
                  </p>
                  {n.image_url ? (
                    <img
                      className="w-50"
                      src={n.image_url}
                      alt="News Img"
                    ></img>
                  ) : (
                    ""
                  )}
                  <p>{n.description}</p>
                  <a href={n.link} target="_blank" rel="noopener noreferrer">
                    {n.link}
                  </a>
                </li>
                <hr></hr>
              </div>
            ))}
          </ul>
        </div>
        <div className="border border-dark d-flex flex-column w-25 me-2">
          <VerticalAdsense />
          <VerticalAdsense />
        </div>
      </div>
      <div className="border border-dark mt-2 mb-4">
        <HorzAdsense />
      </div>
    </div>
  );
};

export default News;

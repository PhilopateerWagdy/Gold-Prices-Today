import React, { useState } from "react";
import "../App";
import { useTranslation } from "react-i18next";
import axios from "axios";

import VerticalAdsense from "./VerticalAdsense";
import HorzAdsense from "./HorzAdsense";

const Contact = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const [state, setState] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = {
      name: state.name,
      phone: state.phone,
      email: state.email,
      message: state.message,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/messages/`, postData)
      .then((response) => {
        console.log("Success:", response.data);
        setSubmitted(true); // Show message
        setTimeout(() => setSubmitted(false), 3000); // Hide after 3s (optional)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChange = (e) => {
    // clone
    let mess = { ...state };
    // edit
    mess[e.currentTarget.name] = e.currentTarget.value;
    // setState
    setState(mess);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-flex flex-row justify-content-center m-2">
        <div className="d-flex flex-column align-items-center border border-dark w-100 h-100 p-3">
          <h3 className="mb-2 text-center">{t("contact_desc")}</h3>

          <p className="mb-4 text-center">{t("mail")}</p>

          <hr className="border border-dark w-100"></hr>

          <div className="container">
            <form onSubmit={handleSubmit} className="flex-grow-1">
              <div className="form-group">
                <label htmlFor="name"></label>
                <input
                  autoFocus
                  name="name"
                  value={state.name}
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder={t("name_label")}
                />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="phone"></label>
                <input
                  name="phone"
                  value={state.phone}
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  id="phone"
                  placeholder={t("phone_label")}
                />
              </div>
              <div className="form-group mt-2">
                <label htmlFor="email"></label>
                <input
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder={t("email_label")}
                />
              </div>
              <div className="form-group mt-2 ">
                <label htmlFor="message"></label>
                <textarea
                  name="message"
                  value={state.message}
                  onChange={handleChange}
                  className="form-control"
                  id="message"
                  placeholder={t("message_label")}
                  rows="5"
                />
              </div>
              {submitted && (
                <div class="text-center alert alert-success" role="alert">
                  {t("msg_sent")}
                </div>
              )}
              <button
                style={{ height: "50px", width: "100px" }}
                type="submit"
                className="btn btn-primary mt-4"
              >
                {t("send")}
              </button>
            </form>
          </div>
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

export default Contact;

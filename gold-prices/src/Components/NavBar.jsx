import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Navbar, Nav, Container } from "react-bootstrap";

import "../App";

const NavBar = (props) => {
  const [lang, setLang] = useState("ar");
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar
      style={{ backgroundColor: "	#0f0f0f" }}
      expanded={expanded}
      expand="lg"
      variant="dark"
      className="App"
    >
      <Container>
        <NavLink
          style={{ color: "#bf9b30" }}
          className="navbar-brand"
          to="/"
          onClick={() => setExpanded(false)}
        >
          {t("site-name")}
        </NavLink>
        <Navbar.Toggle
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={lang === "ar" ? "me-auto" : "ms-auto"}>
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/gold-ingots-prices"
                  onClick={() => setExpanded(false)}
                >
                  {t("nav-ingots")}
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/gold-coins-prices"
                  onClick={() => setExpanded(false)}
                >
                  {t("nav-coins")}
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/gold-latest-news"
                  onClick={() => setExpanded(false)}
                >
                  {t("nav-news")}
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/gold-companies"
                  onClick={() => setExpanded(false)}
                >
                  {t("nav-company")}
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/contact"
                  onClick={() => setExpanded(false)}
                >
                  {t("nav-contact")}
                </NavLink>
              </li>

              <li>
                <div className={expanded ? "btn-group dropleft" : "dropdown"}>
                  <button
                    className="btn btn-secondary rounded-circle custom-btn"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {lang === "ar" ? "AR" : "EN"}
                  </button>

                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li
                      style={{
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {lang === "ar" ? (
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            props.onLangChange("en");
                            setLang("en");
                            setExpanded(false);
                          }}
                        >
                          English
                        </button>
                      ) : (
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            props.onLangChange("ar");
                            setLang("ar");
                            setExpanded(false);
                          }}
                        >
                          Arabic
                        </button>
                      )}
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    /*
    <nav className="navbar navbar-dark bg-dark navbar-expand-sm App">
      <div
        className="collapse navbar-collapse ps-2 d-flex flex-row justify-content-center"
        id="navbarNav"
      >
      </div>
    </nav>*/
  );
};

export default NavBar;

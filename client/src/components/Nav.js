import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import toys from "../img/toys.png";
import { HashLink } from "react-router-hash-link";

const Nav = () => {
  const [menu, setMenu] = useState(false);
  // nav color-changer;
  const [darkNav, setDarkNav] = useState(window.location.pathname !== "/");
  let location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setDarkNav(false);
    } else {
      setDarkNav(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    const changeNavColor = () => {
      if (window.location.pathname !== "/") return;

      if (window.scrollY >= 860) {
        setDarkNav(true);
      } else {
        setDarkNav(false);
      }
    };

    window.addEventListener("scroll", changeNavColor);

    return () => {
      window.removeEventListener("scroll", changeNavColor);
    };
  }, []);

  const noStyle = {
    textDecoration: "none",
  };

  return (
    <nav className={darkNav ? "znav active" : "znav"} id="nav">
      <div className="flex">
        <HashLink to="/#top" style={noStyle}>
          <div className="appTitle">
            <img src={toys} width="50" /> ToySRC
          </div>
        </HashLink>
        <div className="flex">
          <ul className={"navmenu grouper " + (menu ? "show" : "")}>
            <li className="navBtnShell">
              <HashLink to="/#findtoys" className="znavBtn">
                Find Toys
              </HashLink>
            </li>
            <li className="navBtnShell">
              <HashLink to="/users#reputations" className="znavBtn">
                User Reputations
              </HashLink>
            </li>
            <li className="navBtnShell">
              <HashLink to="/#top" className="znavBtn">
                Dashboard
              </HashLink>
            </li>
          </ul>
          <div
            onClick={() => setMenu(!menu)}
            className="navBtnShell menu-hamburger"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fillRule="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

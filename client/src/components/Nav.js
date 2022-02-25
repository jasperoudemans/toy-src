import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toys from "../img/toys.png";

const Nav = () => {
  const [menu, setMenu] = useState(false);
  // nav color-changer;
  const [navBar, setNavBar] = useState(false);

  const changeNavColor = () => {
    if (window.scrollY >= 860) {
      setNavBar(true);
    } else {
      setNavBar(false);
    }
  };

  window.addEventListener("scroll", changeNavColor);

  return (
    <nav className={navBar ? "znav active" : "znav"} id="nav">
      <div className="flex">
        <div className="appTitle">
          <img src={toys} width="50" /> ToySRC
        </div>
        <div className="flex">
          <ul className={"navmenu grouper " + (menu ? "show" : "")}>
            <li className="navBtnShell">
              <Link to="" className="znavBtn">
                Dashboard
              </Link>
            </li>
            <li className="navBtnShell">
              <a href="#findtoys" className="znavBtn">
                Find Toys
              </a>
            </li>
            <li className="navBtnShell">
              <Link to="" className="znavBtn">
                My Profile
              </Link>
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

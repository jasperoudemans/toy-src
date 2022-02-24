import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="znav">
      <ul className="flex">
        <li className="appTitle">ToySRC</li>
        <div className="grouper">
          <li className="znavBtn">
            <Link to="" className="navBtnTxt">
              Dashboard
            </Link>
          </li>
          <li className="znavBtn">
            <Link to="" className="navBtnTxt">
              Find Toys
            </Link>
          </li>
          <li className="znavBtn">
            <Link to="" className="navBtnTxt">
              My Profile
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Nav;

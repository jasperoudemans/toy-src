import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="znav">
      <ul className="flex">
        <li className="appTitle">ToySRC</li>
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
      </ul>
    </nav>
  );
};

export default Nav;

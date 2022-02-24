import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="znav">
      <ul className="flex">
        <li className="appTitle">ToySRC</li>
        <div className="grouper">
          <li className="navBtnShell">
            <Link to="" className="znavBtn">
              Dashboard
            </Link>
          </li>
          <li className="navBtnShell">
            <Link to="" className="znavBtn">
              Find Toys
            </Link>
          </li>
          <li className="navBtnShell">
            <Link to="" className="znavBtn">
              My Profile
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Nav;

import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="">Dashboard</Link>
        </li>
        <li>
          <Link>My Profile</Link>
        </li>
        <li>
          <Link>Find Toys</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

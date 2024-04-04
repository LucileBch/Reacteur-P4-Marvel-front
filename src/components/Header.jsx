// ---------- HEADER Component ----------
// Packages Imports
import { Link } from "react-router-dom";

const Header = ({ setPage, setSkip, setLimit, setSearch, setSort }) => {
  // Handle queries reset
  const handleClick = () => {
    setPage(1);
    setSkip(0);
    setLimit(100);
    setSearch("");
    setSort(true);
  };

  return (
    <header>
      <Link to="/">
        <p>LOGO</p>
      </Link>

      <div>
        <Link to="/characters">
          <button onClick={handleClick}>characters</button>
        </Link>
        <Link to="/comics">
          <button onClick={handleClick}>comics</button>
        </Link>
      </div>
      <div>
        <Link to="/user/signup">
          <button>SIGNUP</button>
        </Link>
        <Link to="/user/login">
          <button>LOGIN</button>
        </Link>
      </div>
    </header>
  );
};

// Export component
export default Header;

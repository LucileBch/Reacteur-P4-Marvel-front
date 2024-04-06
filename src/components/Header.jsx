// ---------- HEADER Component ----------
// Packages Imports
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// Assets Imports
import Logo from "../assets/img/logo-marvel.svg";

const Header = ({
  setPage,
  setSkip,
  setLimit,
  setSearch,
  setSort,
  token,
  setToken,
}) => {
  // Handle queries reset
  const handleClick = () => {
    setPage(1);
    setSkip(0);
    setLimit(100);
    setSearch("");
    setSort(true);
  };

  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    Cookies.remove("userToken");
    setToken("");
    navigate("/");
  };

  return (
    <header>
      <Link to="/">
        <img src={Logo} alt="logo marvel" />
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
          <button disabled={token ? true : false}>SIGNUP</button>
        </Link>
        <Link to="/user/login">
          <button disabled={token ? true : false}>LOGIN</button>
        </Link>

        <Link to="/like">
          <button disabled={token ? false : true}>FAVORIS</button>
        </Link>

        <button onClick={handleLogout} disabled={token ? false : true}>
          DECONNEXION
        </button>
      </div>
    </header>
  );
};

// Export component
export default Header;

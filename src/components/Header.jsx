// ---------- HEADER Component ----------
// Packages Imports
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// Assets Imports
import Logo from "../assets/img/logo-marvel.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({
  setPage,
  setSkip,
  setLimit,
  setSearch,
  setSort,
  token,
  setToken,
  errorMessages,
  setErrorMessages,
}) => {
  // Handle queries reset
  const handleClick = () => {
    setPage(1);
    setSkip(0);
    setLimit(100);
    setSearch("");
    setSort(true);
    setErrorMessages("");
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
      <div className="container">
        <div className="header__account">
          <Link to="/">
            <img src={Logo} alt="logo marvel" className="header__logo" />
          </Link>

          <div className="account__buttons">
            <Link to="/user/signup">
              <button
                disabled={token ? true : false}
                className={`btn ${token && "btn--hidden"}`}
              >
                <span className="btn__text">SIGN-UP</span>
                <FontAwesomeIcon icon="lock" className="btn__icon" />
              </button>
            </Link>
            <Link to="/user/login">
              <button
                disabled={token ? true : false}
                className={`btn ${token && "btn--hidden"}`}
              >
                <span className="btn__text">LOGIN</span>
                <FontAwesomeIcon
                  icon="arrow-right-to-bracket"
                  className="btn__icon"
                />
              </button>
            </Link>
            <Link>
              <button
                onClick={handleLogout}
                disabled={token ? false : true}
                className={`btn ${!token && "btn--hidden"}`}
              >
                <span className="btn__text">LOGOUT</span>
                <FontAwesomeIcon icon="power-off" className="btn__icon" />
              </button>
            </Link>
          </div>
        </div>

        <div>
          <nav className="header__navbar">
            <ul>
              <div className="header__navbar--wrapper">
                <Link to="/" className="header__navbar--link">
                  <li onClick={handleClick}>CHARACTERS 🧑🏻‍🎤</li>
                </Link>
              </div>
              <div className="header__navbar--wrapper">
                <Link to="/comics" className="header__navbar--link">
                  <li onClick={handleClick}>COMICS 📚</li>
                </Link>
              </div>
              <div className="header__navbar--wrapper">
                <Link to="/like" className="header__navbar--link">
                  {/* mettre class disable */}
                  <li className={`${!token && "btn--hidden"}`}>FAVORIS 💥</li>
                </Link>
              </div>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

// Export component
export default Header;

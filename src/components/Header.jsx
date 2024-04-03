// ---------- HEADER Component ----------
// Packages Imports
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <p>LOGO</p>
      </Link>

      <Link to="/characters">
        <button>characters</button>
      </Link>
      <Link to="/comics">
        <button>comics</button>
      </Link>
    </header>
  );
};

// Export component
export default Header;

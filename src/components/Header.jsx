// ---------- HEADER Component ----------
// Packages Imports
import { Link } from "react-router-dom";

const Header = ({ setSearch }) => {
  const handleClick = () => {
    setSearch("");
  };

  return (
    <header>
      <Link to="/">
        <p>LOGO</p>
      </Link>

      <Link to="/characters">
        <button onClick={handleClick}>characters</button>
      </Link>
      <Link to="/comics">
        <button onClick={handleClick}>comics</button>
      </Link>
    </header>
  );
};

// Export component
export default Header;

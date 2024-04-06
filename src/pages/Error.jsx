// ---------- ERROR Page ----------
// Packages Imports
import { Link } from "react-router-dom";

// Assets Imports
import Wrong from "../assets/img/marvel-error.png";

const Error = () => {
  return (
    <main className="error">
      {/* <img src={Wrong} alt="personnage marvel" className="error__image" /> */}
      <div className="container error__content">
        <h1>⛔️ TU ES SUR UNE MAUVAISE PISTE ⛔️</h1>
        <Link to="/">
          <p>Marvel t'attends par ICI !</p>
        </Link>
      </div>
    </main>
  );
};

// Export page
export default Error;

// ---------- ERROR Page ----------
// Packages Imports
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <main className="error">
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

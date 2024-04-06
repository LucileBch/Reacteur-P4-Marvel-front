// ---------- ERROR Page ----------
// Packages Imports
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <main className="error">
      <div className="container error__content">
        <h1>⛔️ WRONG WAY TO GO ! ⛔️</h1>
        <Link to="/">
          <p>Marvel is waiting for you HERE !</p>
        </Link>
      </div>
    </main>
  );
};

// Export page
export default Error;

// ---------- APP Routing Logic ----------
// Packages Imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Page Imports
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import ComicsByCharacter from "./pages/ComicsByCharacter";
import Error from "./pages/Error";

// Components Imports
import Header from "./components/Header";

// Style Imports
import "./App.css";

function App() {
  // States
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/characters"
          element={
            <Characters
              page={page}
              setPage={setPage}
              skip={skip}
              setSkip={setSkip}
            />
          }
        />
        <Route
          path="/comics"
          element={
            <Comics
              page={page}
              setPage={setPage}
              skip={skip}
              setSkip={setSkip}
            />
          }
        />
        <Route path="/comics/:characterId" element={<ComicsByCharacter />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;

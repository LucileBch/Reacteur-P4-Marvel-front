// ---------- APP Routing Logic ----------
// Packages Imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Page Imports
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import ComicsByCharacter from "./pages/ComicsByCharacter";
import Like from "./pages/Like";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Error from "./pages/Error";

// Components Imports
import Header from "./components/Header";
import Footer from "./components/Footer";

// Assets and Style Imports
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faHeart,
  faBan,
  faPowerOff,
  faLock,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faMagnifyingGlass,
  faHeart,
  faBan,
  faPowerOff,
  faLock,
  faArrowRightToBracket
);

function App() {
  // States
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(100);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(true);
  const [token, setToken] = useState(Cookies.get("userToken")) || "";
  const [errorMessages, setErrorMessages] = useState({});

  return (
    <Router>
      <Header
        setPage={setPage}
        setSkip={setSkip}
        setLimit={setLimit}
        setSearch={setSearch}
        setSort={setSort}
        token={token}
        setToken={setToken}
        setErrorMessages={setErrorMessages}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Characters
              page={page}
              setPage={setPage}
              skip={skip}
              setSkip={setSkip}
              limit={limit}
              setLimit={setLimit}
              search={search}
              setSearch={setSearch}
              sort={sort}
              setSort={setSort}
              token={token}
              errorMessages={errorMessages}
              setErrorMessages={setErrorMessages}
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
              limit={limit}
              setLimit={setLimit}
              search={search}
              setSearch={setSearch}
              sort={sort}
              setSort={setSort}
              token={token}
              errorMessages={errorMessages}
              setErrorMessages={setErrorMessages}
            />
          }
        />
        <Route path="/comics/:characterId" element={<ComicsByCharacter />} />
        <Route path="/user/signup" element={<SignUp setToken={setToken} />} />
        <Route path="/user/login" element={<Login setToken={setToken} />} />
        <Route path="/like" element={<Like token={token} />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

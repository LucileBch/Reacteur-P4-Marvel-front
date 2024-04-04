// ---------- APP Routing Logic ----------
// Packages Imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Page Imports
import Home from "./pages/Home";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import ComicsByCharacter from "./pages/ComicsByCharacter";
import Like from "./pages/Like";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Error from "./pages/Error";

// Components Imports
import Header from "./components/Header";

// Assets and Style Imports
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faHeart,
  faBan,
} from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass, faHeart, faBan);

function App() {
  // States
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(100);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(true);
  const [token, setToken] = useState(Cookies.get("userToken")) || "";

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
      />
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
              limit={limit}
              setLimit={setLimit}
              search={search}
              setSearch={setSearch}
              sort={sort}
              setSort={setSort}
              token={token}
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
            />
          }
        />
        <Route path="/comics/:characterId" element={<ComicsByCharacter />} />
        <Route path="/user/signup" element={<SignUp setToken={setToken} />} />
        <Route path="/user/login" element={<Login setToken={setToken} />} />
        <Route path="/like" element={<Like />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;

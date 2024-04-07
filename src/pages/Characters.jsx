// ---------- CHARACTERS Page ----------
// Packages Imports
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Components Imports
import Card from "../components/Card";
import Input from "../components/Input";

// MUI Imports
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// Assets and Style Impots
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Characters = ({
  page,
  setPage,
  skip,
  setSkip,
  limit,
  setLimit,
  search,
  setSearch,
  sort,
  setSort,
  token,
  errorMessages,
  setErrorMessages,
}) => {
  // Fetch API datas with useEffect
  // Check server response
  //    If waiting for datas : display "loading"
  //    Else : display content
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState([]);

  // Set characters limit display for each page
  const numberOfPages = Math.ceil(data.count / limit);

  const fetchData = async () => {
    if (sort === true) {
      if (page !== 1) {
        setSkip(limit * (page - 1));
      }
      setErrorMessages("");
      try {
        const { data } = await axios.get(
          `https://site--backend-marvel--mrqlhtl4f2zp.code.run/characters?skip=${skip}&name=${search}&limit=${limit}`
        );
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else if (sort === false) {
      if (page === 1) {
        setSkip(limit * (numberOfPages - 2) + (data.count % limit));
      } else {
        setSkip(limit * (numberOfPages - page));
      }

      try {
        const { data } = await axios.get(
          `https://site--backend-marvel--mrqlhtl4f2zp.code.run/characters?skip=${skip}&title=${search}&limit=${limit}`
        );
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, skip, limit, search, sort]);

  useEffect(() => {
    const likedCharacters =
      JSON.parse(localStorage.getItem("likedCharacters")) || [];
    setIsLiked(likedCharacters);
  }, []);

  // Array of characters
  const charactersArray = data.results;

  // Handle change of page with skip
  const handlePageChange = (event, value) => {
    setPage(value);

    // if A-Z order
    if (sort === true) {
      if (value !== 1) {
        setSkip(limit * (value - 1));
      } else {
        setSkip(0);
      }
      // if Z-A order
    } else if (sort === false) {
      if (value === 1) {
        setSkip(limit * (numberOfPages - 2) + (data.count % limit));
      } else {
        setSkip(limit * (numberOfPages - value));
      }
    }
  };

  // Handle limit to display
  const handleLimit = (event) => {
    setLimit(event.target.value);
    setPage(1);
  };

  // Handle sort
  const handleSort = (event) => {
    setSort(event.target.value);
    setPage(1);
  };

  const portraitFantastic = `portrait_fantastic`; // 168x252px
  // Handle like
  const handleLike = async (character) => {
    try {
      const { data } = await axios.post(
        `https://site--backend-marvel--mrqlhtl4f2zp.code.run/character/like`,
        {
          name: character.name,
          apiId: character._id,
          picture: `${character.thumbnail.path}/${portraitFantastic}.${character.thumbnail.extension}`,
          description: character.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data.message);
      if (data.message === "Character added to favorite !") {
        setIsLiked([...isLiked, character._id]);
        const likedCharacters =
          JSON.parse(localStorage.getItem("likedCharacters")) || [];
        localStorage.setItem(
          "likedCharacters",
          JSON.stringify([...likedCharacters, character._id])
        );
      }
    } catch (error) {
      if (error.response && error.response.data.error === "Unauthorized") {
        setErrorMessages({
          ...errorMessages,
          [character._id]: "You have to login first",
        });
      } else if (
        error.response &&
        error.response.data.message === "Already registered !"
      ) {
        setErrorMessages({
          ...errorMessages,
          [character._id]: "This item is already registered",
        });
      }
    }
  };

  console.log("ICI", isLiked);

  return (
    <>
      {isLoading === true ? (
        <main>
          <div className="container">
            <CircularProgress />
          </div>
        </main>
      ) : (
        <main>
          <div className="character__hero"></div>
          <div className="container">
            <section className="hero__content">
              <h1>MARVEL CHARACTERS</h1>

              <div className="research">
                <div className="hero__searchbar">
                  <FontAwesomeIcon icon="magnifying-glass" />
                  <Input
                    type="text"
                    placeholder="Search"
                    name="search"
                    state={search}
                    setState={setSearch}
                  />
                </div>

                <div className="sort">
                  <div>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="demo-select-small-label">
                        Sort by
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={sort}
                        label="sort"
                        onChange={(event) => {
                          handleSort(event);
                        }}
                      >
                        <MenuItem value={true}>A-Z</MenuItem>
                        <MenuItem value={false}>Z-A</MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                  <div>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="demo-select-small-label">
                        Affichage
                      </InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={limit}
                        label="limit"
                        onChange={(event) => {
                          handleLimit(event);
                        }}
                      >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={75}>75</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
            </section>

            <section className="display__cards">
              <div className="container__cards">
                {sort
                  ? charactersArray.map((character) => {
                      return (
                        <article className="card__article" key={character._id}>
                          {errorMessages[character._id] && (
                            <p className="hello">
                              {errorMessages[character._id]}
                            </p>
                          )}
                          <FontAwesomeIcon
                            icon="heart"
                            className={`card__icons ${
                              isLiked && isLiked.includes(character._id)
                                ? "icon_red"
                                : "not-saved"
                            }`}
                            onClick={() => {
                              handleLike(character);
                            }}
                            disabled={token ? true : false}
                          />
                          <Link to={`/comics/${character._id}`}>
                            <Card element={character} />
                          </Link>
                        </article>
                      );
                    })
                  : charactersArray
                      .slice()
                      .reverse()
                      .map((character) => {
                        return (
                          <article
                            className="card__article"
                            key={character._id}
                          >
                            <FontAwesomeIcon
                              icon="heart"
                              className="card__icons"
                              onClick={() => {
                                handleLike(character);
                              }}
                              disabled={token ? true : false}
                            />
                            <Link to={`/comics/${character._id}`}>
                              <Card element={character} />
                            </Link>
                          </article>
                        );
                      })}
              </div>

              <div>
                <Stack spacing={2} className="card__pagination">
                  <Pagination
                    count={numberOfPages}
                    page={page}
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePageChange}
                  />
                </Stack>
              </div>
            </section>
          </div>
        </main>
      )}
    </>
  );
};

// Export page
export default Characters;

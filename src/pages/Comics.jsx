// ---------- COMICS Page ----------
// Packages Imports
import { useState, useEffect } from "react";
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

const Comics = ({
  page,
  setPage,
  skip,
  setSkip,
  search,
  setSearch,
  limit,
  setLimit,
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
          `https://site--backend-marvel--mrqlhtl4f2zp.code.run/comics?skip=${skip}&title=${search}&limit=${limit}`
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
          `https://site--backend-marvel--mrqlhtl4f2zp.code.run/comics?skip=${skip}&title=${search}&limit=${limit}`
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
    const likedComics = JSON.parse(localStorage.getItem("likedComics")) || [];
    setIsLiked(likedComics);
  }, []);

  // Array of comics
  const comicsArray = data.results;

  // Handle change of page with skip
  const handlePageChange = (event, value) => {
    setPage(value);

    if (sort === true) {
      if (value !== 1) {
        setSkip(limit * (value - 1));
      } else {
        setSkip(0);
      }
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

  // Handle like
  const portraitFantastic = `portrait_fantastic`; // 168x252px
  const handleLike = async (comic) => {
    try {
      const { data } = await axios.post(
        `https://site--backend-marvel--mrqlhtl4f2zp.code.run/comic/like`,
        {
          title: comic.title,
          apiId: comic._id,
          picture: `${comic.thumbnail.path}/${portraitFantastic}.${comic.thumbnail.extension}`,
          description: comic.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.message === "Comic added to favorite !") {
        setIsLiked([...isLiked, comic._id]);

        const likedComics =
          JSON.parse(localStorage.getItem("likedComics")) || [];
        localStorage.setItem(
          "likedComics",
          JSON.stringify([...likedComics, comic._id])
        );
      }
    } catch (error) {
      if (error.response.data.error === "Unauthorized") {
        setErrorMessages({
          ...errorMessages,
          [comic._id]: "You have to login first",
        });
      } else if (error.response.data.message === "Already registered !") {
        setErrorMessages({
          ...errorMessages,
          [comic._id]: "This item is already registered",
        });
      }
    }
  };

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
          <div className="comic__hero"></div>
          <div className="container">
            <section className="hero__content">
              <h1>MARVEL COMICS</h1>

              <div className="research">
                <div className="hero__searchbar">
                  <FontAwesomeIcon icon="magnifying-glass" />
                  <Input
                    type="text"
                    placeholder=""
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
                  ? comicsArray.map((comic) => {
                      return (
                        <article className="card__article" key={comic._id}>
                          {errorMessages[comic._id] && (
                            <p className="hello">{errorMessages[comic._id]}</p>
                          )}
                          <FontAwesomeIcon
                            icon="heart"
                            className={`card__icons ${
                              isLiked && isLiked.includes(comic._id)
                                ? "icon_red"
                                : "not-saved"
                            }`}
                            onClick={() => {
                              handleLike(comic);
                            }}
                            disabled={token ? true : false}
                          />
                          <div>
                            <Card key={comic._id} element={comic} />
                          </div>
                        </article>
                      );
                    })
                  : comicsArray
                      .slice()
                      .reverse()
                      .map((comic) => {
                        return (
                          <article className="card__article" key={comic._id}>
                            <FontAwesomeIcon
                              icon="heart"
                              className="card__icons"
                              onClick={() => {
                                handleLike(comic);
                              }}
                              disabled={token ? true : false}
                            />
                            <div>
                              <Card key={comic._id} element={comic} />
                            </div>
                          </article>
                        );
                      })}
              </div>

              <div>
                <Stack spacing={2}>
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
export default Comics;

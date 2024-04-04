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
}) => {
  // Fetch API datas with useEffect
  // Check server response
  //    If waiting for datas : display "loading"
  //    Else : display content
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Set characters limit display for each page
  const numberOfPages = Math.ceil(data.count / limit);

  const fetchData = async () => {
    if (sort === true) {
      if (page !== 1) {
        setSkip(limit * (page - 1));
      }

      try {
        const { data } = await axios.get(
          `http://localhost:3000/characters?skip=${skip}&name=${search}&limit=${limit}`
        );
        setData(data);
        setIsLoading(false);

        console.log(data);
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
          `http://localhost:3000/characters?skip=${skip}&title=${search}&limit=${limit}`
        );
        setData(data);
        setIsLoading(false);

        console.log("DATA", data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, skip, limit, search, sort]);

  // Array of characters
  const charactersArray = data.results;

  // Handle change of page with skip
  const handlePageChange = (event, value) => {
    setPage(value);

    // si je suis dans l'ordre normal
    if (sort === true) {
      if (value !== 1) {
        setSkip(limit * (value - 1));
      } else {
        setSkip(0);
      }
    } else if (sort === false) {
      // ordre inversé ==> remettre les condision de skip
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
  const handleLike = async (character) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/character/like`,
        {
          name: character.name,
          apiId: character._id,
          picture: `${character.thumbnail.path}.${character.thumbnail.extension}`,
          description: character.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      {isLoading === true ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <main>
          <section>
            <h1>Les Personnages de Marvel</h1>
            <div>
              <FontAwesomeIcon icon="magnifying-glass" />
              <Input
                type="text"
                placeholder="Rechercher des personnages"
                name="search"
                state={search}
                setState={setSearch}
              />
            </div>

            <div>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Sort by</InputLabel>
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
                <InputLabel id="demo-select-small-label">Affichage</InputLabel>
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
          </section>

          <section>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {sort
                ? charactersArray.map((character) => {
                    return (
                      <article key={character._id}>
                        <FontAwesomeIcon
                          icon="heart"
                          style={{
                            position: "absolute",
                            width: "30px",
                            height: "30px",
                          }}
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
                        <Link
                          key={character._id}
                          to={`/comics/${character._id}`}
                        >
                          <Card element={character} />
                        </Link>
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
        </main>
      )}
    </>
  );
};

// Export page
export default Characters;

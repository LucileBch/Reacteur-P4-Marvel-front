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
          `http://localhost:3000/comics?skip=${skip}&title=${search}&limit=${limit}`
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
          `http://localhost:3000/comics?skip=${skip}&title=${search}&limit=${limit}`
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
        `http://localhost:3000/comic/like`,
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
            <h1>Les Comics de Marvel</h1>
            <div>
              <FontAwesomeIcon icon="magnifying-glass" />
              <Input
                type="text"
                placeholder="Rechercher des comics"
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
                ? comicsArray.map((comic) => {
                    return (
                      <div key={comic._id}>
                        <FontAwesomeIcon
                          icon="heart"
                          style={{
                            position: "absolute",
                            width: "30px",
                            height: "30px",
                          }}
                          onClick={() => {
                            handleLike(comic);
                          }}
                          disabled={token ? true : false}
                        />
                        <p>{count}</p>
                        <Card key={comic._id} element={comic} />;
                      </div>
                    );
                  })
                : comicsArray
                    .slice()
                    .reverse()
                    .map((comic) => {
                      return <Card key={comic._id} element={comic} />;
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
export default Comics;

// ---------- CHARACTERS Page ----------
// Packages Imports
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Components Imports
import Card from "../components/Card";
import Input from "../components/Input";

// MUI Imports
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";

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
    try {
      const { data } = await axios.get(
        `http://localhost:3000/characters?page=${page}&skip=${skip}&name=${search}&limit=${limit}`
      );
      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, skip, limit, search]);

  // Array of characters
  const charactersArray = data.results;

  // Handle change of page with skip
  const handlePageChange = (event, value) => {
    setPage(value);
    if (value !== 1) {
      setSkip(limit * (value - 1));
    } else {
      setSkip(0);
    }
  };

  // Handle limit to display
  const handleLimit = (event, value) => {
    setLimit(value);
  };

  return (
    <>
      {isLoading === true ? (
        "Loading"
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
              <Slider
                defaultValue={100}
                valueLabelDisplay="auto"
                step={10}
                marks
                min={10}
                max={100}
                onChange={(event, value) => {
                  handleLimit(event, value);
                }}
              />
            </div>
          </section>

          <section>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {charactersArray.map((character) => {
                return (
                  <Link key={character._id} to={`/comics/${character._id}`}>
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

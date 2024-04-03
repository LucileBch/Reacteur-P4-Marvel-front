// ---------- COMICS Page ----------
// Packages Imports
import { useState, useEffect } from "react";
import axios from "axios";

// Components Imports
import Card from "../components/Card";
import Input from "../components/Input";

// MUI Imports
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

// Assets and Style Impots
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comics = ({ page, setPage, skip, setSkip, search, setSearch }) => {
  // Fetch API datas with useEffect
  // Check server response
  //    If waiting for datas : display "loading"
  //    Else : display content
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Set characters limit display for each page
  const limit = data.limit;
  const count = data.count;
  const numberOfPages = Math.ceil(data.count / limit);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/comics?&page=${page}&skip=${skip}&title=${search}`
      );
      setData(data);
      setIsLoading(false);

      console.log("ICI LA DATA", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, skip, search]);

  // Array of comics
  const comicsArray = data.results;

  // Handle change of page with skip
  const handlePageChange = (event, value) => {
    setPage(value);
    if (value !== 1) {
      setSkip(limit * (value - 1));
    } else {
      setSkip(0);
    }
  };

  return (
    <>
      {isLoading === true ? (
        "Loading"
      ) : (
        <main>
          {" "}
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

            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {comicsArray.map((comic) => {
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

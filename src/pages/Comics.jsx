// ---------- COMICS Page ----------
// Packages Imports
import { useState, useEffect } from "react";
import axios from "axios";

// Components Imports
import Card from "../components/Card";

// MUI Imports
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Comics = ({ page, setPage }) => {
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

  // Set skip when changing page
  let skip = 0;
  if (page !== 1) {
    skip = limit * (page - 1);
  }

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/comics?&page=${page}&skip=${skip}`
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
  }, [page]);

  // Array of comics
  const comicsArray = data.results;

  // Handle change of page
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      {isLoading === true ? (
        "Loading"
      ) : (
        <main>
          <h1>Les Comics de Marvel</h1>
          <section>
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

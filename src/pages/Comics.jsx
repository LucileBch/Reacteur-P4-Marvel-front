// ---------- COMICS Page ----------
// Packages Imports
import { useState, useEffect } from "react";
import axios from "axios";

// Components Imports
import Card from "../components/Card";

const Comics = () => {
  // Fetch API datas with useEffect
  // Check server response
  //    If waiting for datas : display "loading"
  //    Else : display content
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/comics`);
      setData(data);
      setIsLoading(false);

      console.log("ICI LA DATA", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Array of comics
  const comicsArray = data.results;

  return (
    <>
      {isLoading === true ? (
        "Loading"
      ) : (
        <main>
          <h1>Les Comics de Marvel</h1>
          <section style={{ display: "flex", flexWrap: "wrap" }}>
            <Card infosArray={comicsArray} />
          </section>
        </main>
      )}
    </>
  );
};

// Export page
export default Comics;

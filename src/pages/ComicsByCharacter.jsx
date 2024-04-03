// ---------- COMICS BY CHARACTER ID Page ----------
// Packages Imports
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// Components Imports
import Card from "../components/Card";

const ComicsByCharacter = () => {
  // Fetch API datas with useEffect
  // Check server response
  //    If waiting for datas : display "loading"
  //    Else : display content
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Id params
  const { characterId } = useParams();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/comics/${characterId}`
      );
      setData(data);
      setIsLoading(false);

      console.log("ICI LA DATA ID", data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Size img for Url aspect ratio
  const portraitMedium = `portrait_medium`; // 100x150px ok
  const portraitFantastic = `portrait_fantastic`; // 168x252px

  const comicsArray = data.comics;

  return (
    <>
      {isLoading === true ? (
        "Loading"
      ) : (
        <main>
          <section>
            <h1>Le perso {`${data.name}`}</h1>
            <img
              src={`${data.thumbnail.path}/${portraitFantastic}.${data.thumbnail.extension}`}
              alt={`photo de ${data.name}`}
            />
            <p>{data.description}</p>
          </section>
          <section>
            <h2>Les Comics dans lesquels il apparaît</h2>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {comicsArray.map((comic) => {
                return <Card key={comic._id} element={comic} />;
              })}
            </div>
          </section>
        </main>
      )}
    </>
  );
};

// Export page
export default ComicsByCharacter;

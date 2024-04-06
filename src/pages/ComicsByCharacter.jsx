// ---------- COMICS BY CHARACTER ID Page ----------
// Packages Imports
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// Components Imports
import Card from "../components/Card";

// MUI Imports
import CircularProgress from "@mui/material/CircularProgress";

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
        `https://site--backend-marvel--mrqlhtl4f2zp.code.run/comics/${characterId}`
      );
      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Size img for Url aspect ratio
  const portraitFantastic = `portrait_fantastic`; // 168x252px

  const comicsArray = data.comics;

  return (
    <>
      {isLoading === true ? (
        <main>
          <div className="containter">
            <CircularProgress />
          </div>
        </main>
      ) : (
        <main className="comicsbyid">
          <div className="container">
            <section className="character__id">
              <div className="character__id--name">
                <h1>{`${data.name}`}</h1>
                <img
                  src={`${data.thumbnail.path}/${portraitFantastic}.${data.thumbnail.extension}`}
                  alt={`photo de ${data.name}`}
                />
              </div>
              <p>{data.description}</p>
            </section>

            <section className="comics__linked">
              <h2>Comics linked :</h2>
              <div className="comics__linked--display">
                {comicsArray.map((comic) => {
                  return (
                    <div key={comic._id}>
                      <img
                        src={`${comic.thumbnail.path}/${portraitFantastic}.${comic.thumbnail.extension}`}
                        alt={`photo de ${comic.title}`}
                      />
                      <p className="comic__title">{comic.title}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
          <div className="hero-end"></div>
        </main>
      )}
    </>
  );
};

// Export page
export default ComicsByCharacter;

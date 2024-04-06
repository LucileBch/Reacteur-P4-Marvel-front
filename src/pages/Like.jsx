// ---------- LIKE Page ----------
// Packages Imports
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
// import Cookies from "js-cookie";

// MUI Imports
import CircularProgress from "@mui/material/CircularProgress";

// Assets and Style Impots
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Like = ({ token }) => {
  // Fetch API datas with useEffect
  // Check server response
  //    If waiting for datas : display "loading"
  //    Else : display content
  const [charactersData, setCharactersData] = useState({});
  const [comicsData, setComicsData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [charactersResponse, comicsResponse] = await Promise.all([
        axios.get(
          `https://site--backend-marvel--mrqlhtl4f2zp.code.run/liked-characters`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
        axios.get(
          `https://site--backend-marvel--mrqlhtl4f2zp.code.run/liked-comics`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
      ]);

      setCharactersData(charactersResponse.data);
      setComicsData(comicsResponse.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [token]);

  console.log(comicsData, charactersData);

  // Handle delete character from list
  // Update DB and rerender list updated
  const handleDeleteCharacters = async (character) => {
    try {
      await axios.delete(
        `https://site--backend-marvel--mrqlhtl4f2zp.code.run/characters/dislike/${character._id}`
      );

      const updatedDataCharacters = charactersData.charactersToDisplay.filter(
        (item) => item._id !== character._id
      );
      setCharactersData({
        ...charactersData,
        charactersToDisplay: updatedDataCharacters,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // Handle delete comic from list
  // Update DB and rerender list updated
  const handleDeleteComics = async (comic) => {
    try {
      await axios.delete(
        `https://site--backend-marvel--mrqlhtl4f2zp.code.run/comics/dislike/${comic._id}`
      );

      const updatedDataComics = comicsData.comicsToDisplay.filter(
        (item) => item._id !== comic._id
      );
      setComicsData({
        ...comicsData,
        comicsToDisplay: updatedDataComics,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return token ? (
    <>
      {isLoading === true ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <>
          {comicsData.length === undefined &&
          charactersData.length === undefined ? (
            <main className="empty__likes">
              <div className="container empty__content">
                <h2>PAS DE FAVORIS ENREGISTRÉS...</h2>
              </div>
            </main>
          ) : (
            <main>
              <div className="container">
                <section>
                  <h2>Voici vos personnages favoris</h2>
                  <div style={{ display: "flex" }}>
                    {charactersData.charactersToDisplay.map((character) => {
                      return (
                        <div key={character._id}>
                          <FontAwesomeIcon
                            icon="ban"
                            onClick={() => {
                              handleDeleteCharacters(character);
                            }}
                          />
                          <article>
                            <h3>{character.name}</h3>
                            <img
                              src={character.picture}
                              alt={`photo de ${character.name}`}
                            />
                            <p>{character.description}</p>
                          </article>
                        </div>
                      );
                    })}
                  </div>
                </section>

                <section>
                  <h2>Voici vos comics favoris</h2>
                  <div style={{ display: "flex" }}>
                    {comicsData.comicsToDisplay.map((comic) => {
                      return (
                        <div key={comic._id}>
                          <FontAwesomeIcon
                            icon="ban"
                            onClick={() => {
                              handleDeleteComics(comic);
                            }}
                          />
                          <article>
                            <h3>{comic.title}</h3>
                            <img
                              src={comic.picture}
                              alt={`photo de ${comic.name}`}
                            />
                            <p>{comic.description}</p>
                          </article>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>
            </main>
          )}
        </>
      )}
    </>
  ) : (
    <Navigate to="/user/login" />
  );
};

// Export page
export default Like;

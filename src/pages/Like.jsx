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

      // Delete favorite in LS ---NOT WORKING YET
      // const likedCharacters =
      //   JSON.parse(localStorage.getItem("likedCharacters")) || [];
      // const updatedLikedCharacters = likedCharacters.filter(
      //   (charId) => charId !== character._id
      // );
      // localStorage.setItem(
      //   "likedCharacters",
      //   JSON.stringify(updatedLikedCharacters)
      // );
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
        <main>
          <div className="container">
            <CircularProgress />
          </div>
        </main>
      ) : (
        <>
          {Object.keys(comicsData.comicsToDisplay).length === 0 &&
          Object.keys(charactersData.charactersToDisplay).length === 0 ? (
            <main className="empty__likes">
              <div className="container empty__content">
                <h2>NO LIKES...</h2>
              </div>
            </main>
          ) : (
            <main>
              <div className="container">
                <section className="character__favorite">
                  <h2>Your favorite characters</h2>
                  <div className="character__list">
                    {charactersData.charactersToDisplay.map((character) => {
                      return (
                        <div key={character._id}>
                          <article>
                            <img
                              src={character.picture}
                              alt={`photo de ${character.name}`}
                            />
                            <div className="content-orga">
                              <h3>{character.name}</h3>
                              <FontAwesomeIcon
                                icon="ban"
                                className="ban"
                                onClick={() => {
                                  handleDeleteCharacters(character);
                                }}
                              />
                            </div>
                          </article>
                        </div>
                      );
                    })}
                  </div>
                </section>

                <section className="comic__favorite">
                  <h2>Your favorite comics</h2>
                  <div className="comic__list">
                    {comicsData.comicsToDisplay.map((comic) => {
                      return (
                        <div key={comic._id}>
                          <article>
                            <img
                              src={comic.picture}
                              alt={`photo de ${comic.name}`}
                            />
                            <div className="content-orga">
                              <h3>{comic.title}</h3>
                              <FontAwesomeIcon
                                className="ban"
                                icon="ban"
                                onClick={() => {
                                  handleDeleteComics(comic);
                                }}
                              />
                            </div>
                          </article>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>
              <div className="hero-endfav"></div>
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

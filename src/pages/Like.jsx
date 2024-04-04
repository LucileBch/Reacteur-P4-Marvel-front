// ---------- LIKE Page ----------
// Packages Imports
import { useState } from "react";
import { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import Cookies from "js-cookie";

// MUI Imports
import CircularProgress from "@mui/material/CircularProgress";

// Assets and Style Impots
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Like = () => {
  // Fetch API datas with useEffect
  // Check server response
  //    If waiting for datas : display "loading"
  //    Else : display content
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/characters/like`);
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

  const handleDelete = async (character) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/characters/dislike/${character._id}`
      );

      console.log(data.message);
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
            <h2>Voici vos personnages favoris</h2>
            <div>
              {data.charactersToDisplay.map((character) => {
                return (
                  <div key={character._id}>
                    <FontAwesomeIcon
                      icon="ban"
                      onClick={() => {
                        handleDelete(character);
                      }}
                    />
                    <article>
                      <h3>{character.name}</h3>
                      <p>{character.description}</p>
                      <img
                        src={character.picture}
                        alt={`photo de ${character.name}`}
                      />
                    </article>
                  </div>
                );
              })}
            </div>
          </section>
          <section>
            <h2>Voici vos comics favoris</h2>
          </section>
        </main>
      )}
    </>
  );
};

// Export page
export default Like;

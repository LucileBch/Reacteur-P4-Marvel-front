// ---------- SIGNUP Page ----------
// Packages Imports
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

// Component Imports
import Input from "../components/Input";

const SignUp = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setErrorMessage("");

      const { data } = await axios.post(`http://localhost:3000/user/signup`, {
        username: name,
        email: email,
        password: password,
      });

      Cookies.set("userToken", data.token, { expires: 7 });
      setToken(data.token);
      navigate("/");
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessage(
          "Cet email existe déjà, merci de choisir une autre adresse."
        );
      } else if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Merci de remplir tous les champs.");
      }
    }
  };

  return (
    <main>
      <h2>S'inscrire</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nom d'utilisateur"
          name="username"
          setState={setName}
          state={name}
        />
        <Input
          type="email"
          placeholder="Email"
          name="email"
          setState={setEmail}
          state={email}
        />
        <Input
          type="password"
          placeholder="Mot de passe"
          name="password"
          setState={setPassword}
          state={password}
        />
        <input type="submit" value="S'inscrire" />
      </form>

      <Link to="/user/login">
        <p>Déjà un compte ? Connecte toi</p>
      </Link>
      {errorMessage && <p>{errorMessage}</p>}
    </main>
  );
};

// Export page
export default SignUp;

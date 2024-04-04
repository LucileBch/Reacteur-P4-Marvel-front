// ---------- LOGIN Page ----------
// Packages Imports
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

// Component Imports
import Input from "../components/Input";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setErrorMessage("");
      const { data } = await axios.post(`http://localhost:3000/user/login`, {
        email: email,
        password: password,
      });
      Cookies.set("userToken", data.token, { expires: 7 });
      setToken(data.token);
      navigate("/");
    } catch (error) {
      if (error.response.status === 400 || error.response.status === 401) {
        setErrorMessage("Email ou mot de passe incorrect ou inexistant.");
      }
    }
  };

  return (
    <main>
      <h2>Se connecter</h2>
      <form onSubmit={handleSubmit}>
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
        <input type="submit" value="Se connecter" />
      </form>

      <Link to="/user/login">
        <p>Pas encore de compte ? Inscrit toi</p>
      </Link>
      {errorMessage && <p>{errorMessage}</p>}
    </main>
  );
};

// Export page
export default Login;

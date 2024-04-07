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
      const { data } = await axios.post(
        `https://site--backend-marvel--mrqlhtl4f2zp.code.run/user/login`,
        {
          email: email,
          password: password,
        }
      );
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
      <div className="hero__log"></div>
      <div className="container container__log">
        <h2 className="title__co">Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="Email" id="email" className="form__label">
            Email :
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            setState={setEmail}
            state={email}
          />

          <label htmlFor="Email" id="password" className="form__label">
            Password :
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            setState={setPassword}
            state={password}
          />
          <input type="submit" value="Login" className="form__submit" />
        </form>

        <Link to="/user/signup" className="log__redirect">
          <p>Your are not in the team ? Be fast and sign up !</p>
        </Link>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </main>
  );
};

// Export page
export default Login;

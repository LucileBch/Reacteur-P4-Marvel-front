// ---------- SIGNUP Page ----------
// Packages Imports
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

// Component Imports
import Input from "../components/Input";

const SignUp = ({ setToken }) => {
  // States
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // Handle user account creation
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setErrorMessage("");

      const { data } = await axios.post(
        `https://site--backend-marvel--mrqlhtl4f2zp.code.run/user/signup`,
        {
          username: name,
          email: email,
          password: password,
        }
      );

      Cookies.set("userToken", data.token, { expires: 7 });
      setToken(data.token);
      navigate("/");
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessage("Please use an other email adress.");
      } else if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Make sur to fill all fields !");
      }
    }
  };

  return (
    <main>
      <div className="hero__log"></div>
      <div className="container container__log">
        <h2 className="title__co">Sign Up to join our heros !</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="Username" id="username" className="form__label">
            Username :
          </label>
          <Input
            id="username"
            type="text"
            placeholder="John Doe"
            name="username"
            setState={setName}
            state={name}
          />
          <label htmlFor="Email" id="email" className="form__label">
            Email :
          </label>
          <Input
            id="email"
            type="email"
            placeholder="wolverine@marvel.com"
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
            placeholder="azerty#123="
            name="password"
            setState={setPassword}
            state={password}
          />
          <input type="submit" value="Sign Up !" className="form__submit" />
        </form>

        <Link to="/user/login" className="log__redirect">
          <p>Already in the team ? It is here to login !</p>
        </Link>
        {errorMessage && <p className="error__connection">{errorMessage}</p>}
      </div>
    </main>
  );
};

// Export page
export default SignUp;

import React, { useContext, useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
import { ChewsterContext } from "../../context/ChewsterContext";
import axios from "axios";

const Login = ({ setShowLogin }) => {
  const { BASE_URL, token, setToken } = useContext(ChewsterContext);

  const [state, setState] = useState("Log In");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let newUrl = BASE_URL;

    if (state === "Log In") {
      newUrl += "/chewster-api/user/login";
    } else {
      newUrl += "/chewster-api/user/register";
    }

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="login-pop">
      <form className="login-pop-container" onSubmit={handleLogin}>
        <div className="login-pop-title">
          <h2>{state}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
          />
        </div>
        <div className="login-pop-inputs">
          {state === "Log In" ? (
            <></>
          ) : (
            <>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                onChange={handleOnChange}
                value={data.name}
              />
            </>
          )}

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            name="email"
            onChange={handleOnChange}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            required
            name="password"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">
          {state === "Sign Up" ? "Create Account" : "Sign In"}
        </button>

        {state === "Sign Up" && (
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>
              By checking the agreement or tapping "Sign Up" you agree to
              Chewster's Terms and Privacy Policy.
            </p>
          </div>
        )}

        {state === "Log In" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setState("Sign Up")}>Sign Up</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setState("Log In")}>Sign In</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;

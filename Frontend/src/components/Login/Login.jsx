import React, { useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";

const Login = ({ setShowLogin }) => {
  const [state, setState] = useState("Log In");

  return (
    <div className="login-pop">
      <form className="login-pop-container">
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
              <label htmlFor="first-name">First Name</label>
              <input id="first-name" type="text" required />

              <label htmlFor="last-name">Last Name</label>
              <input id="last-name" type="text" required />
            </>
          )}

          <label htmlFor="email">Email</label>
          <input id="email" type="email" required />

          <label htmlFor="password">Password</label>
          <input id="password" type="password" required />
        </div>
        <button>{state === "Sign Up" ? "Sign Up" : "Sign In"}</button>

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

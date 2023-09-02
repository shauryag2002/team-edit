import React, { useState } from "react";
import TeamEdit from "../../images/Team_Edit_Logo-removebg-preview.png";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import googleLogo from "../../images/google-logo-png.png";
import { auth, provider } from "../../config.js";
import { signInWithPopup } from "firebase/auth";
const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const history = useHistory();
  const handleLogin = async () => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.username,
          password: user.password,
        }),
      });
      const data = await res.json();
      const userInfo = await data;
      localStorage.setItem("token", userInfo.accessToken);
      localStorage.setItem("id", userInfo._id);
      localStorage.setItem("name", userInfo.username);
      if (data.message) {
        setError(data.message);
      } else {
        history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleGoogleFunc = async (data, password) => {
    const data1 = data;
    try {
      const res = await fetch("/api/auth/googleAuth", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: data1,
          password,
        }),
      });
      const data = await res.json();
      console.log(data);
      const userInfo = await data;
      localStorage.setItem("token", userInfo.accessToken);
      localStorage.setItem("id", userInfo._id);
      localStorage.setItem("name", userInfo.username);

      history.push("/");
    } catch (err) {
      console.log(err.response);
    }
  };
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const password = new Date().getTime().toString();
        handleGoogleFunc(result, password);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="login">
      <img src={TeamEdit} alt="Team Edit logo" className="logo-style" />
      <div className="login-text">Welcome Back</div>
      {error && (
        <div className="error-style">
          <span className="e-message">{error}</span>
        </div>
      )}
      <input
        type="text"
        placeholder="username or email"
        value={user.username}
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
        }}
        className="input-css"
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
        className="input-css"
      />
      <button onClick={handleLogin} className="btn cursor">
        Login
      </button>
      <div className="register">
        Don't have an account?{" "}
        <Link to={"/register"} className="register-link">
          Sign up
        </Link>
      </div>
      <div className="line">
        <hr />
        <div className="or">OR</div>
        <hr />
      </div>
      <div className="google">
        <div className="Gsvg cursor" onClick={handleGoogleSignIn}>
          <img src={googleLogo} alt="google-logo" className="google-logo" />
          <span className="googleCon">Continue with Google</span>
        </div>
      </div>
    </div>
  );
};

export default Login;

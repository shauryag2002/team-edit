import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import TeamEdit from "../../images/Team_Edit_Logo-removebg-preview.png";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const handleRegister = async () => {
    try {
      if (!username || !password || !email) {
        alert("Please enter all required fields");
        return;
      } else if (Number(password.length) < 8) {
        alert("Please Enter Password greater that 8");
        return;
      }
      const res = await axios.post("/api/auth/register", {
        username,
        password,
        email,
      });
      if (res.data.message) {
        setError(res.data.message);
      } else {
        history.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="register-style">
      <img src={TeamEdit} alt="Team Edit logo" className="logo-style" />
      <div className="signup-text login-text">Sign Up to Team Edit</div>
      {error && (
        <div className="error-style">
          <span className="e-message">{error}</span>
        </div>
      )}
      <input
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
        className="input-css"
      />
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
        className="input-css"
      />
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        // minLength={8}
        min={8}
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
        className="input-css"
      />
      <input
        type="submit"
        onClick={handleRegister}
        value={"Register"}
        className="btn"
      />
      <div className="register">
        have an account?{" "}
        <Link to={"/login"} className="register-link">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;

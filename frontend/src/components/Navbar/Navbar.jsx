import React from "react";
import "./Navbar.css";
import TeamEditLogo from "../../images/Team_Edit_Logo-removebg-preview.png";
import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const Navbar = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const history = useHistory();
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      const userInfo = async () => {
        const res = await axios.get("/api/user/" + localStorage.getItem("id"));
        setUser(res.data);
      };
      userInfo();
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, [token]);
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/" className="text-style companyLogo">
            <img src={TeamEditLogo} alt="Team Edit" className="Logo" />
            <div className="heading">Team Edit</div>
          </Link>
        </li>
        <div className="subHeadings">
          <li className="user-name-style">{user.username}</li>
          <li>
            <Link className="text-style" to="/notification">
              Notification
            </Link>
          </li>
          <li
            onClick={() => {
              localStorage.clear();
              setToken(localStorage.getItem("token"));
            }}
            className="text-style cursor"
          >
            Logout
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;

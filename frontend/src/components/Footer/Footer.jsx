import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  const visitGithub = () => {
    window.location.href = "https://github.com/shauryag2002";
  };
  const visitTwitter = () => {
    window.location.href =
      "https://twitter.com/i/flow/login?redirect_after_login=%2FShauryag_2002";
  };
  return (
    <div className="footer">
      <div className="topFooter">
        <div className="know">
          <div className="aboutLink">
            <Link className="astyle" to={"/about"}>
              About Us
            </Link>
          </div>
          <Link className="contactUs-style astyle" to={"/contact"}>
            Contact Us
          </Link>
        </div>
        <div className="social">
          <Link
            to="https://www.linkedin.com/in/shauryagupta6/"
            className="linkedin astyle cursor"
          >
            LinkedIn
          </Link>
          <div className="github astyle cursor" onClick={visitGithub}>
            Github
          </div>
          <div className="twitter astyle cursor" onClick={visitTwitter}>
            Twitter
          </div>
        </div>
      </div>
      <div
        className="mail astyle cursor"
        onClick={() =>
          (window.location.href = "mailto:guptashaurya2002@gmail.com")
        }
      >
        Mail Us : guptashaurya2002@gmail.com
      </div>
    </div>
  );
};

export default Footer;

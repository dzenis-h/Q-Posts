import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQ } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <FontAwesomeIcon
          icon={faQ}
          beatFade
          style={{
            color: "#00ff16",
            marginTop: "2rem",
            fontSize: "large",
            display: "block",
          }}
        />{" "}
        <nav className="nav">
          <Link to="/about" className="nav-link">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

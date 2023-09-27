import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Header: React.FC = () => {
  return (
    <>
      <Link to="/" className="back-btn">
        <span className="back-btn-dark"> </span>{" "}
        <FontAwesomeIcon
          icon={faArrowLeft}
          beatFade
          style={{ color: "#00ff16", paddingLeft: ".5rem" }}
        />{" "}
      </Link>
      <main>
        I've created an app that fetches user profiles and their posts, with an
        additional section for comments. While it may not be my magnum opus, I
        diligently followed instructions to craft this tool. It was developed
        with the goal of assisting with a job application, showcasing my ability
        to follow directions and deliver functional solutions. Though it won't
        make it to my profile, it serves its purpose.
        <p>
          Made with{" "}
          <span role="emoji" aria-label="heart">
            💚
          </span>{" "}
          by{" "}
          <a href="https://dzenis.tech" target="_blank">
            Dženis H.
          </a>
        </p>
      </main>
    </>
  );
};

export default Header;

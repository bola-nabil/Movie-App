import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { faClapperboard } from "@fortawesome/free-solid-svg-icons";
import { faTv } from "@fortawesome/free-solid-svg-icons";

import "../css/Navbar.css";

function NavBar() {
  const [activeItem, setActiveItem] = useState("trending");
  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  const LinkData = [
    {
      linkPath: "/",
      active: "trending",
      iconLink: faFire,
      title: "Trending",
    },
    {
      linkPath: "/movies",
      active: "movies",
      iconLink: faClapperboard,
      title: "Movies",
    },
    {
      linkPath: "/series",
      active: "series",
      iconLink: faTv,
      title: "TV Series",
    },
    {
      linkPath: "/search",
      active: "search",
      iconLink: faMagnifyingGlass,
      title: "search",
    },
  ];

  return (
    <Navbar bg="dark" data-bs-theme="dark" className="" fixed="bottom">
      <Container>
        <Nav className="text-end margin-auto">
          {LinkData.map((data, index) => (
            <Link
              key={index}
              to={data.linkPath}
              className={`nav-home nav-p ${
                activeItem === data.active ? "active-home" : ""
              }`}
              onClick={() => {
                handleItemClick(data.active);
              }}
            >
              <div className="homeIcon">
                <FontAwesomeIcon icon={data.iconLink} className="" />
              </div>
              {data.title}
            </Link>
          ))}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;

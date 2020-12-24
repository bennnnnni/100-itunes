import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import "./Navbar.scss";

const Navigation = ({ selectView }) => {
  return (
    <Navbar className="custom-navbar" fixed="top" variant="dark">
      <Nav defaultActiveKey="albums" onSelect={key => selectView(key)}>
        <Nav.Link eventKey="albums">Albums</Nav.Link>
        <Nav.Link eventKey="podcasts">Podcasts</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Navigation;

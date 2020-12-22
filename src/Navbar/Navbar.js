import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const Navigation = ({ selectView }) => {
  return (
    <Navbar>
      <Navbar.Brand>Kecko</Navbar.Brand>
      <Nav defaultActiveKey="albums" onSelect={key => selectView(key)}>
        <Nav.Link eventKey="albums">Albums</Nav.Link>
        <Nav.Link eventKey="podcasts">Podcasts</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Navigation;

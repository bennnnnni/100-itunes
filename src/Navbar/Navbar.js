import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { useAuth0 } from "@auth0/auth0-react";
import { AuthButton } from "../authentication/AuthButtons";

import "./Navbar.scss";

const Navigation = ({ selectView }) => {
  const { isAuthenticated } = useAuth0();
  return (
    <Navbar className="custom-navbar" fixed="top" variant="dark">
      <Nav defaultActiveKey="albums" onSelect={key => selectView(key)}>
        <Nav.Link eventKey="albums">Albums</Nav.Link>
        <Nav.Link eventKey="podcasts">Podcasts</Nav.Link>
      </Nav>
      <Nav className="ml-auto">
        <Nav.Item>
          <AuthButton isAuthenticated={isAuthenticated} />
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default Navigation;

import React from "react";

import { useDispatch } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthButton } from "../authentication/AuthButtons";

import { setView } from "../redux/actionCreators";
import "./Navbar.scss";
import { appViews } from "../constants";

const { ALBUMS, PODCASTS, FAVORITES } = appViews;

const Navigation = () => {
  const { isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  return (
    <Navbar className="custom-navbar" fixed="top" variant="dark">
      <Nav defaultActiveKey={ALBUMS} onSelect={key => dispatch(setView(key))}>
        <Nav.Link eventKey={ALBUMS}>Albums</Nav.Link>
        <Nav.Link eventKey={PODCASTS}>Podcasts</Nav.Link>
        {isAuthenticated && <Nav.Link eventKey={FAVORITES}>Favorites</Nav.Link>}
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

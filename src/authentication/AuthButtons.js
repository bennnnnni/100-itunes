import React from "react";

import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";
import "./styles.scss";

export const AuthButton = ({ isAuthenticated }) => {
  const { loginWithRedirect, logout } = useAuth0();

  if (isAuthenticated) {
    return (
      <Button bsPrefix="logout-btn" onClick={() => logout()}>
        Logout
      </Button>
    );
  } else {
    return (
      <Button bsPrefix="login-btn" onClick={() => loginWithRedirect()}>
        Login
      </Button>
    );
  }
};

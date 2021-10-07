import React, { useContext } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";

import UserContext from "../context/UserContext";
import AdminContext from "../context/AdminContext";

export default function AppNavbar() {
  const { user, setUser } = useContext(UserContext);
  const { admin, setAdmin } = useContext(AdminContext);

  const history = useHistory();

  const signOut = () => {
    setUser(null);
    setAdmin(null);
    history.push("/");
  };

  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <Container>
        <Nav className="me-auto">
          <Link to="/" className="navbar-brand">
            Library Management
          </Link>
        </Nav>
        <Nav>
          {!user && !admin && (
            <Link className="nav-link" to="/signup">
              Sign Up
            </Link>
          )}
          {!user && !admin && (
            <Link className="nav-link" to="/login">
              Login
            </Link>
          )}
          {user && (
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          )}
          {admin && (
            <Link className="nav-link" to="/admin-dashboard">
              Dashboard
            </Link>
          )}
          {(user || admin) && <Nav.Link onClick={signOut}>Sign Out</Nav.Link>}
        </Nav>
      </Container>
    </Navbar>
  );
}

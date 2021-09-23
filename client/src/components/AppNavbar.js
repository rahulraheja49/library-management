import React, { useContext } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import UserContext from "../context/UserContext";

export default function AppNavbar() {
  const { user, setUser } = useContext(UserContext);

  const history = useHistory();

  const signOut = () => {
    setUser(null);
    history.push("/");
  };

  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <Container>
        <Nav className="me-auto">
          <Navbar.Brand href="/">Library Management</Navbar.Brand>
        </Nav>
        <Nav>
          {!user && <Nav.Link href="/signup">Sign Up</Nav.Link>}
          {!user && <Nav.Link href="/login">Login</Nav.Link>}
          {user && <Nav.Link href="/dashboard">Dashboard</Nav.Link>}
          {user && <Nav.Link onClick={signOut}>Sign Out</Nav.Link>}
        </Nav>
      </Container>
    </Navbar>
  );
}

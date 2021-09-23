import React, { useContext, useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import UserContext from "../context/UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const { setUser } = useContext(UserContext);

  const logIn = () => {
    axios
      .post("/api/auth/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.data);
          toast.success("Logged in succesfully");
          history.push("/dashboard");
        } else {
          toast.error(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Login here</h1>
      <Toaster position="top-right" />
      <Row style={{ margin: 0 }}>
        <Col style={{ flex: 0.2 }}></Col>
        <Col>
          <Form className="justify-content-center w-75 mt-5">
            <Form.Group className="mb-4">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>

            <Button variant="primary" onClick={logIn}>
              Log In
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

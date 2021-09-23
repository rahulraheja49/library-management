import React, { useContext, useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";

import UserContext from "../context/UserContext";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [agreed, setAgreed] = useState(false);

  const history = useHistory();

  const { setUser } = useContext(UserContext);

  const signUp = () => {
    if (agreed) {
      if (password === confirmPass) {
        axios
          .post("/api/auth/signup", {
            email,
            fullName,
            password,
          })
          .then((res) => {
            console.log(res);
            if (res.data.success) {
              setUser(res.data.data);
              toast.success("User succesfully created");
              history.push("/dashboard");
            } else {
              toast.error(res.data.msg);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        toast.error("Passwords must match");
      }
    } else {
      toast.error("Please agree to terms and conditions first");
    }
  };

  return (
    <div>
      <h1>Sign Up here</h1>
      <Toaster position="top-right" />
      <Row style={{ marginRight: 0 }}>
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
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Full Name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
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

            <Form.Group className="mb-4">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPass}
                onChange={(event) => setConfirmPass(event.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3 justify-content-center"
              controlId="formBasicCheckbox"
            >
              <Row style={{ justifyContent: "center" }}>
                <Col style={{ flex: 0 }}>
                  <Form.Check
                    type="checkbox"
                    value={agreed}
                    onClick={(event) => setAgreed(!agreed)}
                  />
                </Col>
                <Col style={{ flex: 0.4 }}>Agree to Terms and Conditions</Col>
              </Row>
            </Form.Group>
            <Button variant="primary" onClick={signUp}>
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

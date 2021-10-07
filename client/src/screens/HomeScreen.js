import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Row, Col, Form, Button, Image, ListGroup } from "react-bootstrap";

import UserContext from "../context/UserContext";

export default function HomeScreen() {
  const [allReviews, setAllReviews] = useState([]);
  const [text, setText] = useState("");
  const [num, setNum] = useState(0);

  const { user } = useContext(UserContext);

  useEffect(() => {
    axios
      .get("/api/users/getAllReviews")
      .then((res) => {
        setAllReviews(res.data.allReviews);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [num]);

  const postReview = () => {
    axios
      .post(
        "/api/users/submitReview",
        {
          text,
        },
        {
          headers: {
            "x-auth-token": user,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          toast.success("Review Posted");
          setNum(num + 1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Toaster position="top-right" />
      <h1>Home</h1>
      <h5>Library Management System</h5>
      <p style={{ marginTop: 20, marginLeft: 60, marginRight: 60 }}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aut,
        repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit
        eaque?
      </p>
      {user && (
        <Row style={{ margin: 0, marginTop: 50 }}>
          <Col
            className="border"
            style={{ marginLeft: 20, marginRight: 40, borderRadius: 10 }}
          >
            <Form
              className="justify-content-center w-75"
              style={{ marginLeft: 55 }}
            >
              <h4 className="mt-3 mb-3">Leave a review</h4>
              <Form.Group className="mb-4 mt-3">
                <Form.Label className="mb-3 mt-3">Message</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter message"
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                />
              </Form.Group>

              <Button variant="primary" onClick={postReview}>
                Submit Review
              </Button>
            </Form>
          </Col>
          <Col
            className="border"
            style={{ marginLeft: 20, marginRight: 30, borderRadius: 10 }}
          >
            {/* <Col style={{ position: "fixed", bottom: 0, width: "100%" }}> */}
            <h4 className="mt-3 mb-3">Reviews</h4>
            <ListGroup
              style={{
                overflow: "hidden",
                overflowY: "scroll",
                height: 200,
                listStyleType: "none",
                marginBottom: 30,
              }}
            >
              {allReviews.map((item) => (
                <ListGroup.Item key={item._id}>
                  {item.text} - {item.user.fullName}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      )}
      {!user && (
        <Row style={{ margin: 0, marginTop: 50 }}>
          <Col
            className="border"
            style={{ marginLeft: 20, marginRight: 40, borderRadius: 10 }}
          >
            <h4 className="mt-3 mb-3">Login to submit a review</h4>
            <Image src="login.jpg" height={200} width={200} roundedCircle />
          </Col>
          <Col
            className="border"
            style={{ marginLeft: 20, marginRight: 30, borderRadius: 10 }}
          >
            <h4 className="mt-3 mb-3">Reviews</h4>
            <ListGroup
              style={{
                overflow: "hidden",
                overflowY: "scroll",
                height: 200,
                listStyleType: "none",
                marginBottom: 30,
              }}
            >
              {allReviews.map((item) => (
                <ListGroup.Item key={item._id}>
                  {item.text} - {item.user.fullName}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      )}
    </div>
  );
}

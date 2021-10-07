import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Col, Row, Accordion } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import axios from "axios";

import UserContext from "../context/UserContext";

export default function StudentDashboard() {
  const [book, setBook] = useState("");
  const [allBooks, setAllBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [myBooks, setMyBooks] = useState([]);
  const [num, setNum] = useState(0);
  const [fine, setFine] = useState(0);

  const history = useHistory();

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user === null) {
      history.push("/login");
    } else {
      axios
        .get("/api/books/findAllAvailableBooks", {
          headers: {
            "x-auth-token": user,
          },
        })
        .then((res) => {
          setAllBooks(res.data.allBooks);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get("/api/users/getUserDetails", {
          headers: {
            "x-auth-token": user,
          },
        })
        .then((res) => {
          setMyBooks(res.data.myBooks);
          setFine(res.data.fineAmt);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user, history, num]);

  const borrowBook = () => {
    axios
      .post(
        "/api/books/borrowBook",
        {
          id: book,
        },
        {
          headers: {
            "x-auth-token": user,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          toast.success("Book borrowed");
          setNum(num + 1);
        } else {
          toast.error("Some error occoured");
        }
      })
      .catch((err) => {
        toast.error("Some error occoured");
        console.log(err);
      });
  };

  const requestBook = () => {
    axios
      .post(
        "/api/books/requestBook",
        {
          title,
          author,
        },
        {
          headers: {
            "x-auth-token": user,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          toast.success("Request Made");
        } else {
          toast.error("Some error occoured");
        }
      })
      .catch((err) => {
        toast.error("Some error occoured");
        console.log(err);
      });
  };

  return (
    <div>
      <h1 className="mt-3 mb-2">Student Dashboard</h1>
      <Toaster position="top-right" />
      <Row style={{ margin: 0 }}>
        <Col style={{ flex: 0.2 }}></Col>
        <Col style={{ borderRadius: 10 }} className="border border-secondary">
          <h5 className="mt-4">Borrow book</h5>
          <Form className="justify-content-center w-100 mt-5">
            <Form.Select
              value={book}
              onChange={(event) => setBook(event.target.value)}
              aria-label="Default select example"
              className="mb-4"
            >
              <option value={0}>Select an option</option>
              {allBooks.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.title} - {item.author}
                </option>
              ))}
            </Form.Select>

            <Button variant="outline-primary mb-4 mt-2" onClick={borrowBook}>
              Borrow Book
            </Button>
          </Form>
        </Col>
        <Col style={{ flex: 0.2 }}></Col>
        <Col style={{ borderRadius: 10 }} className="border border-secondary">
          <h5 className="mt-4">Request Book</h5>
          <Form className="justify-content-center w-100 mt-3">
            <Form.Group className="mb-4">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Author"
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
              />
            </Form.Group>

            <Button variant="outline-primary mb-4" onClick={requestBook}>
              Request Book
            </Button>
          </Form>
        </Col>
        <Col style={{ flex: 0.2 }}></Col>
      </Row>
      <Row style={{ margin: 0 }} className="mt-3 mb-5">
        <Col style={{ flex: 0.1, padding: 6 }}></Col>
        <Col style={{ borderRadius: 10 }} className="border border-secondary">
          <Row>
            <Col>
              <h5 className="mt-3">Books currently with you</h5>
            </Col>
            <Col>
              <h6 className="mt-4">Current fine: {fine}</h6>
            </Col>
          </Row>
          {myBooks.length !== 0 ? (
            <Accordion className="mb-4">
              {myBooks.map((item) => (
                <Accordion.Item eventKey={item.bookId.title}>
                  <Accordion.Header>{item.bookId.title}</Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col className="mb-0">{item.bookId.author}</Col>
                      <Col className="mb-0">
                        Due on: {item.bookId.returnOn.substring(0, 10)}
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          ) : (
            <h4 className="mb-3">No books borrowed</h4>
          )}
        </Col>
        <Col style={{ flex: 0.1, padding: 6 }} className="mt-2"></Col>
      </Row>
    </div>
  );
}

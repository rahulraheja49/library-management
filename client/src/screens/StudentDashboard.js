import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
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
  const [returnBook, setReturnBook] = useState("");

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
        .get("/api/users/getBorrowedBooks", {
          headers: {
            "x-auth-token": user,
          },
        })
        .then((res) => {
          setMyBooks(res.data.myBooks);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

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
        } else {
          toast.error("Some error occoured");
        }
      })
      .catch((err) => {
        toast.error("Some error occoured");
        console.log(err);
      });
  };

  const requestBook = () => {};

  const bookReturn = () => {};

  return (
    <div>
      <h1 className="mt-3 mb-2">Student Dashboard</h1>
      <Toaster position="top-right" />
      <Row style={{ margin: 0 }}>
        <Col style={{ flex: 0.2 }}></Col>
        <Col className="border border-dark">
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
        <Col className="border border-dark">
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
              Log In
            </Button>
          </Form>
        </Col>
        <Col style={{ flex: 0.2 }}></Col>
      </Row>
      <Row style={{ margin: 0 }} className="mt-3">
        <Col style={{ flex: 0.1, padding: 6 }}></Col>
        <Col className="border border-dark">
          <h5 className="mt-4">Return book</h5>
          <Form className="justify-content-center w-100 mt-5">
            <Form.Select
              value={returnBook}
              onChange={(event) => setReturnBook(event.target.value)}
              aria-label="Default select example"
              className="mb-4"
            >
              <option value={0}>Select an option</option>
              {myBooks.map((item) => (
                <option key={item.bookId._id} value={item.bookId._id}>
                  {item.bookId.title} - {item.bookId.author}
                </option>
              ))}
            </Form.Select>

            <Button variant="outline-primary mb-4 mt-2" onClick={bookReturn}>
              Return Book
            </Button>
          </Form>
        </Col>
        <Col style={{ flex: 0.1, padding: 6 }} className="mt-2"></Col>
      </Row>
    </div>
  );
}

import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import axios from "axios";

import AdminContext from "../context/AdminContext";

export default function StudentDashboard() {
  const [book, setBook] = useState("");
  const [allBooks, setAllBooks] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allRequests, setAllRequests] = useState([]);
  const [borrBooksList, setBorrBooksList] = useState([]);
  const [returnBook, setReturnBook] = useState("");
  const [currUser, setCurrUser] = useState("");
  const [returnUser, setReturnUser] = useState("");
  const [num, setNum] = useState(0);

  const history = useHistory();

  const { admin } = useContext(AdminContext);

  useEffect(() => {
    if (admin === null) {
      history.push("/admin-login");
    } else {
      axios
        .get("/api/admins/findAllAvailableBooksAndUsersAndRequests", {
          headers: {
            "x-auth-token": admin,
          },
        })
        .then((res) => {
          setAllBooks(res.data.allBooks);
          setAllUsers(res.data.allUsers);
          setAllRequests(res.data.allRequests);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get("/api/admins/getBorrowedBooksList", {
          headers: {
            "x-auth-token": admin,
          },
        })
        .then((res) => {
          setBorrBooksList(res.data.borrBooks);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [admin, history, num]);

  const borrowBook = () => {
    axios
      .post(
        "/api/admins/borrowBook",
        {
          id: book,
          user: currUser,
        },
        {
          headers: {
            "x-auth-token": admin,
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

  const bookReturn = () => {
    if (returnBook !== "") {
      axios
        .post(
          "/api/admins/returnBook",
          {
            id: returnBook,
            user: returnUser,
          },
          {
            headers: {
              "x-auth-token": admin,
            },
          }
        )
        .then((res) => {
          console.log(res);
          toast.success("Book returned");
          setNum(num + 1);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Some error occoured");
        });
    } else {
      toast.error("Please select a book first");
    }
  };

  return (
    <div>
      <h1 className="mt-3 mb-2">Admin Dashboard</h1>
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
            <Form.Select
              value={currUser}
              onChange={(event) => setCurrUser(event.target.value)}
              aria-label="Default select example"
              className="mb-4"
            >
              <option value={0}>Select an option</option>
              {allUsers.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.email}
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
          <h5 className="mt-4">Requested Books</h5>
          <ul>
            {allRequests.map((item) => (
              <li
                key={item._id}
                style={{ overflow: "hidden", overflowY: "scroll", height: 250 }}
              >
                {item.title} - {item.author}
              </li>
            ))}
          </ul>
        </Col>
        <Col style={{ flex: 0.2 }}></Col>
      </Row>
      <Row style={{ margin: 0 }} className="mt-3">
        <Col style={{ flex: 0.1, padding: 6 }}></Col>
        <Col style={{ borderRadius: 10 }} className="border border-secondary">
          <h5 className="mt-4">Return book</h5>
          <Form className="justify-content-center w-100 mt-5">
            <Form.Select
              value={returnBook}
              onChange={(event) => {
                setReturnBook(event.target.value._id);
                setReturnUser(event.target.value.borrowedBy);
              }}
              aria-label="Default select example"
              className="mb-4"
            >
              <option value={0}>Select an option</option>
              {borrBooksList.map((item) => (
                <option key={item._id} value={item}>
                  {item.title} - {item.author} | Borrowed by: {item.borrowedBy}
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

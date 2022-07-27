import React, { useState, useEffect, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

import AdminContext from "../context/AdminContext";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const history = useHistory();
  const { admin } = useContext(AdminContext);

  useEffect(() => {
    if (admin === null) history.push("/admin-login");
  }, [admin, history]);

  const addNewBook = () => {
    axios
      .post(
        "/api/books/addBook",
        {
          title,
          author,
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
          toast.success("Book added");
          history.push("/admin-dashboard");
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
      <h1>Add Book</h1>

      <Form className="justify-content-center w-100 mt-5">
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
        <Button variant="outline-primary mb-4 mt-2" onClick={addNewBook}>
          Add Book
        </Button>
      </Form>
    </div>
  );
};

export default AddBook;

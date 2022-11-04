import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style/App.scss";
import { addPost, deletePost, fetchPosts } from "./slices/PostsSlice";

import { CloseButton, Button, Modal, Form } from "react-bootstrap";

function AddPostWindow(props: any) {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const [buttonColor, setButtonColor] = useState<string>("primary")

  const dispatch = useDispatch();

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Body</Form.Label>
            <Form.Control
              placeholder="Body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            if (title && body) {
              dispatch(addPost({ title: title, body: body }));
              setTitle("");
              setBody("");
              setButtonColor("primary")
            } else {
              setButtonColor("danger")
            }
          }}
          variant={buttonColor}
        >
          Add post
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function App() {
  const posts = useSelector((state: any) => state.posts.posts);
  const error = useSelector((state: any) => state.posts.error);

  const [modalShow, setModalShow] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  if (error === "error") {
    dispatch(fetchPosts());
  }

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setModalShow(true)}
        className="addButton"
      >
        +
      </Button>
      {posts.map((post: any, i: number) => {
        return (
          <div key={Math.random()}>
            <div className="post">
              <div className="post__id">{i + 1}</div>
              <div className="post__mainpart">
                <CloseButton
                  onClick={() => {
                    dispatch(deletePost(i));
                  }}
                  className="post__mainpart-deleteButton"
                />
                <div className="post__mainpart-title">{post.title}</div> <br />
                <div className="post__mainpart-body">{post.body}</div>
              </div>
            </div>
          </div>
        );
      })}
      <AddPostWindow show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

export default App;
function dispatch(arg0: { payload: any; type: string }) {
  throw new Error("Function not implemented.");
}

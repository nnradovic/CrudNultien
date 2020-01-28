import React, { useState, Fragment } from "react";
import { useDispatch } from "react-redux";
//api
import { deleteApi, fetchSingleApi, updateApi } from "../../../api/fetch_api";
//components
import ToastDrop from "../../../utils/Toast/Toast";
import ModalBlog from "../../Modal/Modal";
import styles from "./comment.module.sass";
//modules
import { Card, CardText, CardBody, CardTitle, Col, Button } from "reactstrap";
//helpers
import moment from "moment";
import PropTypes from "prop-types";

const Comment = props => {
  const {
    comment: { title, createdAt, text, id }
  } = props;
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("delete");
  const [comment, setComment] = useState(0);
  const [modal, setModal] = useState(false);

  //Delete blog
  const blogDelete = () => {
    deleteApi("Comment", "delete", id)
      .then(res => {
        dispatch({ type: "DELETE_COMMENT", payload: id });
      })
      .catch(err => {
        setError(true);
      });
  };

  //Get single blog
  const toggle = () => {
    setModal(!modal);
    fetchSingleApi("Comment", "get", id)
      .then(res => {
        setComment(res.data.resultData);
      })
      .catch(err => {
        setError(true);
      });
  };
  //dispatch data to modal
  const addEdit = {
    type: "UPDATE_COMMENT",
    isEdit: true,
    callback: values => updateApi("Comment", "put", values, id)
  };

  const errorToast = () => {
    setMsg("updated");
    setError(true);
  };

  return (
    <Fragment>
      {error ? <ToastDrop msg={msg} /> : null}
      <Card className={styles.comment}>
        <CardBody>
          <CardTitle className={styles.title}>{title}</CardTitle>
          <CardTitle className={styles.time}>
            Posted date: {moment(createdAt).format("DD MM YYYY")} at{" "}
            {moment(createdAt).format("HH:mm")} by some Person
          </CardTitle>
          <CardText className={styles.cardtext}>{text}</CardText>
          <Col md={{ offset: 9, size: 3 }} className={styles.btn}>
            <Button href="#" onClick={toggle} id="edit-test">
              Edit
            </Button>
            <Button href="#" onClick={blogDelete}>
              Delete
            </Button>
          </Col>
        </CardBody>

        <ModalBlog
          addEdit={addEdit}
          comment={comment}
          id={id}
          modal={modal}
          toggle={toggle}
          errorToast={errorToast}
        />
      </Card>
    </Fragment>
  );
};

Comment.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      createdAt: PropTypes.number.isRequired
    })
  )
};

export default Comment;

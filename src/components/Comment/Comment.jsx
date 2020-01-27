import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Card, CardText, CardBody, CardTitle, Col, Button } from "reactstrap";
import styles from "./comment.module.sass";
import moment from "moment";
import { deleteApi, fetchSingleApi, updateApi } from "../../api/fetch_api";
import ModalBlog from "../Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import ToastDrop from "../../utils/Toast/Toast";

const Comment = props => {
  console.log(props);

  const {
    comment: { title, createdAt, text, id }
  } = props;
  const dispatch = useDispatch();
  const [error, setError] = useState(false)
  const [msg, setMsg] = useState("delete")
  const { comments } = useSelector(state => state.comments);
  const [comment, setComment] = useState(0);
  const [modal, setModal] = useState(false);

  //Delete blog
  const blogDelete = () => {

    let del = comments.filter(comment => {
      return comment.id !== props.comment.id;
    });
    try {
      deleteApi("Comment", "delete", id)
      dispatch({ type: "DELETE_COMMENT", payload: del })
    } catch (e) {
      setError(true)
    }
  };

  //Get single blog
  const toggle = () => {
    setModal(!modal);
    fetchSingleApi("Comment", "get", id).then(res => {
      setComment(res.data.resultData);
    });
  };
  const addEdit = () => {
    return {
      type: "UPDATE_COMMENT",
      method: "put",
      resource: "Comment",
      fetch: updateApi,
      isEdit: true,
      id: props.id
    };
  };
  const errorToast = () => {
    setMsg('updated')
    setError(true)

  }

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
            <Button href="#" onClick={toggle}>
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


  )
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

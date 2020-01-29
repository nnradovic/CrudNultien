import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
//api
import { fetchApi } from "../../api/fetch_api";
//components
import Comment from "./Comment/Comment";
import ModalBlog from "../Modal/Modal";
import Loader from "../../assets/Loader";
import ToastDrop from "../../utils/Toast/Toast";
//modules
import { Button, Row, Col, Alert } from "reactstrap";
import styles from "./commentlist.module.sass";
//helpers
import PropTypes from "prop-types";

function CommentList() {
  const dispatch = useDispatch();
  const { comments } = useSelector(state => state.comments);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("laoded");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  //Load blogs
  useEffect(() => {
    fetchApi("Comment", "get")
      .then(res => {
        dispatch({ type: "LOAD_COMMENT", payload: res.data.resultData });
      })
      .catch(err => {
        setError(true);
      });
  }, [dispatch]);

  const renderBlogs = () => {
    return !!comments && !error ? (
      comments.map((comment, key) => {
        return <Comment key={key} comment={comment} />;
      })
    ) : !error ? (
      <Loader />
    ) : error ? (
      <ToastDrop msg={msg} />
    ) : null;
  };

  const renderButton = () => {
    return !!comments ? (
      <Button
        id="toggle-theme-btn"
        onClick={toggle}
        className={`${styles.addbutton} float-right`}
      >
        Add Comment
      </Button>
    ) : null;
  };
  //dispatch data to modal
  const addEdit = {
    type: "ADD_COMMENT",
    isEdit: false,
    callback: values => fetchApi("Comment", "post", values)
  };

  const errorToast = () => {
    setMsg("updated");
    setError(true);
  };

  return (
    <Fragment>
      <Row>
        <Col md={{ offset: 2, size: 8 }}>
          <Alert className={styles.alert}>
            Container for showing application message
          </Alert>
        </Col>
      </Row>
      <div className={styles.container}>
        <Row>
          <Col>{renderButton()}</Col>
        </Row>
        <Row>
          <Col>{renderBlogs()} </Col>
        </Row>
      </div>
      <ModalBlog
        addEdit={addEdit}
        modal={modal}
        toggle={toggle}
        errorToast={errorToast}
      />
    </Fragment>
  );
}
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
export default CommentList;

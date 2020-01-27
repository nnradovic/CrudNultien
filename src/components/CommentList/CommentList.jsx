import React, { useEffect, useState, Fragment } from "react";
import { Button, Row, Col, Alert } from "reactstrap";
import { fetchApi } from "../../api/fetch_api";
import Comment from "../Comment/Comment";
import styles from "./commentlist.module.sass";
import ModalBlog from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import uniqueId from "../../utils/uniqueId";
import Loader from "../../assets/Loader";
import ToastDrop from "../../utils/Toast/Toast";

function CommentList(props) {
  const dispatch = useDispatch();
  const { comments } = useSelector(state => state.comments);
  const [error, setError] = useState(false)
  const [msg, setMsg] = useState("laoded")
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  //Load blogs
  useEffect(() => {
    try {
      fetchApi("Comment", "get").then(res => {
        dispatch({ type: "LOAD_COMMENT", payload: res.data.resultData });
      });
    } catch (e) {
      setError(true)
    }
  }, [dispatch]);

  const renderBlogs = () => {
    return (!!comments && !error) ? (
      comments.map((comment, key) => {
        return (
          <Comment key={key} comment={comment} />

        )
      })
    ) : (
        !error ? <Loader /> : error ? <ToastDrop msg={msg} /> : null
      );
  };
  const renderButton = () => {
    return !!comments ?

      <Button
        id="toggle-theme-btn"
        onClick={toggle}
        className={`${styles.addbutton} float-right`}
      >
        Add Comment
        </Button>
      : (
        null
      );
  };

  const addEdit = () => {
    return {
      type: "ADD_COMMENT",
      method: "post",
      resource: "Comment",
      fetch: fetchApi,
      isEdit: false,
      id: uniqueId(comments)
    };
  };

  const errorToast = () => {
    setMsg('added')
    setError(true)

  }


  return (
    <Fragment>

      <Row>
        <Col md={{ offset: 2, size: 8 }}>
          <Alert className={styles.alert}>
            Container for showin application message
          </Alert>
        </Col>
      </Row>
      <div className={styles.container}>
        <Row>
          <Col>
            {renderButton()}
          </Col>
        </Row>
        <Row>
          <Col>{renderBlogs()} </Col>
        </Row>
      </div>
      <ModalBlog addEdit={addEdit} modal={modal} toggle={toggle} errorToast={errorToast} />
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

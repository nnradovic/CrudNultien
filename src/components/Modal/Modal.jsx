import React, { Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import styles from "./modal.module.sass";
import uniqueId from "../../utils/uniqueId";

const ModalComment = props => {
  const { className, modal, toggle, comment, addEdit, errorToast } = props;
  const { comments } = useSelector(state => state.comments);
  let createdAt = new Date().getTime();
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm();
  const onSubmit = values => {
    try {
      addEdit().fetch(
        addEdit().resource,
        addEdit().method,
        values,
        addEdit().isEdit ? props.id : uniqueId(comments),
        createdAt
      );
      dispatch({
        type: addEdit().type,
        payload: {
          ...values,
          id: addEdit().isEdit ? props.id : uniqueId(comments),
          createdAt
        }
      });
      toggle()
    } catch (e) {
      errorToast()
      toggle()
    }
  };
  return (
    <Fragment>

      <Modal
        size="lg"
        id="header"
        centered
        isOpen={modal}
        toggle={toggle}
        className={className}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader toggle={toggle}>{"Add/Edit"} comment</ModalHeader>
          <ModalBody>
            <input
              className="form-control"
              placeholder="Title of the comment"
              name="title"
              defaultValue={!!comment ? comment.title : null}
              ref={register({
                required: "Required"
              })}
            />
          </ModalBody>
          <ModalBody>
            <textarea
              className="form-control"
              placeholder="Text of the comment"
              rows={5}
              name="text"
              defaultValue={!!comment ? comment.text : null}
              ref={register({
                required: "Required"
              })}
            />
          </ModalBody>
          <ModalFooter className={styles.footer}>
            <Button color="primary" type="submit">
              Post
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </Fragment>

  );
};

export default ModalComment;

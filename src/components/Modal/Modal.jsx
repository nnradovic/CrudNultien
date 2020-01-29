import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
//components
import styles from "./modal.module.sass";
//modules
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
//helpers
import uniqueId from "../../utils/uniqueId";

const ModalComment = props => {
  const { className, modal, toggle, comment, addEdit, errorToast, id } = props;
  const { comments } = useSelector(state => state.comments);
  let createdAt = new Date().getTime();
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm();

  const onSubmit = values => {
    //add or edit comment
    addEdit
      .callback(values)
      .then(res => {
        dispatch({
          type: addEdit.type,
          payload: {
            ...values,
            id: addEdit.isEdit ? id : uniqueId(comments),
            createdAt
          }
        });
        toggle();
      })
      .catch(err => {
        errorToast();
        toggle();
      });
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

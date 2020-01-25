import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useForm } from "react-hook-form";
import { fetchApi, updateApi } from '../../api/fetch_api'
import { useSelector, useDispatch, connect } from "react-redux"
import styles from './modal.module.sass'
const ModalComment = (props) => {
    const {
        className,
        modal,
        toggle,
        unmountOnClose,
        isEdit,
        id,
        comment
    } = props;

    let commentsLists = useSelector((state) => state.comments)
    let createdAt = new Date().getTime()
    const dispatch = useDispatch()
    const { handleSubmit, register } = useForm();

    const onSubmit = (values, e) => {
        if (isEdit) {
            updateApi("Comment", 'put', values, id)
            dispatch({ type: "UPDATE_COMMENT", payload: Object.assign({}, values, { id: id, updatedAt: createdAt }) })
            toggle(e)
            e.preventDefault()
        } else {
            let idExsistArray = []
            commentsLists.map(blogSingle => {
                return idExsistArray.push(blogSingle.id)
            })
            let idNew = () => {
                if (idExsistArray.length !== 0) {
                    return Math.max(...idExsistArray) + 1
                } else {
                    return 1
                }
            }
            let val = Object.assign(values, { id: idNew(), createdAt: createdAt })
            dispatch({ type: "ADD_COMMENT", payload: val })
            fetchApi("Comment", 'post', val)
            toggle()


        }

    }
    return (
        <React.Fragment>

            <Modal size="lg"
                centered isOpen={modal} toggle={toggle} className={className} unmountOnClose={unmountOnClose}>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <ModalHeader toggle={toggle}>{isEdit ? 'Edit' : 'Add'} comment</ModalHeader>
                    <ModalBody>
                        <input className="form-control" placeholder="Title of the comment" name="title" defaultValue={!!comment ? comment.title : null}
                            ref={register({
                                required: 'Required'
                            })} />
                    </ModalBody>
                    <ModalBody>
                        <textarea className="form-control" placeholder="Text of the comment" rows={5} name="text" defaultValue={!!comment ? comment.text : null}
                            ref={register({
                                required: 'Required'
                            })} />
                    </ModalBody>
                    <ModalFooter className={styles.footer}>
                        <Button color="primary" type="submit" >Post</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </form>
            </Modal>




        </React.Fragment >
    );
}

export default connect()(ModalComment);
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useForm } from "react-hook-form";
import { fetchApi, updateApi } from '../../api/fetch_api'
import { useSelector, useDispatch, connect } from "react-redux"
const ModalBlog = (props) => {
    const {
        className,
        modal,
        toggle,
        unmountOnClose,
        blog,
        isEdit,
        id,
        comment,

    } = props;
    let blogLists = useSelector((state) => state.blog)
    const dispatch = useDispatch()
    const { handleSubmit, register } = useForm();



    const onSubmit = (values, e, props) => {
        console.log(props)
        if (isEdit) {
            updateApi("BlogPosts", 'put', values, id)
            dispatch({ type: "UPDATE_BLOG", payload: Object.assign({}, values, { id: id }) })
            toggle(e)
            e.preventDefault()
        } else {
            let idExsistArray = []
            blogLists.map(blogSingle => {
                return idExsistArray.push(blogSingle.id)
            })
            let idNew = () => {
                if (idExsistArray.length !== 0) {
                    return Math.max(...idExsistArray) + 1
                } else {
                    return 1
                }
            }
            let val = Object.assign(values, { id: idNew() })
            dispatch({ type: "ADD_BLOG", payload: val })
            fetchApi("BlogPosts", 'post', val)
            toggle()


        }

    }
    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} className={className} unmountOnClose={unmountOnClose}>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <ModalHeader toggle={toggle}>{isEdit ? 'Edit' : 'Add'} blog post</ModalHeader>
                    <ModalBody>
                        <input placeholder="Title of the post" name="title" defaultValue={comment ? !!comment ? comment.title : null : !!blog ? blog.title : null}
                            ref={register({
                                required: 'Required'
                            })} />
                    </ModalBody>
                    <ModalBody>
                        <input type="textarea" placeholder="Text of the post" rows={30} name="text" defaultValue={comment ? !!comment ? comment.text : null : !!blog ? blog.text : null}
                            ref={register({
                                required: 'Required'
                            })} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit" >Post</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </form>
            </Modal>
        </div>
    );
}

export default connect()(ModalBlog);
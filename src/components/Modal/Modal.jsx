import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup } from 'reactstrap';
import { useForm } from "react-hook-form";
import { fetchApi, updateApi } from '../../api/fetch_api'
import { useHistory } from "react-router-dom";
const ModalBlog = (props) => {
    const {
        buttonLabel,
        className,
        modal,
        toggle,
        unmountOnClose,
        blog,
        isEdit
    } = props;
    const { handleSubmit, register } = useForm();
    const onSubmit = values => {
        isEdit ? updateApi('BlogPosts', 'put', values, blog.id) : fetchApi('BlogPosts', 'post', values)
    };


    return (
        <div>

            <Modal isOpen={modal} toggle={toggle} className={className} unmountOnClose={unmountOnClose}>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <ModalHeader toggle={toggle}>Add/Edit plog post</ModalHeader>
                    <ModalBody>
                        <input placeholder="Title of the post" name="title" defaultValue={!!blog ? blog.title : null}
                            ref={register({
                                required: 'Required'
                            })} />
                    </ModalBody>
                    <ModalBody>
                        <input type="textarea" placeholder="Text of the post" rows={30} name="text" defaultValue={!!blog ? blog.text : null}
                            ref={register({
                                required: 'Required'
                            })} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit" onClick={toggle}>Post</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>

                </form>
            </Modal>


        </div>
    );
}

export default ModalBlog;
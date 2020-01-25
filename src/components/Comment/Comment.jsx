import React, { useState } from 'react';
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Row, Col, Button
} from 'reactstrap';
import styles from './comment.module.sass'
import moment from 'moment';
import { deleteApi, fetchSingleApi } from '../../api/fetch_api'
import ModalBlog from '../Modal/Modal'
import { useSelector, useDispatch, connect } from "react-redux"


const Blog = (props) => {

    const { comment: { title, createdAt, text, id } } = props
    const dispatch = useDispatch()
    const commnetsLists = useSelector((state) => state.comments)
    const [comment, setComment] = useState(0);
    const [modal, setModal] = useState(false);
    const [unmountOnClose, setUnmountOnClose] = useState(true)


    //Delete blog
    function blogDelete(e, id) {

        e.stopPropagation()
        let del = commnetsLists.filter(comment => {
            return (
                comment.id !== props.comment.id
            )
        })
        return (
            deleteApi("Comment", 'delete', id),
            dispatch({ type: "DELETE_COMMENT", payload: del })
        )

    }
    //Get single blog
    const toggle = (e) => {
        e.preventDefault()
        setModal(!modal)
        fetchSingleApi("Comment", 'get', id).then(res => {
            setComment(res.data.resultData)
        })
    };

    const changeUnmountOnClose = e => {
        let value = e.target.value;
        setUnmountOnClose(JSON.parse(value));
    }

    return (

        <Card className={styles.comment}>
            <CardBody>
                <CardTitle className={styles.title}>{title}</CardTitle>
                <CardTitle className={styles.time}>Posted date: {moment(createdAt).format('DD MM YYYY')} at {moment(createdAt).format('HH:mm')} by some Person</CardTitle>
                <CardText className={styles.cardtext}>{text}</CardText>
                <Col md={{ offset: 9, size: 3 }} className={styles.btn}>
                    <Button href="#" onClick={(e) => toggle(e)}>Edit</Button>
                    <Button href="#" onClick={(e) => blogDelete(e, id)} >Delete</Button>
                </Col>
            </CardBody>

            <ModalBlog comment={comment} id={id} isEdit={true} modal={modal} toggle={(e) => toggle(e)} changeUnmountOnClose={changeUnmountOnClose} unmountOnClose={unmountOnClose} />
        </Card>
    );
};

export default connect()(Blog);
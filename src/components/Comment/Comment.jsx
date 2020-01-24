import React, { useState } from 'react';
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Row, Col, Button
} from 'reactstrap';
import styles from './comment.module.sass'
import moment from 'moment';
import { deleteApi, fetchSingleApi } from '../../api/fetch_api'
import { withRouter } from 'react-router-dom';
import ModalComment from '../Modal/ModalComment'
import { useSelector, useDispatch, connect } from "react-redux"


const Comment = (props) => {

    const { data: { title, createdAt, text, id } } = props
    const [blog, setBlog] = useState(0);
    const dispatch = useDispatch()
    const commentLists = useSelector((state) => state.comment)
    const [modal, setModal] = useState(false);
    const [unmountOnClose, setUnmountOnClose] = useState(true)


    //Delete comment
    function blogDelete(e, id) {
        e.stopPropagation()
        let del = commentLists.filter(bl => {
            return (
                bl.id !== props.data.id
            )
        })
        return (
            deleteApi("Comment", 'delete', id),
            dispatch({ type: "DELETE_COMMENT", payload: del })
        )
    }
    //Get single commeent
    const toggle = (e) => {
        e.preventDefault()
        setModal(!modal)
        fetchSingleApi("Comment", 'get', id).then(res => {
            setBlog(res.data.resultData)
        })
    };

    const changeUnmountOnClose = e => {
        let value = e.target.value;
        setUnmountOnClose(JSON.parse(value));
    }

    return (

        <Card className={styles.blog}>
            <CardBody>
            </CardBody>
            <Row>
                <Col md={2} className={styles.blogimage}>
                    <img src="https://via.placeholder.com/80" aria-hidden alt="Picture of me taking a photo of an image" />
                </Col>
                <Col md={7} className={styles.title}>
                    <CardTitle>{title}</CardTitle>
                    <CardSubtitle className={styles.time}>Posted date: {moment(createdAt).format('DD MM YYYY')} at {moment(createdAt).format('HH:mm')} by some Person</CardSubtitle>

                </Col>
                <Col md={3}>
                    <Button href="#" onClick={(e) => toggle(e)}>Edit</Button>
                    <Button href="#" onClick={(e) => blogDelete(e, id)} >Delete</Button>
                </Col>
            </Row>
            <CardBody className={styles.cardtext}>
                <CardText>{text}</CardText>
            </CardBody>
            <Row className={styles.images}>
                <Col md={{ size: 6, offset: 3 }}>
                    <img src="https://via.placeholder.com/100" aria-hidden alt="Picture of me taking a photo of an image" />
                    <img src="https://via.placeholder.com/100" aria-hidden alt="Picture of me taking a photo of an image" />
                    <img src="https://via.placeholder.com/100" aria-hidden alt="Picture of me taking a photo of an image" />
                </Col>
            </Row>
            <ModalComment id={id} isEdit={true} blog={blog} modal={modal} toggle={(e) => toggle(e)} changeUnmountOnClose={changeUnmountOnClose} unmountOnClose={unmountOnClose} />
        </Card>
    );
};

export default connect()(withRouter(Comment));
import React, { useState } from 'react';
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Row, Col, Button
} from 'reactstrap';
import styles from './blog.module.sass'
import moment from 'moment';
import { deleteApi, fetchSingleApi } from '../../api/fetch_api'
import { withRouter } from 'react-router-dom';
import ModalBlog from '../Modal/Modal'
import { useSelector, useDispatch, connect } from "react-redux"


const Blog = (props) => {

    const { blog: { title, createdAt, text, id } } = props
    const [blog, setBlog] = useState(0);
    const dispatch = useDispatch()
    const blogLists = useSelector((state) => state.blog)
    const [modal, setModal] = useState(false);
    const [unmountOnClose, setUnmountOnClose] = useState(true)

    //Delete blog
    function blogDelete(id) {
        let del = blogLists.filter(bl => {
            return (
                bl.id !== props.blog.id
            )
        })
        return (
            deleteApi('BlogPosts', 'delete', id),
            dispatch({ type: "DELETE_BLOG", payload: del })
        )
    }
    //Get single post
    const toggle = () => {
        setModal(!modal)
        fetchSingleApi('BlogPosts', 'get', id).then(res => {
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
                    <Button href="#" onClick={() => toggle()}>Edit</Button>
                    <Button href="#" onClick={() => blogDelete(id)} >Delete</Button>
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
            <ModalBlog id={id} isEdit={true} blog={blog} modal={modal} toggle={toggle} changeUnmountOnClose={changeUnmountOnClose} unmountOnClose={unmountOnClose} />
        </Card>
    );
};

export default connect()(withRouter(Blog));
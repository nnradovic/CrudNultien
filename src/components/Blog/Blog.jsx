import React, { useState } from 'react';
import {
    Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle, Container, Row, Col, Button
} from 'reactstrap';
import Holder from 'holderjs';
import styles from './blog.module.sass'
import moment from 'moment';
import Modal from '../Modal/Modal'
import { deleteApi, updateApi, fetchSingleApi, fetchApi } from '../../api/fetch_api'
import { Link, withRouter } from 'react-router-dom';
import CommentList from '../CommentList/CommentList'
import ModalBlog from '../Modal/Modal'
import { useSelector, useDispatch, connect } from "react-redux"


const Blog = (props) => {

    const { blog: { title, createdAt, text, id } } = props
    const [blog, setBlog] = useState(0);
    const blogLists = useSelector((state) => state.blog)
    const dispatch = useDispatch()


    function blogDelete(id) {
        let del = blogLists.filter(bl => {
            return (
                bl.id !== props.blog.id
            )
        })

        return (
            deleteApi('BlogPosts', 'delete', id),
            dispatch({ type: "DELETEBLOG", payload: del })
        )
    }


    const [modal, setModal] = useState(false);
    const [unmountOnClose, setUnmountOnClose] = useState(true);
    ;
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
                    <img src="https://via.placeholder.com/80" />

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
                    <img src="https://via.placeholder.com/100" />
                    <img src="https://via.placeholder.com/100" />
                    <img src="https://via.placeholder.com/100" />

                </Col>
            </Row>
            <ModalBlog id={id} isEdit={true} blog={blog} modal={modal} toggle={toggle} changeUnmountOnClose={changeUnmountOnClose} unmountOnClose={unmountOnClose} />
        </Card>
    );
};

export default connect()(withRouter(Blog));
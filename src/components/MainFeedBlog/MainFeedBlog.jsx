import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Nav, Button, Row, Col, Alert } from 'reactstrap';
import { Redirect, Route } from 'react-router';
import fetchApi from '../../api/fetch_api'
import Blog from '../Blog/Blog'
import styles from './mainfeedblog.module.sass'
function MainFeedBlog() {
    const [blogs, setBlogs] = useState(0);

    useEffect(() => {
        fetchApi('BlogPosts', 'get').then(res => {
            setBlogs(res.data.resultData)
        })
    }, []);

    function renderBlogs() {
        return (
            !!blogs ? (blogs.map((blog, key) => {
                return <Blog key={key} blog={blog} />
            })) : <p>...Loading</p>
        )


    }

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Button className={`${styles.addbutton} float-right`}>Add Post</Button>
                </Col>
            </Row>
            {renderBlogs()}
        </React.Fragment>
    );
}

export default MainFeedBlog;
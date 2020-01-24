import React, { useEffect, useState } from 'react';
import { Button, Row, Col } from 'reactstrap';
import { fetchApi } from '../../api/fetch_api'
import Blog from '../Blog/Blog'
import styles from './bloglist.module.sass'
import ModalBlog from '../Modal/ModalBlog'
import { useDispatch, connect } from "react-redux"
import { Link } from 'react-router-dom';

function BlogList(props) {

    const dispatch = useDispatch()
    const [modal, setModal] = useState(false);
    const [unmountOnClose, setUnmountOnClose] = useState(true);
    const toggle = () => setModal(!modal);
    const changeUnmountOnClose = e => {
        let value = e.target.value;
        setUnmountOnClose(JSON.parse(value));
    }


    //Load blogs
    useEffect(() => {
        fetchApi('BlogPosts', 'get').then(res => {
            dispatch({ type: "LOAD_BLOG", payload: res.data.resultData })
        })
    }, []);

    function renderBlogs() {
        return (
            !!props.blog ? (props.blog.map((blog, key) => {
                return <Link to={{ pathname: `/comments/${blog.id}` }}> <Blog key={key} data={blog} /></Link >
            })) : <p>...Loading</p>
        )
    }
    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Button onClick={() => toggle()} className={`${styles.addbutton} float-right`}>Add Post</Button>
                </Col>
            </Row>
            {renderBlogs()}
            <ModalBlog isEdit={false} modal={modal} toggle={toggle} changeUnmountOnClose={changeUnmountOnClose} unmountOnClose={unmountOnClose} />
        </React.Fragment>
    );
}


const mapStateToProps = state => {
    return {
        blog: state.blog
    }
}




export default connect(mapStateToProps)(BlogList);
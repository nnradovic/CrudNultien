import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Alert } from 'reactstrap';
import { fetchApi } from '../../api/fetch_api'
import Comment from '../Comment/Comment'
import styles from './commentlist.module.sass'
import ModalBlog from '../Modal/Modal'
import { useDispatch, connect } from "react-redux"

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
        fetchApi('Comment', 'get').then(res => {
            dispatch({ type: "LOAD_COMMENT", payload: res.data.resultData })
        })
    }, []);

    function renderBlogs() {
        return (
            !!props.comments ? (props.comments.map((comment, key) => {
                return <Comment key={key} comment={comment} />
            })) : <p>...Loading</p>
        )
    }
    return (
        <React.Fragment>
            <Row>
                <Col md={{ offset: 2, size: 8 }}>
                    <Alert className={styles.alert}>
                        Container for showin application message
                   </Alert>
                </Col>
            </Row>
            <div className={styles.container}>
                <Row>
                    <Col>
                        <Button onClick={() => toggle()} className={`${styles.addbutton} float-right`}>Add Comment</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {renderBlogs()}
                    </Col>
                </Row>
            </div>
            <ModalBlog isEdit={false} modal={modal} toggle={toggle} changeUnmountOnClose={changeUnmountOnClose} unmountOnClose={unmountOnClose} />
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        comments: state.comments
    }
}


export default connect(mapStateToProps)(BlogList);
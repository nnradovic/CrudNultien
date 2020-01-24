import React, { useEffect, useState } from 'react';
import { Button, Row, Col } from 'reactstrap';
import { fetchApi } from '../../api/fetch_api'
import Comment from '../Comment/Comment'
import styles from './commentlist.module.sass'
import ModalComment from '../Modal/ModalComment'
import { useDispatch, connect } from "react-redux"

function CommentList(props) {

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

    function renderBlogsComments() {
        return (
            !!props.comment ? (props.comment.map((com, key) => {
                return <Comment data={com} key={key} comment={true} />
            })) : <p>...Loading Comments</p>
        )
    }
    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Button onClick={() => toggle()} className={`${styles.addbutton} float-right`}>Add Post</Button>
                </Col>
            </Row>
            {renderBlogsComments()}
            <ModalComment isEdit={false} modal={modal} toggle={toggle} changeUnmountOnClose={changeUnmountOnClose} unmountOnClose={unmountOnClose} />
        </React.Fragment>
    );
}


const mapStateToProps = state => {
    return {
        comment: state.comment
    }
}


export default connect(mapStateToProps)(CommentList);
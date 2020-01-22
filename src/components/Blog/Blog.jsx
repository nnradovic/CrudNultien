import React from 'react';
import {
    Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle, Container, Row, Col, Button
} from 'reactstrap';
import Holder from 'holderjs';
import styles from './blog.module.sass'
import moment from 'moment';

const Example = (props) => {
    console.log(props);

    const { blog: { title, createdAt, text } } = props
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
                    <Button href="#">Edit</Button>
                    <Button href="#">Delete</Button>
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

        </Card>
    );
};

export default Example;
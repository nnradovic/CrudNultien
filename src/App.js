import React from 'react';
//Router
import { withRouter, Switch, Route } from 'react-router-dom';
//Components
import SideNavigation from './components/SideNavigation/SideNavigation'
import Header from './components/Header/Header'
import BlogList from './components/BlogList/BlogList'
//Modules
import { Container, Row, Col, Alert } from 'reactstrap'
import styles from './styles/global.module.sass'
import CommentList from './components/CommentList/CommentList';
function App() {
  return (

    <Container>
      <Row>
        <Col sm={12}>
          <Header />
        </Col>
      </Row>
      <Row>
        <Col md={{ offset: 3, size: 9 }}>
          <Alert className={styles.alert}>
            This is list of blog posts
              </Alert>
        </Col>
      </Row>
      <Row>
        <Col sm={3} className={styles.sidenav}>
          <SideNavigation />
        </Col>
        <Col sm={9}>
          <Switch>
            <Route exact path="/" component={BlogList} />
            <Route exact path="/comments/:id" component={CommentList} />
          </Switch>
        </Col>
      </Row>

    </Container>

  );
}

export default withRouter(App);

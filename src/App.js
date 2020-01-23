import React from 'react';
//Router
import { BrowserRouter as Router } from 'react-router-dom';
//Components
import SideNavigation from './components/SideNavigation/SideNavigation'
import Header from './components/Header/Header'
import MainFeedBlog from './components/MainFeedBlog/MainFeedBlog'
//Modules
import { Container, Row, Col, Alert } from 'reactstrap'
import styles from './styles/global.module.sass'
function App() {
  return (
    <Router >
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
            <MainFeedBlog />
          </Col>
        </Row>
      </Container>
    </Router>

  );
}

export default App;

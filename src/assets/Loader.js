import React from "react";
import { Row, Col, Spinner } from "reactstrap";

const Loader = () => (
  <Row className="justify-content-center align-items-center">
    <Col
      sm={12}
      style={{ fontSize: "2rem", color: "#4169e1" }}
      className="text-center"
      color="primary"
    >
      Loading...
    </Col>
    <Spinner
      style={{ width: "10rem", height: "10rem", color: "#4169e1" }}
      size="lg"
    />
  </Row>
);

export default Loader;

import React from "react";
import { Toast, ToastBody, ToastHeader, Row, Col } from "reactstrap";

const ToastDrop = props => {
  const { msg } = props
  return (
    <div>
      <div className="p-3 my-2 rounded bg-danger">
        <Row>
          <Col md={{ offset: 5, size: 2 }}>
            <Toast>
              <ToastHeader>Error</ToastHeader>
              <ToastBody>
                Comment not {msg}
              </ToastBody>
            </Toast>

          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ToastDrop;

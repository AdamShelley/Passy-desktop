import React, { useState } from "react";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { addSyntheticTrailingComment } from "typescript";

const AddPassword = ({ addPassword }) => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const onSubmitPassword = (e) => {
    console.log("Adding password");
    e.preventDefault();
    addPassword({ name, password: pass });

    setName("");
    setPass("");
  };

  return (
    <Card className="mt-5 mb-3">
      <Card.Body>
        <Form onSubmit={onSubmitPassword}>
          <Row className="my-3">
            <Col>
              <Form.Control
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                placeholder="Password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="my-3">
            <Col>
              <Button type="submit" variant="secondary">
                Save Password
              </Button>
              <Button variant="dark" className="mx-3" onClick={() => {}}>
                Generate Random Password
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddPassword;

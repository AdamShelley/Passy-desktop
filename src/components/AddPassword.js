import React, { useState } from "react";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import createPassword from "../utils/createPassword";

const AddPassword = ({ addPassword }) => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [special, setSpecial] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [length, setLength] = useState(20);

  const onSubmitPassword = (e) => {
    console.log("Adding password");
    e.preventDefault();
    addPassword({ name, password: pass });

    setName("");
    setPass("");

    console.log("password saved");
  };

  return (
    <Card className="mt-5 mb-3">
      <Card.Body>
        <Form onSubmit={onSubmitPassword}>
          <Form.Group>
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
          </Form.Group>
          <Row>
            <Form.Group>
              <Col xs={5}>
                <Form.Check
                  type="checkbox"
                  label="Special Characters"
                  checked={special}
                />
                <Form.Check
                  type="checkbox"
                  label="Include Numbers"
                  checked={numbers}
                />
                <Form.Label>Password Length</Form.Label>
                <Form.Control type="number" placeholder={length} />
              </Col>
            </Form.Group>
          </Row>
          <Row className="my-3">
            <Form.Group>
              <Col>
                <Button type="submit" variant="secondary">
                  Save Password
                </Button>
                <Button
                  variant="dark"
                  className="mx-3"
                  onClick={() => setPass(createPassword(20))}
                >
                  Generate Random Password
                </Button>
              </Col>
            </Form.Group>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddPassword;

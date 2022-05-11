import React from "react";
import { ipcRenderer } from "electron";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import close from "../../assets/close.png";

const SettingsPage = ({ setSettingsPage, defaultSettings, alert }) => {
  const updateSettings = () => {
    ipcRenderer.send("settings:set", {
      hidePassword: !defaultSettings.hidePassword,
    });

    alert("Saved settings");
    console.log("settings saved");
  };

  const downloadPasswords = () => {
    ipcRenderer.send("database:download");
  };

  const deletePasswords = () => {
    ipcRenderer.send("database:deleteAll");
  };

  return (
    <Container className="mt-5" style={{ minHeight: "30vh" }}>
      {defaultSettings && (
        <>
          <Row>
            <Col>
              <h1>Settings</h1>
            </Col>
          </Row>
          <Row>
            <Col className="mt-3">
              <input
                type="checkbox"
                name="showPasswords"
                id="showPasswords"
                checked={defaultSettings.hidePassword ? false : true}
                onChange={updateSettings}
              />

              <label htmlFor="showPasswords" style={{ marginLeft: "1rem" }}>
                Show Passwords
              </label>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <Button size="sm" variant="light" onClick={downloadPasswords}>
                Download passwords
              </Button>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Button size="sm" variant="danger" onClick={deletePasswords}>
                Delete All passwords
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default SettingsPage;

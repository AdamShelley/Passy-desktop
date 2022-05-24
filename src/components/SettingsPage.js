import React from "react";
import { ipcRenderer } from "electron";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
    alert("Downloaded Passwords");
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

              <label htmlFor="showPasswords" style={{ marginLeft: ".5rem" }}>
                Show/Hide Passwords
              </label>
            </Col>
            <Row>
              <Col className="mt-3">
                <input
                  type="checkbox"
                  name="darkMode"
                  id="darkMode"
                  // checked={defaultSettings.hidePassword ? false : true}
                  // onChange={updateSettings}
                />

                <label htmlFor="darkMode" style={{ marginLeft: ".5rem" }}>
                  Dark Mode (WIP - doesn't do anything yet!)
                </label>
              </Col>
            </Row>
          </Row>
          <Row className="mt-5">
            <Col>
              <Button
                className="p-3"
                size="sm"
                variant="outline-secondary"
                onClick={downloadPasswords}
              >
                Download passwords
              </Button>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs={5}>
              <Button
                className="p-3"
                size="sm"
                variant="danger"
                onClick={deletePasswords}
              >
                Delete All passwords
              </Button>
            </Col>
            <Col xs={5}>
              <p>Warning - this is permanent and cannot be undone.</p>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default SettingsPage;

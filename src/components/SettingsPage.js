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
  };

  return (
    <Container className="mt-5">
      {defaultSettings && (
        <>
          <Row>
            <Col>
              <h1>Settings</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <input
                type="checkbox"
                name="showPasswords"
                id="showPasswords"
                checked={defaultSettings.hidePassword ? false : true}
                onChange={updateSettings}
              />
            </Col>
            <Col>
              <label htmlFor="showPasswords">Show Passwords</label>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button size="sm" variant="light" onClick={downloadPasswords}>
                Download passwords
              </Button>
            </Col>
            <Col>
              <Button
                size="sm"
                variant="danger"
                onClick={() => setSettingsPage(false)}
              >
                Exit Settings
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default SettingsPage;

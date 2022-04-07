import React from "react";
import { ipcRenderer } from "electron";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const SettingsPage = ({ setSettingsPage, defaultSettings, alert }) => {
  const updateSettings = () => {
    ipcRenderer.send("settings:set", {
      hidePassword: !defaultSettings.hidePassword,
    });

    alert("Saved settings");
    console.log("settings saved");
  };

  return (
    <Card>
      {defaultSettings && (
        <div>
          <h1>Settings</h1>
          <input
            type="checkbox"
            name="showPasswords"
            id="showPasswords"
            checked={defaultSettings.hidePassword ? false : true}
            onChange={updateSettings}
          />
          <label htmlFor="showPasswords">Show Passwords</label>
          <Button size="sm" variant="light">
            Download passwords
          </Button>

          <Button
            size="sm"
            variant="danger"
            onClick={() => setSettingsPage(false)}
          >
            Exit Settings
          </Button>
        </div>
      )}
    </Card>
  );
};

export default SettingsPage;

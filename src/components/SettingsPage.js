import React from "react";
import Button from "react-bootstrap/Button";
import { ipcRenderer } from "electron";

const SettingsPage = ({ setSettingsPage, defaultSettings, alert }) => {
  const updateSettings = () => {
    ipcRenderer.send("settings:set", {
      hidePassword: !defaultSettings.hidePassword,
    });

    alert("Saved settings");
    console.log("settings saved");
  };

  return (
    <>
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

          <Button
            size="sm"
            variant="danger"
            onClick={() => setSettingsPage(false)}
          >
            Exit Settings
          </Button>
        </div>
      )}
    </>
  );
};

export default SettingsPage;

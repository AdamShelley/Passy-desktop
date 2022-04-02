import React, { useEffect, useState } from "react";

import { ipcRenderer } from "electron";

const SettingsPage = ({ setSettingsPage }) => {
  const [showPass, setShowPass] = useState();

  // Get settings
  ipcRenderer.on("settings:get", (e, settings) => {
    // If user does not want to hide the password
    if (settings.hidePassword === false) {
      setShowPass(true);
    } else {
      setShowPass(false);
    }
  });

  console.log(showPass);

  const updateSettings = () => {
    ipcRenderer.send("settings:set", {
      hidePassword: showPass,
    });

    console.log("settings saved");
  };

  // useEffect(() => {
  //   ipcRenderer.send("settings:set", {
  //     hidePassword: showPass,
  //   });
  //   console.log("settings saved");
  // }, [showPass]);

  return (
    <div>
      <h1>Settings</h1>
      <input
        type="checkbox"
        name="showPasswords"
        id="showPasswords"
        checked={showPass}
        onChange={updateSettings}
      />
      <label htmlFor="showPasswords">Show Passwords</label>

      <button onClick={() => setSettingsPage(false)}>Exit Settings</button>
    </div>
  );
};

export default SettingsPage;

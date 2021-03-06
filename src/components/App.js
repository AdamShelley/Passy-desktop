import React, { useState } from "react";
import { ipcRenderer } from "electron";
import AddPassword from "./AddPassword";
import SettingsPage from "./SettingsPage";
import PasswordsPage from "./PasswordsPage";
import Container from "react-bootstrap/container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Alert from "react-bootstrap/Alert";

import "../App.css";

const App = () => {
  const [key, setKey] = useState("home");
  const [savedPasswords, setSavedPasswords] = useState([]);
  const [settings, setSettings] = useState(null);
  const [database, setDatabase] = useState(null);
  const [searchedPasswords, setSearchedPasswords] = useState();
  const [numResults, setNumResults] = useState(0);
  const [alertState, setAlertState] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  ipcRenderer.on("settings:get", (e, settings) => {
    setSettings(settings);
  });

  ipcRenderer.on("database:get", (e, database) => {
    setDatabase(database);
    setSearchedPasswords(database);
    setNumResults(database.length);
  });

  const showAlert = (message, variant = "success", seconds = 3000) => {
    setAlertState({
      show: true,
      message,
      variant,
    });

    setTimeout(() => {
      setAlertState({
        show: false,
        message: "",
        variant: "success",
      });
    }, seconds);
  };

  const addPassword = (pass) => {
    console.log(pass);
    if (pass.name === "" || pass.password === "")
      return showAlert("Please enter all fields", "danger");
    pass._id = Math.floor(Math.random() * 100);
    pass.created = new Date().toString();
    setSavedPasswords([...savedPasswords, pass]);

    ipcRenderer.send("database:add", pass);

    showAlert("Password added");
  };

  const deletePassword = (_id) => {
    console.log("deleting: " + _id);
    setSavedPasswords(savedPasswords.filter((pass) => pass._id !== _id));

    ipcRenderer.send("database:deletePass", _id);

    showAlert("Password Deleted", "danger");
  };

  const home = (
    <>
      <AddPassword addPassword={addPassword} />
    </>
  );

  return (
    <>
      <Container>
        <Tabs
          id="controlled-tab"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mt-3 mb-3"
        >
          <Tab eventKey="home" title="Home" className="custom-tab-styles">
            {home}
          </Tab>
          <Tab eventKey="passwords" title="Passwords">
            <PasswordsPage
              database={database}
              searchedPasswords={searchedPasswords}
              setSearchedPasswords={setSearchedPasswords}
              numResults={numResults}
              setNumResults={setNumResults}
              deletePassword={deletePassword}
              settings={settings}
              showAlert={showAlert}
            />
          </Tab>
          <Tab
            eventKey="settings"
            title="Settings"
            className="custom-tab-styles"
          >
            <SettingsPage defaultSettings={settings} alert={showAlert} />
          </Tab>
        </Tabs>
        {alertState.show && (
          <Alert className="mt-3" variant={alertState.variant}>
            {alertState.message}
          </Alert>
        )}
      </Container>
      <div className="top-styling-orb"></div>
      <div className="background-indent"></div>
    </>
  );
};

export default App;

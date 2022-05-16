import React, { useState } from "react";
import { ipcRenderer } from "electron";
import AddPassword from "./AddPassword";
import SettingsPage from "./SettingsPage";
import PasswordsPage from "./PasswordsPage";
import Container from "react-bootstrap/container";
import Alert from "react-bootstrap/Alert";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import "../App.css";

const App = () => {
  const [key, setKey] = useState("home");
  const [savedPasswords, setSavedPasswords] = useState([]);
  const [settings, setSettings] = useState(null);
  const [database, setDatabase] = useState(null);
  const [searchedPasswords, setSearchedPasswords] = useState();
  const [alert, setAlert] = useState({
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
  });

  const addPassword = (pass) => {
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
  };

  const showAlert = (message, variant = "success", seconds = 3000) => {
    setAlert({
      show: true,
      message,
      variant,
    });

    setTimeout(() => {
      setAlert({
        show: false,
        message: "",
        variant: "success",
      });
    }, seconds);
  };

  const home = (
    <>
      {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
      <AddPassword addPassword={addPassword} />
    </>
  );

  return (
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
            deletePassword={deletePassword}
            settings={settings}
            showAlert={showAlert}
          />
        </Tab>
        <Tab eventKey="settings" title="Settings" className="custom-tab-styles">
          <SettingsPage defaultSettings={settings} alert={showAlert} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default App;

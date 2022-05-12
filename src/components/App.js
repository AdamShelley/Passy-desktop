import React, { useState } from "react";
import { ipcRenderer } from "electron";
import PasswordLine from "./PasswordLine";
import AddPassword from "./AddPassword";
import SettingsPage from "./SettingsPage";
import Container from "react-bootstrap/container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import "../App.css";
import { setTokenSourceMapRange } from "typescript";

const App = () => {
  const [key, setKey] = useState("home");
  const [savedPasswords, setSavedPasswords] = useState([]);
  const [settings, setSettings] = useState(null);
  const [database, setDatabase] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  const [searchedPasswords, setSearchedPasswords] = useState(null);
  const [numResults, setNumResults] = useState();

  ipcRenderer.on("settings:get", (e, settings) => {
    setSettings(settings);
  });

  ipcRenderer.on("database:get", (e, database) => {
    setDatabase(database);
    setSearchedPasswords(database);
    setNumResults(database.length);
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

  const filterPasswords = (e) => {
    const searchString = e.target.value.toLowerCase();
    if (searchString.length > 0) {
      const newList = database.filter((line) => {
        return line.name.toLowerCase().match(searchString);
      });
      setSearchedPasswords(newList);
      setNumResults(newList.length);
    }

    if (searchString.length === 0) {
      setSearchedPasswords(database);
    }
  };

  const home = (
    <>
      {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
      <AddPassword addPassword={addPassword} />

      <Row className="m-3">
        <Form.Control
          type="text"
          placeholder="Search Passwords"
          onChange={(e) => filterPasswords(e)}
        />
      </Row>
      <Table className="table-styles">
        <thead>
          <tr>
            <th>Name</th>
            <th>Password</th>
            <th>Date added</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {searchedPasswords &&
            searchedPasswords.map((pass, index) => (
              <PasswordLine
                pass={pass}
                key={index}
                deletePassword={deletePassword}
                settings={settings}
                alert={showAlert}
              />
            ))}
        </tbody>
      </Table>
      <p>No. of results found: {numResults}</p>
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
        <Tab eventKey="settings" title="Settings" className="custom-tab-styles">
          <SettingsPage defaultSettings={settings} alert={showAlert} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default App;

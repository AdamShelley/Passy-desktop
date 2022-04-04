import React, { useState } from "react";
import { ipcRenderer } from "electron";
import PasswordLine from "./PasswordLine";
import AddPassword from "./AddPassword";
import SettingsPage from "./SettingsPage";
import Container from "react-bootstrap/container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import {
  createBigIntLiteral,
  createNoSubstitutionTemplateLiteral,
} from "typescript";

const App = () => {
  const [savedPasswords, setSavedPasswords] = useState([]);

  const [settings, setSettings] = useState(null);
  const [database, setDatabase] = useState(null);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "success",
  });
  const [settingsPage, setSettingsPage] = useState(false);

  ipcRenderer.on("settings:get", (e, settings) => {
    setSettings(settings);
  });

  ipcRenderer.on("database:get", (e, database) => {
    setDatabase(database);
  });

  const addPassword = (pass) => {
    if (pass.name === "" || pass.password === "")
      return showAlert("Please enter all fields", "danger");
    pass._id = Math.floor(Math.random() * 10);
    pass.created = new Date().toString();
    setSavedPasswords([...savedPasswords, pass]);

    ipcRenderer.send("database:add", pass);

    showAlert("Password added");
  };

  const deletePassword = (_id) => {
    setSavedPasswords(savedPasswords.filter((pass) => pass._id !== _id));
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

  console.log(database);

  return (
    <Container>
      {!settingsPage && settings ? (
        <>
          <AddPassword addPassword={addPassword} />
          {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Password</th>
                <th>Date added</th>
              </tr>
            </thead>
            <tbody>
              {database &&
                database.map((pass, index) => (
                  <PasswordLine
                    pass={pass}
                    key={index}
                    deletePassword={deletePassword}
                    settings={settings}
                  />
                ))}
            </tbody>
          </Table>
          <Button variant="light" onClick={() => setSettingsPage(true)}>
            Settings
          </Button>
        </>
      ) : (
        <SettingsPage
          setSettingsPage={setSettingsPage}
          defaultSettings={settings}
          alert={showAlert}
        />
      )}
    </Container>
  );
};

export default App;

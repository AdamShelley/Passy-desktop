import React, { useState } from "react";
import { ipcRenderer } from "electron";
import PasswordLine from "./PasswordLine";
import AddPassword from "./AddPassword";
import SettingsPage from "./SettingsPage";
import Container from "react-bootstrap/container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

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

  const [searchedPasswords, setSearchedPasswords] = useState(null);

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

  const filterPasswords = (e) => {
    const searchString = e.target.value.toLowerCase();
    if (searchString.length > 0) {
      const newList = database.filter((line) => {
        return line.name.toLowerCase().match(searchString);
      });
      setSearchedPasswords(newList);
    }

    if (searchString.length === 0) {
      setSearchedPasswords(database);
    }
  };

  return (
    <Container>
      {!settingsPage && settings ? (
        <>
          <AddPassword addPassword={addPassword} />
          {alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
          <input
            type="text"
            placeholder="Search Passwords"
            onChange={(e) => filterPasswords(e)}
          ></input>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Password</th>
                <th>Date added</th>
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

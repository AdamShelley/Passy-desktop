import React, { useState } from "react";
import PasswordLine from "./PasswordLine";
import AddPassword from "./AddPassword";
import SettingsPage from "./SettingsPage";
import Container from "react-bootstrap/container";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";

const App = () => {
  const [savedPasswords, setSavedPasswords] = useState([
    {
      _id: 1,
      name: "Spotify",
      password: "12ksflkg",
      created: new Date().toString(),
    },
    {
      _id: 2,
      name: "facebook",
      password: "agkmsdlfnk",
      created: new Date().toString(),
    },
    {
      _id: 3,
      name: "cake",
      password: "slrgksfmgkl",
      created: new Date().toString(),
    },
  ]);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "success",
  });
  const [settingsPage, setSettingsPage] = useState(false);

  const addPassword = (pass) => {
    if (pass.name === "" || pass.pass)
      return showAlert("Please enter all fields", "danger");
    pass._id = Math.floor(Math.random() * 10);
    pass.created = new Date().toString();
    setSavedPasswords([...savedPasswords, pass]);
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

  return (
    <Container>
      {!settingsPage ? (
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
              {savedPasswords.map((pass, index) => (
                <PasswordLine
                  pass={pass}
                  key={index}
                  deletePassword={deletePassword}
                />
              ))}
            </tbody>
          </Table>
          <h3 onClick={() => setSettingsPage(true)}>Settings</h3>
        </>
      ) : (
        <SettingsPage setSettingsPage={setSettingsPage} />
      )}
    </Container>
  );
};

export default App;

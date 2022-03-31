import React, { useState } from "react";
import PasswordLine from "./PasswordLine";
import Container from "react-bootstrap/container";
import Table from "react-bootstrap/Table";

const App = () => {
  const [savedPasswords, setSavedPasswords] = useState([
    { name: "Spotify", password: "12ksflkg", created: new Date().toString() },
    {
      name: "facebook",
      password: "agkmsdlfnk",
      created: new Date().toString(),
    },
    { name: "cake", password: "slrgksfmgkl", created: new Date().toString() },
  ]);

  return (
    <Container>
      <h1>Passy - Password Manager</h1>
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
            <PasswordLine pass={pass} key={index} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default App;

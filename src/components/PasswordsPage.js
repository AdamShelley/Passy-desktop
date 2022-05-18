import React, { useEffect, useState } from "react";
import PasswordLine from "./PasswordLine";

import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";

const PasswordsPage = ({
  deletePassword,
  settings,
  showAlert,
  database,
  searchedPasswords,
  setSearchedPasswords,
  numResults,
  setNumResults,
}) => {
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

  return (
    <>
      {database && (
        <div>
          <Row className="mt-5 mb-3">
            <Form.Control
              type="text"
              placeholder="Search Passwords"
              onChange={(e) => filterPasswords(e)}
            />
            <span>X</span>
          </Row>
          <div className="password-table-container">
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
          </div>
          <p className="m-3">No. of results found: {numResults}</p>
        </div>
      )}
    </>
  );
};

export default PasswordsPage;

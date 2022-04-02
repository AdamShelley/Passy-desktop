import React, { useState } from "react";
import { ipcRenderer } from "electron";
import Button from "react-bootstrap/Button";
import Moment from "react-moment";

const PasswordLine = ({
  pass: { _id, name, password, created },
  deletePassword,
}) => {
  const [hidePass, setHidePass] = useState();
  console.log(hidePass);

  ipcRenderer.on("settings:get", (e, settings) => {
    console.log(settings);
    if (settings.hidePassword === false) {
      setHidePass(false);
    } else {
      setHidePass(true);
    }
  });

  return (
    <tr>
      <td>{name}</td>
      <td>{hidePass ? "*".repeat(password.length) : password}</td>
      <td>
        <Moment format="MMMM do YYYY">{new Date(created)}</Moment>
      </td>
      <td>
        <Button variant="danger" size="sm" onClick={() => deletePassword(_id)}>
          X
        </Button>
      </td>
    </tr>
  );
};

export default PasswordLine;

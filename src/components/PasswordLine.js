import React from "react";
import Button from "react-bootstrap/Button";
import Moment from "react-moment";

const PasswordLine = ({
  pass: { _id, name, password, created },
  deletePassword,
  settings,
}) => {
  const copyToClipboard = () => {
    console.log("Copying to clipboard");
  };

  return (
    <tr>
      <td>{name}</td>
      <td style={{ cursor: "pointer" }} onClick={copyToClipboard}>
        {settings.hidePassword ? "*".repeat(password.length) : password}
      </td>
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

import React from "react";
import Button from "react-bootstrap/Button";
import Moment from "react-moment";

const PasswordLine = ({ pass: { name, password, created } }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{password}</td>
      <td>
        <Moment format="MMMM do YYYY">{new Date(created)}</Moment>
      </td>
      <td>
        <Button variant="danger" size="sm">
          X
        </Button>
      </td>
    </tr>
  );
};

export default PasswordLine;

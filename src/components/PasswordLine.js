import React from "react";
import Button from "react-bootstrap/Button";
import Moment from "react-moment";
import useCopy from "use-copy";

const PasswordLine = ({
  pass: { _id, name, password, created },
  deletePassword,
  settings,
  alert,
}) => {
  const [copied, copy, setCopied] = useCopy(password);

  const copyToClipboard = () => {
    copy();

    setTimeout(() => {
      setCopied(false);
    }, 3000);

    alert("Password Copied", "success");
  };

  return (
    <tr>
      <td>{name}</td>
      <td style={{ cursor: "pointer" }} onClick={copyToClipboard}>
        {settings.hidePassword ? "*".repeat(password.length) : password}
      </td>
      <td>
        <Moment format="d/MM/YY">{new Date(created)}</Moment>
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

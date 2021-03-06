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

  console.log(`${name}: ${created}`);

  return (
    <tr className="table-line-styles">
      <td>{name}</td>
      <td
        className="table-line-styles--password"
        style={{ cursor: "pointer" }}
        onClick={copyToClipboard}
      >
        {settings.hidePassword ? "*".repeat(password.length) : password}
      </td>
      <td>
        <Moment format="DD/MM/YY">{new Date(created)}</Moment>
      </td>
      <td>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => deletePassword(_id)}
        >
          X
        </Button>
      </td>
    </tr>
  );
};

export default PasswordLine;

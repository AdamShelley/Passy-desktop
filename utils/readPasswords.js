const fs = require("fs");
const path = require("path");

const readPasswords = () => {
  fs.readFile(
    path.join(__dirname, "../", "passwords.txt"),
    "utf8",
    (err, data) => {
      if (err) {
        console.log(err);
        return;
      }

      console.log(data);
    }
  );
};

module.exports = readPasswords;

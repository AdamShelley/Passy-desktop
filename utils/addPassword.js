const fs = require("fs");
const path = require("path");
const os = require("os");
const chalk = require("chalk");

const addPassword = (name, add) => {
  let string = `${name}: ${add}`;
  fs.open(
    path.join(__dirname, "../../", "passwords.txt"),
    "a",
    0666,
    (e, id) => {
      fs.write(id, string + os.EOL, null, "utf-8", () => {
        fs.close(id, () => {
          console.log(chalk.green("Password saved to passwords.txt"));
        });
      });
    }
  );
};

module.exports = addPassword;

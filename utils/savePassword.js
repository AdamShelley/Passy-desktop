const savePassword = (pass) => {
  if (!pass.name || !pass.password) {
    return;
  }
  let string = `${pass.name}: ${pass.password}`;
  console.log(string);

  fs.open(
    path.join(__dirname, "../../", "passwords.json"),
    "a",
    0666,
    (e, id) => {
      fs.write(id, string + os.EOL, null, "utf-8", () => {
        fs.close(id, () => {
          return true;
        });
      });
    }
  );
};

module.exports = savePassword;

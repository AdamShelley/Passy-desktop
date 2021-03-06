const electron = require("electron");
const path = require("path");
const fs = require("fs");
const os = require("os");

class Store {
  constructor(options) {
    const userDataPath = (electron.app || electron.remote.app).getPath(
      "userData"
    );
    this.path = path.join(userDataPath, options.configName + ".json");

    this.data = parseDataFile(this.path, options.defaults);
  }

  get(key) {
    return this.data[key];
  }

  set(key, val) {
    this.data[key] = val;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }

  add(pass) {
    console.log(pass);
    this.data.database.push(pass);
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
  deletePass(id) {
    this.data.database = this.data.database.filter((pass) => pass._id !== id);
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
  downloadPasswords() {
    // Remove the unrequired properties
    let database = this.data.database.map(({ _id, created, ...line }) =>
      JSON.stringify(line)
    );

    // turn into string

    let string = JSON.stringify(database).replace(/\\"/g, "");

    console.log(string);

    try {
      fs.open(path.join(__dirname, "./", "passwords.txt"), "w", (e, id) => {
        fs.write(id, string, null, "utf-8", () => {
          fs.close(id, () => {
            console.log("Password saved to passwords.txt");
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  deleteAll() {
    this.data.database = [];
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

function parseDataFile(filePath, defaults) {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch (err) {
    return defaults;
  }
}

module.exports = Store;

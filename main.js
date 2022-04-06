const { app, BrowserWindow, ipcMain, Tray, Menu } = require("electron");
const path = require("path");
const url = require("url");
const Store = require("./Store");

let mainWindow;
let tray;

// Init store & defaults
const store = new Store({
  configName: "user-settings",
  defaults: {
    settings: {
      hidePassword: true,
    },
  },
});

const database = new Store({
  configName: "database",
  defaults: {
    database: [],
  },
});

let isDev = false;

if (
  process.env.NODE_ENV !== undefined &&
  process.env.NODE_ENV === "development"
) {
  isDev = true;
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    show: false,
    backgroundColor: "white",
    icon: `${__dirname}/assets/icons/png/icon.png`,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  let indexPath;

  if (isDev && process.argv.indexOf("--noDevServer") === -1) {
    indexPath = url.format({
      protocol: "http:",
      host: "localhost:8080",
      pathname: "index.html",
      slashes: true,
    });
  } else {
    indexPath = url.format({
      protocol: "file:",
      pathname: path.join(__dirname, "dist", "index.html"),
      slashes: true,
    });
  }

  mainWindow.loadURL(indexPath);

  mainWindow.webContents.on("dom-ready", () => {
    // Store
    mainWindow.webContents.send("settings:get", store.get("settings"));
    // Handling password saving
    mainWindow.webContents.send("database:get", database.get("database"));
  });

  mainWindow.on("close", (e) => {
    if (!app.isQuitting) {
      e.preventDefault();
      mainWindow.hide();
    }

    return true;
  });

  // Icon
  const icon = path.join(__dirname, "assets", "tray.png");
  tray = new Tray(icon);

  tray.setToolTip("Passy - Password Manager");

  tray.on("click", () => {
    if (mainWindow.isVisible() === true) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  });

  tray.on("right-click", () => {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: "Quit",
        click: () => {
          app.isQuitting = true;
          app.quit();
        },
      },
    ]);

    tray.popUpContextMenu(contextMenu);
  });

  // Don't show until we are ready and loaded
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();

    // Open devtools if dev
    if (isDev) {
      const {
        default: installExtension,
        REACT_DEVELOPER_TOOLS,
      } = require("electron-devtools-installer");

      installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
        console.log("Error loading React DevTools: ", err)
      );
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createMainWindow);

// Set settings
ipcMain.on("settings:set", (e, settings) => {
  store.set("settings", settings);
  mainWindow.webContents.send("settings:get", store.get("settings"));
});

// Set database
ipcMain.on("database:add", (e, pass) => {
  database.add(pass);
  mainWindow.webContents.send("database:get", database.get("database"));
});

ipcMain.on("database:deletePass", (e, id) => {
  database.deletePass(id);
  mainWindow.webContents.send("database:get", database.get("database"));
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});

// Stop error
app.allowRendererProcessReuse = true;

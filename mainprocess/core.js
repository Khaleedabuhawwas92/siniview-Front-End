const _IS_DEV_MODE_ = process.env.NODE_ENV === "DEV" ? true : false;
// const path = require("path");
const fetch = require("node-fetch");
const path = require("path");
const electron =
  typeof process !== "undefined" &&
  process.versions &&
  !!process.versions.electron;

const { PosPrinter } = require("electron-pos-printer");
// const { setupSecurePOSPrinter } = require("electron-secure-pos-printer");

const { app, BrowserWindow, ipcMain } = require("electron");

// require(__dirname, "src/api/server");
if (_IS_DEV_MODE_) {
} else {
  const serve = require("electron-serve");
  serve({ directory: ".app" });
}

let win = null; // Current window
const makeAppWindow = () => {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
    },
    fullscreen: true,
    icon: (__dirname, "build/icon.png"),
  });
  win.webContents.print({ silent: true });

  // const options = {
  //   silent: true,
  //   deviceName: "My-Printer",
  //   pageRanges: [
  //     {
  //       from: 0,
  //       to: 1,
  //     },
  //   ],
  // };

  ipcMain.on("thermalPrinter1", function (event, options, data, content) {
    win.webContents.handle("thermalPrinter1", options, data, content);
    PosPrinter.print(data, options)
      .then(console.log)
      .catch((error) => {
        console.error(error);
      });
  });

  ipcMain.on("thermalPrinter2", function (event, options, data, content) {
    win.webContents.handle("thermalPrinter2", options, data, content);
    PosPrinter.print(data, options)
      .then(console.log)
      .catch((error) => {
        console.error(error);
      });
  });

  ipcMain.handle("getPrinters", async (event, content) => {
    await win.webContents
      .getPrintersAsync()
      .then((res) => {
        return res;
      })
      .catch((erorr) => {
        console.log(erorr);
      });
  });

  win.on("closed", () => (win = null));

  if (_IS_DEV_MODE_) {
    const { Nuxt, Builder } = require("nuxt");
    require("dotenv").config();
    const config = require("./nuxt.config");
    const port = process.env.PORT;
    const express = require("express");
    const app2 = express();

    //Init nuxt

    const nuxt = new Nuxt(config);
    console.log("Working in DEV mode");

    const http = require("http");
    app2.use(nuxt.render);
    app2.listen(port);
    app2.use(express.json());
    app2.use(express.urlencoded({ extended: true }));

    const _NUXT_URL_ = `http://localhost:${port}`;

    console.log(`Nuxt is working on ${_NUXT_URL_}`);

    const {
      default: installExtension,
      VUEJS_DEVTOOLS,
    } = require("electron-devtools-installer");

    installExtension(VUEJS_DEVTOOLS)
      .then((name) => {
        console.log(`Added Extension:  ${name}`);

        win.webContents.on("did-frame-finish-load", () => {
          win.webContents.once("devtools-opened", () => {
            win.focus();
          });
          win.webContents.openDevTools();
        });
      })

      .catch((err) => console.log("An error occurred: ", err));

    const builder = new Builder(nuxt);
    builder
      .build()
      .then(() => {
        // Wait for nuxt to build
        const appServer = () => {
          http
            .get(_NUXT_URL_, (res) => {
              if (res.statusCode === 200) {
                win.loadURL(_NUXT_URL_);
              } else {
                setTimeout(appServer, 300);
              }
            })
            .on("error", appServer);
        };
        appServer();
      })
      .catch((err) => {
        console.error(err); // eslint-disable-line no-console
        process.exit(1);
      });
  } else {
    win.removeMenu();
    win.loadURL("app://-");
  }
};

// app1.use(express.json());
// app1.use(express.urlencoded({ extended: true }));

// app1.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
// app1.get("/halooo", (req, res) => {
//   res.json({ message: "Welcome to Khaled application." });
// });

// app1.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

// Use API Routes

app.on("ready", makeAppWindow);

app.on("activate", () => win === null && makeAppWindow());
app.on("window-all-closed", () => app.quit());
const mainWin = () => {
  return win;
};

export { mainWin, _IS_DEV_MODE_ };

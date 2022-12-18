const { contextBridge, ipcMain, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  printer: (options, data, content) =>
    ipcRenderer.send("thermalPrinter1", options, data, content),
  printer2: (options, data, content) =>
    ipcRenderer.send("thermalPrinter2", options, data, content),
  getPrinters: () => ipcRenderer.invoke("getPrinters"),

  // we can also expose variables, not just functions
});

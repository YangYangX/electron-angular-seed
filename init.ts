import * as path from "path";
import { app, BrowserWindow, screen } from "electron";

/******************************************************************************* */
/**
 * reload windows when src has a update.
 */
const args = process.argv.slice(1);
const serve = args.some(val => val === '--serve');

if (serve) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, '../node_modules', '.bin', 'electron'),
  });
}
/******************************************************************************* */

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

const mainWindowWidth = 1200;
const mainWindowHeight = 750;

function createWindow() {
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;
  // Create the browser window.
  mainWindow = new BrowserWindow({
    x: (size.width - mainWindowWidth)/2,
    y: (size.height - mainWindowHeight)/2,
    width: mainWindowWidth,
    height: mainWindowHeight,
    show: true
  });

  // disable windows default menu
  if(process.platform == "win32") {
    mainWindow.setMenu(null);
  }

  // and load the index.html of the app.
  // path.resolve(path.join(__dirname, '../renderer/index.html'))
  mainWindow.loadFile(path.join(__dirname, 'electron-angular-seed/index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on("ready", createWindow);

  // Quit when all windows are closed.
  app.on("window-all-closed", () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createWindow();
    }
  });

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.
} catch (err) {
  // Catch Error
  // throw err;
}

import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
const createWindow = async () => {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    minWidth: 1020,
    minHeight: 670,
    frame: false,
    backgroundColor: "#fff",
  })
  if (process.env.Node_ENV !== 'development') {
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  } else {
    console.log(process.env.Node_ENV);

    win.loadURL(`${process.env['VITE_DEV_SERVER_URL']}`)
  }

  ipcMain.on("window-min", () => {
    win.minimize()
  })
  ipcMain.on("window-max", () => {
    if (win.isMaximized()) {
      win.restore();
    } else {
      win.maximize();
    }
  })
  ipcMain.on('window-close', function () {
    win.close();
  })
  win.on("system-context-menu", (event, _point) => {
    event.preventDefault();
  });
  const WM_INITMENU = 0x0116;
  win.hookWindowMessage(WM_INITMENU, () => {
    win.setEnabled(false);
    setTimeout(() => {
      win.setEnabled(true);
    }, 10)
    return true
  });
}


app.whenReady().then(createWindow)

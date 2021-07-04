require('./server.js') 
const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 400,
    height: 700,
    minWidth: 400,
    minHeight: 700
  })

  // 隱藏菜單欄
  const { Menu } = require('electron');
  Menu.setApplicationMenu(null);

  win.loadFile('page/index.html')
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin'){
        // console.log(process.platform)
        app.quit()
    } 
})
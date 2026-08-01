const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 900,
    minHeight: 600,
    title: 'S.G.C-S.P — Clube Columbófilo Limeirense',
    autoHideMenuBar: true, // esconde a barra de menu padrão do Electron (Arquivo/Editar/Ver...),
                            // já que o próprio sistema tem seu menu (S.G.C-S.P, Cadastros, Prova...)
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      spellcheck: false,
    },
  });

  win.loadFile(path.join(__dirname, 'app', 'index.html'));

  // Links que abririam o WhatsApp Web/API ou outros sites externos abrem no
  // navegador padrão do Windows, não dentro da janela do programa.
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Descomente a linha abaixo para abrir o DevTools (ajuda a debugar se
  // algo não funcionar dentro do programa instalado):
  // win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

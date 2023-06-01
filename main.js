const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv').config();

const isDev = true;

//Main window
const createWindow = () => {
  const win = new BrowserWindow({
    width: isDev ? 1200: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js')
      }, 
  });

  if(isDev){
    win.webContents.openDevTools();
  }

  win.loadFile(path.join(__dirname, './renderer/index.html'));
}; 


//Initialize Function
app.whenReady().then(() => {
  ipcMain.handle('axios.openAI', openAI)

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

//Main Function
async function openAI(event, sentence) {
  let res = null;

  const env = dotenv.parsed;
  
  await axios({
      method: 'post',
      url: 'https://api.openai.com/v1/completions',
      data:{
        model: "text-davinci-003",
        prompt: "Correct this to standard English:\n\n" + sentence,
        temperature: 0,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0
      },
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + env.APIKEY_OPENAI
    }
    }) .then(function (response) {
      res = response.data;
    })
    .catch(function (error) {
      res = error;
    });

  return res;
}

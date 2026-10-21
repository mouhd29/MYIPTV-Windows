const {app,BrowserWindow,shell,session}=require('electron');
const path=require('path');
app.whenReady().then(()=>{
 const win=new BrowserWindow({width:1380,height:840,minWidth:900,minHeight:600,backgroundColor:'#080b14',
  title:'MY IPTV',icon:path.join(__dirname,'assets','logo.png'),
  webPreferences:{preload:path.join(__dirname,'preload.js'),contextIsolation:true,nodeIntegration:false,sandbox:true}});
 win.setMenuBarVisibility(false);
 win.loadFile('index.html');
 win.webContents.setWindowOpenHandler(({url})=>{if(/^https?:/.test(url))shell.openExternal(url);return {action:'deny'}});
 win.webContents.on('will-navigate',(e,url)=>{if(!url.startsWith('file:'))e.preventDefault()});
});
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit()});

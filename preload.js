const {contextBridge}=require('electron');
contextBridge.exposeInMainWorld('desktop',{platform:'Windows 11',version:'0.1.0'});

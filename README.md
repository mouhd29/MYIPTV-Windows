# MY IPTV for Windows 11 (beta)

Desktop IPTV **player only**. No playlists or streaming content are provided. Use only streams you have permission to watch.

## Run locally
Install Node.js 22+, open a terminal in this folder and run:
```
npm install
npm start
```
## Create a Windows EXE
```
npm run dist:win
```
The installer and portable EXE appear in `dist/`. Alternatively upload this project's **contents** to a separate GitHub repository and run Actions → Build MY IPTV Windows 11.

## Features
- Branded MY IPTV interface and logo
- M3U playlist URL or local M3U file import
- Live channel category browsing, search, favorites, playlist switching
- HTML5 streaming playback (native supported formats)
- HLS playback through hls.js (loaded from CDN; internet required)
- Local playlist/favorites persistence in Electron profile

## Limitations
- Browser/Electron codec support varies; some IPTV formats, DRM, UDP/RTSP and custom-header streams will not play.
- Playlist URL requests depend on the provider's CORS configuration. For best results import a local M3U file.
- No Xtream Codes, EPG, VOD catalog parser, Windows Store signing, or device-specific remote control support yet.
- This is an independently built Windows beta, not a byte-for-byte port of the Android app.

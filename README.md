# README

これはU-16プログラミングコンテスト 競技部門 Chaser の map を表示するためのアプリケーションです.

## 開発環境
macOS 15.1.1（24B91）  
node v22.5.1  
npm v10.9.1  
go v1.23.3  
wails v2.9.2  
 
### ディレクトリ構造
このリポジトリは以下のようなディレクトリ構造となっている  
.  
├── README.md  
├── app.go  
├── build/  
├── frontend/  
│   ├── dist/  
│   ├── index.html  
│   ├── node_modules/  
│   ├── package-lock.json  
│   ├── package.json  
│   ├── package.json.md5  
│   ├── src  
│   │   ├── App.css  
│   │   ├── App.jsx  
│   │   ├── assets  
│   │   │   ├── fonts  
│   │   │   │   ├── OFL.txt  
│   │   │   │   └── nunito-v16-latin-regular.woff2  
│   │   │   └── images  
│   │   │       ├── Block.png  
│   │   │       ├── Cool.png  
│   │   │       ├── Floor.png  
│   │   │       ├── Hot.png  
│   │   │       ├── Item.png  
│   │   │       └── logo-universal.png  
│   │   ├── main.jsx  
│   │   ├── style.css  
│   │   └── wailsjs/  
│   ├── vite.config.js  
│   └── wailsjs/  
├── go.mod  
├── go.sum  
├── hgoe.txt  
├── main.go  
├── maps/  
├── node_modules/  
├── package-lock.json  
├── package.json  
└── wails.json  
現在のバージョンではマップを保存するディレクトリをユーザーが自由に設定できないため, mapsディレクトリに適宜保存しておく必要がある.  

## 実行方法
このプログラムを実行するには以下のコマンドを実行する.  
```
wails dev
```

## About

This is the official Wails React template.

You can configure the project by editing `wails.json`. More information about the project settings can be found
here: https://wails.io/docs/reference/project-config

## Live Development

To run in live development mode, run `wails dev` in the project directory. This will run a Vite development
server that will provide very fast hot reload of your frontend changes. If you want to develop in a browser
and have access to your Go methods, there is also a dev server that runs on http://localhost:34115. Connect
to this in your browser, and you can call your Go code from devtools.

## Building

To build a redistributable, production mode package, use `wails build`.

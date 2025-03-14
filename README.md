# 要件
Edgeの拡張機能を使うことで、開いているタブ全てのURLを取得すること  
バックグラウンドで起動する形で、ページの描画やタブの切替も検知してURLを通知すること  
WebSocket等で送信することができること  

# 実現方法
ブラウザではJavaScriptのコードを実行できるため、"Chrome Extensions"のchrome.tabsを使って実現することにした  

`manifest.json`で拡張機能の構成を定義  
拡張機能自体のソースは`scripts/background.js`


# 動作環境の構築
## localで拡張機能の実行環境を構築
1. Edgeで`edge://extensions/`を開く
2. 「開発者モード」を有効にする
3. 「展開して読み込み」から読み込ませるソースを選択

## WebSocketのサーバを構築
```
npm i ws
node ws_server.js
```

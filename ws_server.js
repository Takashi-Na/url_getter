const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('A new client has connected');

  ws.on('message', function incoming(message) {
    console.log('Receiveed message: %s', message);

    ws.send('Messages from the server: ' + message);
  });

  ws.on('close', function close() {
    console.log('The client disconnected');
  });
});


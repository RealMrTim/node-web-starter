import * as Express from 'express'
import * as WS from 'ws'
import { Observable } from 'rxjs'

import { Endpoints } from './server.consts'
import Shared from '../shared/shared.lib'


/**
 * Server application entry point.
 * 
 */

console.log("Server has started...");
new Shared().print();


/**
 * Set up and run express server.
 * 
 */
const app = Express();

app.use((req, res, next) => {
    // Allow requests from pages served by our webpack dev server.
    res.header('Access-Control-Allow-Origin', Endpoints.express.corsHeader);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/express-endpoint', function (req, res) {
    res.send('Express endpoint successfully contacted');
});

app.listen(Endpoints.express.port, function () {
    console.log('Express app listening on port', Endpoints.express.port);
});


/**
 * Set up and run a websocket server.
 * 
 */

var socketServer = new WS.Server({ port: Endpoints.websockets.port });
socketServer.on("listening", () => {
    console.log('WebSocket server listening on port', Endpoints.websockets.port);
});

// Create an observable stream from new connections.
var socketConnection$ = Observable.fromEvent(socketServer, "connection");

// Flatten incoming messages on all sockets.
var incomingMessage$ = socketConnection$.flatMap(
    (socket : WS) => Observable.fromEvent(socket, "message")
);

socketConnection$.subscribe((socket : WS) => {
    socket.send("Successfully connected to WebSocket server");
});

// Log all incoming messages.
incomingMessage$.subscribe((message : { data: any, target: WS }) => {
    console.log("Message from client:", message.data);
});
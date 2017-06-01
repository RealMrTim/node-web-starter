import Shared from '../shared/shared.lib'

/**
 * Client application entry point.
 * 
 */
new Shared().print();


/**
 * Make an HTTP request to our Express enpoint.
 * 
 */

// DOM output container.
var expressContentContainer = document.getElementById("express-endpoint-content") as HTMLElement;

var request = new Request("http://localhost:8082/express-endpoint"); 

fetch(request).then(
    (res) => {
        if (res.status === 200 && res.text !== null) {
            res.text().then((content) => {
                expressContentContainer.innerText = "✔ " + content;
            });
        }
        else {
            // ...
        }
    })
    .catch(() => {
        // Error - is the server running?
        expressContentContainer.className += " text-error";
        expressContentContainer.innerText = "✖ Could not contact express endpoint";
    });


/**
 * Establish a websocket connection.
 * 
 */

// DOM output container.
var websocketContentContainer = document.getElementById("websocket-endpoint-content") as HTMLElement;

var serverConnection = new WebSocket("ws://localhost:8083");
serverConnection.addEventListener("open", (e) => {
    serverConnection.send("Hello server...");
});
serverConnection.addEventListener("error", (e) => {
    websocketContentContainer.className += " text-error";
    websocketContentContainer.innerText = "✖ Could not establish WebSocket connection";
});
serverConnection.addEventListener("message", (e) => {
    websocketContentContainer.innerText = "✔ " + e.data;
});
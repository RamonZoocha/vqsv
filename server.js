var WebSocketServer = require('ws').Server;

var wss = new WebSocketServer({port: 9090});

wss.on('connection', function(connection) {

    connection.on('message', function(message){

        try {handleMessage(message, connection);}

        catch (e) { console.log(e.message);}
    });
});

var connections = {};

function handleMessage(message, connection) {

    try {
        message = JSON.parse(message);
    }
    catch (e) {
        console.log("Invalid msg received");
    }

    switch (message.type) {

        case "find_room":
            console.log("finding room " + message.key);

            if(connections[message.key]) {
                console.log("room found");
                send({"type":"room_found"}, connection);
            }

            else {
                console.log("room created");
                send({"type":"room_created"}, connection);
                connections[message.key] = connection;
            }

            break;

        case "offer":
            console.log("got offer to " + message.to);
            break;
    }
}

function send(message, connection) {
    connection.send(JSON.stringify(message));
}
// Load third party dependencies
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Load custom classes
const UserStore = require('./userStore.js');

// Instantiate app
const userStore = new UserStore();

// Serve static html files for clients
app.use(express.static('client'));

// Begin responding to websocket and http requests
http.listen(process.env.PORT || 3000, () => {
    console.log('Listening on *:3000');
});

io.on('connection', function (socket) {
    users.push(new User(socket.id, 0, 0))
    console.log('a user connected');
});



// Game logic


class User {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y
    }

}

let users = [];

io.on('connection', function (socket) {
    socket.on('test', function (input) {
        socket.emit('response', "Response")
    });


    socket.on('input', function (input) {
        user = users.find(user => user.id === socket.id)
        switch (input) {
            case "ArrowDown":
                user.x = user.x - 1;
                io.emit('player move', user)
                break;
            case "ArrowUp":
                user.x = user.x + 1;
                io.emit('player move', user)
                break;
            case "ArrowLeft":
                user.y = user.y - 1;
                io.emit('player move', user)
                break;
            case "ArrowRight":
                user.y = user.y + 1;
                io.emit('player move', user)
                break;
            default:
                return; // Quit when this doesn't handle the key event.
        }

    });
});


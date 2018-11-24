// Load third party dependencies
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var _ = require('lodash');

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

class User {
    constructor(id, pictures, current) {
        this.id = id;
        this.pictures = pictures;
        this.current = current;
    }

}

let users = [];

io.on('connection', function (socket) {
    if (users.length === 0) {
        users.push(new User(socket.id, [], 0));
        console.log(String(users.length) + " Player connected");
        socket.emit('info', String(users.length) + " Player connected");
    } else if (users.length === 1) {
        users.push(new User(socket.id, [], 0));
        console.log(String(users.length) + " Players connected");
        socket.emit('info', String(users.length) + " Player connected");
    } else if (users.length === 2) {
        users.push(new User(socket.id, [], 0));
        console.log("create game");
        createGame(socket);
    }
});

var round;
var mission;
var lives;

// Game logic
function createGame(socket) {
    round = 1;
    lives = 3;

    newRound(socket)
}

function newRound(socket) {
    if (round === 1) {
        pictures = pictures_1;
        questions = questions_1;
        mission = mission_1
    } else if (round === 2) {
        pictures = pictures_1;
        questions = questions_1;
        mission = mission_1
    } else if (round === 2) {
        pictures = pictures_1;
        questions = questions_1;
        mission = mission_1
    }

    _.shuffle(pictures);
    for (i = 0; i < pictures.length; i = i) {
        for (j = 0; j < 3; j++) {
            users[j].pictures.push(pictures[i]);
            i++;
        }
    }

    for (i = 0; i < users.length; i++) {
        j = 0;
        while (j !== 1) {
            question = _.sample(questions)
            if (users[i].pictures.includes(question.answer) === false) {
                users[i].question = question;
                j++;
            }
        }
    }

    gameState = {};
    gameState.rounds = round;
    gameState.lives = lives;
    gameState.mission = mission;
    socket.emit('game_state', gameState);

    for (i = 0; i < 3; i++) {
        io.to(users[i].id).emit('pictures', users[i].pictures);
        io.to(users[i].id).emit('question', users[i].question);
    }
}

// Hardcoded variables
mission_1 = "There is a river in the way!";
mission_2 = "There is a river in the way!";
mission_3 = "There is a river in the way!";;

var questions_1 = [
    { question: "Q1?", answer: "P1" },
    { question: "Q2?", answer: "P2" },
    { question: "Q3?", answer: "P3" },
    { question: "Q4?", answer: "P4" },
    { question: "Q5?", answer: "P5" },
    { question: "Q6?", answer: "P6" },
];

var questions_2 = [
    { question: "Q1?", answer: "P1" },
    { question: "Q2?", answer: "P2" },
    { question: "Q3?", answer: "P3" },
    { question: "Q4?", answer: "P4" },
    { question: "Q5?", answer: "P5" },
    { question: "Q6?", answer: "P6" },
];

var questions_3 = [
    { question: "Q1?", answer: "P1" },
    { question: "Q2?", answer: "P2" },
    { question: "Q3?", answer: "P3" },
    { question: "Q4?", answer: "P4" },
    { question: "Q5?", answer: "P5" },
    { question: "Q6?", answer: "P6" },
];

var pictures_1 = [
    { picture: "P1" },
    { picture: "P2" },
    { picture: "P3" },
    { picture: "P4" },
    { picture: "P5" },
    { picture: "P6" },
    { picture: "P7" },
    { picture: "P8" },
    { picture: "P9" },
    { picture: "P10" },
    { picture: "P11" },
    { picture: "P12" },
];

var pictures_2 = [
    { picture: "P1" },
    { picture: "P2" },
    { picture: "P3" },
    { picture: "P4" },
    { picture: "P5" },
    { picture: "P6" },
    { picture: "P7" },
    { picture: "P8" },
    { picture: "P9" },
    { picture: "P10" },
    { picture: "P11" },
    { picture: "P12" },
];

var pictures_3 = [
    { picture: "P1" },
    { picture: "P2" },
    { picture: "P3" },
    { picture: "P4" },
    { picture: "P5" },
    { picture: "P6" },
    { picture: "P7" },
    { picture: "P8" },
    { picture: "P9" },
    { picture: "P10" },
    { picture: "P11" },
    { picture: "P12" },
];

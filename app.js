// Load third party dependencies
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var _ = require('lodash');

// Serve static html files for clients
app.use(express.static('client'));

// Begin responding to websocket and http requests
http.listen(process.env.PORT || 3000, () => {
    console.log('Listening on *:3000');
});

class User {
    constructor(id, pictures, question) {
        this.id = id;
        this.pictures = pictures;
        this.question = question;
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

    socket.on('selection', function (answer) {
        id = socket.id;
        isValidAnswer = false;
        users.forEach(function (user) {
            console.log(answer, user.question.answer);
            if (answer === user.question.answer) {
                isValidAnswer = true;
            }
        });
        if (isValidAnswer) {
            updateQuestion(id);
        } else {
            lostLife(socket);
        }
    });
});

var round;
var currentQuestions;
var mission;
var lives;

// Game logic
function createGame() {
    round = 1;
    questionsLeft = 3;
    lives = 3;

    newRound();
}

function newRound() {
    if (round === 1) {
        pictures = pictures_1;
        currentQuestions = _.shuffle(questions_1);
        mission = mission_1;
    } else if (round === 2) {
        pictures = pictures_2;
        currentQuestions = _.shuffle(questions_2);
        mission = mission_2;
    } else if (round === 3) {
        pictures = pictures_3;
        currentQuestions = _.shuffle(questions_3);
        mission = mission_3;
    }

    _.shuffle(pictures);
    for (i = 0; i < pictures.length; i = i) {
        for (j = 0; j < 3; j++) {
            users[j].pictures.push(pictures[i]);
            i++;
        }
    }

    for (i = 0; i < users.length; i++) {
        for (j = 0; j < currentQuestions.length; j++) {
            if (users[i].pictures.includes(currentQuestions[j].answer) === false) {
                users[i].question = currentQuestions[j];
                currentQuestions = currentQuestions.splice(j, 1);
                break;
            }
        }
    }

    gameState = {};
    gameState.rounds = round;
    gameState.lives = lives;
    gameState.mission = mission;
    io.emit('game_state', gameState);

    for (i = 0; i < 3; i++) {
        io.to(users[i].id).emit('pictures', users[i].pictures);
        io.to(users[i].id).emit('question', users[i].question);
    }
}

function updateQuestion(id) {
<<<<<<< HEAD
    if (currentQuestions.length <= 0) {
        round = 2;
        newRound();
    } else {
        user = users.find(function (user) {
            if (user.id === id) {
                return user;
            }
        });
=======
    var user = users.find(function (user) {
        if (user.id === id) {
            return user;
        }
    });
>>>>>>> fd21e4a408ece85833f0f4469ebbb05c9f5569df

        for (i = 0; i < currentQuestions.length; i++) {
            if (user.pictures.includes(question.answer) === false) {
                user.question = currentQuestions[i];
                currentQuestions = currentQuestions.splice(i, 1);
            }
        }

        io.to(id).emit('question', user.question);
    }
}

function lostLife() {
    lives--;
    if (lives === 0) {
        io.emit('game_over', "You lost: your score");
        console.log(lives)
    } else {
        io.emit('lives_lost', lives);
        console.log("update")
    }
}

// Hardcoded variables
mission_1 = "There is a river in the way!";
mission_2 = "There is a river in the way!";
mission_3 = "There is a river in the way!";;

var questions_1 = [
    { question: "Q1?", answer: "seil.png" },
    { question: "Q2?", answer: "ente.png" },
    { question: "Q3?", answer: "boot.png" },
    { question: "Q4?", answer: "flasche.png" },
    { question: "Q5?", answer: "P5" },
    { question: "Q6?", answer: "P6" },
];

var questions_2 = [
    { question: "Q1?", answer: "seil.png" },
    { question: "Q2?", answer: "ente.png" },
    { question: "Q3?", answer: "boot.png" },
    { question: "Q4?", answer: "flasche.png" },
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
    { picture: "seil.png" },
    { picture: "ente.png" },
    { picture: "boot.png" },
    { picture: "flasche.png" },
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

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
        socket.emit('player_count', users);
    } else if (users.length === 1) {
        users.push(new User(socket.id, [], 0));
        console.log(String(users.length) + " Players connected");
        socket.emit('player_count', users);
    } else if (users.length === 2) {
        users.push(new User(socket.id, [], 0));
        console.log(String(users.length) + " Players connected");
        socket.emit('player_count', users);
    }

    socket.on('start_game', function () {
        createGame(socket);
    });

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
            updateQuestion(id, answer);
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
function createGame(socket) {
    round = 1;
    questionsLeft = 3;
    lives = 3;

    newRound(socket);
}

function newRound(socket) {
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
                currentQuestions.splice(j, 1);
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
        console.log(users[i]);
        io.to(users[i].id).emit('question', users[i].question);
    }
}

function updateQuestion(id, answer) {
    var user = users.find(function (user) {
        if (user.id === id) {
            return user;
        }
    });

    var newQuestionUser;
    for (i = 0; i < users.length; i++) {
        if (users[i].question.answer === answer) {
            for (j = 0; j < currentQuestions.length; j++) {
                if (users[i].pictures.includes(currentQuestions[j].answer) === false) {
                    users[i].question = currentQuestions[j];
                    console.log(users[i].question);
                    currentQuestions.splice(j, 1);
                    newQuestionUser = users[i];
                    break;
                }
            }
        }
    }

    console.log('currentQuestions: ', currentQuestions);
    io.to(`${newQuestionUser.id}`).emit('question', newQuestionUser.question);
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
    { question: "Q3?", answer: "stein.png" },
    { question: "Q4?", answer: "flasche.png" },
    { question: "Q5?", answer: "kurbis.png" },
    { question: "Q6?", answer: "pflock.png" },
];

var questions_2 = [
    { question: "Q1?", answer: "seil.png" },
    { question: "Q2?", answer: "ente.png" },
    { question: "Q3?", answer: "stein.png" },
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
    "seil.png",
    "ente.png",
    "flasche.png",
    "baumstamm.png",
    "fass.png",
    "korb.png",
    "kurbis.png",
    "pfeilbogen.png",
    "pflock.png",
    "schlussel.png",
    "stein.png",
    "tuch.png",
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

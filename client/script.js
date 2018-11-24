var socket = io();

document.addEventListener('keydown', function (event) {
    socket.emit('input', event.key);
});

socket.on('response', function (response) {
    console.log(response);
});

socket.on('game_state', function (gameState) {
    console.log('game_state received', gameState);
    updateMission(gameState.mission);
});

socket.on('game_over', function (message) {
    console.log('game_over', message);
    // TODO: implement game over
});

socket.on('lives_lost', function (lives) {
    lifeLostAnimation();
    console.log('lives_lost', lives);
    // TODO: update lives count
});

socket.on('question', function (question) {
    updateQuestion(question);
});

socket.on('pictures', function (pictures) {
    updatePictures(pictures);
    console.log(pictures);
});

socket.on('player_count', function (users) {
   console.log('users', users);
   for (var i = 1; i <= users.length; i++) {
        var playerEl = document.getElementById('player' + i);
        playerEl.style = "display: flex; justify-content: center; align-items: center;";
   }
   var count = document.getElementById('player-count');
   count.innerHTML = users.length + "/3 Players"
});

function startGame() {
    transitionScreen();
    console.log('game started');
    socket.emit('start_game');
    // TODO: implement game start
}

function transitionScreen() {
    var el1 = document.getElementById('lobby');
    el1.style = "display: none;";
    moveBackground1();

    setTimeout(function () {
        var screenEl = document.getElementById('screen');
        screenEl.style.webkitAnimationPlayState = 'paused';

        var el2 = document.getElementById('transition-screen');
        el2.style = "display: unset;";
    }, 1000);
}
function gameScreen() {
    var el1 = document.getElementById('transition-screen');
    el1.style = "display: none;";

    var screenEl = document.getElementById('screen');
    screenEl.style.webkitAnimationPlayState = 'running';
    // moveBackground2();
    setTimeout(function () {
        var el2 = document.getElementById('game');
        el2.style = "display: unset;";
    }, 1000);
}

function updateQuestion(question) {
    var qEl = document.getElementById('question-text');
    qEl.innerHTML = question.question;
    console.log(question);
}

function updateMission(mission) {
    var mEl = document.getElementById('mission-text');
    mEl.innerHTML = mission;
    console.log('mission updated', mission);
}

function updatePictures(pictures) {
    for (var i = 1; i <= 4; i++) {
        var optionEl = document.getElementById('option' + i);

        // TODO: handle error cases
        optionEl.src = "images/" + pictures[i-1];
        console.log('setting new image ' + i-1);
    }
    console.log('ui updated');
}

function  makeSelection(event) {
    var sourceString = event.srcElement.src.split('/');
    var pictureString = sourceString[sourceString.length - 1];
    console.log('selection made', pictureString);
    socket.emit('selection', pictureString);
}

function lifeLostAnimation() {
    flashScreen();
    shakeScreen();
}

function flashScreen() {
    var flashOverlayEl = document.getElementById('life-lost-overlay');
    flashOverlayEl.style.display = 'block';
    flashOverlayEl.classList.remove('flash');
    void flashOverlayEl.offsetWidth;
    flashOverlayEl.classList.add('flash');
    setTimeout(function () {
        flashOverlayEl.style.display = 'none';
    }, 400);
}

function shakeScreen() {
    var screenEl = document.getElementById('screen');

    screenEl.classList.remove('shake');
    void screenEl.offsetWidth;
    screenEl.classList.add('shake');
}

function moveBackground1() {
    var screenEl = document.getElementById('screen');
    screenEl.classList.add('move-background-1');
}
function moveBackground2() {
    var screenEl = document.getElementById('screen');
    screenEl.classList.remove('move-background-1');
    screenEl.classList.add('move-background-2');
}

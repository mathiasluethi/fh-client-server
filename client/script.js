var socket = io();

document.addEventListener('keydown', function (event) {
    socket.emit('input', event.key);
});

socket.on('response', function (response) {
    console.log(response);
});

socket.on('game_state', function (gameState) {
    console.log('game_state received', gameState);
    hideLobby()
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
    hideLobby()
    console.log('game started');
    socket.emit('start_game');
    // TODO: implement game start
}

function hideLobby() {
    var el1 = document.getElementById('lobby');
    var el2 = document.getElementById('game');
    el1.style = "display: none;";
    el2.style = "display: unset;";
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
    //screenEl.style.animation = '';
    //screenEl.style.animation = 'shake 0.4s 1';
}

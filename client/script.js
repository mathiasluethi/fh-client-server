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

function startGame() {
    console.log('game started');
    socket.emit('start_game');
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
       // optionEl.innerHTML = 'option'+i;
        console.log('setting new image ' + i);
    }
    console.log('ui updated');
}

function  makeSelection(event) {
    var sourceString = event.srcElement.src.split('/');
    var pictureString = sourceString[sourceString.length - 1]
    console.log('selection made', pictureString)
    socket.emit('selection', pictureString);
}

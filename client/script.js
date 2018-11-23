var socket = io();

document.addEventListener('keydown', function (event) {
    socket.emit('input', event.key);
});

function testClick() {
    socket.emit('test', "test");
    console.log("test");
}

socket.on('response', function (response) {
    console.log(response);
});

socket.on('game_state', function (gameState) {
    console.log('game_state received', gameState);
    updateMission(gameState.mission);
});

socket.on('question', function (question) {
    // TODO: fix array
    updateQuestion(question[0]);
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
    var qEl = document.getElementById('question');
    qEl.innerHTML = question.question;
    console.log(question);
}

function updateMission(mission) {
    var mEl = document.getElementById('mission');
    mEl.innerHTML = mission;
    console.log('mission updated', mission);
}

function updatePictures(pictures) {
    for (var i = 1; i <= 4; i++) {
        var optionEl = document.getElementById('option' + i);
        optionEl.innerHTML = 'option'+i;
        console.log('setting new image ' + i);
    }
    console.log('ui updated');
}

function sendClickEvent() {
    socket.emit('selection', 'test');
}

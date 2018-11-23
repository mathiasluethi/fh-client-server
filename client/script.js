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
    updateUI(gameState);
});

socket.on('question', function (question) {
    updateQuestion(question);
});

function startGame() {
    console.log('game started');
    socket.emit('start_game');
}

function updateQuestion(question) {
    var qEl = document.getElementById('question');
    qEl.innerHTML = question;
    console.log('question updated', question);
}

function updateMission(mission) {
    var mEl = document.getElementById('mission');
    mEl.innerHTML = mission;
    console.log('mission updated', mission);
}

function updateUI(gameState) {
    for (var i = 0; i < 4; i++) {
        var optionEl = document.getElementById('option' + i);
        console.log('setting new image ' + i);
    }
    console.log('ui updated');
}

function sendClickEvent() {
    socket.emit('selection', 'test');
}

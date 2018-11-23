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
    updateQuestion();
    updateUI();
});

socket.on('next_question', function (question) {

});

function startGame() {
    console.log('game started');
    socket.emit('start_game');
}

function updateQuestion() {
    console.log('question updated');
}

function updateUI() {
    console.log('ui updated');
}


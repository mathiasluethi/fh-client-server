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

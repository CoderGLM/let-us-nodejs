var child = require('child_process').fork('child.js');

var server = require('net').createServer();
server.on('connection', socket => {
    socket.end('handled by parent\n');
});
server.listen(1337, () => {
    child.send('server', server);
});
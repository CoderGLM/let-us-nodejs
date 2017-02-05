var child = require('child_process');
var server = require('net').createServer();

var child1 = child.fork('child3.js');
var child2 = child.fork('child3.js');

server.on('connection', socket => {
    console.log('parent handled');
});

server.listen(1337, () => {
    child1.send('server', server);
    child2.send('server', server);

    server.close();
})
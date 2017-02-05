// 与parent.js的区别就是，这里会创建多个子进程
var cp = require('child_process');
var child1 = cp.fork('child.js');
var child2 = cp.fork('child.js');

var server = require('net').createServer();
server.on('connection', socket => {
    socket.end('handled by parent\n');
});
server.listen(1337, () => {
    child1.send('server', server);
    child2.send('server', server);

    // 关掉
    server.close();
})
var cp = require('child_process');
var n = cp.fork(__dirname + '/sub.js');
n.on('message', m => {
    console.log('parent got message ', m);
});

n.send({ hello: 'world' });
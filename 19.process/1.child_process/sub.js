process.on('message', m => {
    console.log('child got message ', m);
});
process.send({ foo: 'bar' });
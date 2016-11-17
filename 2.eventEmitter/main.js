import events from 'events';
import util from 'util';
import fs from 'fs';

function Watcher(watchDir, processedDir) {
  this.watchDir = watchDir;
  this.processedDir = processedDir;
}

// 相当于Watcher.prototype = new events.EventEmitter();
util.inherits(Watcher, events.EventEmitter);

/*
 *
 *  这里不能使用箭头函数，因为箭头函数的this默认绑定当前作用域
 *
 *  而当前的是undefind，可以console.log(this);// undefined
 *
 */
Watcher.prototype.watch = function () {
  fs.readdir(this.watchDir, (err, files) => {
    if (err) throw err;
    for (let index in files) {
      watcher.emit('process', files[index]);
    }
  });
};

Watcher.prototype.start = function () {
  fs.watchFile(this.watchDir, () => {
    this.watch();
  });
};

var watchDir = './watch',
    processedDir = './done';

var watcher = new Watcher(watchDir, processedDir);
watcher.on('process', function (file) {
  const watchFile = `${this.watchDir}/${file}`;
  const processedFile = `${this.processedDir}/${file.toLowerCase()}`;
  fs.rename(watchFile, processedFile, err => {
    if (err) throw err;
  });
});

watcher.start();

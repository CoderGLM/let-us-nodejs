import fs from 'fs';
import path from 'path';

let args = process.argv.splice(2);
const command = args.shift();

const description = args.join(' ');
const file = path.join(process.cwd(), '/.tasks');

switch (command) {
case 'list':
  listTasks(file);
  break;
case 'add':
  addTask(file, description);
  break;
default:
  console.log(`Usage: ${process.argv[0]} list|add [description]`);
}

function loadOrInitializeTaskArray (file, cb) {
  fs.exists(file, (exists) => {
    let tasks = [];
    if (exists) {
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) throw err;
        data = data.toString();
        let tasks = JSON.parse(data || '[]');
        cb(tasks);
      });
    } else {
      cb([]);
    }
  });
}

function listTasks (file) {
  loadOrInitializeTaskArray(file, tasks => {
    for (let task of tasks) {
      console.log(task);
    }
  });
}

function storeTasks(file, tasks) {
  fs.writeFile(file, JSON.stringify(tasks), 'utf8', err => {
    if (err) throw err;
    console.log('Saved.');
  });
}

function addTask (file, description) {
  loadOrInitializeTaskArray(file, tasks => {
    tasks.push(description);
    storeTasks(file, tasks);
  });
}

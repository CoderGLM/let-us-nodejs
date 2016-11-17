import fs from 'fs';

let completed = 0,
    tasks = [],
    wordCounts = {},
    filesDir = './text';

function checkIfComplete () {
  completed++;

  if (completed === tasks.length) {
    for (let index in wordCounts) {
      console.log(`${index}: ${wordCounts[index]}`);
    }
  }
}

function countWordsInText (text) {
  let words = text.toString().toLowerCase().split(/\W+/).sort();

  for (let word of words) {
    if (word) {
      wordCounts[word] = wordCounts[word] ? wordCounts[word] + 1 : 1;
    }
  }
}

fs.readdir(filesDir, (err, files) => {
  if (err) throw err;

  for (let file of files) {
    var task = (function (file) {
      return function () {
        fs.readFile(file, (err, text) => {
          if (err) throw err;
          countWordsInText(text);
          checkIfComplete();
        });
      }
    })(`${filesDir}/${file}`);
    tasks.push(task);
  }
  for (let task in tasks) {
    tasks[task]();
  }
});

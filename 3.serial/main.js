/*
 *
 *  串行化执行
 *
 */

import fs from 'fs';
import request from 'request';
import htmlparser from 'htmlparser';

const configFilename = './rss_feed.txt';

function checkForRSSFile () {
  fs.exists(configFilename, exists => {
    if (!exists) return next(new Error(`Missing RSS file: ${configFilename}`));
    next(null, configFilename);
  });
}

function readRSSFile (configFilename) {
  fs.readFile(configFilename, (err, feedList) => {
    if (err) return next(err);
    feedList = feedList.toString().replace(/^\s+|\s+$/g, '').split('\n');
    const random = Math.floor(Math.random() * feedList.length);
    next(null, feedList[random]);
  });
}

function downloadRSSFeed (feedUrl) {
  request({uri: feedUrl}, (err, res, body) => {
    if (err) return next(err);
    if (res.statusCode !== 200) {
      return next(new Error('Abnormal response status code'));
    }
    next(null, body);
  });
}

function parseRSSFeed (rss) {
  let handler = new htmlparser.RssHandler();
  let parser = new htmlparser.Parser(handler);
  parser.parseComplete(rss);

  if (!handler.dom.items.length)  return next(new Error('No RSS items found'));

  var item = handler.dom.items.shift();
  console.log(item.title);
  console.log(item.link);
}

var tasks = [ checkForRSSFile, readRSSFile, downloadRSSFeed, parseRSSFeed ];

function next (err, result) {
  if (err) throw err;

  var currentTask = tasks.shift();

  if (currentTask) currentTask(result);
}
next();

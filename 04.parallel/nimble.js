import flow from 'nimble';
import path from 'path';
import { exec } from 'child_process';

function downloadNode (version, dest, callback) {
  const url = `https://nodejs.org/dist/node-v${version}.tar.gz`;
  const filepath = path.join(dest, `${version}.tar.gz`);

  exec(`curl ${url} > ${filepath}`, callback);
}

flow.series([
  function (callback) {
    flow.parallel([
      function (callback) {
        console.log('Downloading Node v0.4.6...');
        downloadNode('0.4.6', '/tmp', callback);
      },
      function (callback) {
        console.log('Downloading Node v0.4.7...');
        downloadNode('0.4.7', '/tmp', callback);
      }
    ], callback);
  },
  function (callback) {
    console.log('Creating archvie of downloaded files...');
    exec('tar cvf node_distros.tar /tmp/0.4.6.tgz /tmp/0.4.7.tgz', (err, stdout, stderr) => {
      console.log('all done');
      callback();
    });
  }
]);

/*
 *
 *  安装mysql：brew mysql
 *  开启mysql: mysql.server start
 *  创建用户：CREATE USER 'glm';
 *            GRANT ALL PRIVILEGES ON *.* TO 'glm';
 *
 *
 */
import http from 'http';
import mysql from 'mysql';
import work from './lib/timetrack';

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'glm',
  password: '',
  database: 'work'
});

const server = http.createServer((req, res) => {
  switch (req.method) {
    case 'POST':
      switch (req.url) {
        case '/':
          work.add(db, req, res);
          break;
        case '/archive':
          work.archive(db, req, res);
          break;
        case '':
          work.delete(db, req, res);
          break;
      }
      break;
    case 'GET':
      switch (req.url) {
        case '/':
          work.show(db, res);
          break;
        case '/archived':
          work.showArchived(db, res);
          break;
      }
      break;
  }
});

db.query(
  ` create table if not exists work (
    id int(10) not null AUTO_INCREMENT,
    hours decimal(5,2) default 0,
    date DATE,
    archived int(1) default 0,
    description longtext,
    primary key(id)
  )`, err => {
    if (err) throw err;
    console.log('Server started...');
    server.listen(3000, '127.0.0.1');
  }
);

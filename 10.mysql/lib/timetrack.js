import qs from 'querystring';

exports.sendHtml = (res, html) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(html));
  res.end(html);
};

// 解析http post数据
exports.parseReceivedData = (req, cb) => {
  let body = '';
  req.setEncoding('utf8');
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => {
    let data = qs.parse(body);
    cb(data);
  });
};

/* exports.actionForm = (id, path, label) => {
  return `
    <form method="POST" action="${path}">
      <input type="hidden" name="id" value="${id}">
      <input type="submit" value="${label}">
    </form>
  `;
};*/

exports.add = (db, req, res) => {
  exports.parseReceivedData(req, work => {
    db.query(
      `insert into work (hours, date, description) values (?,?,?) `,
      [work.hours, work.date, work.description], err => {
        if (err) throw err;
        exports.show(db, res);
      }
    )
  });
};

exports.delete = (db, req, res) => {
  exports.parseReceivedData(req, work => {
    db.query(`delete from work where id=?`, [work.id], err => {
      if (err) throw err;
      exports.show(db, res);
    });
  });
};

exports.archive = (db, req, res) => {
  exports.parseReceivedData(req, work => {
    db.query(`update work set archived=1 where id=?`, [work.id], err => {
      if (err) throw err;
      exports.show(db, res);
    }
  )});
};

exports.show = (db, res, showArchived) => {
  const sql = `select * from work where archived=? order by date desc`;
  const archiveValue = showArchived ? 1 : 0;
  db.query(sql, [archiveValue], (err, rows) => {
    if (err) throw err;
    let html = showArchived ? '' : '<a href="/archived">Archived Workd</a>';
    html += exports.workhitlistHtml(rows);
    html += exports.workFormHtml();
    exports.sendHtml(res, html);
  });
};

exports.showArchived = (db, res) => {
  exports.show(db, res, true);
};

exports.workhitlistHtml = (rows) => {
  let html = '<table>';
  for (let row of rows) {
    html += `
      <tr>
        <td>${row.date}</td>
        <td>${row.hours}</td>
        <td>${row.description}</td>
      </tr>
    `;
  }
  html += '</table>';
  return html;
};

exports.workFormHtml = () => {
  let html = `
    <form method="POST" action="/">
      <p>Date (YYYY-MM-DD): <br/> <input name="date" type="text"></p>
      <p>Hours worked: <br/><input name="hours" type="text"></p>
      <p>Description:<br/>
        <textarea name="description"></textarea>
      </p>
      <input type="submit" value="Add">
    </form>
  `;
  return html;
};

/*
// 归档按钮
exports.workArchiveForm = (id) => {
  return exports.actionForm(id, '/archive', 'Archive');
}

exports.workDeleteForm = (id) => {
  return exports.actionForm(id, '/delete', 'Delete');
};*/

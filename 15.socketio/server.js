import socketio from 'socket.io'
import http from 'http'
import fs from 'fs'

const app = http.createServer(handler)
const io = socketio.listen(app)
const html = fs.readFileSync('index.html', 'utf8')

function handler (req, res) {
  res.setHeader('Content-Type', '')
  res.setHeader('Content-Length', Buffer.byteLength(html, 'utf8'))
  res.end(html)
}

function tick () {
  let now = new Date().toUTCString()
  io.sockets.send(now)
  setTimeout(tick, 1000)
}

io.sockets.on('connect', (socket) => {
  tick()
})

app.listen(8080)

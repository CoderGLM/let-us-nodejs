import express from 'express'
import http from 'http'
import fs from 'fs'
import url from 'url'
import path from 'path'
import socketio from 'socket.io'

const root = __dirname
const app = express()
const server = http.createServer(app)
const io = socketio.listen(server)

let watchers = {}

app.use((req, res, next) => {
  createWatcher(req)
  next()
})

app.use(express.static(root))

server.listen(3000)

console.log('Server is on available, you can access our website via http://localhost:3000')

function createWatcher(req) {
  if (watchers[absolute]) return

  const file = url.parse(req.url).pathname
  const absolute = path.join(root, file)

  fs.watchFile(absolute, (cur, prev) => {
    if (cur.mtime !== prev.mtime) {
      io.sockets.emit('reload')
    }
  })

  watchers[absolute] = true
}

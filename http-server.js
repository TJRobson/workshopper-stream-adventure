const through = require('through2')
const http = require('http')
const fs = require('fs')

const stream = through(write, end)

function write (buf, _, next) {
  this.push(buf.toString().toUpperCase())
  next()
}

function end (done) { done() }

var server = http.createServer(function (req, res) {
  if (req.method === 'POST') {
    req.pipe(stream).pipe(res)
  }
  else res.end('poop poop\n')
})
server.listen(parseInt(process.argv[2]))



// var server = http.createServer(function (req, res) {
//   if (req.method === 'POST') {
//       req.pipe(through(function (buffer, encoding, next) {
//         this.push(buffer.toString().toUpperCase())
//         next()
//       })).pipe(res)
//   }
//   else res.end('poop poop\n')
// })
// server.listen(parseInt(process.argv[2]))

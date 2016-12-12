const through = require('through2')
const stream = through(write, end)

// var tr = through(function (buffer, encoding, next) {
//   this.push(buffer.toString().toUpperCase())
//   next()
// })
// process.stdin.pipe(tr).pipe(process.stdout)

function write (buffer, encoding, next) {
  this.push(buffer.toString().toUpperCase())
  next()
}

function end (done) {
  done()
}

process.stdin.pipe(stream).pipe(process.stdout)

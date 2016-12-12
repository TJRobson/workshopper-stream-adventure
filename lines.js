const through = require('through2')
const split = require('split')

const stream = through(write, end)

let lineNum = 0

function write (buffer, encoding, next) {
  let line = buffer.toString()
  this.push((lineNum % 2 === 0
    ? line.toLowerCase()
    : line.toUpperCase())
    + '\n'
  )
  lineNum ++
  next()
}

function end (done) {
  done()
}

process.stdin
  .pipe(split())
  .pipe(stream)
  .pipe(process.stdout)

// let lineNum = 0
// let tr = through(function (buffer, encoding, next) {
//   let line = buffer.toString()
//   this.push(lineNum % 2 === 0
//     ? line.toLowerCase() + '\n'
//     : line.toUpperCase() + '\n'
//   )
//   lineNum ++
//   next()
// })
// process.stdin
//   .pipe(split())
//   .pipe(tr)
//   .pipe(process.stdout)

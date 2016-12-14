const trumpet = require('trumpet')
const through = require('through2')
const tr = trumpet()

const thru = through(write, end)

const loud = tr.selectAll('.loud').createStream()
loud.pipe(thru).pipe(loud)

function write (buf, _, next) {
  this.push(buf.toString().toUpperCase())
  next()
}

function end (done) { done() }

process.stdin.pipe(tr).pipe(process.stdout)


// const selectWriteStream = tr.selectAll('.loud', (loud) => {
//     const elementStream = loud.createStream()
//     elementStream.on('data', (buf) => {
//         elementStream.end(buf.toString().toUpperCase())
//     })
// })
//
// process.stdin.pipe(tr).pipe(process.stdout)


// Discussion that explains trumpet and what is happening.

// https://github.com/nodeschool/discussions/issues/1397

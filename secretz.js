const crypto = require('crypto')
const tar = require('tar')
const zlib = require('zlib')
const concat = require('concat-stream')
const parser = tar.Parse()

parser.on('entry', function (ev) {
  if (ev.type !== 'File') return

  const hex = crypto.createHash('md5', { encoding: 'hex' })
  ev.pipe(hex).pipe(concat(function (hash) {
    console.log(hash + ' ' + ev.path)
  }))
})

process.stdin
// process.argv[2] = cipher  process.argv[3] = password
    .pipe(crypto.createDecipher(process.argv[2], process.argv[3]))
    .pipe(zlib.createGunzip())
    .pipe(parser)

const combine = require('stream-combiner')
const through = require('through2')
const split = require('split')
const zlib = require('zlib')

module.exports = function () {
  const groupThru =  through(write, end)
  let genreL

  function write (chunk, en, next) {
    if (chunk.length === 0) { return  next() }

    const parsed = JSON.parse(chunk)
    if (parsed.type === 'genre') {
      if (genreL) {
        this.push(JSON.stringify(genreL) + '\n')
      }
      genreL = {name: parsed.name, books: []}
    }
    else if (parsed.type === 'book') {
      genreL.books.push(parsed.name)
    }
    console.log(genreL)
    next()
  }
  function end (next) {
    if (genreL) { this.push(JSON.stringify(genreL) + '\n') }
    next()
  }

  return combine(
    split(),
    groupThru,
    zlib.createGzip()
  )
}

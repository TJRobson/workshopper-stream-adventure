const concat = require('concat-stream')

process.stdin.pipe(concat(function (thing) {
  const trans = thing.toString().split('').reverse().join('')
  console.log(trans)
}))

// Stream-Adventure's example:
//
// `concat-stream` is a write stream that you can pass a callback to get the
// complete contents of a stream as a single buffer. Here's an example that uses
// concat to buffer POST content in order to JSON.parse() the submitted data:
//
//     var concat = require('concat-stream')
//     var http = require('http')
//
//     var server = http.createServer(function (req, res) {
//         if (req.method === 'POST') {
//             req.pipe(concat(function (body) {
//                 var obj = JSON.parse(body)
//                 res.end(Object.keys(obj).join('\n'))
//             }))
//         }
//         else res.end()
//     })
//     server.listen(5000)

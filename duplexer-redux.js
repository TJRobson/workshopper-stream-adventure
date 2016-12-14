const duplexer = require('duplexer2')
const through = require('through2').obj
const thru = require('through2')
const duplex = require('duplexer2')

module.exports = function (counter) {
    const counts = {}
    const input = through(recorCount, setCount)
    return duplexer({objectMode: true}, input, counter)

    function recorCount (row, _, next) {
        counts[row.country] = (counts[row.country] || 0) + 1
        next()
    }
    function setCount (done) {
        counter.setCounts(counts)
        done()
    }
}

// module.exports = function (counter) {
//     const countries = {}
//
//     const duplex = duplexer({objectMode: true}, through(function (obj, encoding, done) {
//         if (obj.country in countries)
//             countries[obj.country]++
//         else
//             countries[obj.country] = 1
//         done()
//     }), counter)
//
//     duplex.on("finish", function() {
//         counter.setCounts(countries)
//     })
//
//     return duplex
// }

// module.exports = function (counter) {
//   var counts = {}
//   return duplex(thru(record_count, set_count), counter)
//
//   // Shifting the declaration of |counts| after the |return|
//   // statement triggers a "huh what |counts|?" error in record_count:
//   //
//   //     TypeError: Cannot read property 'MX' of undefined
//
//   // Also note this "declare functions after return" trick relies on
//   // function declarations getting picked up during parsing,
//   // unlike function expressions, which only execute when the line
//   // executes. See http://stackoverflow.com/a/336868/72508.
//   function record_count(obj) {
//     var country = obj.country
//     var count = counts[country] || 0
//     counts[country] = count + 1
//   }
//
//   function set_count() {
//     counter.setCounts(counts)
//     counts = {}
//   }
// }

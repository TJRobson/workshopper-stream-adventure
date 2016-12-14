const spawn = require('child_process').spawn
const duplexer = require('duplexer2')

module.exports = function (cmd, args) {
	const proc = spawn(cmd, args)
	return duplexer(proc.stdin, proc.stdout)
}

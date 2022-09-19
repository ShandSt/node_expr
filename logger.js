const url = 'http://melogger.io/log';
const EventEmmiter = require('events');
let emmitter = new EventEmmiter();

class Logger extends EventEmmiter {
	log(message) {
		console.log(message)

		this.emit('messageLogged', {id: 1, url: 'http://2323'});
	}
}

module.exports = Logger;
//module.exports.endPoint = url;

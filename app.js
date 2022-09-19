
const EventEmmiter = require('events');
const Logger = require('./logger');
let logger = new Logger();

logger.on('messageLogged', (arg) => {
	console.log('Listener called', arg);
});

logger.log('message');

const _ = require('underscore');
const k = _.contains([1,2,3], 2)
console.log(k)
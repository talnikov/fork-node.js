var net = require('net');
var fork = require('./fork.js')

net.createServer(function (s) {
	s.write('What is your name?\n');
	fork.fork(function(caller) {
		name = caller.call(s, s.on, ['data']);
		s.end('Hello ' + name);
	});
}).listen(1337, '127.0.0.1');

net.createServer(function (s) {
	s.write('What... is your name?\n');
	fork.fork(function(caller) {
		name = caller.call(s, s.once, ['data']);
		s.write('What... is your quest?\n');
		fork.fork(function(caller) {
			quest = caller.call(s, s.once, ['data']);
			var extra = 'What... is your favourite colour?\n';
			if (/Arthur/i.test(name)) {
				extra = 'What... is the air-speed....\n';
			} else if (/Robin/i.test(name)) {
				extra = 'What... is the capital of Assyria?\n';
			}
			s.write(extra);
			fork.fork(function(caller) {
				extraAnswer = caller.call(s, s.once, ['data']);
				s.end('Go on. Off you go.\n');
			});
		});
	});
}).listen(1338, '127.0.0.1');
var net = require('net');

net.createServer(function (s) {
	s.write('What is your name?\n');
	s.on('data', function (name) {
		s.end('Hello ' + name);
	});
}).listen(1337, '127.0.0.1');

net.createServer(function (s) {
	s.write('What... is your name?\n');
	s.once('data', function (name) {
		s.write('What... is your quest?\n');
		s.once('data', function (quest) {
			var extra = 'What... is your favourite colour?\n';
			if (/Arthur/i.test(name)) {
				extra = 'What... is the air-speed....\n';
			} else if (/Robin/i.test(name)) {
				extra = 'What... is the capital of Assyria?\n';
			}
			s.write(extra);
			s.once('data', function (answer) {
				s.end('Go on. Off you go.\n');
			});
		});
	});
}).listen(1338, '127.0.0.1');
const WebSocket = require('ws');
const url = 'ws://localhost:3000/start';
const connection = new WebSocket(url);

const req = {
	url: 'http://localhost:3000/test',
	connections: 10,
	pipelining: 1,
	duration: 5
};
connection.onopen = () => {
	connection.send(JSON.stringify(req));
};

connection.onerror = (error) => {
	console.log(`WebSocket error: ${error}`);
};

connection.onmessage = (e) => {
	console.log(e.data);
};

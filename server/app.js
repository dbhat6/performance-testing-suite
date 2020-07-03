// const express = require('express');

// const app = express();

// app.use(express.json());

// app.use(startTesting);
// app.use(testModule);

// app.listen(process.env.port || 3000, () => {
// 	console.log('Server started on port: ', 3000 || process.env.port);
// });

const express = require('express');
const app = express();
const webSocket = require('express-ws')(app);

const startTesting = require('./routes/start');
const testModule = require('./routes/test');

app.use(express.json());

app.use(startTesting);
app.use(testModule);

app.listen(process.env.port || 9000, () => {
	console.log('Server started on port: ', 9000 || process.env.port);
});

const express = require('express');

const app = express();

require('express-ws')(app);

const startTesting = require('./routes/start');
const testModule = require('./routes/test');

app.use(express.json());

app.use(startTesting);
app.use(testModule);

app.listen(process.env.port || 9000, () => {
  console.log('Server started on port: ', 9000 || process.env.port);
});

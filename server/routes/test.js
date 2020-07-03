const express = require('express');

const router = express.Router();

router.get('/test', (req, res) => {
	setTimeout(() => {
		res.send('test get');
	}, 1);
});

router.post('/test', (req, res) => {
	res.send('test get');
});

module.exports = router;

const express = require('express');
const autocannon = require('autocannon');

const router = express.Router();

router.ws('/start', async (ws, res) => {
	const handleResults = (err, result) => {
		if (err) {
			console.error(err);
			return ws.send(JSON.stringify(err));
		}
		console.log(result);
		ws.send(JSON.stringify(result));
	};

	ws.on('message', (msg) => {
		try {
			let req = JSON.parse(msg);
			req['body'] = JSON.stringify({
				pharmacyIdentifier: 'HarveysPreprod',
				patientId: 101729,
				patientRxId: 707,
				mediation: 'PN1'
			});
			req['method'] = 'POST';
			req['headers'] = 'Content-Type=application/json';

			const instance = autocannon(req, (err, result) => {
				if (err) handleResults(err);

				handleResults(null, result);
			});

			instance.on('tick', (msg) => handleResults(null, msg));

			instance.on('reqError', (reqError) => handleResults(reqError));

			instance.on('error', (err) => handleResults(err));
		} catch (err) {
			console.log('Error occured', err);
			handleResults(err);
		}
	});
});

module.exports = router;

import React, { useState, useEffect } from 'react';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const callBackend = (callback) => {
	try {
		const client = new W3CWebSocket('ws://localhost:9000/start');

		callback(client);
	} catch (err) {
		console.err(err);
	}
};

const doughnutColor = [ '#36A2EB', '#FF6384' ];
const doughnutLabel = [ 'Completed', 'Not Completed' ];

const Loader = (props) => {
	let loc = useLocation();
	let history = useHistory();
	let goBack;
	let duration = 15;
	let url;
	let connections = 10;
	if (!loc.state || !loc.state.fromHome) {
		goBack = true;
	} else {
		url = loc.state.url;
		duration = loc.state.durations;
		connections = loc.state.connections;
		goBack = false;
	}

	const [ timeCounter, setTimeCounter ] = useState(0);
	const [ doughnutData, setDoughnutData ] = useState([ 0, duration ]);
	const [ client, setClient ] = useState(null);

	let doughnutConf = {
		labels: doughnutLabel,
		datasets: [
			{
				data: doughnutData,
				backgroundColor: doughnutColor,
				hoverBackgroundColor: doughnutColor
			}
		]
	};

	useEffect(() => {
		callBackend((clientBack) => {
			setClient(clientBack);
		});
	}, []);

	useEffect(
		() => {
			if (client != null) {
				client.onopen = () => {
					console.log('WebSocket Client Connected');
					client.send(JSON.stringify({ url: url, duration: duration, connections: connections }));
				};
				client.onerror = (err) => {
					console.log(err);
					alert('Server is not up!');
				};
			} else console.log('client going again');
		},
		[ client ]
	);

	useEffect(
		() => {
			if (client != null)
				client.onmessage = (message) => {
					let messageJSON = JSON.parse(message.data);
					if (messageJSON.counter !== undefined) {
						let oldTimeCounter = timeCounter;
						oldTimeCounter = oldTimeCounter + 1;
						setTimeCounter(oldTimeCounter);
					} else if (messageJSON.finish !== undefined) {
						history.push('/finalresult', { ...messageJSON, fromLoader: true });
					}
				};
			if (timeCounter <= duration) {
				setDoughnutData([ timeCounter, duration - timeCounter ]);
			} else console.log('going again');
		},
		[ client, timeCounter, history, url, duration ]
	);

	if (goBack) {
		console.log('not from home');
		return <Redirect to="/" />;
	} else {
		console.log('from home');
		return (
			<div>
				<h2>Doughnut Example</h2>
				<Doughnut data={doughnutConf} width={100} height={35} />
			</div>
		);
	}
};

export default Loader;

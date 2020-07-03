import React from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { H3, H2 } from 'baseui/typography';
import TableContent from '../components/TableContent';
import FlexDisplay from '../components/FlexDisplay';

const FinalResult = (props) => {
	let loc = useLocation();

	if (!loc.state || !loc.state.fromLoader) {
		console.log('not from loader');
		return <Redirect to="/" />;
	} else {
		// let result = JSON.parse(loc.state)
		console.log('from loader', loc.state);
		let latencyCols = Object.keys(loc.state.latency);
		let latencyRows = Object.values(loc.state.latency);
		let throughputCols = Object.keys(loc.state.throughput);
		let throughputRows = Object.values(loc.state.throughput);
		let requestsCols = Object.keys(loc.state.requests);
		let requestsRows = Object.values(loc.state.requests);
		let httpResponse = [
			loc.state['1xx'],
			loc.state['2xx'],
			loc.state['3xx'],
			loc.state['4xx'],
			loc.state['5xx'],
			loc.state.non2xx
		];
		let httpResponseCols = [ '1xx', '2xx', '3xx', '4xx', '5xx', 'non2xx' ];
		let times = [ { key: 'Start time', value: loc.state.start }, { key: 'End time', value: loc.state.finish } ];
		let dataConf = [
			{ key: 'Connections', value: loc.state.connections },
			{ key: 'Durations', value: loc.state.duration },
			{ key: 'Pipelining', value: loc.state.pipelining },
			{ key: 'Timeouts', value: loc.state.timeouts },
			{ key: 'Errors', value: loc.state.errors }
		];

		return (
			<React.Fragment>
				<H2>SUCCESS!</H2>
				<H3>{loc.state.url}</H3>
				<FlexDisplay display={times} />
				<FlexDisplay display={dataConf} />
				<TableContent rows={[ httpResponse ]} cols={httpResponseCols} heading="HTTP Responses" />
				<TableContent cols={latencyCols} rows={[ latencyRows ]} heading="Latency" />
				<TableContent cols={throughputCols} rows={[ throughputRows ]} heading="Throughput" />
				<TableContent cols={requestsCols} rows={[ requestsRows ]} heading="Requests" />
			</React.Fragment>
		);
	}
};

export default FinalResult;

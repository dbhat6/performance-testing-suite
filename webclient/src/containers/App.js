import React from 'react';

import NavMenu from '../components/NavMenu';
import Routes from '../components/Routes';

import './App.css';
import { Caption2 } from 'baseui/typography';

function App() {
	return (
		<div className="App">
			<NavMenu />
			<Routes />
			<Caption2>Made by Deepak</Caption2>
		</div>
	);
}

export default App;

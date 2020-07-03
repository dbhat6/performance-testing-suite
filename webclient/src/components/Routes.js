import React from 'react';
import { Switch, Route } from 'react-router-dom';

import About from './About';
import Contact from './Contact';
import Home from './Home';
import Loader from '../containers/Loader';
import FinalResult from '../containers/FinalResult';

const Main = () => (
	<Switch>
		<Route exact path="/">
			<Home />
		</Route>
		<Route exact path="/about">
			<About />
		</Route>
		<Route exact path="/contact">
			<Contact />
		</Route>
		<Route exact path="/callBackend">
			<Loader />
		</Route>
		<Route exact path="/finalResult">
			<FinalResult />
		</Route>
	</Switch>
);

export default Main;

import React from 'react';
import { NavLink } from 'react-router-dom';

const NavMenu = (props) => {
	return (
		<nav>
			<ul>
				<li>
					<NavLink activeClassName="current" exact to="/">
						Home
					</NavLink>
				</li>
				<li>
					<NavLink activeClassName="current" to="/about">
						About
					</NavLink>
				</li>
				<li>
					<NavLink activeClassName="current" to="/contact">
						Contact
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default NavMenu;

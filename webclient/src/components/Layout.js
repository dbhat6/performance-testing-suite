import * as React from 'react';
import { useStyletron } from 'baseui';
import { Grid, Cell } from 'baseui/layout-grid';

export default (props) => (
	<Outer>
		<Grid
			gridColumns={props.items.length}
			gridGaps={[ 9 ]}
			gridGutters={[ 9 ]}
			gridMargins={[ 9, 9 ]}
			gridMaxWidth={1440}
		>
			{console.log(props)}
			{props.items.map((item, index) => {
				return (
					<Cell key={index}>
						<Inner>{item}</Inner>
					</Cell>
				);
			})}
		</Grid>
	</Outer>
);

const Outer = ({ children }) => {
	const [ css, theme ] = useStyletron();
	return (
		<div
			className={css({
				background: theme.colors.accent100
			})}
		>
			{children}
		</div>
	);
};

const Inner = ({ children }) => {
	const [ css, theme ] = useStyletron();
	return (
		<div
			className={css({
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				background: theme.colors.accent200,
				color: theme.colors.accent700,
				padding: '.25rem'
			})}
		>
			{children}
		</div>
	);
};

import React from 'react';

const FlexDisplay = (props) => {
	const display = props.display.map((element, index) => {
		return (
			<div key={index}>
				<p>
					{element.key}: {element.value}
				</p>
			</div>
		);
	});
	return <div className="innerBlock">{display}</div>;
};

export default FlexDisplay;

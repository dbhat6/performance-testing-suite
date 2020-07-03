import React from 'react';
import { Heading, HeadingLevel } from 'baseui/heading';
import { Card, StyledBody, StyledAction } from 'baseui/card';
import { buildControls, buildActions } from './FormBuilder';

function FormCard(props) {
	return (
		<React.Fragment>
			<form onSubmit={props.formObject.onFormSubmit}>
				<Card overrides={{ Root: { style: { margin: '10px 0', flex: '0 1 24%' } } }}>
					<StyledBody>
						<HeadingLevel>
							<Heading styleLevel={4}>{props.formObject.heading}</Heading>
							{props.formObject.subHeading ? <p>{props.formObject.subHeading}</p> : null}
							{buildControls(props.formObject.controls, props.errors)}
						</HeadingLevel>
					</StyledBody>
					<StyledAction>{buildActions(props.formObject.actions)}</StyledAction>
				</Card>
			</form>
		</React.Fragment>
	);
}

export default FormCard;

import * as React from 'react';
import { FormControl } from 'baseui/form-control';
import { Checkbox } from 'baseui/checkbox';
import { Input, MaskedInput } from 'baseui/input';
import { PhoneInput, CountrySelectDropdown } from 'baseui/phone-input';
import { Textarea } from 'baseui/textarea';
import { Button } from 'baseui/button';

export function registerControl(element, register) {
	if (element.controlName === 'ignore') return;
	switch (element.type) {
		case 'phone':
			register({ name: element.controlName[0] });
			register({ name: element.controlName[1] }, element.rules);
			break;

		default:
			register({ name: element.controlName }, element.rules);
			break;
	}
}

const getFormErrorMessage = (error) => {
	if (error) {
		switch (error.type) {
			case 'required':
				return 'This field is required';

			case 'pattern':
				return 'Value not valid';

			case 'minLength':
				return 'Value not of valid length';

			case 'maxLength':
				return 'Value not of valid length';

			default:
				break;
		}
	}
};

function errorMessage(element, errors) {
	switch (element.type) {
		case 'phone':
			return errors[element.controlName[1]] && getFormErrorMessage(errors[element.controlName[1]]);

		default:
			return errors[element.controlName] && getFormErrorMessage(errors[element.controlName]);
	}
}

export function buildControls(controls, errors) {
	return controls.map((element, index) => {
		const childControl = (el) => {
			switch (el.type) {
				case 'input':
					return (
						<Input
							value={el.controlValue}
							error={errors[el.controlName]}
							disabled={el.disabled ? el.disabled : false}
							onChange={(event) => el.onValueChange(event)}
							ref={el.ref}
						/>
					);
				case 'number':
					return (
						<Input
							type="number"
							ref={el.ref}
							value={el.controlValue}
							error={errors[el.controlName]}
							disabled={el.disabled ? el.disabled : false}
							onChange={(event) => el.onValueChange(event)}
						/>
					);

				case 'phone':
					return (
						<PhoneInput
							country={el.controlValue ? el.controlValue[0] : undefined}
							text={el.controlValue ? el.controlValue[1] : undefined}
							onTextChange={(event) => {
								el.onValueChange(event);
							}}
							onCountryChange={(event) => {
								el.onInternationalCodeChange(event);
							}}
							overrides={{
								FlagContainer: {
									component: ({ $iso }) => <span>{$iso}</span>
								},
								Input: {
									props: {
										error: errors[el.controlName[1]]
									}
								},
								CountrySelectDropdown: {
									style: {
										maxHeight: '300px'
									}
								},
								CountrySelect: {
									props: {
										disabled: true,
										overrides: {
											Dropdown: {
												component: CountrySelectDropdown
											},
											Popover: {
												props: {
													overrides: {
														Body: { style: { zIndex: '40' } }
													}
												}
											}
										}
									}
								}
							}}
						/>
					);

				case 'text-area':
					return (
						<Textarea
							error={errors[el.controlName]}
							value={el.controlValue}
							disabled={el.disabled ? el.disabled : false}
							onChange={(event) => el.onValueChange(event)}
						/>
					);

				case 'checkbox':
					return (
						<Checkbox checked={el.controlValue} onChange={(event) => el.onValueChange(event)}>
							{el.checkboxText}
						</Checkbox>
					);

				case 'masked-input':
					return (
						<MaskedInput
							mask="(999) 999-9999"
							value={el.controlValue}
							error={errors[el.controlName]}
							disabled={el.disabled ? el.disabled : false}
							onChange={(event) => el.onValueChange(event)}
						/>
					);

				default:
					return <React.Fragment />;
			}
		};

		return (
			<FormControl
				label={element.label}
				caption={element.caption ? element.caption : null}
				error={errors && errorMessage(element, errors)}
				key={index}
			>
				{childControl(element)}
			</FormControl>
		);
	});
}

export function buildActions(actions) {
	return actions.map((element, index) => {
		const childAction = (el) => {
			switch (el.type) {
				case 'submit':
					return (
						<Button
							disabled={element.isLoading ? element.isLoading : false}
							isLoading={element.isLoading ? element.isLoading : false}
							type="submit"
							overrides={{ BaseButton: { style: { width: '100%' } } }}
							key={index}
						>
							{element.buttonText}
						</Button>
					);

				case 'button':
					return (
						<Button
							disabled={element.isLoading}
							isLoading={element.isLoading}
							onClick={element.onButtonClick}
							overrides={{ BaseButton: { style: { width: '100%' } } }}
							key={index}
						>
							{element.buttonText}
						</Button>
					);

				default:
					return <React.Fragment />;
			}
		};

		return childAction(element);
	});
}

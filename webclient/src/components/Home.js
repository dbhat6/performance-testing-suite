import React, { useEffect, useState } from 'react';
import FormCard from './Forms/FormCard';
import { useForm } from 'react-hook-form';
import { registerControl } from './Forms/FormBuilder';
import { useHistory } from 'react-router-dom';

const def = {
	url: 'http://localhost:9080/resource/redirect',
	connections: 10
};

const Home = (props) => {
	const { handleSubmit, register, errors, setValue, triggerValidation, reset } = useForm({ def });

	const [ isSubmit, setIsSubmit ] = useState(false);

	let history = useHistory();

	const handleFormChange = (value, input, setValue, triggerValidation) => {
		console.log(value, input);
		setValue(input, value);
		triggerValidation({ name: input });
	};

	const onSubmit = (values) => {
		setIsSubmit(true);
		reset();
		console.log(values);
		setIsSubmit(false);
		console.log('done');
		history.push('/callBackend', { fromHome: true, ...values });
	};
	const formObject = {
		heading: 'Enter Autocannon Parameters',
		controls: [
			{
				type: 'input',
				label: 'URL',
				controlName: 'url',
				onValueChange: (event) => {
					handleFormChange(event.currentTarget.value, 'url', setValue, triggerValidation);
				},
				rules: {
					pattern: /(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g,
					required: true
				}
			},
			{
				type: 'number',
				label: 'Durations',
				controlName: 'durations',
				onValueChange: (event) => {
					handleFormChange(event.target.value, 'durations', setValue, triggerValidation);
				}
			},
			{
				type: 'number',
				label: 'Connections',
				controlName: 'connections',
				onValueChange: (event) => {
					handleFormChange(event.target.value, 'connections', setValue, triggerValidation);
				}
			}
		],
		actions: [
			{
				type: 'submit',
				buttonText: 'Send',
				isLoading: isSubmit
			}
		],
		onFormSubmit: handleSubmit(onSubmit)
	};

	useEffect(() => {
		formObject.controls.forEach((element) => {
			registerControl(element, register);
		});
	});

	return <FormCard formObject={formObject} errors={errors} />;
};

export default Home;

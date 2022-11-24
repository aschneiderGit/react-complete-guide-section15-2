import useHttp from '../../hooks/use-http';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
	const {isLoading, error, sendRequest} = useHttp();

	const addTask = (taskText, taskAdd) => {
		const generatedId = taskAdd.name; // firebase-specific => "name" contains generated id
		const createdTask = {id: generatedId, text: taskText};

		props.onAddTask(createdTask);
	};

	const enterTaskHandler = async (taskText) => {
		sendRequest(
			{
				method: 'POST',
				body: {text: taskText},
				headers: {
					'Content-Type': 'application/json',
				},
			},
			addTask.bind(null, taskText)
		);
	};

	return (
		<Section>
			<TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
			{error && <p>{error}</p>}
		</Section>
	);
};

export default NewTask;

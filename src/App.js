import React, {useEffect, useState} from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
	const [tasks, setTasks] = useState([]);

	const {isLoading, error, sendRequest} = useHttp();

	useEffect(() => {
		const transformTask = (tasksData) => {
			const loadedTasks = [];

			for (const taskKey in tasksData) {
				loadedTasks.push({id: taskKey, text: tasksData[taskKey].text});
			}

			setTasks(loadedTasks);
		};

		sendRequest({}, transformTask);
	}, [sendRequest]);

	const taskAddHandler = (task) => {
		setTasks((prevTasks) => prevTasks.concat(task));
	};

	return (
		<React.Fragment>
			<NewTask onAddTask={taskAddHandler} />
			<Tasks
				items={tasks}
				loading={isLoading}
				error={error}
				onFetch={sendRequest}
			/>
		</React.Fragment>
	);
}

export default App;

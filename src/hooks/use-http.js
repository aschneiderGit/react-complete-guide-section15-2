import {useCallback, useState} from 'react';

const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendRequest = useCallback(async (requestConfig, applyData) => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(
				'https://react-http-d5e54-default-rtdb.europe-west1.firebasedatabase.app/tasks.json',
				{
					method: requestConfig.method ? requestConfig.method : 'GET',
					body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
					headers: requestConfig.headers ? requestConfig.headers : {},
				}
			);

			if (!response.ok) {
				throw new Error('Request failed!');
			}

			const data = await response.json();

			applyData(data);
		} catch (err) {
			console.log(err);
			setError(err.message || 'Something went wrong!');
		}
		setIsLoading(false);
	}, []);

	return {isLoading, error, sendRequest};
};

export default useHttp;

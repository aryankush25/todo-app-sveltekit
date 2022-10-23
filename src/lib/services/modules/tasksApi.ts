import { ApiRequestMethods } from '$lib/utils/enums';
import request from '../request';

const createTasks = async (description: string, completed: string) => {
	const url = 'tasks';

	const response = await request(
		url,
		ApiRequestMethods.post,
		{ 'Content-Type': 'application/json' },
		{
			description,
			completed
		}
	);

	return response;
};

const getTasks = async () => {
	const url = 'tasks';

	const response = await request(url, ApiRequestMethods.get, {
		'Content-Type': 'application/json'
	});

	return response;
};

const getTask = async (taskId: string) => {
	const url = `tasks/${taskId}`;

	const response = await request(url, ApiRequestMethods.get, {
		'Content-Type': 'application/json'
	});

	return response;
};

const updateTask = async (taskId: string, updatedData: unknown) => {
	const url = `tasks/${taskId}`;

	const response = await request(
		url,
		ApiRequestMethods.patch,
		{ 'Content-Type': 'application/json' },
		updatedData
	);

	return response;
};

const deleteTask = async (taskId: string) => {
	const url = `tasks/${taskId}`;

	const response = await request(url, ApiRequestMethods.delete, {
		'Content-Type': 'application/json'
	});

	return response;
};

const tasksApi = {
	createTasks,
	getTasks,
	getTask,
	updateTask,
	deleteTask
};

export default tasksApi;

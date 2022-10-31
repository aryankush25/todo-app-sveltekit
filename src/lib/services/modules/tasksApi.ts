import { ApiRequestMethods } from '$lib/utils/enums';
import request from '../request';

const createTasks = async (description: string, completed: string) => {
	const url = 'tasks';

	const response = await request(url, ApiRequestMethods.post, {
		body: { description, completed }
	});

	return response;
};

const getTasks = async (authToken?: string) => {
	const url = 'tasks';

	const response = await request(url, ApiRequestMethods.get, { authToken });

	return response;
};

const getTask = async (taskId: string) => {
	const url = `tasks/${taskId}`;

	const response = await request(url, ApiRequestMethods.get);

	return response;
};

const updateTask = async (taskId: string, updatedData: unknown) => {
	const url = `tasks/${taskId}`;

	const response = await request(url, ApiRequestMethods.patch, { body: updatedData });

	return response;
};

const deleteTask = async (taskId: string) => {
	const url = `tasks/${taskId}`;

	const response = await request(url, ApiRequestMethods.delete);

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

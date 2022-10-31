import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { isNilOrEmpty } from '$lib/utils/helpers';
import tasksApi from '$lib/services/modules/tasksApi';

export const load: PageServerLoad = async ({ locals }) => {
	if (isNilOrEmpty(locals.accessToken)) {
		throw redirect(307, '/login');
	}

	const getTasksResponse = await tasksApi.getTasks(locals.accessToken);

	if (!getTasksResponse.success) {
		throw getTasksResponse.error;
	}

	return { tasksList: getTasksResponse.data };
};

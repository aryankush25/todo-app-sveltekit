import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { isNilOrEmpty } from '$lib/utils/helpers';

export const load: PageServerLoad = async ({ locals }) => {
	if (isNilOrEmpty(locals.accessToken)) {
		throw redirect(307, '/login');
	}

	return {};
};

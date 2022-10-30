import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { isPresent } from '$lib/utils/helpers';

export const load: PageServerLoad = async ({ locals }) => {
	if (isPresent(locals.accessToken)) {
		throw redirect(307, '/');
	}

	return {};
};

import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { ACCESS_TOKEN } from '$lib/utils/tokenHelper';
import { isPresent } from '$lib/utils/helpers';

export const load: PageServerLoad = async (args) => {
	const accessToken = args.cookies.get(ACCESS_TOKEN);

	if (isPresent(accessToken)) {
		throw redirect(307, '/');
	}

	return {};
};

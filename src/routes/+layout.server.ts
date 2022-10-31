import type { LayoutServerLoad } from './$types';

export const prerender = true;

// get `locals.user` and pass it to the `page` store
export const load: LayoutServerLoad = async ({ locals }) => {
	return {
		accessToken: locals.accessToken
	};
};

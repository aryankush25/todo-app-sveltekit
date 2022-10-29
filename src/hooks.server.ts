import { isNilOrEmpty } from '$lib/utils/helpers';
import { ACCESS_TOKEN } from '$lib/utils/tokenHelper';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// get cookies from browser
	const accessToken = event.cookies.get(ACCESS_TOKEN);

	if (isNilOrEmpty(accessToken)) {
		// if there is no accessToken load page as normal
		return await resolve(event);
	}

	// if `accessToken` exists set `events.local`
	if (accessToken) {
		event.locals.accessToken = accessToken;
	}

	// load page as normal
	return await resolve(event);
};

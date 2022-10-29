import * as R from 'ramda';
import { isPresent } from '$lib/utils/helpers';

export const ACCESS_TOKEN = 'fifo-access-token';

const getCookie = (cookieName: string) => {
	const name = cookieName + '=';
	const decodedCookie = decodeURIComponent(document.cookie);
	const cookieArr = decodedCookie.split('; ');
	let res;

	cookieArr.forEach((cookie) => {
		if (cookie.indexOf(name) === 0) res = cookie.substring(name.length);
	});

	return res;
};

export const setTokens = ({ accessToken }: { accessToken: string }) => {
	document.cookie = `${ACCESS_TOKEN}=${accessToken}; path=/;`;
};

export const getTokens = () => {
	const tokens = { accessToken: '' };

	const accessToken = getCookie(ACCESS_TOKEN);

	if (isPresent(accessToken)) {
		tokens.accessToken = R.pathOr('', [], accessToken);
	}

	return tokens;
};

export const isTokenPresent = ({ accessToken } = getTokens()) => {
	const isTokenUndefined = accessToken === 'undefined';

	return isPresent(accessToken) && !isTokenUndefined;
};

export const clearTokens = () => {
	document.cookie = `${ACCESS_TOKEN}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

import * as R from 'ramda';
import { isNilOrEmpty } from '$lib/utils/helpers';
import { clearTokens, getTokens } from '$lib/utils/tokenHelper';

const BASE_URL = 'https://task-manager-aryankush25.herokuapp.com/';

const request = async (
	route: string,
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
	header: { [x: string]: string },
	body: unknown,
	noAuth: boolean
) => {
	let myHeaders = {};
	const headerKeys = R.keys(header) as string[];

	myHeaders = R.assoc('Accept', '*/*', myHeaders);

	if (isNilOrEmpty(noAuth)) {
		// Get access token here
		const { accessToken } = getTokens();

		myHeaders = R.assoc('Authorization', `Bearer ${accessToken}`, myHeaders);
	}

	headerKeys.forEach((headerKey) => {
		myHeaders = R.assoc(headerKey, header[headerKey], myHeaders);
	});

	const raw = JSON.stringify(body);

	const requestOptions = {
		method: method,
		headers: myHeaders,
		body: raw
	};

	const response = fetch(BASE_URL + route, requestOptions)
		.then((response) => {
			const contentType = response.headers.get('content-type');

			console.info(`Response of ${route}`, response);
			console.info(`contentType of ${route}`, contentType);

			if (response.ok) {
				if (R.includes('image/png', `${contentType}`)) {
					return response.blob();
				} else if (R.includes('application/json', `${contentType}`)) {
					return response.json();
				}

				return response.text();
			}

			if (response.status === 401) {
				// Clear tokens here and redirect to /login
				clearTokens();

				window.location.replace('/login');
			}

			throw new Error(response.statusText);
		})
		.then((result) => {
			console.info(`Result of ${route}`, result);

			if (result instanceof Blob) {
				return {
					success: true,
					data: URL.createObjectURL(result)
				};
			}

			return {
				success: true,
				data: result
			};
		})
		.catch((error) => {
			console.error(`Error of ${route}`, error);

			return {
				success: false,
				error: error
			};
		});

	return response;
};

export default request;

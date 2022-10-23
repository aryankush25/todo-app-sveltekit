import * as R from 'ramda';
import request from '$lib/services/request';
import { isPresent } from '$lib/utils/helpers';
import { clearTokens, setTokens } from '$lib/utils/tokenHelper';

const loginUserApi = async (email: string, password: string) => {
	const route = 'users/login';
	const method = 'POST';

	const response = await request(
		route,
		method,
		{ 'Content-Type': 'application/json' },
		{
			email: email,
			password: password
		},
		true
	);

	const token = R.pathOr('', ['data', 'token'], response);

	if (response.success && isPresent(token)) {
		setTokens({
			accessToken: token
		});
	}

	return response;
};

const registerUserApi = async (name: string, email: string, password: string) => {
	const route = 'users';
	const method = 'POST';

	const response = await request(
		route,
		method,
		{ 'Content-Type': 'application/json' },
		{
			name: name,
			email: email,
			password: password
		},
		true
	);

	const token = R.pathOr('', ['data', 'token'], response);

	if (response.success && isPresent(token)) {
		setTokens({
			accessToken: token
		});
	}

	return response;
};

const logoutCurrentUser = async () => {
	const route = 'users/logout';
	const method = 'POST';

	const response = await request(route, method, { 'Content-Type': 'application/json' });

	if (response.success) {
		clearTokens();
	}

	return response;
};

const logoutAllUser = async () => {
	const route = 'users/logoutAll';
	const method = 'POST';

	const response = await request(route, method, { 'Content-Type': 'application/json' });

	if (response.success) {
		clearTokens();
	}

	return response;
};

const getCurrentUserApi = async () => {
	const route = 'users/me';
	const method = 'GET';

	const response = await request(route, method, { 'Content-Type': 'application/json' });

	return response;
};

const setCurrentUserApi = async (name: string, age: string) => {
	const route = 'users/me';
	const method = 'PATCH';

	const response = await request(
		route,
		method,
		{ 'Content-Type': 'application/json' },
		{ name, age }
	);

	return response;
};

const getMyAvatar = async () => {
	const route = 'user/me/avatar';
	const method = 'GET';

	const response = await request(route, method, { 'Content-Type': 'application/json' });

	return response;
};

const deleteMyAvatar = async () => {
	const route = 'user/me/avatar';
	const method = 'DELETE';

	const response = await request(route, method, { 'Content-Type': 'application/json' });

	return response;
};

const uploadMyAvatar = async (fileInput: File, name: string) => {
	const route = 'user/me/avatar';
	const method = 'POST';

	const formData = new FormData();
	formData.append('avatar', fileInput, name);

	const response = await request(route, method, {}, formData);

	return response;
};

const deleteMyAccount = async () => {
	const route = 'user/me';
	const method = 'DELETE';

	const response = await request(route, method, { 'Content-Type': 'application/json' });

	return response;
};

const userApis = {
	loginUserApi,
	registerUserApi,
	logoutCurrentUser,
	logoutAllUser,
	getCurrentUserApi,
	setCurrentUserApi,
	getMyAvatar,
	deleteMyAvatar,
	uploadMyAvatar,
	deleteMyAccount
};

export default userApis;

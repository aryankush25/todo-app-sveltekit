import * as R from 'ramda';
import request from '$lib/services/request';
import { isPresent } from '$lib/utils/helpers';
import { clearTokens, setTokens } from '$lib/utils/tokenHelper';
import { ApiRequestMethods } from '$lib/utils/enums';

const loginUserApi = async (email: string, password: string) => {
	const route = 'users/login';

	const response = await request(route, ApiRequestMethods.post, {
		body: { email, password },
		auth: false
	});

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

	const response = await request(route, ApiRequestMethods.post, {
		body: { name, email, password },
		auth: false
	});

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

	const response = await request(route, ApiRequestMethods.post);

	if (response.success) {
		clearTokens();
	}

	return response;
};

const logoutAllUser = async () => {
	const route = 'users/logoutAll';

	const response = await request(route, ApiRequestMethods.post);

	if (response.success) {
		clearTokens();
	}

	return response;
};

const getCurrentUserApi = async () => {
	const route = 'users/me';

	const response = await request(route, ApiRequestMethods.get);

	return response;
};

const setCurrentUserApi = async (name: string, age: string) => {
	const route = 'users/me';

	const response = await request(route, ApiRequestMethods.patch, { body: { name, age } });

	return response;
};

const getMyAvatar = async () => {
	const route = 'user/me/avatar';

	const response = await request(route, ApiRequestMethods.get);

	return response;
};

const deleteMyAvatar = async () => {
	const route = 'user/me/avatar';

	const response = await request(route, ApiRequestMethods.delete);

	return response;
};

const uploadMyAvatar = async (fileInput: File, name: string) => {
	const route = 'user/me/avatar';

	const formData = new FormData();
	formData.append('avatar', fileInput, name);

	const response = await request(route, ApiRequestMethods.post, { header: {}, body: formData });

	return response;
};

const deleteMyAccount = async () => {
	const route = 'user/me';

	const response = await request(route, ApiRequestMethods.delete);

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

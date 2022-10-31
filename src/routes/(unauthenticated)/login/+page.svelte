<script lang="ts">
	import { goto } from '$app/navigation';
	import userApis from '$lib/services/modules/userApis';
	import { AsyncStates } from '$lib/utils/enums';

	let email = 'aryan@gluelabs.com';
	let password = 'test@123';
	let apiState = AsyncStates.initial;

	const handleSubmit = async () => {
		apiState = AsyncStates.inProgress;

		const response = await userApis.loginUserApi(email, password);

		if (response.success) {
			apiState = AsyncStates.success;
			goto('/');
		} else {
			apiState = AsyncStates.error;
		}
	};
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login" />
</svelte:head>

<form on:submit|preventDefault={handleSubmit} class="flex justify-center flex-col items-center">
	<div class="pb-3.5">
		<label for="email" class="block text-sm font-medium text-gray-700">Email</label>

		<div class="relative mt-1 rounded-md shadow-sm">
			<input
				type="text"
				id="email"
				name="email"
				class="block w-full rounded-md border-gray-300 px-5 focus:border-primary focus:ring-primary sm:text-sm"
				bind:value={email}
			/>
		</div>
	</div>

	<div class="pb-3.5">
		<label for="password" class="block text-sm font-medium text-gray-700">Password</label>

		<div class="relative mt-1 rounded-md shadow-sm">
			<input
				type="text"
				id="password"
				name="password"
				class="block w-full rounded-md border-gray-300 px-5 focus:border-primary focus:ring-primary sm:text-sm"
				bind:value={password}
			/>
		</div>
	</div>

	<input
		type="submit"
		class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
		value={apiState === AsyncStates.inProgress
			? 'Logging in...'
			: apiState === AsyncStates.success
			? 'Redirecting...'
			: 'Log in'}
		disabled={[AsyncStates.inProgress, AsyncStates.success].includes(apiState)}
		class:cursor-not-allowed={apiState === AsyncStates.inProgress}
		class:bg-primary={apiState === AsyncStates.inProgress}
		class:text-white={apiState === AsyncStates.inProgress}
	/>
</form>

<script lang="ts">
	import * as R from 'ramda';
	import userApis from '$lib/services/modules/userApis';
	import { AsyncStates } from '$lib/utils/enums';
	import { isPresent } from '$lib/utils/helpers';
	import { goto } from '$app/navigation';

	let name = 'Aryan Agarwal';
	let email = 'aryan@gluelabs.com';
	let password = 'test@123';
	let apiState = AsyncStates.initial;
	let errorMsg = '';

	const handleSubmit = async () => {
		apiState = AsyncStates.inProgress;

		const response = await userApis.registerUserApi(name, email, password);

		if (response.success) {
			apiState = AsyncStates.success;
			goto('/');
		} else {
			apiState = AsyncStates.error;
			errorMsg = R.pathOr('', ['error', 'message'], response);
		}
	};
</script>

<svelte:head>
	<title>Register</title>
	<meta name="description" content="Register" />
</svelte:head>

<form on:submit|preventDefault={handleSubmit}>
	<div class="pb">
		<label for="name">Full name:</label><br />
		<input type="text" id="name" name="name" bind:value={name} /><br />
	</div>

	<div class="pb">
		<label for="email">Email:</label><br />
		<input type="text" id="email" name="email" bind:value={email} /><br />
	</div>

	<div class="pb">
		<label for="password">Password:</label><br />
		<input type="password" id="password" name="password" bind:value={password} /><br />
	</div>

	{#if apiState === AsyncStates.error && isPresent(errorMsg)}
		<div class="pb error">
			{errorMsg}
		</div>
	{/if}

	<input
		type="submit"
		value={apiState === AsyncStates.inProgress
			? 'Registering...'
			: apiState === AsyncStates.success
			? 'Redirecting...'
			: 'Register'}
		disabled={[AsyncStates.inProgress, AsyncStates.success].includes(apiState)}
	/>
</form>

<style>
	form {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.pb {
		padding-bottom: 12px;
	}

	.error {
		color: red;
	}
</style>

<script lang="ts">
	import userApis from '$lib/services/modules/userApis';
	import { AsyncStates } from '$lib/utils/enums';

	let email = 'aryan@gluelabs.com';
	let password = 'test@123';
	let apiState = AsyncStates.initial;

	const handleSubmit = async () => {
		try {
			apiState = AsyncStates.inProgress;

			await userApis.loginUserApi(email, password);

			apiState = AsyncStates.success;
		} catch (error) {
			apiState = AsyncStates.error;
		}
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<div class="pb">
		<label for="email">Email:</label><br />
		<input
			type="text"
			id="email"
			name="email"
			bind:value={email}
			disabled={apiState === AsyncStates.inProgress}
		/><br />
	</div>

	<div class="pb">
		<label for="password">Password:</label><br />
		<input
			type="password"
			id="password"
			name="password"
			bind:value={password}
			disabled={apiState === AsyncStates.inProgress}
		/><br />
	</div>

	<input
		type="submit"
		value={apiState === AsyncStates.inProgress ? 'Logging in...' : 'Log in'}
		disabled={apiState === AsyncStates.inProgress}
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
</style>

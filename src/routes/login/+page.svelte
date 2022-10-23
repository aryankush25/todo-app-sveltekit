<script lang="ts">
	let name = '';
	let password = '';

	function handleSubmit(event: SubmitEvent) {
		console.log('Value', event);
		console.log('event.target', event.target);
		console.log({ name, password });
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<div class="pb">
		<label for="name">Full Name:</label><br />
		<input type="text" id="name" name="name" bind:value={name} /><br />
	</div>

	<div class="pb">
		<label for="password">Password:</label><br />
		<input type="password" id="password" name="password" bind:value={password} /><br />
	</div>

	<input type="submit" value="Submit" />
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

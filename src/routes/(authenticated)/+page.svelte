<script>
	import { page } from '$app/stores';
	import Counter from '$lib/components/Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';

	$: console.log($page.data.tasksList);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="flex flex-col justify-center items-center">
	<h1 class="w-full">
		<span class="welcome w-full block h-0 relative">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" class="absolute w-full h-full top-0 block" />
			</picture>
		</span>
	</h1>

	<div class="table w-6/12 mb-12">
		<div class="table-header-group">
			<div class="table-row">
				<div class="table-cell text-center">Completed</div>
				<div class="table-cell text-center">Task</div>
			</div>
		</div>

		<div class="table-row-group">
			{#each $page.data.tasksList as task (task._id)}
				<div class="table-row">
					<div class="table-cell text-center">
						<input type="checkbox" class="default:ring-2" checked={task.completed} disabled />
					</div>

					<div class="table-cell text-center">{task.description}</div>
				</div>
			{/each}
		</div>
	</div>

	<h2>Wana play? Try our counter.</h2>

	<Counter />
</section>

<style>
	.welcome {
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}
</style>

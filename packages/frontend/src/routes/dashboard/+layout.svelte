<script>
	import Logo from '../../../static/favicon.png';
	import Navbar from '$lib/navbar.svelte';
	import Sidebar from '$lib/sidebar.svelte';

	export const navItems = [
		{ label: 'Home', value: 'home', route: '/dashboard/home' },
		{ label: 'Project', value: 'project', route: '/dashboard/projects' }
		// { label: 'About', value: 'about', route: '/about' },
		// { label: 'Blog', value: 'blog', route: '/blog' },
		// { label: 'Partners', value: 'partners', route: '/partners' }
	];
</script>

<Navbar />
<div class="content">
	<Sidebar />
	<main class="main__content"><slot /></main>
</div>

<style lang="scss">
	@keyframes slideUp {
		from {
			transform: translateY(80px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.content {
		display: flex;
		width: 100%;
		position: relative;
		min-height: 100vh;
		.main__content {
			flex-basis: 80%;
			padding: 20px;
			margin-top: 72px;
			background-color: #000000;
		}
	}

	@media (max-width: 650px) {
		.content {
			.main__content {
				flex-basis: 100%;
			}
		}
	}

</style>

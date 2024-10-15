<script>
	import { page } from '$app/stores';

	export const navItems = [
		{ label: 'Home', value: 'home', route: '/dashboard/home' },
		{ label: 'Projects', value: 'project', route: '/dashboard/projects' },
		{ label: 'Destination', value: 'destination', route: '/dashboard/projects' }
		// { label: 'About', value: 'about', route: '/about' },
		// { label: 'Blog', value: 'blog', route: '/blog' },
		// { label: 'Partners', value: 'partners', route: '/partners' }
	];
</script>

<aside class="sidebar">
	<ul>
		{#each navItems as item}
			<li class={`${$page.url.pathname === item.route ? 'active' : ''}`}>
				<a href={item.route}>{item.label}</a>
			</li>
		{/each}
	</ul>
</aside>

<style lang="scss">
	@import "../styles/styles.scss";
	.sidebar {
		flex-basis: 20%;
		padding: 20px;
		background-color: #1e1e1e;
		margin-top: 72px;
		border-right: 1px solid hsl(155, 6%, 42.5%);

		ul {
			list-style: none;
			padding: 0;
			display: flex;
			flex-direction: column;
			gap: 20px;

			.active {
				background-color: #ffffff;
				a {
					color: #1e1e1e;
				}
			}

			li {
                padding: 10px;
                border-radius: 8px;
				a {
					text-decoration: none;
					color: #ffffff;
					font-family: 'Raleway' 'sans-serif';
				}
			}
		}
	}

	@include respond(ms) {
		.sidebar {
			position: absolute;
			bottom: 0;
            right: 0;
            left: 0;
			margin-top: 10px;
			border-right: none;
			border-top: 1px solid hsl(155, 6%, 42.5%);

			ul {
				display: flex;
				flex-direction: row;
                overflow-x: scroll;
				width: 100%;
				justify-content: space-between;
			}
		}
	}
</style>

<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Logo from '../../static/favicon.png';

	let menuOpen = false;

	const navItems = [
		{ label: 'Home', value: 'home', route: '/dashboard/home' },
		{ label: 'Projects', value: 'project', route: '/dashboard/projects' },
		{ label: 'Destination', value: 'destination', route: '/dashboard/projects' }
	];

	const toggleMobileMenu = () => {
		menuOpen = !menuOpen;
	};
</script>

<nav class="nav">
	<div class="logo__container">
		<img src={Logo} alt="" width="60px" height="60px" />
		<p>STREAM2PEER</p>
	</div>
	<ul class="nav__items">
		<li>My Account</li>
	</ul>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="mobile__nav" on:click={toggleMobileMenu}>
		<div id="icon" />
		<div class={`${menuOpen ? 'icon-close' : 'icon-menu'}`}></div>

		<div class={`${menuOpen ? 'mobile__menu' : 'menu__close'}`}>
			<div class="mobile__top">
				<div class="icon-close"></div>
			</div>
			<div class="menu-items">
				<ul>
					{#each navItems as item}
						<li class={`${$page.url.pathname === item.route ? 'active' : ''}`}>
							<a
								on:click={() => {
									toggleMobileMenu;
									goto(item.route, { replaceState: true });
								}}
								href={item.route}>{item.label}</a
							>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</nav>

<style lang="scss">
	.nav {
		background-color: #1e1e1e;
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		z-index: 100;
		height: 60px;
		border-bottom: 1px solid hsl(155, 6%, 42.5%);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 25px;

		.nav__items {
			display: flex;
			gap: 20px;
			align-items: center;
			list-style: none;

			li {
				font-size: 16px;
				font-weight: 400;
				font-family: 'Raleway', sans-serif;
				padding: 12px 20px;
				border-radius: 30px;
				cursor: pointer;
				color: #ffffff;
			}

			#active {
				color: #000000;
				background-color: #ffffff;
				font-weight: 600;
			}
		}

		.logo__container {
			display: flex;
			align-items: center;
			gap: 10px;
			cursor: pointer;

			p {
				font-family: 'Crimson Text', serif;
				color: #ffffff;
			}
		}

		.nav__icons {
			display: flex;
			gap: 25px;
			align-items: center;

			svg {
				cursor: pointer;
			}
		}

		.mobile__nav {
			cursor: pointer;
			position: relative;
			display: none;
		}
		.mobile__nav__items {
			display: none;
		}
		.mobile__menu {
			display: none;
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			height: 100vh;
			z-index: 1000;
			background-color: #1e1e1e;

			.mobile__top {
				padding: 40px;
				display: flex;
				justify-content: flex-end;
			}
			.menu-items {
				padding: 0 25px 25px 25px;
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
		}
		.menu__close {
			display: none;
		}
	}

	@media (max-width: 650px) {
		.nav {
			.mobile__nav {
				display: block;
				padding-right: 22px;

				icon-menu,
				.icon-menu::before,
				.icon-menu::after,
				.icon-close,
				.icon-close::before,
				.icon-close::after {
					content: '';
					display: block;
					height: 2.7px;
					position: absolute;
					width: 28px;
					border-radius: 20px;
					transition:
						top ease 0.3s,
						transform ease 0.3s 0.3s,
						background 0.3s ease 0.3s;
					background: #ffffff;
				}

				.icon-menu::before {
					top: -7px;
					transition:
						background ease 0.3s,
						top ease 0.3s 0.3s,
						transform ease 0.3s;
				}

				.icon-menu::after {
					top: 7px;
					transition:
						background ease 0.3s,
						top ease 0.3s 0.3s,
						transform ease 0.3s;
				}

				.icon-close {
					background: transparent;
				}

				/* line one of close icon */
				.icon-close::before {
					transform: rotate(45deg);
					top: 0px;
					background: #ffffff;
				}

				/* line two of close icon */
				.icon-close::after {
					transform: rotate(-45deg);
					top: 0px;
					background: #ffffff;
				}
			}

			.nav__items {
				display: none;
			}

			.nav__icons {
				display: none;
			}

			.mobile__nav__items {
				display: flex;
				position: absolute;
				top: 51px;
				right: -20px;
				background-color: #1e1e1e;
				min-width: 220px;
				width: 100%;
				padding: 12px;

				ul {
					display: flex;
					gap: 12px;
					color: #ffffff;
					list-style: none;
					font-family: 'Raleway', 'san-serif';
					align-items: center;
					padding: 0;
					flex-direction: column;
					width: 100%;

					.fade-in {
						animation: slideUp 0.8s forwards;
					}
					.nav__link {
						opacity: 0;
						width: 100%;
						text-align: center;
						padding: 8px;
						transform: translateY(80px);
						transition:
							transform 0.5s ease,
							opacity 0.5s ease;
					}
					.active {
						color: #000000;
						background-color: #ffffff;
						font-weight: 600;
					}
				}
			}
			.mobile__menu {
				display: block;
			}
			.menuopen {
				display: flex;
			}
			.menuclosed {
				display: none;
			}
		}
	}
</style>

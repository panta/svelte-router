import { Router } from './components/components.module.js';

import App from './App.svelte';

let router = new Router(document.body);

router.build({
	name: 'home',
	label: 'Home',
	path: '/',
	handler: async (req, res) => {
		await res.mount(App, { req, router, page: 'Home' });
	},
}, {
	name: 'another',
	label: 'Another',
	path: '/another',
	handler: async (req, res) => {
		await res.mount(App, { req, router, page: 'Another' });
	},
});

router.load();

import crayon from "crayon";
import crayonSvelte from "crayon-svelte";

import pathToRegexp from 'path-to-regexp';


export class Router {
	constructor(target) {
		this.routes = {};
		this.stack = [];
		this.nav = crayon.create();
		this.nav.use(crayonSvelte.router(target));
		this.nav.use(this.track(this));
		if (!router) {
			router = this;
		}
	}

	get crayon() {
		return this.nav;
	}

	get current() {
		let l = this.stack.length;
		if (l >= 1) {
			return this.stack[l-1];
		}
		return null;
	}

	get previous() {
		let l = this.stack.length;
		if (l >= 2) {
			return this.stack[l-2];
		}
		return null;
	}

	track(router) {
		return (req, res) => {	// eslint-disable-line no-unused-vars
			const route = router.findFromPath(req.pathname);
			router.stack.push({ route: route, params: req.params });
		}
	}

	use(handler) {
		this.nav.use(handler);
	}

	build(...args) {
		args.forEach((opts) => {
			this.path(opts);
		})
		return this;
	}

	path(opts) {
		const name = opts.name;
		const handlers = opts.handlers || [opts.handler];
		const label = opts.label || name;
		const labelFunc = (label instanceof Function) ? label : (route) => {	// eslint-disable-line no-unused-vars
			return label;
		};
		this.routes[name] = {
			name: name,
			label: label,
			labelFunc: labelFunc,
			path: opts.path,
			handlers: handlers,
			pathBuilder: pathToRegexp.compile(opts.path),
			regexp: pathToRegexp(opts.path),
		};
		this.nav.path(opts.path, ...handlers);
		return this;
	}

	pathClassic(name, path, ...handlers) {
		return this.path({
			name: name,
			path: path,
			handlers: handlers,
		});
	}

	load() {
		return this.nav.load();
	}

	navigate(pathOrName, params) {
		if (typeof params === 'undefined') {
			// pathOrName is a _path_
			return this.nav.navigate(pathOrName);
		} else {
			// pathOrName is a path _name_
			const path = this.buildPath(pathOrName, params);
			return this.nav.navigate(path);
		}
	}

	routeObject(name) {
		if (!this.routes[name]) {
			console.log(`WARNING: referencing unknown route '${name}'`);
			return {};
		}
		return this.routes[name];
	}

	buildPath(name, params) {
		if (!this.routes[name]) {
			console.log(`WARNING: referencing unknown route '${name}'`);
			return "/unknown";
		}
		return this.routes[name].pathBuilder(params);
	}

	findFromPath(path) {
		for (const name of Object.keys(this.routes)) {
			const route = this.routes[name];
			if (route && route.regexp) {
				const m = route.regexp.exec(path);
				if (m) {
					return route;
				}
			}
		}
		return null;
	}
}

export var router = null;

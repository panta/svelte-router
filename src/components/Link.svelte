<script>
    import queryString from 'query-string';

	export let href="/";
	export let cls="";
	export let name = "";
	export let label = "";
	export let params = {};
	export let query;
	export let router;
	let qs='';

	$: if (router && (name || params)) {
		const route = router.routeObject(name);
		label = route.label || name;
		if (route && route.pathBuilder) {
			href = route.pathBuilder(params);
		}
	}

	$: if (query) {
        qs = '?' + queryString.stringify(query);
	}

	function navigate() {
		router.navigate(name, params, qs);
	}
</script>

<style></style>

<a href="{href}{qs}" class={cls} on:click|preventDefault={navigate}><slot>{label}</slot></a>

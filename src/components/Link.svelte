<script>
	export let href="/";
	export let cls="";
	export let name = "";
	export let label = "";
	export let params = {};
	export let router;

	$: if (router && (name || params)) {
		const route = router.routeObject(name);
		label = route.label || name;
		href = route.pathBuilder(params);
	}
</script>

<style></style>

<a href={href} class={cls}><slot>{label}</slot></a>

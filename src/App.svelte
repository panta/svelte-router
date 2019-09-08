<script>
  import {Link} from "./components/components.module";

  export let req;
  export let router;
  export let page = "unknown";

  function onButtonAnother() {
  	router.navigate('another', {});
  }

  function onButtonHome() {
  	router.navigate('/');
  }
</script>

<style>

</style>

<h1>Welcome to page {page}</h1>

<p>Hello! This is page {page}</p>

<h3>Pages</h3>
<ul>
	<li><Link name="home" {router}>Homepage</Link></li>
	<li><Link name="another" {router} /></li>
</ul>

<button on:click={onButtonAnother}>Go to Another</button>
<button on:click={onButtonHome}>Go to Home</button>

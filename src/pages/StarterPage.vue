<template>
	<div class="starter-page">
		<div class="section text-center">
			<h2>Bienvenu·e sur Académia GABON</h2>
			<h4>Site en maintenance</h4>
			<div slot="header" class="logo-container">
				<img v-lazy="'academialogo.png'" alt="" width="400px" />
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'starter',
}
</script>
<style>
.starter-page {
	min-height: calc(100vh - 95px);
}
</style>

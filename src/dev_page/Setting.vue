<template>
	<div class="starter-page">
		<div class="section text-center">
			<register />
		</div>
	</div>
</template>
<script>
import Register from '@/dev_page/Register.vue'
export default {
	name: 'starter',
	components: {
		Register,
	},
}
</script>
<style>
.starter-page {
	min-height: calc(100vh - 95px);
}
</style>

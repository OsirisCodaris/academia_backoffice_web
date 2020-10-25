<template>
	<div class="starter-page">
		<div class="section text-center">
			<add-book />
		</div>
	</div>
</template>
<script>
import AddBook from '@/dev_page/Setting/AddBook.vue'
export default {
	name: 'starter',
	components: {
		AddBook,
	},
}
</script>
<style>
.starter-page {
	min-height: calc(100vh - 95px);
}
</style>

<template>
	<div class="subjects-page">
		<div class="section text-center">
			<panel title="Gestion des Matières">
				<template slot="show">
					<show-name title="Matières" @update="updated"></show-name>
				</template>
			</panel>
		</div>
	</div>
</template>
<script>
import { Alert, Card, Button, FormGroupInput } from '@/components'
import Panel from '@/dev_page/Setting/Panel'
import ShowName from '@/dev_page/Setting/ShowName'

export default {
	name: 'classes',
	components: {
		Card,
		Alert,
		ShowName,
		Panel,
		[Button.name]: Button,
		[FormGroupInput.name]: FormGroupInput,
	},
	data() {
		return {
			form: {
				title: '',
				cover: null,
				price: 0,
				file: null,
			},
			coverName: 'choisissez une couverture',
			fileName: 'choisissez un document',
			error: false,
			message: false,
		}
	},
	methods: {
		coverFile() {
			this.form.cover = this.$refs.cover.files[0]
			this.coverName = this.form.cover.name
		},
		async insert(data) {
			try {
				this.error = false
				this.message = false
				const response = (await BookServices.insert(formData)).data
				this.message = 'Document ajouté avec succes ' + response.title
			} catch (error) {
				this.error = error.response.data.message
			}
		},
		async updated(row) {
			try {
				this.error = false
				this.message = false
				const response = (await BookServices.insert(formData)).data
				this.message = 'Document ajouté avec succes ' + response.title
			} catch (error) {
				this.error = error.response.data.message
			}
		},
	},
}
</script>
<style>
.subjects-page {
	min-height: calc(100vh - 95px);
}
</style>

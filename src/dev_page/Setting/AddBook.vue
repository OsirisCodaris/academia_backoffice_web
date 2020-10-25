<template>
	<div class="starter-page">
		<div class="section text-center">
			<div class="container">
				<card raised>
					<h4 class="card-title text-left text-muted ">
						Ajoutez un livre
					</h4>
					<div class="card-text blockquote">
						<fg-input default class="input-lg">
							<div class="custom-file input-lg">
								<label class="custom-file-label" for="cover">{{
									coverName
								}}</label>
								<input
									type="file"
									class="custom-file-input"
									id="cover"
									ref="cover"
									@change="coverFile"
									accept="image/*"
								/>
							</div>
						</fg-input>

						<fg-input
							type="String"
							class="no-border input-lg"
							addon-left-icon="now-ui-icons users_circle-08"
							placeholder="Titre du document..."
							v-model="form.title"
						>
						</fg-input>

						<fg-input
							type="Number"
							class="no-border input-lg"
							addon-left-icon="now-ui-icons users_circle-08"
							placeholder="Nom complet..."
							v-model="form.price"
						>
						</fg-input>
						<fg-input default class="input-lg">
							<div class="custom-file">
								<label class="custom-file-label" for="file">{{
									fileName
								}}</label>
								<input
									type="file"
									class="custom-file-input"
									id="file"
									ref="file"
									@change="docFile"
									accept="application/pdf"
								/>
							</div>
						</fg-input>
					</div>
					<alert type="danger" v-if="error" class="col-12">{{ error }}</alert>
					<alert type="success" v-if="message" class="col-12">{{
						message
					}}</alert>
					<div class="text-right">
						<n-button type="success" @click="addBook">Enregistrer</n-button>
					</div>
				</card>
			</div>
		</div>
	</div>
</template>
<script>
import { Alert, Card, Button, FormGroupInput } from '@/components'
import BookServices from '@/services/BookServices'

export default {
	name: 'starter',
	components: {
		Card,
		Alert,
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
		docFile() {
			this.form.file = this.$refs.file.files[0]
			this.fileName = this.form.file.name
		},
		async addBook() {
			const formData = new FormData()
			formData.append('title', this.form.title)
			if (this.form.price) {
				formData.append('price', this.form.price)
			}
			if (this.form.cover) {
				formData.append('cover', this.form.cover)
			}
			formData.append('file', this.form.file)
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
.starter-page {
	min-height: calc(100vh - 95px);
}
</style>

<template>
	<card raised>
		<h4 class="card-title">
			<div class="row">
				<div class="text-left text-muted col-6">
					{{ title }}
				</div>
				<div class="text-right text-muted col-6">
					{{ data.length }}
				</div>
			</div>
		</h4>
		<div class="card-text blockquote">
			<fg-input
				type="String"
				class="no-border input-lg"
				addon-left-icon="now-ui-icons users_circle-08"
				:placeholder="name || 'Titre du document...'"
				v-model="form.name"
				@click="resetData"
			>
			</fg-input>
		</div>
		<div class="row">
			<div class="text-left col-6">
				<n-button type="danger" @click="deleted">Supprimer</n-button>
			</div>
			<div class="text-right col-6" v-if="data.length <= 1">
				<n-button type="success" @click="register">Enregistrer</n-button>
			</div>
		</div>
	</card>
</template>
<script>
import { Alert, Card, Button, FormGroupInput } from '@/components'
import BookServices from '@/services/BookServices'

export default {
	name: 'showclass',
	props: {
		title: String,
		data: {
			type: Array,
			// eslint-disable-next-line vue/require-valid-default-prop
			default: [],
		},
	},
	components: {
		Card,
		Alert,
		[Button.name]: Button,
		[FormGroupInput.name]: FormGroupInput,
	},
	data() {
		return {
			form: {
				name: this.name,
			},
		}
	},
	computed: {
		name() {
			var text = ''
			text = this.data.length === 1 ? this.data[0].name : ''
			if (this.data.length > 1) {
				this.data.forEach((element) => {
					text = element.name + ';' + text
				})
			}
			return text
		},
	},
	methods: {
		deleted() {
			this.$emit('delete', this.data)
		},
		register() {
			if (this.data.length === 1) {
				this.$emit('update', { row: this.data[0], name: this.form.name })
			} else if (this.data.length === 0) {
				this.$emit('insert', this.form)
			}
		},
		resetData() {
			if (this.data.length > 1) [(this.data = [])]
		},
	},
}
</script>
<style>
.starter-page {
	min-height: calc(100vh - 95px);
}
</style>

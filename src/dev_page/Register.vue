<template>
	<div class="page-header clear-filter" filter-color="green">
		<div
			class="page-header-image"
			style="background-image: url('../../public/image/register.jpg')"
		></div>
		<div class="content ">
			<div class="container ">
				<h1>Site en Maintenance</h1>
				<div class="col-md-8 ml-auto mr-auto ">
					<card type="login" plain>
						<div slot="header" class="logo-container">
							<img v-lazy="'img/now-logo.png'" alt="" />
						</div>
						<template slot="raw-content">
							<div class="row">
								<fg-input
									class="no-border input-lg col-12"
									addon-left-icon="now-ui-icons users_circle-08"
									placeholder="Nom complet..."
									v-model="form.fullname"
								>
								</fg-input>
								<fg-input
									class="no-border input-lg col-12"
									addon-left-icon="now-ui-icons users_circle-08"
									placeholder="Email..."
									type="email"
									v-model="form.email"
								>
								</fg-input>

								<fg-input
									class="no-border input-lg col-md-6"
									addon-left-icon="now-ui-icons tech_mobile"
									placeholder="Téléphone 1..."
									type="number"
									v-model="form.phone1"
								>
								</fg-input>
								<fg-input
									class="no-border input-lg col-md-6"
									addon-left-icon="now-ui-icons tech_mobile"
									placeholder="Téléphone 2..."
									type="number"
									v-model="form.phone2"
								>
								</fg-input>
								<fg-input
									class="no-border input-lg col-md-12"
									addon-left-icon="now-ui-icons objects_key-25"
									placeholder="Mot de passe..."
									type="password"
									v-model="form.password"
								>
								</fg-input>
								<fg-input
									class="no-border input-lg col-md-12"
									addon-left-icon="now-ui-icons objects_key-25"
									placeholder="Confirmer le mot de passe..."
									type="password"
									v-model="confirm"
								>
								</fg-input>
							</div>
							<div class="card-footer row justify-content-center">
								<alert type="success" v-if="success" class="col-12">{{
									success
								}}</alert>
								<alert type="danger" v-if="error" class="col-12">{{
									error
								}}</alert>
								<div class="col-md-6 col-10">
									<n-button type="default" @click="register" round
										>Enregistrement</n-button
									>
								</div>
							</div>
						</template>
					</card>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { Alert, Card, Button, FormGroupInput } from '@/components'
import AuthentificationServices from '@/services/AuthentificationServices'
export default {
	name: 'login-page',
	bodyClass: 'login-page',
	components: {
		Card,
		Alert,
		[Button.name]: Button,
		[FormGroupInput.name]: FormGroupInput,
	},
	data() {
		return {
			form: {
				fullname: '',
				email: '',
				phone1: '',
				phone2: '',
				password: '',
			},
			confirm: '',
			error: false,
			success: false,
		}
	},
	methods: {
		async register() {
			try {
				this.success = this.error = false
				if (this.confirm && this.confirm === this.form.password) {
					const response = (await AuthentificationServices.register(this.form))
						.data
					this.success = 'Utilisateur enregistrer avec succès'
				}
			} catch (error) {
				this.error = error.response.data.message
			}
		},
	},
}
</script>
<style></style>

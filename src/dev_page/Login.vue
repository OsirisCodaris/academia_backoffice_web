<template>
	<div class="page-header clear-filter" filter-color="green">
		<div
			class="page-header-image"
			style="background-image: url('image/login.jpg')"
		></div>
		<div class="content">
			<div class="container">
				<div class="col-md-5 ml-auto mr-auto">
					<card type="login" plain>
						<div class="text-center" slot="header">
							<img v-lazy="'logo.png'" alt="" style="width: 250px" />
						</div>

						<fg-input
							class="no-border input-lg"
							addon-left-icon="now-ui-icons users_circle-08"
							placeholder="Nom complet..."
							v-model="form.fullname"
						>
						</fg-input>

						<fg-input
							class="no-border input-lg"
							addon-left-icon="now-ui-icons objects_key-25"
							placeholder="Mot de passe..."
							type="password"
							v-model="form.password"
						>
						</fg-input>
						<alert type="danger" v-if="error" class="col-12">{{ error }}</alert>
						<template slot="raw-content">
							<div class="card-footer text-center">
								<n-button type="default" @click="login" round class="col-6"
									>Connexion
									<div class="fas fa-spinner fa-pulse" v-if="isloading"></div>
								</n-button>
							</div>
							<div class="pull-right">
								<h6>
									<a href="#pablo" class="link footer-link"
										>Mot de passe oublié?</a
									>
								</h6>
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
import localStore from '@/store/localstorageservice.js'
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
			isloading: false,
			form: {
				fullname: '',
				password: '',
			},
			error: false,
		}
	},
	methods: {
		async login() {
			try {
				this.isloading = true
				this.error = false
				if (this.form) {
					const response = (await AuthentificationServices.login(this.form))
						.data
					this.$store.dispatch('setUser', {
						idusers: response.idusers,
						fullname: response.fullname,
						email: response.email,
						role: response.role,
					})
					if (
						this.$store.state.user.role == 'CODARIS' ||
						this.$store.state.user.role == 'ACADEMIA'
					) {
						localStore.setToken({
							access_token: response.token,
							refresh_token: response.refreshToken,
						})
						this.$store.dispatch('setToken', response.token)
						this.$store.dispatch('setRefresh', response.refreshToken)
					} else {
						throw new Error('Veuillez vous connecté via notre application')
					}

					this.isloading = false
					if (this.$route.params.nextUrl != null) {
						this.$router.push(this.$route.params.nextUrl)
					} else {
						this.$router.push('/dashboard')
					}
				}
			} catch (error) {
				this.isloading = false

				console.log(error)
				this.error = error.response ? error.response.data.message : error
			}
		},
	},
}
</script>
<style></style>

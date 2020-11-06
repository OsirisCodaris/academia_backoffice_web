<template>
	<navbar position="fixed" type="default" menu-classes="ml-auto">
		<template slot-scope="">
			<router-link class="navbar-brand" to="/">
				<img src="logo.png" width="40" />
				Académia
			</router-link>
		</template>
		<template slot="navbar-menu">
			<li class="nav-item" v-if="$store.state.isUserLoggedIn">
				<a class="nav-link" href="#/dashboard">
					<i class="now-ui-icons design_palette"></i>
					<p>Tableau de bord</p>
				</a>
			</li>
			<li class="nav-item" v-if="$store.state.isUserLoggedIn">
				<drop-down tag="div" title="Classes" icon="now-ui-icons education_hat">
					<a class="dropdown-item" href="#/classes">Gestion</a>
					<a class="dropdown-item" href="#/classesubjects"
						>Associer aux matières</a
					>
				</drop-down>
			</li>
			<li class="nav-item" v-if="$store.state.isUserLoggedIn">
				<a class="nav-link" href="#/subjects">
					<i class="now-ui-icons design-2_ruler-pencil"></i>
					<p>Matières</p>
				</a>
			</li>
			<li class="nav-item" v-if="$store.state.isUserLoggedIn">
				<a class="nav-link" href="#/typedocs">
					<i class="now-ui-icons education_agenda-bookmark"></i>
					<p>Catégories</p>
				</a>
			</li>
			<li class="nav-item" v-if="$store.state.isUserLoggedIn">
				<a class="nav-link" href="#/documents">
					<i class="now-ui-icons education_paper"></i>
					<p>Documents</p>
				</a>
			</li>
			<li
				class="nav-item"
				v-if="$store.state.user ? $store.state.user.role == 'CODARIS' : false"
			>
				<a class="nav-link" href="#/setting">
					<i class="now-ui-icons ui-1_settings-gear-63"></i>
					<p>Setting</p>
				</a>
			</li>
			<li class="nav-item" v-if="$store.state.isUserLoggedIn">
				<drop-down
					tag="div"
					:title="$store.state.user ? $store.state.user.fullname : unknown"
					icon="now-ui-icons users_circle-08"
				>
					<p class="dropdown-item">
						{{ $store.state.user ? $store.state.user.email : unknown }}
					</p>
					<p class="dropdown-item ">
						{{ $store.state.user ? $store.state.user.role : unknown }}
					</p>
					<a class="dropdown-item" @click="logout">
						<i class="now-ui-icons media-1_button-power"></i>
						<p>Déconnexion</p>
					</a>
				</drop-down>
			</li>

			<li class="nav-item" v-if="!$store.state.isUserLoggedIn">
				<a class="nav-link" href="#/login">
					<i class="now-ui-icons users_circle-08"></i>
					<p>Connexion</p>
				</a>
			</li>
		</template>
	</navbar>
</template>

<script>
import { DropDown, NavbarToggleButton, Navbar, NavLink } from '@/components'
import LocalStorageService from '@/store/localstorageservice'

export default {
	name: 'main-navbar',
	components: {
		DropDown,
		Navbar,
		NavbarToggleButton,
		NavLink,
	},
	methods: {
		logout() {
			const localStorageService = LocalStorageService.getService()
			localStorageService.clearToken()
			this.$store.dispatch('setUser', null)
			this.$store.dispatch('setToken', null)
			this.$store.dispatch('setRefresh', null)
			this.$router.push('/')
		},
	},
}
</script>

<style scoped></style>

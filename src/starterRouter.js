import Vue from 'vue'
import Router from 'vue-router'
import Starter from './pages/StarterPage.vue'
import StarterNavbar from './layout/StarterNavbar.vue'
import StarterFooter from './layout/StarterFooter.vue'
import Login from './dev_page/Login.vue'
import Register from './dev_page/Register.vue'
import Book from './dev_page/Book.vue'
import Classes from './dev_page/Classes/Classes.vue'
import ClasseSubject from './dev_page/Classes/ClasseSubject.vue'

import Subjects from './dev_page/Subjects/Subjects.vue'
import TypeDocs from './dev_page/TypeDocs/TypeDocs.vue'
import Docs from './dev_page/Documents/Docs.vue'

import Setting from './dev_page/Setting.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'index',
			components: {
				default: Starter,
				header: StarterNavbar,
				footer: StarterFooter,
			},
			props: {
				header: {
					colorOnScroll: 400,
				},
				footer: {
					backgroundColor: 'black',
				},
			},
		},
		{
			path: '/login',
			name: 'login',
			components: {
				default: Login,
				header: StarterNavbar,
				footer: StarterFooter,
			},
			props: {
				header: {
					colorOnScroll: 400,
				},
				footer: {
					backgroundColor: 'black',
				},
			},
		},
		{
			path: '/register',
			name: 'register',
			components: {
				default: Register,
				header: StarterNavbar,
				footer: StarterFooter,
			},
			props: {
				header: {
					colorOnScroll: 400,
				},
				footer: {
					backgroundColor: 'black',
				},
			},
		},
		{
			path: '/book',
			name: 'book',
			components: {
				default: Book,
				header: StarterNavbar,
				footer: StarterFooter,
			},
			props: {
				header: {
					colorOnScroll: 400,
				},
				footer: {
					backgroundColor: 'black',
				},
			},
		},
		{
			path: '/classes',
			name: 'classes',
			components: {
				default: Classes,
				header: StarterNavbar,
				footer: StarterFooter,
			},
			props: {
				header: {
					colorOnScroll: 400,
				},
				footer: {
					backgroundColor: 'black',
				},
			},
		},
		{
			path: '/classesubjects',
			name: 'classesubjects',
			components: {
				default: ClasseSubject,
				header: StarterNavbar,
				footer: StarterFooter,
			},
			props: {
				header: {
					colorOnScroll: 400,
				},
				footer: {
					backgroundColor: 'black',
				},
			},
		},
		{
			path: '/subjects',
			name: 'subjects',
			components: {
				default: Subjects,
				header: StarterNavbar,
				footer: StarterFooter,
			},
			props: {
				header: {
					colorOnScroll: 400,
				},
				footer: {
					backgroundColor: 'black',
				},
			},
		},
		{
			path: '/typedocs',
			name: 'typedocs',
			components: {
				default: TypeDocs,
				header: StarterNavbar,
				footer: StarterFooter,
			},
			props: {
				header: {
					colorOnScroll: 400,
				},
				footer: {
					backgroundColor: 'black',
				},
			},
		},
		{
			path: '/documents',
			name: 'documents',
			components: {
				default: Docs,
				header: StarterNavbar,
				footer: StarterFooter,
			},
			props: {
				header: {
					colorOnScroll: 400,
				},
				footer: {
					backgroundColor: 'black',
				},
			},
		},
		{
			path: '/setting',
			name: 'setting',
			components: {
				default: Setting,
				header: StarterNavbar,
				footer: StarterFooter,
			},
			props: {
				header: {
					colorOnScroll: 400,
				},
				footer: {
					backgroundColor: 'black',
				},
			},
		},
	],
	scrollBehavior: (to) => {
		if (to.hash) {
			return {
				selector: to.hash,
			}
		} else {
			return {
				x: 0,
				y: 0,
			}
		}
	},
})

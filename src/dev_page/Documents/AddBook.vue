<template>
	<div class="addBook">
		<h4 class="card-title text-left text-muted ">
			Document
		</h4>
		<div class="card-text blockquote">
			<fg-input
				type="String"
				class="no-border input-lg"
				addon-left-icon="now-ui-icons users_circle-08"
				placeholder="Titre du document..."
				v-model="form.title"
			>
			</fg-input>
			<fg-input>
				<select
					class="custom-select "
					id="inputGroupSelect01"
					v-model="form.year"
				>
					<option selected value="-1">Choisir l'année...</option>
					<option v-for="year in years" :key="year" v-bind:value="year">{{
						year
					}}</option>
				</select>
			</fg-input>
			<fg-input default class="input-lg">
				<div class="custom-file input-lg">
					<label class="custom-file-label" for="file">{{ docName }}</label>
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
			<n-switch v-model="form.statusDoc">
				<span slot="label">
					Document gratuit / payant
				</span>
				<i class="now-ui-icons business_money-coins" slot="on"></i>
				<i
					class="now-ui-icons ui-1_lock-circle-open"
					style="color:red;"
					slot="off"
				></i>
			</n-switch>

			<fg-input default class="input-lg">
				<div class="custom-file">
					<label class="custom-file-label" for="file">{{ ansName }}</label>
					<input
						type="file"
						class="custom-file-input"
						id="ans"
						ref="ans"
						@change="ansFile"
						accept="application/pdf"
					/>
				</div>
			</fg-input>
			<n-switch v-model="form.statusAns">
				<span slot="label">
					Correction gratuit / payant
				</span>
				<i class="now-ui-icons business_money-coins" slot="on"></i>
				<i
					class="now-ui-icons ui-1_lock-circle-open"
					style="color:red;"
					slot="off"
				></i>
			</n-switch>
			<fg-input>
				<select
					class="custom-select "
					id="inputGroupSelect1"
					@change="getClasses"
					v-model="selectedSubject"
				>
					<option selected value="-1">Choisir une matières...</option>
					<option
						v-for="subject in subjects"
						:key="subject.idsubjects"
						v-bind:value="subject.idsubjects"
						>{{ subject.name }}</option
					>
				</select>
			</fg-input>
			<div class="row text-left ">
				<div
					class="col col-md-2 col-12 col-sm-3 m-2"
					v-for="classe in classes"
					:key="classe.idclasses"
				>
					<n-checkbox
						:disabled="classe.disabled"
						@input="oncheck(classe)"
						:checked="classe.status"
						>{{ classe.name }}</n-checkbox
					>
				</div>
			</div>
			<fg-input
				type="String"
				class="no-border input-lg"
				addon-left-icon="now-ui-icons users_circle-08"
				placeholder="notion1;notion2;notion3;..."
				v-model="form.notion"
			>
			</fg-input>
		</div>
		<alert type="danger" v-if="error" class="col-12">{{ error }}</alert>
		<alert type="success" v-if="message" class="col-12">{{ message }}</alert>
		<div class="text-right">
			<n-button type="success">Enregistrer</n-button>
		</div>
	</div>
</template>

<script>
import {
	Alert,
	Card,
	Button,
	FormGroupInput,
	Switch,
	Checkbox,
} from '@/components'
import { DatePicker } from 'element-ui'
import ClasseService from '@/services/ClasseService'
import SubjectService from '@/services/SubjectService'
import ClasseSubjectService from '@/services/ClasseSubjectService'
import Utils from '@/utils/Utils'

export default {
	name: 'starter',
	components: {
		Card,
		Alert,
		[Switch.name]: Switch,
		[Button.name]: Button,
		[DatePicker.name]: DatePicker,
		[FormGroupInput.name]: FormGroupInput,
		[Checkbox.name]: Checkbox,
	},
	data() {
		return {
			years: [],
			selectedSubject: -1,
			classes: [],
			subjects: [],
			classeSubject: [],
			regClasse: [],
			form: {
				title: '',
				year: -1,
				file: null,
				statusDoc: false,
				ans: null,
				statusAns: false,
				notion: '',
			},
			docName: 'Inserer document',
			ansName: 'Inserer correction',
			error: false,
			message: false,
		}
	},
	methods: {
		ansFile() {
			this.form.ans = this.$refs.ans.files[0]
			this.ansName = this.form.ans.name
		},
		docFile() {
			this.form.file = this.$refs.file.files[0]
			this.docName = this.form.file.name
		},
		async getClasses() {
			try {
				this.resetStatus()
				//	this.warning = this.error = this.message = false

				if (this.selectedSubject != -1) {
					this.error = false
					const response = (
						await ClasseSubjectService.classe(this.selectedSubject)
					).data

					this.classeSubject = response.subjectHasClasses
					this.classeSubject = this.classeSubject.map((element) => {
						delete element.subjectsHasClasses
						element['status'] = false
						element['disabled'] = true

						return element
					})
					this.Checked()
				} else {
				}
			} catch (error) {
				this.error = error.response.data.error
			}
		},
		Checked() {
			this.classes = this.classes.map((classe) => {
				classe.disabled = !Utils(this.classeSubject, classe)
				return classe
			})
		},
		resetStatus() {
			this.classes = this.classes.map((classe) => {
				classe['status'] = false
				classe['disabled'] = true
				return classe
			})
		},
		oncheck(classe1) {
			this.classes = this.classes.map((classe) => {
				if (classe1.idclasses == classe.idclasses) {
					classe.status = !classe1.status
				}
				return classe
			})
			//	this.warning = this.selectedClass != -1 ? true : false
			//	this.error = this.message = false
			return classe.status
		},
	},
	async mounted() {
		let date1 = new Date()
		let firstDate = 2000
		for (var i = 0; firstDate + i <= date1.getFullYear(); i++) {
			this.years.push(firstDate + i)
		}
		try {
			this.error = false
			this.message = false
			const responseClasse = (await ClasseService.index()).data
			this.classes = responseClasse.rows
			const responseSubject = (await SubjectService.index()).data
			this.subjects = responseSubject.rows
			this.resetStatus()
		} catch (error) {
			console.log(error)
			this.error = error.response.data.error
		}
	},
}
</script>
<style>
.addBook {
	width: 100%;
}
</style>

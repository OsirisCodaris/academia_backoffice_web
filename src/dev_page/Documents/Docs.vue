<template>
	<div class="class-page">
		<div class="section text-center">
			<div class="m-2">
				<card raised>
					<table-doc
						ref="table"
						:data="data"
						:head="headers"
						@addRow="add"
					></table-doc>
				</card>
			</div>
			<n-button type="primary" @click.native="modals.classic = true">
				Classic modal
			</n-button>
			<modal
				:show.sync="modals.classic"
				modal-classes="modal-lg"
				headerClasses="justify-content-center"
			>
				<add-book></add-book>
				<template slot="footer">
					<n-button>Nice Button</n-button>
					<n-button type="danger" @click.native="modals.classic = false"
						>Close</n-button
					>
				</template>
			</modal>
		</div>
	</div>
</template>
<script>
import {
	Alert,
	Card,
	Button,
	FormGroupInput,
	TableDoc,
	Modal,
} from '@/components'
import AddBook from '@/dev_page/Documents/AddBook'
import DocService from '@/services/DocService'
import CustomView from './AddBook.vue'
function operateFormatter(value, row, index) {
	return '<a class="like" href="javascript:void(0)" title="Like"><i class="fa fa-edit"></i></a>'
}

window.operateEvents = {
	'click .like': function(e, value, row, index) {
		alert('You click like action, row: ' + JSON.stringify(row))
	},
}
export default {
	name: 'classes',
	components: {
		Card,
		Alert,
		AddBook,
		TableDoc,
		Modal,
		[Button.name]: Button,
		[FormGroupInput.name]: FormGroupInput,
	},
	data() {
		return {
			VIEW_NAME: 'unique-name',
			data: DocService.url(),
			classeSelected: [],
			error: false,
			message: false,
			modals: {
				classic: false,
			},
			event: (window.operateEvents = {
				'click .like': function(e, value, row, index) {
					alert('You click like action, row: ' + JSON.stringify(row))
				},
			}),
			headers: [
				{
					field: 'state',
					checkbox: true,
				},
				{
					title: 'ID',
					field: 'iddocuments',
					sortable: true,
					formatter: this.nameFormat,
				},
				{
					field: 'name',
					title: 'Nom',
					sortable: true,
					formatter: this.nameFormat,
				},
				{
					field: 'year',
					title: 'Année',
					sortable: true,
					formatter: this.nameFormat,
				},
				{
					field: 'status',
					title: 'Disponibilité',
					sortable: true,
					formatter: (value) => {
						return value === true
							? "<p class='text-success'>privé</p>"
							: "<p class='text-danger'>public</p>"
					},
				},
				{
					field: 'docAnswer.pathfile',
					title: 'Corrigé',
					sortable: true,
					formatter: this.answerFormat,
				},
				{
					field: 'docAnswer.status',
					title: 'Disponibilité',
					formatter: this.statusFormat,
				},
				{
					field: 'operate',
					title: 'Options',
					align: 'center',
					clickToSelect: false,
					events: (window.operateEvents = {
						'click .like': this.edit,
					}),
					formatter: operateFormatter,
				},
			],
		}
	},
	methods: {
		add() {
			this.modals.classic = true
		},
		nameFormat(value) {
			return `<p> ${value} </p>`
		},
		statusFormat(value) {
			if (value != undefined) {
				return value === true
					? "<p class='text-success'>privé</p>"
					: "<p class='text-danger'>public</p>"
			}
			return value
		},
		answerFormat(value) {
			if (value != undefined) {
				return this.nameFormat('Oui')
			}
			return value
		},
		edit(e, value, row, index) {
			this.modals.classic = true
		},
	},
}
</script>
<style>
.class-page {
	min-height: calc(100vh - 95px);
}
</style>

import axios from 'axios'
import store from '@/store/store'
import config from './Config'
export default () => {
	return axios.create({
		baseURL: config.baseUrl,
		headers: {
			Authorization: `Bearer ${store.state.token}`,
		},
	})
}

import { GetTest } from "../../api/test/"

export default {
	state:{
		test: []
	},
	mutations: {
		SET_TEST (state, val) {
			state.test = val
		}
	},
	actions:{
		loadTest ({commit}) {
			GetTest().then( (data) => {
				if (data.data && data.data.length > 0) {
					commit('SET_TEST', data.data)
				}
			})
		}
	},
	getters:{
		getTest (state) {
			return state.test
		}
	}
}

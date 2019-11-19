import Vue from 'vue'
import Vuex from 'vuex'
import authorize from './modules/authorize'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		authorize
	}
})

export default store

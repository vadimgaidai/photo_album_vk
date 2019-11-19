import Vue from 'vue'
import Vuex from 'vuex'
import authorize from './modules/authorize'
import photo from './modules/photo'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		authorize,
		photo
	}
})

export default store

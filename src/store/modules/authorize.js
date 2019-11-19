export default {
    state: {
        authorize: ''
    },
    actions: {
        loginUser({commit}) {
            commit('SET_LOGIN_USER')
        },
        logoutUser({commit}) {
            commit('SET_LOGOUT_USER')
        },
        checkStatus({commit}) {
            commit('SET_CHECK_USER')
        }
    },
    mutations: {
        SET_LOGIN_USER(state) {
            VK.Auth.login((response) => {
                state.authorize = response.status
                if (response.status === 'connected') {
                    let user = response.session.user
                    console.log(user)
                }
			},VK.access.PHOTOS)
        },
        SET_LOGOUT_USER(state) {
            VK.Auth.logout((response) => {
                state.authorize = response.status
            })
        },
        SET_CHECK_USER(state) {
            VK.Observer.subscribe('auth.statusChange', (response) => {
                state.authorize = response.status
            })
        }
    },
    getters: {
        getAuthorize(state) {
            return state.authorize
        }
    }
}
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
        },
        async loadPhotoAlbums ({commit}) {
            await commit('SET_PHOTO_ALBUMS')
        }
    },
    mutations: {
        SET_LOGIN_USER(state) {
            VK.Auth.login((response) => {
                state.authorize = response.status
                if (response.status === 'connected') {
                    console.log(response)
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
        },
        SET_PHOTO_ALBUMS () {
            VK.Api.call(
                'photos.getAlbums', // название метода API https://vk.com/dev/methods
                // параметры:
                {
                    v: '5.52', // версия API (обязательный параметр)
                }, (response) => {
                    console.log(response)
                }
            )
        }
    },
    getters: {
        getAuthorize(state) {
            return state.authorize
        }
    }
}
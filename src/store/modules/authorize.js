export default {
    state: {
        authorize: '',
        albums: [],
        user: ''
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
                    state.user = response.session.user.first_name + ' ' + response.session.user.last_name
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
        SET_PHOTO_ALBUMS (state) {
            VK.Api.call(
                'photos.getAlbums', // название метода API https://vk.com/dev/methods
                // параметры:
                {
                    need_system: 1,
                    photo_sizes: 1,
                    v: '5.52', // версия API (обязательный параметр)
                }, (response) => {
                    state.albums = response.response.items
                }
            )
        }
    },
    getters: {
        getAuthorize(state) {
            return state.authorize
        },
        getAlbums(state) {
            return state.albums
        },
        getUser(state) {
            return state.user
        }
    }
}
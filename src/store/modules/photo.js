import { settle } from "when"

export default {
    state: {
        albums: [],
        photos: []
    },
    actions: {
        async loadPhotoAlbums ({commit}) {
            await commit('SET_PHOTO_ALBUMS')
        },
        async loadPhotos({commit}, id) {
            await commit('SET_PHOTOS', id)
        }
    },
    mutations: {
        SET_PHOTO_ALBUMS (state) {
            VK.Api.call(
                'photos.getAlbums', // название метода API https://vk.com/dev/methods
                // параметры:
                {
                    need_covers: 1,
                    need_system: 1,
                    v: '5.52', // версия API (обязательный параметр)
                }, (response) => {
                    state.albums = response.response.items
                }
            )
        },
        SET_PHOTOS(state, item) {
            if (item && state.albums && state.albums.length > 0) {
                VK.Api.call(
                    'photos.get', // название метода API https://vk.com/dev/methods
                    // параметры:
                    {
                        album_id: item.id,
                        v: '5.52', // версия API (обязательный параметр)
                    }, (response) => {
                        state.photos = response.response.items
                    }
                )
            }
        }
    },
    getters: {
        getAlbums(state) {
            return state.albums
        }, 
        getPhotosId: (state) => (slug) => {
			let idToTitle = 0
			if (slug) {
                idToTitle = state.albums.find((item)=> {
                    if (item.title === slug) {
                        return item.id
                    }
                })
				return idToTitle
			} else {
				return ''
			}
        },
        getPhotos(state) {
            return state.photos
        }
    }
}
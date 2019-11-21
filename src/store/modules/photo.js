
export default {
    state: {
        albums: [],
        uploadAlbums: [],
        photos: [],
        photo: {},
        server: {}
    },
    actions: {
        async loadAllPhotoAlbums ({commit}) {
            await commit('SET_ALL_PHOTO_ALBUMS')
        },
        async loadUploadPhotoAlbums ({commit}) {
            await commit('SET_UPLOAD_PHOTO_ALBUMS')
        },
        async loadPhotos({commit}, id) {
            await commit('SET_PHOTOS', id)
        },
        async loadOnePhoto({commit}, data) {
            await commit('SET_ONE_PHOTO', data)
        }, 
        refreshPhoto({commit}) {
            commit('REFREASH_ONE_PHOTO')
        },
        async loadSrcUploadServer({commit}, data) {
            await commit('SET_SRC_UPLOAD_SERVER', data)
        }
    },
    mutations: {
        SET_ALL_PHOTO_ALBUMS (state) {
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
        SET_UPLOAD_PHOTO_ALBUMS (state) {
            VK.Api.call(
                'photos.getAlbums', // название метода API https://vk.com/dev/methods
                // параметры:
                {
                    need_covers: 1,
                    v: '5.52', // версия API (обязательный параметр)
                }, (response) => {
                    state.uploadAlbums = response.response.items
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
                        photo_sizes: 1,
                        extended: 1,
                        count: 1000,
                        v: '5.52', // версия API (обязательный параметр)
                    }, (response) => {
                        state.photos = response.response.items
                    }
                )
            }
        },
        SET_ONE_PHOTO (state, data) {
            if (data && data.photoID && data.albumID && data.albumID.id) {
                VK.Api.call(
                    'photos.get', // название метода API https://vk.com/dev/methods
                    // параметры:
                    {
                        photo_ids: data.photoID,
                        album_id: data.albumID.id,
                        photo_sizes: 1,
                        extended: 1,
                        v: '5.52', // версия API (обязательный параметр)
                    }, (response) => {
                        state.photo = response.response.items[0]
                    }
                )
            }
        },
        REFREASH_ONE_PHOTO (state) {
            state.photo = {}
        },
        SET_SRC_UPLOAD_SERVER (state, data) {
            VK.Api.call(
                'photos.getUploadServer', // название метода API https://vk.com/dev/methods
                // параметры:
                {
                    album_id: data,
                    v: '5.52', // версия API (обязательный параметр)
                }, (response) => {
                    console.log(response)
                    state.server = response
                }
            )
        }
    },
    getters: {
        getAllAlbums(state) {
            return state.albums
        }, 
        getUploadAlbums(state) {
            return state.uploadAlbums
        }, 
        getAlbumsSlug: (state) => (id) => {
            let slug = ''
			if (id) {
                slug = state.albums.find((item)=> {
                    if (item.id === id) {
                        return item
                    }
                })
				return slug.title
			} else {
				return ''
			}
        },
        getPhotos(state) {
            return state.photos
        },
        getOnePhoto (state) {
            return state.photo
        },
        getUploadServer (state) {
            return state.server
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
        getMaxSizePhoto: () => (item) => {
            let width = []
			item.map((elem) => {
				width.push(elem.width)
			})
			let image = item.find((elem) => {
				if (elem.width === Math.max.apply(null, width)) {
					return elem
				}
			})
			return image.src
        },
        getMobileSizePhoto: () => (item) => {
            let width = []
			item.map((elem) => {
				width.push(elem.type)
			})
			let image = item.find((elem) => {
				if (elem.type === "x" || elem.type === "y") {
					return elem
				}
			})
			return image.src
        }
    }
}
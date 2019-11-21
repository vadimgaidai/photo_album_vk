<template>
	<Main class="droap">
		<div class="droap__inner">
			<h1 class="droap__title">
				Drag’n’drop file uploads
			</h1>
			<p class="droap__text">
				* only to albums into which the current user can upload photos
			</p>
			<div 
				class="droap__content" 
				v-if="getAuthorize === 'connected'"
			>
				<select 
					name="Select"
					@change="onChangeEvent($event)"
				>
					<option selected hidden>Selected album</option>
					<option
						v-for="item in getUploadAlbums"
						:key="item.id"
						:value="item.id"
					>
						{{item.title}}
					</option>
				</select>
				<vue-dropzone 
					ref="myVueDropzone" 
					id="dropzone" 
					v-on:vdropzone-sending="sendingEvent"
					:options="dropzoneOptions"
				>
				</vue-dropzone>
			</div>
			<Authorize 
				:user="getUser"
				:authorize="getAuthorize"
				v-else
			/>  
			<button 
				class="droap__button"
				v-show="getAuthorize === 'connected' && select"
			>
				Save
			</button>
		</div>
	</Main>
</template>

<script>
import Main from '@/components/main/'
import Icon from '@/components/SvgIcon'
import Authorize from '@/components/authorize'

import { mapGetters, mapActions } from 'vuex'

export default {
	transition: {
		name: 'fade',
		mode: 'out-in'
	},
	name: 'droap',
	components: {
		Main,
		Icon,
		Authorize
	},
	async mounted() {
		await this.$store.dispatch('checkStatus')
	},
	data() {
		return { 
			select: false,
			serverID: null,
			dropzoneOptions: {
				url: 'https://httpbin.org/post',
				thumbnailWidth: 150,
				maxFilesize: 0.5,
				headers: { "My-Awesome-Header": "header value" }
			}
		}
	},
	methods: {
		loadAlbums() {
			this.$store.dispatch('loadUploadPhotoAlbums')
		},
		onChangeEvent(event) {
			VK.Api.call(
                'photos.getUploadServer', // название метода API https://vk.com/dev/methods
                // параметры:
                {
					album_id: Number(event.target.value),
					group_id: 0,
                    v: '5.52', // версия API (обязательный параметр)
                }, (response) => {
                    if(response && response.response && response.response.upload_url) {
						console.log(response.response.upload_url)
                        this.dropzoneOptions.url = response.response.upload_url
                    }
                }
            )
		},
		sendingEvent (file, xhr, formData) {
			console.log(file)
		}
	},
	computed: {
		...mapGetters([
			'getUploadAlbums',
			'getAuthorize',
			'getUploadServer',
			'getUser'
		])
	},
	watch: {
		'$route' () {
			this.$store.dispatch('checkStatus')
		},
		'getAuthorize' () {
			this.getAuthorize === 'connected' ? this.loadAlbums() : null
		}
	}
}
</script>

<style lang="stylus">
// Базовые стили
@import 'droap.styl'
	// Адаптив
@import './droap-tablet.styl'
@import './droap-mobile.styl'
</style>

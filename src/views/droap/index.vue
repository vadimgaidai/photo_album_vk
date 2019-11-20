<template>
	<Main class="droap">
		<div class="droap__inner">
			<h1 class="droap__title">
				Drag’n’drop file uploads
			</h1>
			<vue-dropzone 
				ref="myVueDropzone" 
				id="dropzone" 
				:options="dropzoneOptions"
				v-if="getAuthorize === 'connected'"
			>
			</vue-dropzone>
			<Authorize 
				:user="getUser"
				:authorize="getAuthorize"
				v-else
			/>  
			<button 
				class="droap__button"
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
		await this.$store.dispatch('loadSrcUploadServer', '')
		this.$store.dispatch('checkStatus')
	},
	data() {
		return{ 
			dropzoneOptions: {
				url: 'https://httpbin.org/post',
				thumbnailWidth: 150,
				maxFilesize: 0.5
			}
		}
	},
	methods: {
		loadAlbums() {
			this.$store.dispatch('loadPhotoAlbums')
		}
	},
	computed: {
		...mapGetters([
			'getAlbums',
			'getAuthorize',
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

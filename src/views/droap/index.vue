<template>
	<Main class="droap">
		<div class="droap__inner">
			<h1 class="droap__title">
				Drag’n’drop file uploads
			</h1>
			<Authorize 
				:user="getUser"
				:authorize="getAuthorize"
			/>  
			<p class="droap__text">
				* only to albums into which the current user can upload photos
			</p>
			<select 
				name="Select"
				@change="onChangeEvent($event)"
				v-show="getAuthorize === 'connected'"
				class="droap__select"
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
				:options="dropzoneOptions"
				v-show="getAuthorize === 'connected' && select"
			>
			</vue-dropzone>
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
		this.getAuthorize === 'connected' ? this.loadAlbums() : null
	},
	data() {
		return { 
			select: false,
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
			this.$store.dispatch('loadSrcUploadServer', event.target.value)
			this.select = true
		}
	},
	computed: {
		...mapGetters([
			'getUploadAlbums',
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

<template>
	<Main class="onePhoto">
		<h1 class="onePhoto__title">
			onePhoto
		</h1>
		<button 
			class="onePhoto__back"
			@click="getBack"
		>
			&lt; Back to album
		</button>
		{{returnContent}}
	</Main>
</template>

<script>
import Main from '@/components/main/'
import Load from '@/components/load'

import { mapGetters, mapActions } from 'vuex'

export default {
	transition: {
		name: 'fade',
		mode: 'out-in'
	},
	name: 'gallery',
	components: {
		Main,
		Load
	},
	data () {
		return {
		}
	},
	methods: {
		getBack() {
			window.history.back()
		}
	},
	async mounted() {
		await this.$store.dispatch('loadPhotos', this.getId)
	},
	computed: {
		...mapGetters([
			'getPhotosId',
			'getOnePhoto'
		]),
		getId() {
			if (this.getPhotosId && this.$route.params.photos) {
				return this.getPhotosId(this.$route.params.photos)
			} else {
				return ''
			}
		},
		returnContent() {
			if (this.getOnePhoto && this.$route.params.onePhoto) {
				return this.getOnePhoto(this.$route.params.onePhoto)
			}
		}
	}
}
</script>

<style lang="stylus">
// Базовые стили
@import 'onePhoto.styl'
// Адаптив
@import './onePhoto-tablet.styl'
@import './onePhoto-mobile.styl'
</style>

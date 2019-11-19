<template>
	<Main class="photos">

		<img 
			v-for="item in returnPhotos"
			:key="item.id"
			:src="item.photo_604" 
			alt=""
		>
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
	name: 'photos',
	components: {
		Main,
		Load
	},
	async mounted() {
		await this.$store.dispatch('loadPhotos', this.getId)
	},
	data () {
		return {
		}
	},
	computed: {
		...mapGetters([
			'getPhotosId',
			'getPhotos'
		]),
		getId() {
			if (this.getPhotosId && this.$route.params.photos) {
				return this.getPhotosId(this.$route.params.photos)
			} else {
				return ''
			}
		},
		returnPhotos() {
			if (this.getPhotos && this.getPhotos.length > 0) {
				return this.getPhotos
			} else {
				return []
			}
		}
	}
}
</script>

<style lang="stylus">
// Базовые стили
@import 'photos.styl'
// Адаптив
@import './photos-tablet.styl'
@import './photos-mobile.styl'
</style>

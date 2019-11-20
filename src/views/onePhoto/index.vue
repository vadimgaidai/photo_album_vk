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
		<div class="onePhoto__content">
			<div 
				class="onePhoto__photo"
				v-lazy-container="{ selector: 'img' }"
			>
				<img 
					:data-src="returnPhoto" 
					data-error="https://image.flaticon.com/icons/svg/148/148766.svg"
					data-loading="https://i.imgur.com/jzm1D5H.gif"
					:alt="returnContent.id" 
					class="onePhoto__photo--image">
			</div>
		</div>
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
	async mounted() {
		await this.$store.dispatch('loadPhotos', this.getId)
	},
	methods: {
		getBack() {
			window.history.back()
		}
	},
	computed: {
		...mapGetters([
			'getPhotosId',
			'getOnePhoto',
			'getMaxSizePhoto'
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
		},
		returnPhoto() {
			if (this.getMaxSizePhoto && this.returnContent && this.returnContent.sizes) {
				return this.getMaxSizePhoto(this.returnContent.sizes)
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

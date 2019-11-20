<template>
	<Main class="onePhoto">
		<h1 class="onePhoto__title">
			Photo
		</h1>
		<button 
			class="onePhoto__back"
			@click="getBack"
		>
			&lt; Back to album
		</button>
		<div class="onePhoto__inner">
			<div 
				class="onePhoto__photo"
				v-lazy-container="{ selector: 'img' }"
			>
				<img 
					:data-src="returnPhoto" 
					data-error="https://image.flaticon.com/icons/svg/148/148766.svg"
					data-loading="https://svgshare.com/i/GG8.svg"
					:alt="returnID" 
					class="onePhoto__photo--image">
			</div>
			<p class="onePhoto__text">
				ID: {{returnID}}
			</p>	
			<p class="onePhoto__text">
				Date: {{returnDate}}
			</p>
			<p class="onePhoto__text">
				Likes: {{returnLikes}}
			</p>
			<p class="onePhoto__text">
				Comments: {{returnComments}}
			</p>
			<p class="onePhoto__text" v-show="returnText">
				Text: {{returnText}}
			</p>
		</div>
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
		},
		returnDate () {
			if (this.returnContent && this.returnContent.date) {
				let date = new Date(this.returnContent.date * 1000)
				let day = date.getDate()
				if (day < 10) day = '0' + day
				let month = date.getMonth() + 1
				if (month < 10) month = '0' + month
				let year = date.getFullYear() % 100
				if (year < 10) year = '0' + year
				return day + '.' + month + '.' + year
			}
			return ''
		},
		returnID() {
			return this.returnContent && this.returnContent.id ? this.returnContent.id : ''
		},
		returnLikes() {
			return this.returnContent && this.returnContent.likes && this.returnContent.likes.count ? this.returnContent.likes.count : ''
		},
		returnComments() {
			return this.returnContent && this.returnContent.comments && this.returnContent.comments.count ? this.returnContent.comments.count : ''
		},
		returnText() {
			return this.returnContent && this.returnContent.text ? this.returnContent.text : ''
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

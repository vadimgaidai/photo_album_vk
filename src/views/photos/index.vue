<template>
	<Main class="photos">
		<div class="photos__inner">
			<h1 class="photos__title">
				Photos from the album "{{$route.params.photos}}"
			</h1>
			<button 
				class="photos__back"
				@click="getBack"
			>
				&lt; Back to gallery
			</button>
			<div class="photos__content" v-if="width >= 768">
				<div class="photos__column">
					<Card 
						v-for="card in filterOne"
						:key="card.id"
						:item="card"
						:elemets="'photos'"
						:slug="returnSlug + '/' + String(card.id)"
					/>
				</div>
				<div class="photos__column">
					<Card 
						v-for="card in filterTwo"
						:key="card.id"
						:item="card"
						:elemets="'photos'"
						:slug="returnSlug + '/' + String(card.id)"
					/>
				</div>
				<div class="photos__column">
					<Card 
						v-for="card in filterThree"
						:key="card.id"
						:item="card"
						:elemets="'photos'"
						:slug="returnSlug + '/' + String(card.id)"
					/>
				</div>
			</div>
			<div class="photos__content" v-else>
				<div class="photos__column">
					<Card 
						v-for="card in filterOneMobile"
						:key="card.id"
						:item="card"
						:elemets="'photos'"
						:slug="returnSlug + '/' + String(card.id)"
					/>
				</div>
				<div class="photos__column">
					<Card 
						v-for="card in filterTwoMobile"
						:key="card.id"
						:item="card"
						:elemets="'photos'"
						:slug="returnSlug + '/' + String(card.id)"
					/>
				</div>
			</div>
		</div>
	</Main>
</template>

<script>
import Main from '@/components/main/'
import Load from '@/components/load'
import Card from '@/components/card'

import { mapGetters, mapActions } from 'vuex'

export default {
	transition: {
		name: 'fade',
		mode: 'out-in'
	},
	name: 'photos',
	components: {
		Main,
		Load,
		Card
	},
	async mounted() {
		await this.$store.dispatch('loadPhotos', this.getId)
		window.addEventListener('resize', this.returnWidth)
		this.returnWidth()
	},
	data () {
		return {
			width: 0
		}
	},
	methods: {
		getBack () {
			this.$router.push('/gallery')
		},
		returnWidth() {
			this.width =  window.screen.availWidth
		}
	},
	computed: {
		...mapGetters([
			'getPhotosId',
			'getPhotos',
			'getAlbumsSlug'
		]),
		getId() {
			if (this.getPhotosId && this.$route.params.photos) {
				return this.getPhotosId(this.$route.params.photos)
			} else {
				return ''
			}
		},
		returnSlug() {
			if (this.getAlbumsSlug && this.getId && this.getId.id) {
				return this.getAlbumsSlug(this.getId.id)
			}
		},
		returnPhotos() {
			if (this.getPhotos && this.getPhotos.length > 0) {
				return this.getPhotos
			} else {
				return []
			}
		},
		filterOne () {
			let newArray = []
			for (let i = 0; i < this.returnPhotos.length; i++) {
				if ((i % 3) === 0) {
					newArray.push(this.returnPhotos[i])
				}
			}
			return newArray
		},
		filterTwo () {
			let newArray = []
			for (let i = 0; i < this.returnPhotos.length; i++) {
				if ((i % 3) === 1) {
					newArray.push(this.returnPhotos[i])
				}
			}
			return newArray
		},
		filterThree () {
			let newArray = []
			for (let i = 0; i < this.returnPhotos.length; i++) {
				if ((i % 3) === 2) {
					newArray.push(this.returnPhotos[i])
				}
			}
			return newArray
		},
		filterOneMobile () {
			let newArray = []
			for (let i = 0; i < this.returnPhotos.length; i++) {
				if ((i % 2) === 0) {
					newArray.push(this.returnPhotos[i])
				}
			}
			return newArray
		},
		filterTwoMobile () {
			let newArray = []
			for (let i = 0; i < this.returnPhotos.length; i++) {
				if ((i % 2) === 1) {
					newArray.push(this.returnPhotos[i])
				}
			}
			return newArray
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

<template>
	<Main class="gallery">
		<h1 class="gallery__title">
			Gallery
		</h1>
		<div class="gallery__inner">
			<Authorize 
				:user="getUser"
				:authorize="getAuthorize"
			/>   
			<div class="gallery__wrap" v-if="getAuthorize === 'connected'">
				<transition name="content" mode="out-in">
					<div
						v-if="getAllAlbums && getAllAlbums.length > 0"
					>
						<Card 
							v-for="card in getAllAlbums"
							:key="card.id"
							:item="card"
							:elemets="'albums'"
							:slug="'gallery/' + card.title"
						/>
					</div>
					<Load v-else/>
				</transition>
			</div>
		</div>
	</Main>
</template>

<script>
import Main from '@/components/main/'
import Icon from '@/components/SvgIcon'
import Authorize from '@/components/authorize'
import Card from '@/components/card'
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
		Icon,
		Authorize,
		Card,
		Load
	},
	data () {
		return {
		}
	},
	async mounted() {
		await this.$store.dispatch('checkStatus')
		this.getAuthorize === 'connected' ? this.loadAlbums() : null
	},
	methods: {
		loadAlbums() {
			this.$store.dispatch('loadAllPhotoAlbums')
		}
	},
	computed: {
		...mapGetters([
			'getAuthorize',
			'getUser',
			'getAllAlbums'
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
@import 'gallery.styl'
// Адаптив
@import './gallery-tablet.styl'
@import './gallery-mobile.styl'
</style>

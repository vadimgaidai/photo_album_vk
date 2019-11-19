<template>
	<section class="authorize">
		<div 
			class="authorize__wrap"
		>
			<h2 class="authorize__title">
				{{title}}
			</h2>
			<div 
				class="authorize__text" 
				v-html="text"
				v-show="text"
			>
			</div>
			<button 
				class="authorize__button"
				@click="authorize"
			>
				{{btn}}
			</button>
		</div>
	</section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	data () {
		return {
			title: 'Authorize',
			text: '<p>Log in through the social network service <a href="https://vk.com/" class="authorize__link" target="_blank">VK</a> and allow access to your account</p>',
			btn: 'Login'
		}
	},
	async mounted() {
		await VK.init({
			apiId: process.env.VUE_APP_VK_ID
		})
		this.$store.dispatch('checkStatus')
		this.setContent()
	},
	methods: {
		authorize() {
			this.$store.dispatch('checkStatus')
			setTimeout(()=> {
				(this.getAuthorize === '' || this.getAuthorize !== 'connected') ? this.loginUser() : this.logoutUser()
			}, 10)
		},
		loginUser () {
			this.$store.dispatch('loginUser')
		},
		logoutUser () {
			this.$store.dispatch('logoutUser')
		},
		setContent() {
			switch(this.getAuthorize) {
				case 'connected': 
					this.$store.dispatch('loadPhotoAlbums')
					this.title = 'Thanks!'
					this.text = ''
					this.btn = 'Logout'
					break
				case 'not_authorized': 
					this.title = 'Access'
					this.text = '<p>Please allow access to your account ^_^</p>'
					this.btn = 'Access'
					break
				case 'unknown': 
					this.title = 'Authorize'
					this.text = '<p>Log in through the social network service <a href="https://vk.com/" class="authorize__link" target="_blank">VK</a> and allow access to your account</p>'
					this.btn = 'Login'
					break
			}
		}
	},
	computed: {
		...mapGetters([
			'getAuthorize'
		])
	},
	watch: {
		'$route' () {
			this.$store.dispatch('checkStatus')
			this.setContent()
		},
		'getAuthorize' () {
			this.setContent()
		}
	}
}
</script>

<style lang="stylus">
// Базовые стили
@import 'authorize.styl'
// Адаптив
@import './authorize-tablet.styl'
@import './authorize-mobile.styl'
</style>

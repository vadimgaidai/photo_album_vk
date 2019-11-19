<template>
	<section class="authorize">
		<div 
			class="authorize__wrap"
			:class="{'_login' : authorize === 'connected'}"
		>
			<h2 class="authorize__title">
				{{title}}
				<span v-show="authorize === 'connected'">
					{{user}}!
				</span>
			</h2>
			<div 
				class="authorize__text" 
				v-html="text"
				v-show="text"
			>
			</div>
			<button 
				class="authorize__button"
				@click="authorizeSubmit"
			>
				{{btn}}
			</button>
		</div>
	</section>
</template>

<script>

export default {
	props: {
		authorize: {
			type: String,
			default: ''
		},
		user: {
			type: String,
			default: ''
		}
	},
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
		this.setContent()
	},
	methods: {
		authorizeSubmit() {
			this.$store.dispatch('checkStatus')
			setTimeout(()=> {
				(this.authorize === '' || this.authorize !== 'connected') ? this.loginUser() : this.logoutUser()
			}, 10)
		},
		loginUser () {
			this.$store.dispatch('loginUser')
		},
		logoutUser () {
			this.$store.dispatch('logoutUser')
		},
		setContent() {
			switch(this.authorize) {
				case 'connected': 
					this.title = 'Welcome, '
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
	watch: {
		'authorize' () {
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

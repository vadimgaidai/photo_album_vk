<template>
	<section class="authorize">
		<h2 class="authorize__title">
			Authorize
		</h2>
		<p class="authorize__text">
			Log in through the social network service <a href="https://vk.com/" class="authorize__link" target="_blank">VK</a> and allow access to your account
		</p>
		<button 
			class="authorize__button"
			@click="openPopup"
		>
			Login
		</button>
	</section>
</template>

<script>
export default {
	data () {
		return {
		}
	},
	computed: {
		data () {
			return {
				
			}
		}
	},
	methods: {
		openPopup () {
			let link = ''
			let title = document.title
			link = process.env.VUE_APP_VK_API
			link = encodeURI(link)
			this.popupWindow = window.open(
				link,
				title,
				[
					'toolbar=0',
					'status=0',
					'scrollbars=1',
					'width=700',
					'height=480',
					'left=' + (screen.availWidth / 2 - 320),
					'top=' + (screen.availHeight / 2 - 240),
					'toolbar=0'
				].join(',')
			)
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

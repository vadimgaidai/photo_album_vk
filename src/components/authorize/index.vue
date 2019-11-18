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
		duplicate () {
			return
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

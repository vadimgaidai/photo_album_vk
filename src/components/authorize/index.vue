<template>
	<section class="authorize">
		<h2 class="authorize__title">
			Authorize
		</h2>
		<p class="authorize__text">
			Log in through the social network <a href="https://vk.com/" class="authorize__link">VK</a> and allow access to your account
		</p>
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

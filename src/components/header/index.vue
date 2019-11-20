<template>
  <header class="header">
		<div class="header__inner">
			<router-link
				v-for="link in links"
				:key="link.id"
				:to="link.to"
				class="header__link"
			>
				{{link.text}}
			</router-link>
		</div>
  </header>
</template>

<script>
export default {
	data () {
		return {
			links: [
				{
					text: 'Index',
					to: '/'
				},
				{
					text: 'Gallery',
					to: '/gallery'
				},
				{
					text: 'Droap',
					to: '/droap'
				}
			]
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
@import 'header.styl'
// Адаптив
@import './header-tablet.styl'
@import './header-mobile.styl'
</style>

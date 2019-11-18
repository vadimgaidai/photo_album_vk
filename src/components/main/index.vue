<template>
  <main class="main">
		<slot/>
  </main>
</template>

<script>
export default {
	data () {
		return {
		}
	}
}
</script>

<style lang="stylus">
// Базовые стили
@import 'main.styl'
// Адаптив
@import './main-tablet.styl'
@import './main-mobile.styl'
</style>

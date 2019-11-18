<template>
	<transition name="fade">
		<div class="preloader">
			<div class="preloader__bounce">
				<div class="preloader__bounce--circle"></div>
				<div class="preloader__bounce--circle"></div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'preloader',
	data () {
		return {
		}
	}
}
</script>
<style lang="stylus">
// Базовые стили
@import 'preloader.styl'
</style>

<template>
	<Main class="onePhoto">
		onePhoto
	</Main>
</template>

<script>
import Main from '@/components/main/'
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
		Load
	},
	data () {
		return {
		}
	}
}
</script>

<style lang="stylus">
// Базовые стили
@import 'onePhoto.styl'
// Адаптив
@import './onePhoto-tablet.styl'
@import './onePhoto-mobile.styl'
</style>

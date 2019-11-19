<template>
	<Main class="photos">
		photos
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
	name: 'photos',
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
@import 'photos.styl'
// Адаптив
@import './photos-tablet.styl'
@import './photos-mobile.styl'
</style>

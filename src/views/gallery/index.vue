<template>
	<Main class="gallery">
		<div class="gallery__inner">
			<Authorize />
		</div>
	</Main>
</template>

<script>
import Main from '@/components/main/'
import Icon from '@/components/SvgIcon'
import Authorize from '@/components/authorize'

import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'gallery',
	components: {
		Main,
		Icon,
		Authorize
	},
	data () {
		return {
		}
	}
}
</script>

<style lang="stylus">
// Базовые стили
@import 'gallery.styl'
// Адаптив
@import './gallery-tablet.styl'
@import './gallery-mobile.styl'
</style>

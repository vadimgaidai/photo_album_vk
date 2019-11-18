<template>
	<Main class="gallery">
		<div class="gallery__inner">
		</div>
	</Main>
</template>

<script>
import Main from '@/components/main/'
import Icon from '@/components/SvgIcon'
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'gallery',
	components: {
		Main,
		Icon
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
</style>

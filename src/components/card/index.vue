<template>
	<section class="card">
		<Load v-show="!load" />
	</section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Icon from '@/components/SvgIcon'
import Load from '@/components/load'

export default {
	name: 'card',
	components: {
		Icon,
		Load
	},
	data () {
		return {
			load: false
		}
	}
}
</script>
<style lang="stylus">
// Базовые стили
@import 'card.styl'
// Адаптив
@import './card-tablet.styl'
@import './card-mobile.styl'
</style>

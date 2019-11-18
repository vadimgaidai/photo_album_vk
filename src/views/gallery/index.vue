<template>
	<Main class="gallery">
		<h1 class="gallery__title">
			Gallery
		</h1>
		<div 
			class="gallery__inner"
			:class="{'_authorize': !authorize}"
		>
			<Authorize v-if="!authorize"/>
			<template v-else>
				<Card 
					v-for="card in 10"
					:key="card.id"
				/>
			</template>
		</div>
	</Main>
</template>

<script>
import Main from '@/components/main/'
import Icon from '@/components/SvgIcon'
import Authorize from '@/components/authorize'
import Card from '@/components/card'

import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'gallery',
	components: {
		Main,
		Icon,
		Authorize,
		Card
	},
	data () {
		return {
			authorize: false
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

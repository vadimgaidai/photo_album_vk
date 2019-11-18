<template>
	<Main class="test">
		<div class="test__inner">
			<div class="test__wrap">
				<h1 class="test__caption">Test</h1>
				<Icon
					:name="'api'"
					:title="'api'"
					:class="'test__icon'"
				/>
				<h1 class="test__caption">page</h1>
			</div>
			<p
				v-for="test in getTest"
				:key="test.id"
				class="test__item"
			>
				{{test}}
			</p>
		</div>
	</Main>
</template>

<script>
import Main from '@/components/main/'
import Icon from '@/components/SvgIcon'
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'test',
	components: {
		Main,
		Icon
	},
	async created () {
		await this.loadTest()
	},
	data () {
		return {
		}
	},
	methods: {
		...mapActions([
			'loadTest'
		])
	},
	computed: {
		...mapGetters([
			'getTest'
		])
	}
}
</script>

<style lang="stylus">
// Базовые стили
@import 'test.styl'
</style>

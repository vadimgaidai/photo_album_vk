<template>
	<router-link 
		:to="slug + item.title"
		class="card"
	>
		<transition name="content" mode="out-in">
			<div 
				class="card__inner" 
				v-if="item"
			>
				<div 
					class="card__album"
					v-if="elemets ==='albums'"
				>
					<h3 class="card__album--title">
						Name: {{item.title}}
					</h3>
					<span class="card__album--size">
						Size: {{item.size}}
					</span>
				</div>
			</div>
			<Load v-else/>
		</transition>
	</router-link>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Icon from '@/components/SvgIcon'
import Load from '@/components/load'

export default {
	name: 'card',
	props: {
		elemets: {
			type: String, 
			default: ''
		},
		slug: {
			type: String, 
			default: ''
		},
		item: {
			type: Object,
			default: () => {
				return {
				}
			}
		}
	},
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

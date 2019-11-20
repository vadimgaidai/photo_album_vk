<template>
	<router-link 
		:to="slug"
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
					<div class="card__album--wrap">
						<img 
							class="card__album--image"
							:src="item.thumb_src" 
							:alt="item.title"
						>
					</div>
					<div class="card__album--wrap">
						<h3 class="card__album--title">
							Name: {{item.title}}
						</h3>
						<span class="card__album--size">
							Size: {{item.size}}
						</span>
					</div>
				</div>
				<div 
					class="card__photos"
					v-if="elemets ==='photos'"
				>
					<img 
						:src="returnPhoto(item.sizes)" 
						:alt="item.id" 
						class="card__photos--image">
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
	},
	methods: {
		returnPhoto(item) {
			let width = []
			item.map((elem) => {
				width.push(elem.width)
			})
			let image = item.find((elem) => {
				if (elem.width === Math.max.apply(null, width)) {
					return elem
				}
			})
			return image.src
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

<template>
	<router-link 
		:to="slug"
		class="card"
		:style="'z-index:' + (length - index)  + ';'"
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
					<div class="card__album--wrap" v-lazy-container="{ selector: 'img' }">
						<img 
							class="card__album--image"
							:data-src="item.thumb_src" 
							data-error="https://i.imgur.com/dS8WyYP.png"
							data-loading="https://i.imgur.com/jzm1D5H.gif"
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
					v-lazy-container="{ selector: 'img' }"
				>
					<img 
						:data-src="returnPhoto(item.sizes)" 
						data-error="https://image.flaticon.com/icons/svg/148/148766.svg"
						data-loading="https://i.imgur.com/jzm1D5H.gif"
						:alt="item.id" 
						class="card__photos--image">
				</div>
				<div class="card__tooltip" v-if="elemets ==='photos'">
					<p>ID: {{item.id}}</p>
					<p>Date: {{returnDate(item.date)}}</p>
					<p
						v-show="item.likes.count"
					>
						Likes: {{item.likes.count}}
					</p>
					<p
						v-show="item.comments.count"
					>
						Comments: {{item.comments.count}}
					</p>
					<p 
						v-show="item.comments.text"
					>
						Text: {{item.comments.text}}
					</p>
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
		index: {
			type: Number,
			default: 0
		},
		length: {
			type: Number,
			default: 0
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
			if (this.getMobileSizePhoto) {
				return this.getMobileSizePhoto(item)
			}
		},
		returnDate (item) {
			if (item) {
				let date = new Date(item * 1000)
				let day = date.getDate()
				if (day < 10) day = '0' + day
				let month = date.getMonth() + 1
				if (month < 10) month = '0' + month
				let year = date.getFullYear() % 100
				if (year < 10) year = '0' + year
				return day + '.' + month + '.' + year
			}
			return ''
		}
	},
	computed: {
		...mapGetters([
			'getMobileSizePhoto'
		])
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

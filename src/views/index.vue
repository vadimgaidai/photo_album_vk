<template>
	<Main class="indexPage" v-lazy-container="{ selector: 'img' }">
		<img 
			class="indexPage__image" 
			alt="Vue logo" 
			data-src="https://vuejs.org/images/logo.png"
			data-loading="https://svgshare.com/i/GGf.svg"
		>
		<h1 class="indexPage__title">
			Welcome to Test "Front-End Developer" Vue.js App
		</h1>
	</Main>
</template>

<script>
// @ is an alias to /src
import Main from '@/components/main/'

export default {
	transition: {
		name: 'fade',
		mode: 'out-in'
	},
	name: 'index',
	components: {
		Main
	}
}
</script>

<style lang="stylus">
	.indexPage 
		display flex
		align-items center
		justify-content center
		flex-direction column
		&__image
			animation test-icon infinite 5s linear
			width 15rem
			height 15rem
		&__title
			text-align center
			padding-top 4rem
			font-weight: 700
			color $mainColor
		@keyframes test-icon
			from
				transform rotate(0deg)
			to
				transform rotate(360deg)
</style>


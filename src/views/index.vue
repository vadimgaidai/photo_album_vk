<template>
	<Main class="indexPage">
		<img class="indexPage__image" alt="Vue logo" src="@/assets/images/logo.png">
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


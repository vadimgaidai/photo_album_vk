<template>
  <div id="app">
    <Header ref="header"/>
    <router-view
			:style="'min-height: calc(100vh - ' + mainHeight + 'px);'"
		/>
		<Footer ref="footer"/>
		<Preloader v-show="preloader"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/header/'
import Footer from '@/components/footer/'
import Preloader from '@/components/preloader/'

export default {
	components: {
		Header,
		Footer,
		Preloader
	},
	mounted () {
		this.heightElem()
		this.preloader = false
	},
	data () {
		return {
			headerHeight: 0,
			footerHeight: 0,
			mainHeight: 0,
			preloader: true
		}
	},
	methods: {
		heightElem () {
			this.headerHeight = this.$refs.header.$el.clientHeight,
			this.footerHeight = this.$refs.footer.$el.clientHeight
			if (this.headerHeight && this.footerHeight) {
				this.mainHeight = this.headerHeight + this.footerHeight
			}
		}
	}
}
</script>
<style lang="stylus">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>

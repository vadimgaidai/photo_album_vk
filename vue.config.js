const path = require('path')

module.exports = {
	devServer: {
		proxy: 'http://localhost:8080/'
	},
	pwa: {
		name: 'photo_album_vk'
	},
	pages: {
		index: {
			entry: 'src/main.js',
			template: 'public/index.html',
			filename: 'index.html',
			title: 'Photo Album VK'
		}
	},
	pluginOptions: {
		svgSprite: {
			dir: 'src/assets/icons/',
			test: /\.(svg)(\?.*)?$/,
			loaderOptions: {
				extract: true,
				spriteFilename: 'img/icons.[hash:8].svg' // or 'img/icons.svg' if filenameHashing == false
			},
			pluginOptions: {
				plainSprite: true
			}
		}
	},
	chainWebpack: config => {
		config.module
			.rule('svg-sprite')
			.use('svgo-loader')
			.loader('svgo-loader')
			const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    	types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
	}
}

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/styl/style.styl')
      ],
    })
}

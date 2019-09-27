//优化打包好得css

const autoprefixer = require('autoprefixer')

module.exports={
    plugins:{
        // 'autoprefixer': {
        //     browsers: [
        //         '>1%',
        //         'last 4 versions',
        //         'Firefox ESR',
        //         'not ie < 9', // React doesn't support IE8 anyway
        //     ],
        //     flexbox: 'no-2009',
        // },
        'postcss-cssnext': {},    //使用了postcss-cssnext（css3下一代）就不需要再使用了autoprefixer
        'postcss-assets': {
            loadPaths: ['src/assets/images']
        }
    }
}

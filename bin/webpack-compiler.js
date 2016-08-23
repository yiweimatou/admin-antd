const webpack = require('webpack')

const DEFAULT_STATS_FORMAT = {
    chunks: false,
    chunkModules: false,
    colors: true
}

module.exports = (webpackConfig, statsFormat = DEFAULT_STATS_FORMAT) => {
    return new Promise((resolve, reject) => {
        const compiler = webpack(webpackConfig)

        compiler.run((err, stats) => {
            const jsonStats = stats.toJson()

            console.log('webpack compile completed.')
            console.log(stats.toString(statsFormat))

            if (err) {
                console.log('Webpack compiler encountered a fatal error.', err)
                return reject(err)
            } else if (jsonStats.errors.length > 0) {
                console.log('Webpack compiler encountered errors.')
                console.log(jsonStats.errors.join('\n'))
                return reject(new Error('Webpack compiler encountered errors'))
            } else if (jsonStats.warnings.length > 0) {
                console.log('Webpack compiler encountered warnings.')
                console.log(jsonStats.warnings.join('\n'))
            } else {
                console.log('No errors or warnings encountered.')
            }
            resolve(jsonStats)
        })
    })
}
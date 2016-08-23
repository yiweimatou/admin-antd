const fse = require('fs-extra')
const webpackConfig = require('../webpack.config')
const webpackCompiler = require('./webpack-compiler')
const path = require('path')

;(() => {
    try{
        console.log('compile start...')
        fse.removeSync(path.join(__dirname,'../','dist','/*'))
        console.log('clean up dist folder')
        webpackCompiler(webpackConfig).then(stats => {
            if(stats.warnings.length){
                console.log('Config set to fail on warning, exiting with status code "1".')
                process.exit(1)
            }   
            fse.copySync(path.join(__dirname,'../','/src/static'),path.join(__dirname,'../','/dist'))
            console.log('Copy static assets to dist folder.')      
        })
    }catch (e){
        console.log('Compiler encountered an error.', e)
        process.exit(1)
    }
})()
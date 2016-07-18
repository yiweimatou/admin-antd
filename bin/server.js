const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('../webpack.config.js')

const port = process.env.PORT || 3002
const app = express()

const compiler = webpack(webpackConfig)
const middleware = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: {
    index: '/'
  },
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
})

app.use(middleware)
app.use(webpackHotMiddleware(compiler))
app.use(express.static(path.join(__dirname, '../', '/static')))
app.get('*', function response(req, res) {
  res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../',
    '/dist/index.html')))
  res.end()
})

app.listen(port, (err) => {
  if (err) {
    console.error(err)
  }
  console.log(`==> server is now running at http://localhost:${port}/ .`)
})

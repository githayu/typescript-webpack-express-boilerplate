import * as path from 'path'
import * as express from 'express'

export const app = express()

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack')
  const compiler = webpack(require('../../config/webpack.dev'))

  app.use(require('webpack-dev-middleware')(compiler))
  app.use(require('webpack-hot-middleware')(compiler))

  app.use('*', (req, res, next) => {
    const filename = path.join(__dirname, '../../dist/public/index.html')

    compiler.outputFileSystem.readFile(filename, (err: any, result: any) => {
      if (err) {
        return next(err)
      }

      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
}

app.use(express.static('./dist/public'))
app.listen(3000)

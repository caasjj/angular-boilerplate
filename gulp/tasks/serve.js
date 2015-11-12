import gulp from 'gulp'
import browserSync from 'browser-sync'
import modRewrite  from 'connect-modrewrite';
import {rootPath, temp, src, styles} from '../paths'
import {Argv} from '../util'
import {DEV_PORT, API_URL} from '../const'
import proxy from 'http-proxy'

let apiWebProxy = proxy.createServer({
  target: API_URL
})

let proxyMiddlware = (req, res, next) => {

  if (req.url.includes('api/')) {
    apiWebProxy.web( req, res, (err) => {
      next(err)
    })
  } else {
    next()
  }

}

let serverConfig = {
  ui: false,
  files: null,
  server: {
    baseDir: [rootPath, temp, src]
  },
  middleware: [
    proxyMiddlware,
    modRewrite( ['!\\.\\w+$ /index.html [L]'] ) // require for HTML5 mode
  ],

  port: Argv.port || DEV_PORT
}

let server = browserSync.create( 'static-server' )

let nop = ()=> {}

gulp.task( 'serve', ['sass', 'vendor-sass'], () => {

  server.init( serverConfig, nop )

} )

export default server



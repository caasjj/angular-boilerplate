'use strict'

import path from 'path'

const rootPath  = path.dirname( __dirname )
const jspmPath  = path.dirname( __dirname )
const srcPath   = `${rootPath}/src`
const buildPath = `${rootPath}/build`
const testPath  = `${rootPath}/test`
const tempPath  = `${rootPath}/.temp`
const docPath   = `${rootPath}/docs`
const images = `${srcPath}/assets/images/**/*.{png,jpg,jpeg,tiff}`
const fonts  = `${srcPath}/assets/fonts/**/*.{woff,woff2,svg,eot,ttf}`
const icons  = `${srcPath}/assets/icons/**/*.{ico}`

const pages        =  `${srcPath}/**/*.html`
const templates    =  `${srcPath}/app/**/*.tmpl`
const gulpfile     =  `${rootPath}/gulpfile.js`
const gulpTasks    =  `${rootPath}/gulp/**/*.js`

const paths = {
  app: {
    src: srcPath,
    html: [pages, templates],
    pages: pages,
    templates: templates,
    scripts: [`${srcPath}/app/**/*.js`, `${srcPath}/boot.js`],
    styles: [`${srcPath}/styles/*.{css,scss}`, `${srcPath}/styles/components/**/*.{css,scss}`],
    vendorStyles: `${srcPath}/styles/vendor/*.{css,scss}`,
    assets: [images, fonts, icons],
    images: images,
    fonts: fonts,
    icons: icons
  },
  build: buildPath,
  test: {
    unitTest: `${testPath}/unit`,
    e2dTest: `${testPath}/e2d`,
    karmaConf: `${testPath}/karma.conf.js`
  },
  docs: {
    api: `${docPath}/api`,
    docco: `${docPath}/docco`
  },
  temp: tempPath,
  gulpfile:  gulpfile,
  gulpTasks: gulpTasks,
  gulpfiles: [gulpfile, gulpTasks]
}


const app = paths.app
const src = paths.app.src
const scripts = paths.app.scripts
const html = paths.app.html
const styles = paths.app.styles
const vendorStyles = paths.app.vendorStyles
const assets = paths.app.assets
const build = paths.build
const unitTest = paths.test.unitTest
const karmaConf = paths.test.karmaConf
const e2eTest = paths.test.e2eTest
const temp = paths.temp
const gulpfiles = paths.gulpfiles
const apiDocs = paths.docs.api
const doccoDocs = paths.docs.docco

export default paths

export {
  rootPath,
  testPath,
  app,
  src,
  scripts,
  html,
  pages,
  templates,
  styles,
  vendorStyles,
  assets,
  images,
  fonts,
  icons,
  apiDocs,
  doccoDocs,
  unitTest,
  e2eTest,
  karmaConf,
  temp,
  gulpfile,
  gulpTasks,
  gulpfiles
}


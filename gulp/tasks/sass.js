import gulp from 'gulp'
import util from 'util'
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import autoprefixer from 'gulp-autoprefixer'
import changed from 'gulp-changed'
import concat from 'gulp-concat'
import browserSync from './serve'
import merge from 'merge2'

import {styles, vendorStyles, temp} from '../paths'

gulp.task( 'sass', () => {

  //return gulp.src( styles )
  //           .pipe( changed( `${temp}/styles` ), {extension: '.scss'} )
  //           .pipe( sourcemaps.init() )
  //           .pipe( sass().pipe( sass().on( 'error', sass.logError ) ) )
  //           .pipe( concat( 'main.css' ) )
  //           .pipe( autoprefixer( 'last 2 version' ) )
  //           .pipe( sourcemaps.write() )
  //           .pipe( gulp.dest( `${temp}/styles` ) )
  //           .pipe( browserSync.stream() )


  var _styles = styles
  var stream

  if (Array.isArray( _styles )) {
    stream = merge()
    _styles.forEach( style => stream.add( gulp.src( style ) ) )
  } else {
    stream = gulp.src( _styles )
  }

  return stream
    .pipe( changed( `${temp}/styles` ), {extension: '.scss'} )
    .pipe( sourcemaps.init() )
    .pipe( sass().pipe( sass().on( 'error', sass.logError ) ) )
    .pipe( concat( 'main.css' ) )
    .pipe( autoprefixer( 'last 2 version' ) )
    .pipe( sourcemaps.write() )
    .pipe( gulp.dest( `${temp}/styles` ) )

} )

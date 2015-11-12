import gulp from 'gulp'
import util from 'util'
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import autoprefixer from 'gulp-autoprefixer'
import changed from 'gulp-changed'
import concat from 'gulp-concat'
import browserSync from './serve'
import del from 'del'
import {styles, vendorStyles, temp} from '../paths'

gulp.task( 'vendor-sass', () => {

  return gulp.src( vendorStyles )
             .pipe( changed( `${temp}/styles` ), {extension: '.scss'} )
             .pipe( sourcemaps.init() )
             .pipe( sass().pipe(sass().on('error', sass.logError))  )
             .pipe( autoprefixer( 'last 2 version' ) )
             .pipe( sourcemaps.write() )
             .pipe( gulp.dest( `${temp}/styles` ) )
             //.pipe( browserSync.stream() )

} )

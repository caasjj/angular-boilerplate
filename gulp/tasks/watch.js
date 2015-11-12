import gulp from 'gulp'
import browserSync from './serve'

import {scripts, styles, vendorStyles, html, gulpfiles} from '../paths'

//console.log( 'scripts:', scripts )
//console.log( 'styles: ', styles )

gulp.task( 'watch', () => {

  gulp.watch( [scripts], browserSync.reload )

  //gulp.watch( [gulpfiles], ['gulp-reload', browserSync.reload] )

  gulp.watch( [html], [browserSync.reload] )

  if (Array.isArray( styles )) {
    styles.forEach( style => gulp.watch( [style], ['sass', browserSync.reload] ) )
  } else {
    gulp.watch( [styles], ['sass', browserSync.reload] )
  }

  gulp.watch( [vendorStyles], ['vendor-sass', browserSync.reload] )

  //gulp.watch( [styles], ['sass'] )

  //gulp.watch( [vendorStyles], ['vendor-sass'])

} )


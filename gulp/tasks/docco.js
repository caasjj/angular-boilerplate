import gulp from 'gulp'
import docco from 'gulp-docco'

import {scripts, doccoDocs} from '../paths'

gulp.task( 'docco', () => {

  gulp.src(scripts)
      .pipe(docco({
        layout: 'parallel'
      }))
      .pipe(gulp.dest(doccoDocs))

} )

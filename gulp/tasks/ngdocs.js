import gulp from 'gulp'
import gulpNgdocs from 'gulp-ngdocs'

import {scripts, apiDocs} from '../paths'

gulp.task( 'ngdocs', () => {

  console.log(scripts)
  return gulp.src(scripts)
             .pipe(gulpNgdocs.process())
             .pipe(gulp.dest(apiDocs))
} )

import gutil from 'gulp-util'

let Argv = gutil.env
let Logc = gutil.colors

function Err(...args) {
  gutil.log( gutil.colors.black.bgRed( args ) )
}


function Warn(...args) {
  gutil.log( gutil.colors.yellow( args ) )
}

function Log(...args) {
  gutil.log( gutil.colors.cyan( args ) )
}


export {Log, Warn, Err, Argv, Logc}


require( 'babel-core/register' )
require( 'require-dir' )( './gulp/tasks', {recurse: true} )

require( 'gulp' )

  .task( 'default', ['sass', 'vendor-sass', 'serve', 'watch'] )


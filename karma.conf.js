// Karma configuration
// Generated on Mon Nov 09 2015 10:17:40 GMT-0800 (PST)
'use strict'

module.exports = function (config) {
  config.set( {

    // base path that will be used to resolve all patterns (eg. files, exclude)
    //basePath: '../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jspm', 'jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/karma-babel-preprocessor/node_modules/babel-core/browser-polyfill.js'
    ],

    // the following is not needed as plugins are automatically imported. But, if you do define a
    // plugin, then you must include every plugin here or it will not be loaded.
    //plugins: ['karma-jasmine',
    //  'karma-mocha',
    //  'karma-phantomjs-launcher',
    //  'karma-jspm',
    //  'karma-babel-preprocessor',
    //  'karma-chrome-launcher',
    //  'karma-htmlfile-reporter'],


    // list of files to exclude
    //exclude: [],

    jspm: {
      config: 'jspm.config.js',
      loadFiles: ['src/boot.js', 'src/app/**/*.spec.js', 'test/**/*.spec.js'],
      serveFiles: ['src/app/**/*.+(js|html|css)']
    },

    proxies: {
      '/test/': '/base/test/',
      '/src/': '/base/src/',
      '/src/app/': '/base/src/app/',
      '/jspm_packages/': '/base/jspm_packages/'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'html'],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor

    preprocessors: {
      // source files, that you wanna generate coverage for - do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'src/app/**/*.js': ['babel'],
      'src/app/**/*.spec.js': ['babel'],
      'test/**/*.spec.js': ['babel']
    },

    // transpile with babel since the coverage reporter throws error on ES6 syntax
    babelPreprocessor: {
      options: {
        stage: 1,
        sourceMap: 'inline'
      }
    },

    htmlReporter: {
      outputFile: 'test/unit-test-reports/index.html'
    },
    // web server port
    port: 9875,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_WARN,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity,

    browserNoActivityTimeout: 50000

  } )
}

const gulp = require('gulp')
const rollup = require('rollup-stream')
const sourcemaps = require('gulp-sourcemaps')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const mochaPhantomjs = require('gulp-mocha-phantomjs')
const buble = require('gulp-buble')
const del = require('del')
const pump = require('pump')
const eslint = require('gulp-eslint')


// clean build folder
gulp.task('clean', () => {
  return del([
    'lib/*'
  ])
})

// lint 'em files
gulp.task('lint', () => {
  return gulp.src(['src/*.js', 'tests/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

// compile to es2015 but leave the import/exports intact
gulp.task('compile', ['lint'], () => {
  return gulp.src('./src/index.js')
    .pipe(sourcemaps.init())
    .pipe(buble({
      transforms: {
        modules: false
      }
    }))
    .pipe(rename('isInViewport.es6.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('lib'))
})

// bundle it
gulp.task('rollup', ['compile'], () => {
  return rollup({
    entry: './lib/isInViewport.es6.js',
    format: 'umd',
    moduleId: 'isInViewport',
    moduleName: 'isInViewport',
    globals: {
      jquery: '$',
      window: 'window'
    },
    external: ['jquery', 'window']
  })
    .pipe(source('isInViewport.es6.js', './lib'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(rename('isInViewport.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('lib'))
})

// minify it
gulp.task('minify', ['rollup'], (cb) => {
  pump([
    gulp.src('./lib/isInViewport.js'),
    sourcemaps.init({loadMaps: true}),
    uglify({
      preserveComments: (_, {type, value: text}) => type === 'comment2' && /@(author|license)/g.test(text)
    }),
    rename('isInViewport.min.js'),
    sourcemaps.write('.'),
    gulp.dest('lib')
  ], cb)
})

// test the transpiled, minified bundle
gulp.task('test', ['minify'], () => {
  return gulp.src('./tests/tests.html')
    .pipe(mochaPhantomjs())
    .on('error', () => gulp.start('clean')) // remove built files if tests fail
})

gulp.task('default', ['clean', 'test'])

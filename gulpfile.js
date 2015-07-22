var gulp          = require('gulp');
var runSequence   = require('run-sequence');
var del           = require('del');
var imagemin      = require('gulp-imagemin');
var rename        = require('gulp-rename');
var notify        = require('gulp-notify');
var connect       = require('gulp-connect');
var webpack       = require("gulp-webpack");
var webpackconfig = require("./webpack.config");
var browserify    = require('browserify');
var source        = require('vinyl-source-stream');
var bowerResolve  = require('bower-resolve');
var using         = require('gulp-using');
var _             = require('lodash');
var concat        = require('gulp-concat');
var browserSync   = require('browser-sync');
var nodemon       = require('gulp-nodemon');

process.env.UV_THREADPOOL_SIZE = 100; // node-sass fix

var vendorJSFiles = [
  './bower_components/modernizr/modernizr.js',
  './bower_components/jquery/dist/jquery.min.js',
  './bower_components/fastclick/lib/fastclick.js',
  './bower_components/foundation/js/foundation.min.js'
]

var production = (process.env.NODE_ENV === 'production');

gulp.task('clean', function(cb) {
  del(['public/stylesheets', 'public/js', 'public/images', 'public/fonts'], cb);
});

gulp.task('default', ['clean'], function() {
  runSequence( ['images', 'fonts', 'webpack', 'vendorJS', 'watch', 'browser-sync'] );
});

gulp.task('production', ['clean'], function() {
  runSequence( ['images', 'fonts', 'webpack', 'vendorJS'] );
})

gulp.task('images', function() {
  return gulp.src('app/assets/images/*')
  .pipe(imagemin({
    progressive: true
  }))
  .pipe(gulp.dest('public/images'));
  //.pipe(notify({message: "Image task complete"}));
});

gulp.task('fonts', function() {
  return gulp.src('app/assets/fonts/*')
  .pipe(gulp.dest('public/fonts'))
  .pipe(using());
  //.pipe(notify({message: "Fonts task complete"}));
});

gulp.task('vendorJS', function() {
  gulp.src(vendorJSFiles)
  .pipe(concat('vendor.js'))
  .pipe(gulp.dest('./public/js'));
});

gulp.task('watch', function() {
  gulp.watch('app/assets/images/**/*', ['images']);
  gulp.watch('app/assets/fonts/**/*', ['fonts']);
});

gulp.task("webpack", function() {
  return gulp.src('./app/index.js')
  .pipe(webpack(webpackconfig))
  .pipe(gulp.dest('public/js'));
});

var webserverOptions = {
  root : [__dirname+"/"]
};

if (!production) {
  webserverOptions.livereload = true;
}

gulp.task('browser-sync', function() {
  browserSync.init(null, {
    proxy: 'http://localhost:3000',
    files: ['public/**/*'],
    browser: 'google chrome',
    port: 8080,
  })
});
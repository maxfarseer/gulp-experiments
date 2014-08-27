var gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    streamify = require('gulp-streamify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    connect = require('gulp-connect'),
    jasmine = require('gulp-jasmine'),
    gulpIgnore = require('gulp-ignore'), //for bower, оставить? - sample .pipe(gulpIgnore.include(bowerDir))
    gulpif = require('gulp-if');

var outputDir = 'builds/development',
    env = process.env.NODE_ENV || 'development';

gulp.task('jade', function() {
  return gulp.src('src/templates/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest(outputDir))
    .pipe(connect.reload());
});

gulp.task('jadeAngularTmpl', function() {
  return gulp.src('src/js/views/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest(outputDir+'/js/views/'))
    .pipe(connect.reload());
});

gulp.task('sass', function() {
  var config = {};

  if (env === 'production') {
    config.outputStyle = 'compressed';
  };

  if (env === 'development') {
      config.onError = function(e) { console.log(e); }
      config.sourceMap = 'sass';
      //config.sourceComments = 'map';
  };

  return gulp.src('src/sass/main.scss')
    .pipe(sass(config))
    .pipe(gulp.dest(outputDir + '/css'))
    .pipe(connect.reload());
});

gulp.task('js', function() {

  var b = new browserify({
    debug:true
  });

  b.add('./src/js/main.js');

  b.plugin('minifyify', {
    map: '/bundle.map.json',
    minify: true,
    output: outputDir+'/bundle.map.json'
  });

  //return b()
  return b.bundle()
    .pipe(source('bundle.js'))
    //.pipe(streamify(uglify()))
    .pipe(gulp.dest(outputDir + '/js'))
    .pipe(connect.reload());
});

gulp.task('lint', function() {
    gulp.src('./src/js/**/*.js')
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('jshint-stylish'));
});

// Test JS
gulp.task('jasmine', function () {
  return gulp.src('tests/*.js')
      .pipe(jasmine());
});

gulp.task('watch', function() {
  gulp.watch('src/templates/**/*.jade', ['jade']);
  gulp.watch('src/js/views/**/*.jade', ['jadeAngularTmpl']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/js/**/*.js', ['lint']);
  gulp.watch('src/js/**/*.js', ['jasmine']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('tests/*.js', ['jasmine']);
});

gulp.task('connect', function() {
  connect.server({
    root: outputDir,
    port: 8001,
    livereload: true
  });
});

gulp.task('default', ['jade', 'jadeAngularTmpl', 'js', 'sass', 'watch', 'lint', 'jasmine', 'connect']);

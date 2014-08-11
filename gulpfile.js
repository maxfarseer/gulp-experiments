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
    gulpif = require('gulp-if');

var outputDir = 'builds/development',
    env = process.env.NODE_ENV || 'development';

gulp.task('jade', function() {
  return gulp.src('src/templates/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest(outputDir))
    .pipe(connect.reload());
});

gulp.task('sass', function() {
  var config = {};

  if (env === 'production') {
    config.outputStyle = 'compressed';
  };

  if (env === 'development') {
    config.sourceComments = 'map';
    config.sourceMap = 'sass'
  };

  return gulp.src('src/sass/main.scss')
    .pipe(sass(config))
    .pipe(gulp.dest(outputDir + '/css'))
    .pipe(connect.reload());
});

gulp.task('js', function() {
  return browserify('./src/js/main.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(outputDir + '/js'))
    .pipe(connect.reload());
});

gulp.task('lint', function() {
    gulp.src('./src/js/**/*.js')
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
  gulp.watch('src/templates/**/*.jade', ['jade']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/js/**/*.js', ['lint']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
});

gulp.task('connect', function() {
  connect.server({
    root: outputDir,
    port: 8001,
    livereload: true
  });
});

gulp.task('default', ['jade', 'js', 'sass', 'watch', 'lint', 'connect']);

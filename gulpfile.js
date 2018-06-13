'use strict';
var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var del = require('del');

gulp.task('script-dev', function() {
  return gulp.src('src/imgViews.js')
    .pipe(gulp.dest('dist/'));
});

gulp.task('script-prod', function() {
  return gulp.src('src/imgViews.js')
    .pipe(uglify())
    .pipe(rename('imgViews.min.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('style-dev', function() {
  return gulp.src('src/imgViews.css')
    .pipe(gulp.dest('dist/'));
});

gulp.task('style-prod', function() {
  return gulp.src('src/imgViews.css')
    .pipe(minifyCss())
    .pipe(rename('imgViews.min.css'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('clean', function() {
  return del('dist');
});

gulp.task('watch', function() {
  gulp.watch('src/imgViews.js', ['script-dev']);
  gulp.watch('src/imgViews.css', ['style-dev']);
});

gulp.task('default', ['style-dev','script-dev','watch']);

gulp.task('prod', ['style-prod','script-prod']);
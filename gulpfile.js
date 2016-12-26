'use strict';

var gulp = require('gulp');

var concat = require('gulp-concat');
var connect = require('gulp-connect');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var sources = ['app/js/app.js', 'app/js/**/*.js', 'app/vendor/js/**/*.js'];

gulp.task('build-dev', function () {
    gulp.src(sources)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(ngAnnotate())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./js/'));
});

gulp.task('build-prod', function () {
    gulp.src(sources)
        .pipe(concat('bundle.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./js/'));
});

gulp.task('connect', function() {
    connect.server({
        port: 8888,
        root: './'
    });
});

gulp.task('watch', function() {
    gulp.watch(sources, ['build-dev']);
});

gulp.task('default', ['connect', 'build-dev', 'watch']);

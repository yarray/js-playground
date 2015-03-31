/*jslint node: true */
'use strict';

// browserify
var browserify = require('browserify');
var uglifyify = require('uglifyify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

// gulp
var gulp = require('gulp');
var myth = require('gulp-myth');
var csso = require('gulp-csso');
var serve = require('gulp-serve');
var exec = require('gulp-exec');

// others
var jest = require('jest-cli');
var merge = require('merge-stream');
var del = require('del');


gulp.task('scripts', function() {
    return browserify('./app/scripts/app.js', {
            debug: true
        })
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('.tmp/scripts/'));
});

gulp.task('styles', function() {
    return gulp.src('./app/styles/app.css')
        .pipe(myth())
        .pipe(gulp.dest('.tmp/styles/'));
});

gulp.task('test', function(callback) {
    jest.runCLI(
        {}, './__tests__',
        function(success) {
            if (!success) {
                console.log('test failed');
            }
            callback();
    });
});

gulp.task('serve', ['watch'], serve(['.tmp', 'app']));

gulp.task('watch', ['scripts', 'styles'], function() {
    gulp.watch('./app/scripts/**/*.js', ['scripts']);
    gulp.watch('./app/styles/**/*.css', ['styles']);
});

gulp.task('build', function() {
    var pages =
        gulp.src('./app/*.html')
        .pipe(gulp.dest('./dist/'));

    var scripts =
        browserify('./app/scripts/app.js')
        .transform(uglifyify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./dist/scripts/'));

    var styles =
        gulp.src('./app/styles/app.css')
        .pipe(myth())
        .pipe(csso())
        .pipe(gulp.dest('./dist/styles/'));

    return merge(pages, scripts, styles);
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

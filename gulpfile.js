/*jslint node: true */
'use strict';

// browserify
var browserify = require('browserify');
var es6ify = require('es6ify');
var babelify = require('babelify');
var uglifyify = require('uglifyify');
var source = require('vinyl-source-stream');

// gulp
var gulp = require('gulp');
var myth = require('gulp-myth');
var csso = require('gulp-csso');
var serve = require('gulp-serve');

// others
var merge = require('merge-stream');
var del = require('del');


gulp.task('scripts', function() {
    return browserify('./app/scripts/app.js', {
            debug: true
        })
        .add(es6ify.runtime)
        .transform(es6ify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('.tmp/scripts/'));
});

gulp.task('styles', function() {
    return gulp.src('./app/styles/app.css')
        .pipe(myth())
        .pipe(gulp.dest('.tmp/styles/'));
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
        .transform(babelify)
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

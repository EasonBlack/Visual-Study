var gulp = require('gulp');
var svgstore = require('gulp-svgstore');
var rename = require('gulp-rename');
var path = require('path');

gulp.task('default', function () {
    return gulp
        .src('svg/*.svg')
        .pipe(rename({prefix: 'icon-'}))
        .pipe(svgstore())
        .pipe(gulp.dest('dest'));
});
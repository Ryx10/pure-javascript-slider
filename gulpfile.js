var gulp = require('gulp'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify');

gulp.task('js-fef', function(){
    return gulp.src('src/*.js')
        .pipe(gp_concat('concat.js'))
        .pipe(gulp.dest('.'))
        .pipe(gp_rename('index.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('.'));
});
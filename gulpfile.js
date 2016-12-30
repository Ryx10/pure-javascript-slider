var gulp = require('gulp'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify'),
    gp_clean =  require('gulp-clean');

gulp.task('js-fef', function(){
    return gulp.src('src/*.js')
        .pipe(gp_concat('concat.js'))
        .pipe(gulp.dest('.'))
        .pipe(gp_rename('index.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('.'));
});

gulp.task('clean', ['js-fef'], function(){
    return gulp.src('concat.js')
        .pipe(gp_clean({force: true}));
});
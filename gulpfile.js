var gulp = require('gulp');
//var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
//var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var del = require('del');
gulp.task('clean', function(cb) {
  del(['build'], cb);
});

// gulp.task('lint', ['clean'],function() {
//     gulp.src('./tjs/*.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'));
// });

// 编译Sass
gulp.task('sass', ['clean'],function() {
    gulp.src('./sass/*.scss')
        .pipe(sass())
        .pipe(minifyCSS({keepBreaks:false,compatibility:'ie7'}))
        .pipe(gulp.dest('./css'));
});

gulp.task('scripts', ['clean'],function() {
    gulp.src('./script/*.js')
        //.pipe(concat('zp.js'))
        //.pipe(gulp.dest('./js'))
        //.pipe(rename('common-min.js'))
        .pipe(uglify())
        //.pipe(rename('*-min.js'))
        .pipe(gulp.dest('./js'));
});

gulp.task('watch', function() {
    gulp.watch('./sass/*.scss', ['sass']);
    gulp.watch('./script/*.js', ['scripts']);
});

gulp.task('default', ['sass','scripts']);
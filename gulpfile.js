var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	cssmin = require('gulp-cssmin'),
	csscomb = require('gulp-csscomb'),
	header  = require('gulp-header'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

// sass　コンパイル
gulp.task('sass', function() {
    return sass('sass/', { style: 'expanded' })
        .pipe(plumber())
        .pipe(header('@charset "utf-8";\n'))
        .pipe(csscomb())
        .pipe(gulp.dest('css/'));
});


// cssの圧縮
gulp.task('css:min', function() {
     return gulp.src('css/**.css')
        .pipe(plumber())
    	.pipe(cssmin())
        .pipe(rename({
          extname: '.min.css'
        }))
        .pipe(gulp.dest('css/dist/'));
});


// jsファイルを圧縮して.minを付与
gulp.task("js:min", function() {
    return gulp.src('js/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({
          extname: '.min.js'
        }))
        .pipe(gulp.dest("js/dist/"));
});


/**
 * watch
 */
gulp.task('watch', function(){
    gulp.watch('sass/**/**/*', function(event) {
        gulp.run('sass');
        gulp.run('css:min');
    });
    gulp.watch('js/*.js', function(event) {
        gulp.run('js:min');
    });
});
 
gulp.task('default', function(){
    gulp.run('watch');
});
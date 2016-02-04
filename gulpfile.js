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
    return sass('src/sass/', { style: 'expanded' })
        .pipe(plumber())
        .pipe(header('@charset "utf-8";\n'))
        .pipe(csscomb())
        .pipe(gulp.dest('dist/css/'));
});


// cssの圧縮
gulp.task('css:min', function() {
     return gulp.src('dist/css/simple-drawer.css')
        .pipe(plumber())
    	.pipe(cssmin())
        .pipe(rename({
          extname: '.min.css'
        }))
        .pipe(gulp.dest('dist/css/'));
});


// jsファイルを圧縮して.minを付与
gulp.task("js:min", function() {
    return gulp.src('dist/js/jquery.simpledrawer.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({
          extname: '.min.js'
        }))
        .pipe(gulp.dest("dist/js/"));
});


/**
 * watch
 */
gulp.task('watch', function(){
    gulp.watch('src/sass/**/**/*', function(event) {
        gulp.run('sass');
        gulp.run('css:min');
    });
    gulp.watch('dist/js/jquery.simpledrawer.js', function(event) {
        gulp.run('js:min');
    });
});
 
gulp.task('default', function(){
    gulp.run('watch');
});
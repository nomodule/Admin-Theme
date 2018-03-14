'use strict';

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync');

gulp.task('html', function(){
  gulp.src('build/*.html')
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('css', function(){
  gulp.src('sources/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'})
      .on('error', sass.logError)
    )
    .pipe(autoprefixer({
      browsers: ['last 50 versions']
    }))
    // uncomment below line to minify css
    // .pipe(minifyCSS())
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function() {
  gulp.src('sources/**/*.js',)
    // concat pulls all our files together before minifying them
    .pipe( concat('main.min.js') )
    // .pipe(uglify())
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('watch', function(){
  gulp.watch('build/*.html', ['html']);
  gulp.watch('sources/scss/**/*.scss', ['css']);
  gulp.watch('sources/js/**/*.js', ['js']);
});

gulp.task('browserSync', function(){
  browserSync({
    server: {
      baseDir: 'build'
    }
  });
});

gulp.task('default', ['css', 'html']);

gulp.task('start', ['browserSync', 'watch']);
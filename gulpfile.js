var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');
   // concat = require('gulp-concat');  If I want to concat js files later I need to add this to libs to require

var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
   browserSync.init({
      server: {
         baseDir: 'source'
      }
   })
});

// task to process css
gulp.task('process-styles', function() {
   return sass('source/styles/main.scss', {
      style: 'expanded'})
       .pipe(autoprefixer('last 2 version'))
       .pipe(gulp.dest('dest/styles/'))
       .pipe(browserSync.reload({
          stream: true
       }))
       .pipe(rename({suffix: '.min'}))
       .pipe(minifycss())
       .pipe(gulp.dest('dest/styles/'));
});

// task to process js
gulp.task('process-scripts', function() {
   return gulp.src('source/scripts/*.js')  // *.js selects all files with suffix .js in the scripts folder
      // .pipe(concat('main.js'))  if I have more than one js file for this project, this pipe can be used to concat them together
       .pipe(gulp.dest('dest/scripts/'))
       .pipe(rename({suffix: '.min'}))
       .pipe(uglify())
       .pipe(gulp.dest('dest/scripts/'));

});


// tasks for gulp to watch
gulp.task('watch', ['browserSync', 'process-styles'], function() {
   gulp.watch('source/scripts/*.js', ['process-scripts']);
   gulp.watch('source/styles/*.scss', ['process-styles']);
});


gulp.task('default', function() {
   console.log('Default task configured');
});
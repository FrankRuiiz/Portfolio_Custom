var gulp = require('gulp'),
    sass = require('gulp-sass'),
    useref = require('gulp-useref');

var browserSync = require('browser-sync').create();

// task for live reload
gulp.task('browserSync', function() {
   browserSync.init({
      server: {
         baseDir: 'source'
      }
   });
});


// task for compiling/processing sass
gulp.task('sass', function() {
   return gulp.src('source/scss/main.scss')
       .pipe(sass({ includePaths : ['scss/partials/'] }))
       .pipe(gulp.dest('source/css'))
       .pipe(browserSync.reload({
          stream: true
       }))
});


// task to process js files
gulp.task('useref', function() {
   return gulp.src('source/*.html')
       .pipe(useref())
       .pipe(gulp.dest('dist'))
});




gulp.task('watch', ['browserSync', 'sass'], function() {
   gulp.watch('source/scss/**/*.scss', ['sass']);
   gulp.watch('source/*.html', browserSync.reload);
   gulp.watch('source/js/**/*.js', browserSync.reload);
});









//     sass = require('gulp-ruby-sass'),
//     autoprefixer = require('gulp-autoprefixer'),
//     minifycss = require('gulp-minify-css'),
//     rename = require('gulp-rename'),
//     uglify = require('gulp-uglify');
//    // concat = require('gulp-concat');  If I want to concat js files later I need to add this to libs to require
//
// var browserSync = require('browser-sync').create();








// gulp.task('browserSync', function() {
//    browserSync.init({
//       server: {
//          baseDir: 'dist'
//       }
//    })
// });
//
// // task to process css
// gulp.task('process-scss', function() {
//    return sass('source/scss/main.scss', {
//       style: 'expanded',
//       loadPath: 'source/scss'
//    })
//        .pipe(autoprefixer('last 2 version'))
//        .pipe(gulp.dist('dist/scss/'))
//        .pipe(browserSync.reload({
//           stream: true
//        }))
//        .pipe(rename({suffix: '.min'}))
//        .pipe(minifycss())
//        .pipe(gulp.dist('dist/scss/'));
// });
//
// // task to process js
// gulp.task('process-js', function() {
//    return gulp.src('source/js/*.js')  // *.js selects all files with suffix .js in the js folder
//       // .pipe(concat('main.js'))  if I have more than one js file for this project, this pipe can be used to concat them together
//        .pipe(gulp.dist('dist/js/'))
//        .pipe(rename({suffix: '.min'}))
//        .pipe(uglify())
//        .pipe(gulp.dist('dist/js/'));
//
// });
//
//
// // tasks for gulp to watch
// gulp.task('watch', ['browserSync', 'process-styles'], function() {
//    gulp.watch('source/js/*.js', ['process-js']);
//    gulp.watch('source/scss/**/*.scss', ['process-scss']);
// });
//
//
// gulp.task('default', function() {
//    console.log('Default task configured');
// });
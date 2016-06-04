var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    del = require('del'),
    runSequence = require('run-sequence'),
    cssnano = require('gulp-cssnano');

var browserSync = require('browser-sync').create();


/** Development processes **/

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
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('source/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('source/scss/**/*.scss', ['sass']);
    gulp.watch('source/*.html', browserSync.reload);
    gulp.watch('source/js/**/*.js', browserSync.reload);
});



/** Build Processes **/

// task for processing images
gulp.task('images', function() {
   return gulp.src('source/images/**/*.+(png|jpg|gif|svg)')
       .pipe(cache(imagemin({
          interlaced: true
       })))
       .pipe(gulp.dest('dist/images'))
});

// task for processing fonts
gulp.task('fonts', function() {
    return gulp.src('source/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
});


// task to process js files
gulp.task('useref', function() {
   return gulp.src('source/index.html')
       .pipe(useref())
       .pipe(gulpIf('*.js', uglify()))
       .pipe(gulpIf('*.css', cssnano()))
       .pipe(gulp.dest('dist'))
});

// task for cleaning the dist file
gulp.task('clean:dist', function() {
    return del.sync('dist');
});

// task to run the build sequences in order
gulp.task('build', function(callback) {
   runSequence('clean:dist',
   ['sass', 'useref', 'images', 'fonts'],
   callback
   )
});


gulp.task('default', function(callback) {
    runSequence(['sass', 'browserSync', 'watch'],
        callback
    )
});








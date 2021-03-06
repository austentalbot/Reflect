var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var sass = require('gulp-sass');
 
gulp.task('sass', function () {
  return gulp.src('./scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./'));
});

gulp.task('browserify', function() {
  var bundler = browserify({
    entries: ['./client/app.jsx'],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
  });
  var watcher  = watchify(bundler);

  return watcher
  .on('update', function () { // When any files update
    var updateStart = Date.now();
    console.log('Updating!');
    watcher.bundle() // Create new bundle that uses the cache for high performance
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build/'));
    console.log('Updated!', (Date.now() - updateStart) + 'ms');
  })
  .bundle() // Create the initial bundle when starting the task
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./build/'));
});

gulp.task('watch-sass', function () {
  return gulp.watch('./scss/*.scss', ['sass']);
});

gulp.task('default', ['browserify', 'watch-sass']);

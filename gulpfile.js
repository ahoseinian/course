var gulp = require('gulp'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  reactify = require('reactify'),
  uglify = require('gulp-uglify'),
  gls = require('gulp-live-server'),
  browserify = require('browserify');

gulp.task('js', function() {
  return browserify('lib/front/js/main.js')
    .transform(reactify)
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('public/build'));
});

gulp.task('js:min', function() {
  return browserify('lib/front/js/main.js')
    .transform(reactify)
    .bundle()
    .pipe(source('main.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('public/build'));
});

gulp.task('serve', function() {
  var server = gls.new('bin/www');
  server.start();

  gulp.watch(['public/build/**/*.css', 'views/**/*.jade'], function(file) {
    server.notify.apply(server, [file]);
  });

  gulp.watch('app.js', function() {
    server.start.bind(server)();
  });
});

gulp.task('default', ['serve']);

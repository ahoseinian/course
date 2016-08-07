var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var gls = require('gulp-live-server');
var browserify = require('browserify');
var sass = require('gulp-sass');

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


gulp.task('scss', function() {
  return gulp.src('lib/front/css/main.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('public/stylesheets/'));
});

gulp.task('serve', function() {
  var server = gls.new('bin/www');
  server.start();

  gulp.watch(['public/build/**/*.css', 'public/build/**/*.js', 'views/**/*.jade'], function(file) {
    server.notify.apply(server, [file]);
  });

  gulp.watch('app.js', function() {
    server.start.bind(server)();
  });
});

gulp.task('watch', function() {
  gulp.watch(['lib/front/js/**/*.jsx', 'lib/front/js/**/*.js'], ['js']);
  gulp.watch(['lib/front/css/**/*.scss'], ['scss']);

});

gulp.task('default', ['serve', 'watch']);

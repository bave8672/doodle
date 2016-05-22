var gulp   = require('gulp');
var ts    = require('gulp-typescript');
var shell  = require('gulp-shell');
var runseq = require('run-sequence');
var tslint = require('gulp-tslint');
var open = require('gulp-open');

var paths = {
  src: 'app/src/**',
  dest: 'app/build/**',
  tscripts : { 
    src : ['app/src/**/*.ts', '!**/*.d.ts'],
    dest : 'app/build' 
  },
  html: {
    src: ['app/src/**/*.html'],
    dest: 'app/build'
  },
  css: {
    src: ['app/src/**/*.css'],
  dest: 'app/build'
  },
  appIndex: 'app/build/index.html'
};

gulp.task('default', ['lint', 'build', 'open', 'watch']);

// ** Running ** //

gulp.task('open', function() {
  gulp.src(paths.appIndex)
    .pipe(open());
});

// ** Watching ** //

gulp.task('watch', function () {
  gulp.watch(paths.src, ['compile:typescript', 'copy']);
});

// ** Compilation ** //

gulp.task('build', ['compile:typescript', 'copy']);
gulp.task('compile:typescript', function () {
  return gulp
  .src(paths.tscripts.src)
  .pipe(ts({
    module: "commonjs",
    emitError: false
  }))
  .pipe(gulp.dest(paths.tscripts.dest));
});

// ** Linting ** //

gulp.task('lint', ['lint:default']);
gulp.task('lint:default', function(){
      return gulp.src(paths.tscripts.src)
        .pipe(tslint())
        .pipe(tslint.report('prose', {
          emitError: false
        }));
});

// ** Copying ** //

gulp.task('copy', ['copy:html', 'copy:css']);
gulp.task('copy:html', function() {
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest));
});
gulp.task('copy:css', function() {
  return gulp.src(paths.css.src)
    .pipe(gulp.dest(paths.css.dest));
});
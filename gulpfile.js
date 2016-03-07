var gulp   = require('gulp');
var tsc    = require('gulp-tsc');
var shell  = require('gulp-shell');
var runseq = require('run-sequence');
var tslint = require('gulp-tslint');

var paths = {
  src: 'app/src/**',
  dest: 'app/build/**',
  tscripts : { 
    src : ['app/src/**/*.ts'],
    dest : 'app/build' 
  },
  html: {
    src: ['app/src/**/*.html'],
    dest: 'app/build'
  },
  css: {
    src: ['app/src/**/*.css'],
    dest: 'app/build'
  }
};

gulp.task('default', ['lint', 'build', 'watch']);

// ** Running ** //

gulp.task('run', shell.task([
  'node app/build/index.js'
]));

// ** Watching ** //

gulp.task('watch', function () {
  gulp.watch(paths.src, ['compile:typescript', 'copy']);
});

// ** Compilation ** //

gulp.task('build', ['compile:typescript', 'copy']);
gulp.task('compile:typescript', function () {
  return gulp
  .src(paths.tscripts.src)
  .pipe(tsc({
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
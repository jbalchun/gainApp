var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var templateCache = require('gulp-angular-templatecache');


var paths = {
  sass: ['./scss/**/*.scss'],
  templates: ['./www/**/*.html'],
  dist: ['./www']
};
//gulp.task('default', function () {
//  return gulp.src('/app/templates/**/*.html')
//      .pipe(templateCache())
//      .pipe(gulp.dest('public'));
//});

gulp.task('templates', function() {
  gulp.src(paths.templates)
      //.pipe(minifyHtml({empty: true}))
      //console.log('gulper')
      .pipe(templateCache({
        standalone: true
      }))
      .pipe(gulp.dest(paths.dist + '/js'));
});

gulp.task('default', ['templates']);

//gulp.task('sass', function(done) {
//  gulp.src('./scss/ionic.app.scss')
//    .pipe(sass())
//    .pipe(gulp.dest('./www/css/'))
//    .pipe(minifyCss({
//      keepSpecialComments: 0
//    }))
//    .pipe(rename({ extname: '.min.css' }))
//    .pipe(gulp.dest('./www/css/'))
//    .on('end', done);
//});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch('./www/templates/**/*.html', ['cache_templates']);
});

//gulp.task('install', ['git-check'], function() {
//  return bower.commands.install()
//    .on('log', function(data) {
//      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
//    });
//});
//
//gulp.task('git-check', function(done) {
//  if (!sh.which('git')) {
//    console.log(
//      '  ' + gutil.colors.red('Git is not installed.'),
//      '\n  Git, the version control system, is required to download Ionic.',
//      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
//      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
//    );
//    process.exit(1);
//  }
//  done();
//});


gulp.task('build', ['templates']);
const gulp = require('gulp')
const del = require('del')

function cpImg() {
  return gulp.src(['./src/img/**/*']).pipe(gulp.dest('./dist/img/'))
}

function delImg() {
  return del([
    './dist/img/*'
  ])
}

function cpLib() {
  return gulp.src(['src/lib/**/*']).pipe(gulp.dest('./dist/lib/'))  
}

function delLib() {
  return del([
    './dist/lib/*'
  ])
}

function cpHtml() {
  return gulp.src(['./src/*.html']).pipe(gulp.dest('./dist/'))  
}

function delHtml() {
  return del([
    './dist/*.html'
  ])
}

function cpCss() {
  return gulp.src(['./src/css/**/*']).pipe(gulp.dest('./dist/css'))  
}

function delCss() {
  return del([
    './dist/css/*'
  ])
}

gulp.task('copy', gulp.series(
  delImg,
  delHtml,
  delLib,
  delCss,
  cpImg,
  cpHtml,
  cpLib,
  cpCss
))

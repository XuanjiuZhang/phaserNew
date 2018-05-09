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

gulp.task('dist', gulp.series(
  delImg,
  delHtml,
  delLib,
  cpImg,
  cpHtml,
  cpLib
))

// function cleanDev() { console.log('kk') }
// function cleanDist() { console.log('kk') }
// function sprite() { console.log('kk') }
// function compileCss() { console.log('kk') }
// function compileJs() { console.log('kk') }
// function copyHtml() { console.log('kk') }
// function reversion() { console.log('kk') }
// function replcae() { console.log('kk') }

// gulp.task('dist', gulp.series(
//   gulp.parallel(
//     gulp.series(
//       cleanDev,
//       gulp.parallel(
//         gulp.series(
//           sprite,
//           compileCss
//         ),
//         compileJs,
//         copyHtml
//       )
//     ),
//     cleanDist
//   ),
//   reversion,
//   replcae
// ))
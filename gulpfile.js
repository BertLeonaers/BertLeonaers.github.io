const { src, dest, parallel, series, watch } = require('gulp');

const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');

const sassLocation = 'app/scss/*.sass'

function sassToCss(){
  return src(sassLocation)
    .pipe(sass())
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

exports.default = function() {
  sassToCss();

  browserSync.init({
    server: {
      baseDir: './app'
    }
  })

  watch(sassLocation, sassToCss);
  watch('./app/*.html').on('change', browserSync.reload)
};

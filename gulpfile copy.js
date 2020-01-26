const { src, dest, parallel, series, watch } = require('gulp');

const gulpPug = require('gulp-pug');

const browserSync = require('browser-sync').create();

const sass        = require('gulp-sass');

function pugToHTML(){
    return src("./pug/**/*.pug")
      .pipe(gulpPug({
        pretty: true,
        title: "Laurelle"
      }))
      .pipe(dest('./'))
  }

function sassToCss(){
    return src("./pug/sass/*.sass")
      .pipe(sass())
      .pipe(dest('css'))
      .pipe(browserSync.stream())
  }

exports.default = function() {
  sassToCss();
  pugToHTML()
  browserSync.init({
    server: {
      baseDir: '.'
    }
  })
  watch('./pug/**/*.pug').on('change', series(pugToHTML, browserSync.reload))
  watch('./pug/sass/*.sass').on('change', sassToCss, browserSync.reload)
};
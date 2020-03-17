const { src, dest, parallel, series, watch } = require('gulp');

const gulpPug = require('gulp-pug');

const browserSync = require('browser-sync').create();

const sass        = require('gulp-sass');

const autoprefixer = require('gulp-autoprefixer');

function pugToHTML(){
  return src("./pug/**/*.pug")
    .pipe(gulpPug({
      pretty: true,
      title: "Laurelle"
    }))
    .pipe(dest('./'))
}

function sassToCss(){
  return src("./pug/sass/main.sass")
    .pipe(sass())
    .pipe(autoprefixer({
        cascade: false
      }))
    .pipe(dest('css'))
    .pipe(browserSync.stream())
}

function js(){
  return src("./pug/js/*.js")
    .pipe(dest('js'));
}

exports.default = function() {
  sassToCss();
  pugToHTML();
  js();
  browserSync.init({
    server: {
      baseDir: '.'
    }
  })
  watch('./pug/**/*.pug').on('change', series(pugToHTML, browserSync.reload))
  watch('./pug/sass/*.sass').on('change', sassToCss, browserSync.reload)
  watch('./pug/js/*.js').on('change', js, browserSync.reload)
};